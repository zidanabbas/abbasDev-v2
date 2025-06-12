// src/app/lib/spotify.js
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`, "utf8").toString(
  "base64"
);

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

export async function getAccessToken() {
  // ambil data token
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(
      "[spotify.js] Error fetching access token:",
      res.status,
      errorText,
      "Request Body:",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }).toString() // Log body
    );
    return null;
  }

  const data = await res.json();
  return data.access_token;
}

export async function getNowPlaying() {
  const access_token = await getAccessToken();

  if (!access_token) {
    return null;
  }

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (res.status === 204) {
    return null;
  }

  if (res.status > 400) {
    console.error(res.status, await res.text());
    return null;
  }

  const data = await res.json();
  return data;
}
