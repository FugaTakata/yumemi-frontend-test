import type {
  GetPrefecturesResponse,
  Prefecture,
} from "@src/features/prefectures/types";

export const convertToClientData = (
  data: GetPrefecturesResponse
): Prefecture[] => {
  return data.result.map((prefectureData) => {
    return {
      id: prefectureData.prefCode.toString(),
      name: prefectureData.prefName,
    };
  });
};
