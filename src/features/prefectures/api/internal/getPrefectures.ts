import type { Prefecture } from "@src/features/prefectures/types";

export const getPrefecturesApiEndpoint = "/api/prefectures";

export const getPrefectures = async (): Promise<Prefecture[]> => {
  const response = await fetch(getPrefecturesApiEndpoint);

  if (!response.ok) {
    console.error(response);
    throw new Error(response.statusText);
  }

  const data: Prefecture[] = await response.json();

  return data;
};
