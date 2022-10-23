import type { Population } from "@src/features/populations/types";
import type { Prefecture } from "@src/features/prefectures/types";

export const getPopulations = async ({
  prefectureId,
}: {
  prefectureId: Prefecture["id"];
}): Promise<Population[]> => {
  const response = await fetch(`/api/prefectures/${prefectureId}/populations`);

  if (!response.ok) {
    console.error(response);
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};
