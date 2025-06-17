import { NextResponse } from "next/server";
import querystring from "querystring";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const redirect_uri = `${BASE_URL}/api/auth/spotify/callback`;

export const dynamic = "force-dynamic";

export async function GET(request) {
  console.log("[callback/route.js] Callback route accessed.");
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code") || null;
  const state = searchParams.get("state") || null;

  console.log(
    "[callback/route.js] Received Code:",
    code ? code.substring(0, 5) + "..." : "N/A"
  );
  console.log("[callback/route.js] Received State:", state);
  console.log(
    "[callback/route.js] Using CONSTRUCTED REDIRECT_URI for token exchange:",
    redirect_uri
  );

  if (code === null) {
    console.error(
      "[callback/route.js] Authorization code missing from Spotify callback."
    );
    return NextResponse.json(
      { error: "Authorization code missing" },
      { status: 400 }
    );
  }

  const requestBody = {
    code: code,
    redirect_uri: redirect_uri,
    grant_type: "authorization_code",
  };
  console.log(
    "[callback/route.js] Token exchange request body (partial):",
    querystring.stringify(requestBody)
  );

  const authOptions = {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret, "utf8").toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify(requestBody),
  };
  console.log("[callback/route.js] Preparing token exchange request.");

  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      authOptions
    );
    const data = await response.json();

    if (response.ok) {
      const access_token = data.access_token;
      const refresh_token = data.refresh_token;

      console.log("\n--- Spotify Tokens RECEIVED (From Callback) ---");
      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);
      console.log("-------------------------------\n");

      return NextResponse.redirect(
        new URL(
          `/success-spotify-auth?refresh_token=${refresh_token}`,
          request.url
        )
      );
    } else {
      console.error(
        "[callback/route.js] Error exchanging code for tokens from Spotify:",
        response.status,
        data
      );
      return NextResponse.json(
        { error: data.error_description || "Failed to get tokens" },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error(
      "[callback/route.js] Network or fetch error during token exchange:",
      error
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
