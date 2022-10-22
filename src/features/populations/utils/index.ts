import type {
  GetPopulationsResponse,
  Population,
} from "@src/features/populations/types";

export const convertToClientData = (
  data: GetPopulationsResponse
): Population[] | undefined => {
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
