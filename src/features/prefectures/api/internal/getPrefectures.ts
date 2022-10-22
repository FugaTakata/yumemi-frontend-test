import type { Prefecture } from "@src/features/prefectures/types";

export const getPrefecturesApiEndpoint = "/api/prefectures";

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const response = await fetch(getPrefecturesApiEndpoint);

  const data = await response.json();

  return data;
};
