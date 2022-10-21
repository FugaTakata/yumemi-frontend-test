import { API_HOST } from "@src/config/const";
import { SECRET_RESAS_API_KEY } from "@src/config/env";
import type { Population } from "@src/features/populations/types";

import type { NextApiRequest, NextApiResponse } from "next";

const API_ENDPOINT = API_HOST + "/api/v1/population/composition/perYear";

interface GetPopulationsResponse {
  message: null;
  result: {
    boundaryYear: number;
    data: {
      label: "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
}

const getPopulation = async ({
  prefCode,
}: {
  prefCode: number;
}): Promise<GetPopulationsResponse> => {
  const headers: RequestInit["headers"] = {
    "X-API-KEY": SECRET_RESAS_API_KEY,
  };

  const response = await fetch(
    API_ENDPOINT + `?prefCode=${prefCode}&cityCode=-`,
    { headers }
  );

  const data = await response.json();

  return data;
};

const convertData = (
  data: GetPopulationsResponse
): Population[] | undefined => {
  console.log(data.result.boundaryYear);
  const populations: Population[] | undefined = data.result.data
    .find((item) => item.label === "総人口")
    ?.data.map(({ year, value }) => {
      return {
        year,
        value,
      };
    });

  return populations;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prefectureId = Number(req.query.prefectureId);
  if (isNaN(prefectureId)) {
    res.status(400).json({ message: "Invalid query" });
    return;
  }

  const responseData: GetPopulationsResponse = await getPopulation({
    prefCode: prefectureId,
  });
  const populationsData: Population[] | undefined = convertData(responseData);

  if (populationsData === undefined) {
    res.status(404).json({ message: "Data not found" });
    return;
  }

  res.status(200).json(populationsData);
}
