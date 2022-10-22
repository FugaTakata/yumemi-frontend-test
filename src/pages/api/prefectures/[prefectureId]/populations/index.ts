import { getPopulation } from "@src/features/populations/api/external/getPopulations";
import type { Population } from "@src/features/populations/types";
import { convertToClientData } from "@src/features/populations/utils";

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prefectureId = Number(req.query.prefectureId);
  if (isNaN(prefectureId)) {
    res.status(400).json({ message: "Invalid query" });
    return;
  }

  const data = await getPopulation({ prefCode: prefectureId });

  const clientFriendlyData: Population[] | undefined =
    convertToClientData(data);

  if (clientFriendlyData === undefined) {
    res.status(404).json({ message: "Data not found" });
    return;
  }

  res.status(200).json(clientFriendlyData);
}
