// component spotifyCard.js
"use client"; // Menandakan bahwa komponen ini berjalan di sisi klien

import Image from "next/image";
import Link from "next/link";
import { BiLogoSpotify } from "react-icons/bi";

// Impor useGetDataSpotify dari services/fetcher.js
import { useGetDataSpotify } from "../../../services/fetcher.js"; // Sesuaikan path jika berbeda

export default function SpotifyCard() {
  // Menggunakan useGetDataSpotify custom hook dari services/fetcher.js
  const { data, error, isLoading } = useGetDataSpotify();

  // State Loading
  if (isLoading)
    return (
      <div className="w-full flex bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 items-center">
        <div className="relative w-full">
          <div className="flex items-center gap-8">
            <div className="w-[75px] h-[75px] overflow-hidden rounded-lg sm:w-[100px] sm:h-[100px] bg-neutral-300 dark:bg-neutral-700 animate-pulse"></div>

            <div className="flex flex-col items-start gap-1 md:gap-3">
              <div className="w-[178px] rounded h-4 bg-neutral-300 dark:bg-neutral-700 animate-pulse"></div>
              <div className="w-[187px] rounded h-5 bg-neutral-300 dark:bg-neutral-700 animate-pulse"></div>
              <div className="w-[143px] rounded h-4 bg-neutral-300 dark:bg-neutral-700 animate-pulse"></div>
            </div>
          </div>
          <Link
            href={"https://open.spotify.com/"} // Link umum ke Spotify
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0"
          >
            <BiLogoSpotify className="md:w-8 md:h-8 h-5 w-5" />
          </Link>
        </div>
      </div>
    );

  // State Error
  if (error) {
    console.error("Error fetching Spotify data:", error);
    return (
      <div className="w-full flex bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 items-center">
        <div className="relative w-full">
          <div className="flex items-center gap-8">
            <div className="w-[75px] h-[75px] overflow-hidden rounded-lg sm:w-[100px] sm:h-[100px] bg-neutral-300 dark:bg-neutral-700"></div>

            <div className="flex flex-col items-start gap-1 md:gap-3">
              <p className="text-red-500">Gagal memuat data Spotify.</p>
              <div className="w-[187px] rounded h-5 bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="w-[143px] rounded h-4 bg-neutral-300 dark:bg-neutral-700"></div>
            </div>
          </div>
          <Link
            href={"https://open.spotify.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-0 right-0"
          >
            <BiLogoSpotify className="md:w-8 md:h-8 h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  // State Tidak Ada Lagu yang Diputar / Tidak Ada Data
  if (!data || !data.currentlyPlaying) {
    return (
      <div className="w-full flex bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 flex-col">
        <div className="w-full mb-2 relative">
          <h1 className="text-md md:text-lg font-bold ">
            TIDAK SEDANG MEMUTAR
          </h1>
          <div className="absolute top-0 right-0">
            <BiLogoSpotify className="md:w-8 md:h-8 w-6 h-6" size={40} />
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-[100px] h-[100px] bg-neutral-300 dark:bg-neutral-700 rounded-sm flex items-center justify-center text-neutral-500">
            <BiLogoSpotify size={50} />{" "}
            {/* Ikon Spotify di tengah placeholder */}
          </div>
          <div className="flex flex-col gap-1 justify-center">
            <p className="text-md md:text-lg font-semibold">
              Tidak ada yang sedang diputar saat ini.
            </p>
            <Link
              href={"https://open.spotify.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:underline"
            >
              Coba dengarkan Spotify!
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // State Data Tersedia dan Diputar
  return (
    <div className="w-full flex bg-neutral-100 dark:bg-neutral-800 rounded-xl p-4 flex-col">
      <div className="w-full mb-2 relative">
        <h1 className="text-md md:text-lg font-bold ">
          {data.currentlyPlaying
            ? "SEDANG MENDENGARKAN SPOTIFY"
            : "TERAKHIR DIPUTAR"}
        </h1>
        <div className="absolute top-0 right-0">
          <BiLogoSpotify className="md:w-8 md:h-8 w-6 h-6" size={40} />
        </div>
      </div>
      <div className="flex gap-4">
        {data.albumArt && data.albumArt.url ? (
          <Image
            src={data.albumArt.url}
            alt="Album art"
            width={100}
            height={100}
            className="rounded-sm"
          />
        ) : (
          <div className="w-[100px] h-[100px] bg-neutral-300 dark:bg-neutral-700 rounded-sm" />
        )}
        <div className="flex flex-col gap-1 justify-center">
          <Link
            href={data.href || "#"} // Link ke lagu
            className="text-md md:text-lg font-semibold hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.name || "Judul Tidak Diketahui"}
          </Link>
          <p>
            oleh{" "}
            {data.artists && data.artists.length > 0
              ? data.artists.map((artist, i) => (
                  <Link
                    key={i}
                    href={artist.href || "#"} // Link ke artis
                    className="text-sm font-medium hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {artist.name}
                    {i < data.artists.length - 1 ? ", " : ""}
                  </Link>
                ))
              : "Artis Tidak Diketahui"}
          </p>
          <p>
            di{" "}
            <Link
              href={data.playlistHref || "#"} // Ini sebenarnya link ke Album
              className="hover:underline text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.playlistName || "Album Tidak Diketahui"}{" "}
              {/* Ini adalah nama Album */}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
