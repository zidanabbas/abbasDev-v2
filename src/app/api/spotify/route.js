import { NextResponse } from "next/server";
import {
  getNowPlaying,
  getPlaylists,
  getRecentTracks,
  getFollowedArtists,
  playTrack,
  pauseTrack,
  nextTrack,
  previousTrack,
} from "../../../lib/spotify.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    let data;
    switch (type) {
      case "now-playing":
        data = await getNowPlaying();

        // Perbaikan: Jika tidak ada lagu yang diputar, kembalikan status `currentlyPlaying: false`.
        if (!data?.item) {
          return NextResponse.json({ currentlyPlaying: false });
        }

        // Perbaikan: Tambahkan `progress_ms` dan `total_ms` ke respons API
        return NextResponse.json({
          currentlyPlaying: data.is_playing,
          name: data.item.name,
          href: data.item.external_urls.spotify,
          artists: (data.item.artists || []).map((a) => ({
            name: a.name,
            href: a.external_urls.spotify,
          })),
          albumArt: { url: data.item.album.images?.[0]?.url },
          playlistHref: data.item.album.external_urls.spotify,
          playlistName: data.item.album.name,
          progress_ms: data.progress_ms,
          total_ms: data.item.duration_ms,
        });

      case "playlists":
        data = await getPlaylists();
        return NextResponse.json(data);

      case "recent-tracks":
        data = await getRecentTracks();
        return NextResponse.json(data);

      case "followed-artists":
        data = await getFollowedArtists();
        return NextResponse.json(data);

      default:
        return NextResponse.json(
          { error: "Invalid API type" },
          { status: 400 }
        );
    }
  } catch (err) {
    console.error("Error in GET /api/spotify:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
