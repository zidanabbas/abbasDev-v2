"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function SpotifyTop() {
  const { data, mutate, error } = useSWR(
    "/api/spotify?type=now-playing",
    fetcher,
    {
      refreshInterval: 15000,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const [loadingAction, setLoadingAction] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressTime, setProgressTime] = useState({ current: 0, total: 0 });
  const [isScrolled, setIsScrolled] = useState(false);

  const intervalRef = useRef(null);

  // --- scroll listener ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- progress bar update ---
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
        mutate();
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
      // Optimistic update
      if (action === "play") mutate({ ...data, currentlyPlaying: true }, false);
      if (action === "pause")
        mutate({ ...data, currentlyPlaying: false }, false);
      if (action === "next" || action === "prev") mutate();
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

  if (error || !data || !data.currentlyPlaying) return null;

  const { name, artists, albumArt, href, currentlyPlaying } = data;
  const artistNames = artists?.map((a) => a.name).join(", ");

  return (
    <div
      className={`fixed bottom-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "p-2 bg-gray-800/90"
          : "p-4 bg-white dark:bg-gray-800 rounded-t-xl"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Album Art & Info */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Image
              src={albumArt?.url || "/placeholder.svg"}
              alt="Album art"
              width={isScrolled ? 32 : 48}
              height={isScrolled ? 32 : 48}
              className="rounded-md"
            />
          </Link>
          {!isScrolled && (
            <div className="flex flex-col truncate">
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="truncate font-bold text-sm text-gray-900 dark:text-gray-100 hover:underline"
              >
                {name}
              </Link>
              <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                {artistNames}
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div
          className={`flex items-center gap-4 ${isScrolled ? "mx-auto" : ""}`}
        >
          <SkipBack
            size={18}
            onClick={() => handleControl("prev")}
            className="cursor-pointer"
          />
          <div
            className="w-10 h-10 rounded-full dark:bg-gray-900 bg-gray-200 flex items-center justify-center cursor-pointer"
            onClick={() => handleControl(currentlyPlaying ? "pause" : "play")}
          >
            {currentlyPlaying ? <Pause size={20} /> : <Play size={20} />}
          </div>
          <SkipForward
            size={18}
            onClick={() => handleControl("next")}
            className="cursor-pointer"
          />
        </div>

        {/* Progress Bar */}
        {!isScrolled && (
          <div className="flex-1 flex items-center gap-2 min-w-0">
            <span className="w-10 text-right text-xs">
              {formatTime(progressTime.current)}
            </span>
            <div className="flex-1 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className="h-1 rounded-full bg-gray-700 dark:bg-gray-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="w-10 text-left text-xs">
              {formatTime(progressTime.total)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
