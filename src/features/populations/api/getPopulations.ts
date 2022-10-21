import type { Population } from "@src/features/populations/types";

export const getPopulations = async ({
  prefectureId,
}: {
  prefectureId: number;
}): Promise<Population[]> => {
  const response = await fetch(`/api/prefectures/${prefectureId}/population`);

  const data = await response.json();

  return data;
};
