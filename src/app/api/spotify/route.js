// src/app/api/spotify/route.js
import { NextResponse } from "next/server";
import { getNowPlaying } from "../../../lib/spotify.js";

export const dynamic = "force-dynamic"; // Memastikan rute ini selalu dijalankan secara dinamis

export async function GET() {
  try {
    const song = await getNowPlaying(); // Memanggil fungsi untuk mendapatkan lagu yang sedang diputar

    // Jika tidak ada lagu yang sedang diputar atau data item lagu tidak ada
    if (!song || !song.item) {
      return NextResponse.json({ currentlyPlaying: false }); // Mengembalikan status tidak ada lagu yang diputar
    }

    const isPlaying = song.is_playing; // Status apakah lagu sedang diputar
    const title = song.item.name; // Judul lagu
    const artist = song.item.artists.map((a) => ({
      name: a.name,
      href: a.external_urls.spotify, // Link ke artis di Spotify
    }));
    const album = song.item.album; // Detail album
    const albumImage = album.images?.[0]?.url; // URL gambar album

    return NextResponse.json({
      currentlyPlaying: isPlaying, // Status sedang diputar
      name: title, // Nama lagu
      href: song.item.external_urls.spotify, // Link ke lagu di Spotify
      artists: artist, // Array artis
      albumArt: { url: albumImage }, // Gambar album
      playlistHref: album.external_urls.spotify, // Link album (bukan playlist)
      playlistName: album.name, // Nama album (bukan playlist)
    });
  } catch (err) {
    console.error("Error in GET /api/spotify:", err); // Log error internal server
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
