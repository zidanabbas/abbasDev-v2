import { NextResponse } from "next/server";
import {
  getNowPlaying,
  getPlaylists,
  getRecentTracks,
  getFollowedArtists,
} from "../../../lib/spotify.js";

export const dynamic = "force-dynamic";

// Cache in-memory untuk now-playing
let nowPlayingCache = {
  data: null,
  lastFetch: 0,
};

const CACHE_DURATION = 5000; // cache 5 detik

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    switch (type) {
      case "now-playing":
        const now = Date.now();

        // Gunakan cache kalau masih valid
        if (
          now - nowPlayingCache.lastFetch < CACHE_DURATION &&
          nowPlayingCache.data
        ) {
          return NextResponse.json(nowPlayingCache.data);
        }

        // Fetch Spotify hanya kalau cache expired
        const data = await getNowPlaying();

        if (!data?.item) {
          const response = { currentlyPlaying: false };
          nowPlayingCache = { data: response, lastFetch: now };
          return NextResponse.json(response);
        }

        const response = {
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
        };

        nowPlayingCache = { data: response, lastFetch: now };
        return NextResponse.json(response);

      case "playlists":
        const playlists = await getPlaylists();
        return NextResponse.json(playlists);

      case "recent-tracks":
        const recent = await getRecentTracks();
        return NextResponse.json(recent);

      case "followed-artists":
        const artists = await getFollowedArtists();
        return NextResponse.json(artists);

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
