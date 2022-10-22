import type { Prefecture } from "@src/features/prefectures/types";

export interface Population {
  year: number;
  value: number;
}

export interface Populations {
  [key: Prefecture["id"]]: Population[];
}
