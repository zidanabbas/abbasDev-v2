"use client";

import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Volume2,
  ListMusic,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { SiSpotify } from "react-icons/si";
import { useState, useEffect, useRef } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SpotifyTop() {
  // SWR refresh setiap 10 detik
  const { data, mutate, error } = useSWR(
    "/api/spotify?type=now-playing",
    fetcher,
    {
      refreshInterval: 15000, // 15 detik
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [loadingAction, setLoadingAction] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressTime, setProgressTime] = useState({ current: 0, total: 0 });

  const intervalRef = useRef(null);

  useEffect(() => {
    if (
      !data ||
      !data.currentlyPlaying ||
      data.progress_ms === undefined ||
      data.total_ms === undefined
    ) {
      setProgress(0);
      setProgressTime({ current: 0, total: 0 });
      clearInterval(intervalRef.current);
      return;
    }

    let currentMs = data.progress_ms;
    const totalMs = data.total_ms;

    setProgressTime({ current: currentMs, total: totalMs });
    setProgress((currentMs / totalMs) * 100);

    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      currentMs += 1000;

      if (currentMs >= totalMs) {
        currentMs = totalMs;
        clearInterval(intervalRef.current);
        mutate(); // fetch data baru saat lagu selesai
      }

      setProgressTime({ current: currentMs, total: totalMs });
      setProgress((currentMs / totalMs) * 100);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [data, mutate]);

  const handleControl = async (action) => {
    if (loadingAction) return;
    setLoadingAction(true);
    try {
      await fetch("/api/spotify/control", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      setTimeout(() => mutate(), 500); // fetch data baru setelah control
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const formatTime = (ms) => {
    if (ms < 0) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // --- rendering tetap sama seperti kode asli ---
  if (error) {
    return (
      <div className="w-full bg-gray-100 p-2 fixed bottom-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-center text-sm text-gray-500">
          <SiSpotify size={16} className="mr-2 text-gray-400" />
          {"Error fetching data"}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="w-full bg-gray-100 p-2 fixed bottom-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-center text-sm text-gray-500">
          <SiSpotify size={16} className="mr-2 text-gray-400" />
          {"Loading..."}
        </div>
      </div>
    );
  }

  if (data && !data.currentlyPlaying) {
    return (
      <div className="w-full bg-gray-100 p-4 fixed bottom-0 z-50 rounded-t-xl shadow-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <SiSpotify size={48} className="text-gray-400" />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900">
                Tidak Ada yang Sedang Diputar
              </span>
              <span className="text-sm text-gray-500">
                Coba dengarkan sesuatu di Spotify.
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { name, artists, albumArt, href, currentlyPlaying } = data;
  const artistNames = artists?.map((artist) => artist.name).join(", ");

  return (
    <div className="w-full p-2 fixed -bottom-2 z-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
        {/* Left Section */}
        <div className="flex items-center gap-4 w-full md:w-1/4">
          <Link href={href} target="_blank" rel="noopener noreferrer">
            <Image
              src={albumArt?.url || "/placeholder.svg"}
              alt="Album art"
              width={64}
              height={64}
              className="rounded-lg shadow-sm"
            />
          </Link>
          <div className="flex flex-col flex-grow min-w-0">
            <Link
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-sm text-gray-900 hover:underline truncate"
            >
              {name || "Judul Tidak Diketahui"}
            </Link>
            <p className="text-xs text-gray-500 truncate">
              {artistNames || "Artis Tidak Diketahui"}
            </p>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex flex-col items-center w-full md:w-2/4">
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-gray-600 mb-2">
            <Shuffle size={18} className="hover:text-gray-900 cursor-pointer" />
            <SkipBack
              size={18}
              className="hover:text-gray-900 cursor-pointer"
              onClick={() => handleControl("prev")}
            />
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-900 text-white flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleControl(currentlyPlaying ? "pause" : "play")}
            >
              {currentlyPlaying ? <Pause size={20} /> : <Play size={20} />}
            </div>
            <SkipForward
              size={18}
              className="hover:text-gray-900 cursor-pointer"
              onClick={() => handleControl("next")}
            />
            <Repeat size={18} className="hover:text-gray-900 cursor-pointer" />
          </div>

          {/* Progress Bar */}
          <div className="flex items-center w-full gap-2 text-sm text-gray-500">
            <span className="w-8 text-right hidden sm:block">
              {formatTime(progressTime.current)}
            </span>
            <div className="flex-1 bg-gray-200 rounded-full h-1">
              <div
                className="bg-gray-700 h-1 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="w-8 text-left hidden sm:block">
              {formatTime(progressTime.total)}
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 w-full md:w-1/4 justify-end">
          <Volume2
            size={18}
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
          />
          <div className="flex-1 bg-gray-200 rounded-full h-1 max-w-[100px] hidden md:block">
            <div className="bg-gray-700 h-1 rounded-full w-[75%]"></div>
          </div>
          <ListMusic
            size={18}
            className="text-gray-600 hover:text-gray-900 cursor-pointer hidden md:block"
          />
        </div>
      </div>
    </div>
  );
}
