"use client";

import {
  Search,
  Play,
  Heart,
  MoreHorizontal,
  Settings,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { useSpotifyData } from "../../../services/fetcher.js";

export default function SpotifyCard() {
  const { data: nowPlayingData } = useSpotifyData("now-playing");
  const { data: playlistsData } = useSpotifyData("playlists");
  const { data: recentTracksData } = useSpotifyData("recent-tracks");
  const { data: followedArtistsData } = useSpotifyData("followed-artists");

  const featuredArtist = followedArtistsData?.[0];

  return (
    <div className="min-h-screen dark:bg-gray-900 rounded-lg py-4">
      {/* Padding responsif untuk semua device */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 sm:gap-0">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome Zidane!
          </h1>
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 w-4 h-4" />
              <Input
                placeholder="Search your song..."
                className="pl-10 w-full sm:w-80 bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
              />
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">1</span>
              </div>
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Artist / Banner */}
            {featuredArtist && (
              <div className="relative mb-8 rounded-2xl overflow-hidden">
                <Image
                  src={featuredArtist.images?.[0]?.url || "/placeholder.svg"}
                  alt={featuredArtist.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-red-400 opacity-50"></div>

                <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-white">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                      <span className="text-sm opacity-90">
                        Verified Artists
                      </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-bold mb-2">
                      {featuredArtist.name}
                    </h2>
                    <p className="text-base sm:text-xl opacity-90 mb-4">
                      {featuredArtist.genres?.[0] || "Spotify Artist"}
                    </p>
                    <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                      <Play className="w-4 h-4 mr-2" /> Following
                    </Button>
                  </div>

                  <div className="w-24 h-24 sm:w-40 sm:h-40 relative flex-shrink-0">
                    <Image
                      src={
                        featuredArtist.images?.[0]?.url || "/placeholder.svg"
                      }
                      alt={featuredArtist.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Popular Releases */}
            <section>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Popular Releases
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(playlistsData || []).map((item, index) => (
                  <div key={index} className="flex flex-col items-start">
                    <Image
                      src={item.images?.[0]?.url || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover w-full h-auto"
                    />
                    <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100 truncate w-full">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate w-full">
                      {item.release_date}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Played */}
            <section>
              <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Recent Played
              </h3>
              <div className="space-y-4">
                {(recentTracksData || []).slice(0, 5).map((item, index) => {
                  const track = item.track;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 dark:text-gray-300"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                      <Image
                        src={track.album.images?.[0]?.url || "/placeholder.svg"}
                        alt={track.name}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {track.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {(track.artists || []).map((a) => a.name).join(", ")}
                        </p>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:block">
                          {new Date(item.played_at).toLocaleTimeString()}
                        </span>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Now Playing */}
            <div className="bg-white rounded-2xl p-6 dark:bg-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Now Playing
              </h3>
              {nowPlayingData && nowPlayingData.currentlyPlaying ? (
                <div className="flex items-center gap-4">
                  <Image
                    src={nowPlayingData.albumArt?.url || "/placeholder.svg"}
                    alt={nowPlayingData.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <Link
                      href={nowPlayingData.href || "#"}
                      target="_blank"
                      className="font-medium text-gray-900 dark:text-gray-100 hover:underline truncate"
                    >
                      {nowPlayingData.name}
                    </Link>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {(nowPlayingData.artists || [])
                        .map((a) => a.name)
                        .join(", ")}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tidak ada yang sedang diputar
                </p>
              )}
            </div>

            {/* Followed Artists */}
            <div className="bg-white rounded-2xl p-6 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Followed Artists
                </h3>
                <Button variant="ghost" size="icon">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                {(followedArtistsData || []).map((artist, index) => (
                  <div key={index} className="text-center w-20 flex-shrink-0">
                    <Avatar className="w-20 h-20 mb-2 mx-auto">
                      <AvatarImage
                        src={artist.images?.[0]?.url || "/placeholder.svg"}
                        alt={artist.name}
                      />
                      <AvatarFallback>
                        {artist.name
                          ?.split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                      {artist.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
