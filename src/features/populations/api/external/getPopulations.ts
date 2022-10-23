import { fetchResas } from "@src/api/external/resas";
import { API_HOST } from "@src/config/const";
import type { GetPopulationsResponse } from "@src/features/populations/types";

const API_ENDPOINT = API_HOST + "/api/v1/population/composition/perYear";

export const getPopulation = async ({
  prefCode,
}: {
  prefCode: number;
}): Promise<GetPopulationsResponse> => {
  const url = API_ENDPOINT + `?prefCode=${prefCode}&cityCode=-`;
  const response = await fetchResas(url);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();

  return data;
};
