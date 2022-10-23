import { fetchResas } from "@src/api/external/resas";
import { API_HOST } from "@src/config/const";
import type { GetPrefecturesResponse } from "@src/features/prefectures/types";

export const getPrefectures = async (): Promise<GetPrefecturesResponse> => {
  const url = API_HOST + "/api/v1/prefectures";
  const response = await fetchResas(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};
