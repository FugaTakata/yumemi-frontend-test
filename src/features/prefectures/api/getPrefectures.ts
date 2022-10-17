import { API_HOST } from "@src/config/const";
import { SECRET_RESAS_API_KEY } from "@src/config/env";

const API_ENDPOINT = API_HOST + "/api/v1/prefectures";

interface GetPrefecturesResponse {
  message: null;
  result: {
    prefCode: number;
    prefName: string;
  }[];
}

export const getPrefectures = async (): Promise<GetPrefecturesResponse> => {
  const headers: RequestInit["headers"] = {
    "X-API-KEY": SECRET_RESAS_API_KEY,
  };

  const response = await fetch(API_ENDPOINT, {
    headers,
  });

  const data = await response.json();

  return data;
};
