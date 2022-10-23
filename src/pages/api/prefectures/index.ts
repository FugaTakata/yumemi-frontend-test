import { getPrefectures } from "@src/features/prefectures/api/external/getPrefectures";
import { convertToClientData } from "@src/features/prefectures/utils";

import type { NextApiRequest, NextApiResponse } from "next";

const getHandler = async (_req: NextApiRequest, res: NextApiResponse) => {
  const data = await getPrefectures();

  const clientFriendlyData = convertToClientData(data);

  res.status(200).json(clientFriendlyData);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getHandler(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}
