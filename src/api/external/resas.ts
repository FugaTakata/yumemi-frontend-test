import { SECRET_RESAS_API_KEY } from "@src/config/env/server";

export const fetchResas = async (url: string) => {
  const headers: RequestInit["headers"] = {
    "X-API-KEY": SECRET_RESAS_API_KEY,
  };

  const response = await fetch(url, { headers });

  return response;
};
