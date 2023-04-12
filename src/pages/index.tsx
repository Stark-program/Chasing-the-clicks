import Head from "next/head";
import { useState } from "react";
import type { GetServerSideProps } from "next";
import { prisma } from "~/server/db";

const Home = ({ clicks }: Props) => {
  const [numberOfClicks, setNumberOfClicks] = useState<number>(clicks);
  const [buttonDisable, setButtonDisable] = useState(false);

  const updateClicks = async () => {
    setButtonDisable(true);
    const res = await fetch("http://localhost:3000/api/click", {
      method: "POST",
    });
    if (res.status === 201) {
      const json: unknown = await res.json();
      const updatedCount = json as { count: number };
      setNumberOfClicks(updatedCount.count);
      setButtonDisable(false);
    }
  };

  const handleClick = () => {
    updateClicks().catch((err) => {
      console.log(err);
    });
  };
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Chasing <span className="text-[hsl(280,100%,70%)]">the</span> Clicks
          </h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-2xl font-bold text-white">
              Number of clicks: {numberOfClicks}
            </p>
            <button
              className="rounded-md bg-[hsl(280,100%,70%)] px-4 py-2 text-lg font-bold text-white disabled:bg-red-500"
              disabled={buttonDisable}
              onClick={handleClick}
            >
              Click me!
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

type Props = {
  clicks: number;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await prisma.click.findFirst();
  if (res === null || res === undefined) {
    return {
      props: {
        clicks: 0,
      },
    };
  }
  const currentClicks = res?.count;

  return {
    props: {
      clicks: currentClicks,
    },
  };
};

export default Home;
