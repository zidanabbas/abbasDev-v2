import { NextResponse } from "next/server";
import {
  playTrack,
  pauseTrack,
  nextTrack,
  previousTrack,
} from "@/lib/spotify.js";

export async function POST(req) {
  try {
    const { action } = await req.json();

    switch (action) {
      case "play":
        await playTrack();
        break;
      case "pause":
        await pauseTrack();
        break;
      case "next":
        await nextTrack();
        break;
      case "prev":
        await previousTrack();
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to control playback" },
      { status: 500 }
    );
  }
}
