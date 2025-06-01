"use client";

import { SiSpotify } from "react-icons/si";
import useSWR from "swr";
import Link from "next/link";

export default function SpotifyTop() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR("/api/spotify", fetcher);

  if (error) {
    return (
      <div className="w-full bg-[#1ed760] p-1 fixed bottom-0 z-[999999999] rounded-t-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SiSpotify size={20} color={"#000000"} />
              <h1 className="text-black text-sm">Error fetching data</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full bg-[#1ed760] p-1 fixed bottom-0 z-[999999999] rounded-t-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SiSpotify size={20} color={"#000000"} />
              <h1 className="text-black text-sm">Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Jika ada lagu dan link href tersedia, pakai Link
  if (data.currentlyPlaying && data.href) {
    return (
      <Link href={data.href} target="_blank" rel="noopener noreferrer">
        <div className="w-full bg-[#1ed760] p-1 fixed bottom-0 z-[999999999] rounded-t-lg cursor-pointer">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SiSpotify size={20} color={"#000000"} />
                <div className="text-black text-sm flex items-center gap-1">
                  <h1>Listening: {data.name}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Jika tidak sedang memutar lagu, tampilkan tanpa link
  return (
    <div className="w-full bg-[#1ed760] p-1 fixed bottom-0 z-[999999999] rounded-t-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SiSpotify size={20} color={"#000000"} />
            <div className="text-black text-sm flex items-center gap-1">
              <h1>Not Listening</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
