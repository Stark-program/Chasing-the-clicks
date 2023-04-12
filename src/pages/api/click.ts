import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const updateClicks = await prisma.click.update({
    where: {
      // since we only have 1 document in the database this is the ID
      id: "3472acda-ac7e-4557-893b-255576e82c18",
    },
    data: {
      count: {
        increment: 1,
      },
    },
  });
  res.status(201).json({ count: updateClicks.count });
}
