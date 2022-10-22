import type { Prefecture } from "@src/features/prefectures/types";

export interface Population {
  year: number;
  value: number;
}

export interface Populations {
  [key: Prefecture["id"]]: Population[];
}

export interface GetPopulationsResponse {
  message: null;
  result: {
    boundaryYear: number;
    data: {
      label: "総人口" | "年少人口" | "生産年齢人口" | "老年人口";
      data: {
        year: number;
        value: number;
      }[];
    }[];
  };
}
