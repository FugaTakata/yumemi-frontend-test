import type { Population } from "@src/features/populations/types";

export const getPopulations = async (url: string): Promise<Population[]> => {
  const response = await fetch(url);

  const data = await response.json();

  return data;
};
