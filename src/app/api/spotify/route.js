import { NextResponse } from "next/server";
import { getNowPlaying } from "../../../lib/spotify.js";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const song = await getNowPlaying();

    if (!song || !song.item) {
      return NextResponse.json({ currentlyPlaying: false });
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((a) => ({
      name: a.name,
      href: a.external_urls.spotify,
    }));
    const album = song.item.album;
    const albumImage = album.images?.[0]?.url;

    return NextResponse.json({
      currentlyPlaying: isPlaying,
      name: title,
      href: song.item.external_urls.spotify,
      artists: artist,
      albumArt: { url: albumImage },
      playlistHref: album.external_urls.spotify,
      playlistName: album.name,
    });
  } catch (err) {
    console.error("Error in GET /api/spotify:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
