import { NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const redirect_uri = `${BASE_URL}/api/auth/spotify/callback`;

const generateRandomString = (length) => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const state = generateRandomString(16);

export const dynamic = "force-dynamic";

export async function GET(request) {
  console.log("[login/route.js] Login route accessed.");
  console.log(
    "[login/route.js] Loaded CLIENT_ID:",
    client_id ? client_id.substring(0, 5) + "..." : "N/A"
  );
  console.log("[login/route.js] Constructed REDIRECT_URI:", redirect_uri);

  const scope =
    "user-read-playback-state user-read-currently-playing user-top-read user-read-recently-played";

  const spotifyAuthUrl =
    "https://accounts.spotify.com/authorize?response_type=code&client_id=29e763c0250d4d41acfc93554d56287b&scope=user-read-currently-playing%20user-read-playback-state%20user-read-recently-played&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fauth%2Fspotify%2Fcallback&state=qtpp8fpkm2ouk7j3noony" +
    querystring.stringify({
      response_type: "code",
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state,
    });

  console.log(
    "[login/route.js] FULL REDIRECT URL SENT TO SPOTIFY:",
    spotifyAuthUrl
  );
  return NextResponse.redirect(spotifyAuthUrl);
}
