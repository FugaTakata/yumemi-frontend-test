import { API_HOST } from "@src/config/const";
import { SECRET_RESAS_API_KEY } from "@src/config/env";
import type { Prefecture } from "@src/features/prefectures/types";

import type { NextApiRequest, NextApiResponse } from "next";

const API_ENDPOINT = API_HOST + "/api/v1/prefectures";

interface GetPrefecturesResponse {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
}

const getPrefectures = async (): Promise<GetPrefecturesResponse> => {
  const headers: RequestInit["headers"] = {
    "X-API-KEY": SECRET_RESAS_API_KEY,
  };

  const response = await fetch(API_ENDPOINT, {
    headers,
  });

  const data = await response.json();

  return data;
};

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const prefecturesData = await getPrefectures();

  const responseData: Prefecture[] = prefecturesData.result.map(
    (prefectureData) => {
      return {
        id: prefectureData.prefCode.toString(),
        name: prefectureData.prefName,
      };
    }
  );

  res.status(200).json(responseData);
}
