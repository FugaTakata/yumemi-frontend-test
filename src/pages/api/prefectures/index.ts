import { getPrefectures } from "@src/features/prefectures/api/external/getPrefectures";
import { convertToClientData } from "@src/features/prefectures/utils";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getPrefectures();

  const clientFriendlyData = convertToClientData(data);

  res.status(200).json(clientFriendlyData);
}
