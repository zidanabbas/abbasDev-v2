import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const useGetDataSpotify = () => {
  const { data, error, isLoading } = useSWR("/api/spotify", fetcher, {
    refreshInterval: 60000, // refresh setiap 60 detik
  });

  return { data, error, isLoading };
};
