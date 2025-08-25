import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useSpotifyData = (type) => {
  const { data, error, isLoading } = useSWR(
    `/api/spotify?type=${type}`,
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return { data, error, isLoading };
};
