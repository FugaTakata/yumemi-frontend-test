import { getPopulation } from "@src/features/populations/api/external/getPopulations";
import type {
  GetPopulationsResponse,
  Population,
} from "@src/features/populations/types";
import { convertToClientData } from "@src/features/populations/utils";

import type { NextApiRequest, NextApiResponse } from "next";

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const prefectureId = Number(req.query.prefectureId);
  if (isNaN(prefectureId)) {
    res.status(400).json({ message: "Invalid query" });
    return;
  }

  let data: GetPopulationsResponse;

  try {
    data = await getPopulation({ prefCode: prefectureId });
  } catch (error) {
    res.status(400).end();
    return;
  }

  const clientFriendlyData: Population[] | undefined =
    convertToClientData(data);

  if (clientFriendlyData === undefined) {
    res.status(404).json({ message: "Data not found" });
    return;
  }

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
