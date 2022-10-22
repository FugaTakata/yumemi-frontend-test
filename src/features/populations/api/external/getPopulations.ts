import { API_HOST } from "@src/config/const";
import { SECRET_RESAS_API_KEY } from "@src/config/env";
import type { GetPopulationsResponse } from "@src/features/populations/types";

const API_ENDPOINT = API_HOST + "/api/v1/population/composition/perYear";

export const getPopulation = async ({
  prefCode,
}: {
  prefCode: number;
}): Promise<GetPopulationsResponse> => {
  const headers: RequestInit["headers"] = {
    "X-API-KEY": SECRET_RESAS_API_KEY,
  };

  const response = await fetch(
    API_ENDPOINT + `?prefCode=${prefCode}&cityCode=-`,
    { headers }
  );

  const data = await response.json();

  return data;
};
