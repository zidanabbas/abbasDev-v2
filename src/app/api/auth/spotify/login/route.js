// src/app/api/auth/spotify/login/route.js
import { NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri_dev = process.env.NEXT_PUBLIC_REDIRECT_URI_DEV;

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("[login/route.js] Login route accessed.");
  console.log(
    "[login/route.js] Loaded CLIENT_ID:",
    client_id ? client_id.substring(0, 5) + "..." : "N/A"
  );
  console.log("[login/route.js] Loaded REDIRECT_URI_DEV:", redirect_uri_dev); // <-- Tambah ini

  if (!client_id || !redirect_uri_dev) {
    console.error(
      "[login/route.js] Missing SPOTIFY_CLIENT_ID or NEXT_PUBLIC_REDIRECT_URI_DEV."
    );
    return NextResponse.json(
      { error: "Server configuration error: Missing env vars." },
      { status: 500 }
    );
  }

  const scope =
    "user-read-currently-playing user-read-playback-state user-read-recently-played";
  const state =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const authUrl =
    "https://accounts.spotify.com/authorize?" +
    querystring.stringify({
      // Pastikan ini benar
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri_dev, // <-- Ini yang akan di-encode
      state: state,
    });

  console.log("[login/route.js] FULL REDIRECT URL SENT TO SPOTIFY:", authUrl); // <-- Log URL lengkap ini
  return NextResponse.redirect(authUrl);
}
