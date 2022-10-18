import useSWR from "swr";

interface UseFetchProps<T> {
  key: string | string[];
  fetcher: () => Promise<T>;
}

export const useFetch = <T, E>({
  key,
  fetcher,
}: UseFetchProps<T>): { data: T | undefined; error: any } => {
  const { data, error } = useSWR<T, E>(key, fetcher);

  return { data, error };
};
