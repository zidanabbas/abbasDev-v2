// src/app/lib/spotify.js
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

console.log(
  "[spotify.js] Loaded CLIENT_ID:",
  client_id ? client_id.substring(0, 5) + "..." : "N/A"
);
console.log(
  "[spotify.js] Loaded CLIENT_SECRET:",
  client_secret ? client_secret.substring(0, 5) + "..." : "N/A"
);
console.log(
  "[spotify.js] Loaded REFRESH_TOKEN (partial):",
  refresh_token ? refresh_token.substring(0, 10) + "..." : "N/A"
);

const basic = Buffer.from(`${client_id}:${client_secret}`, "utf8").toString(
  "base64"
);

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";

export async function getAccessToken() {
  console.log("[spotify.js] getAccessToken called.");
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
  console.log("[spotify.js] Access Token obtained successfully.");
  return data.access_token;
}

export async function getNowPlaying() {
  console.log("[spotify.js] getNowPlaying called.");
  const access_token = await getAccessToken();
  console.log("akses token nih : ", access_token);

  if (!access_token) {
    console.log(
      "[spotify.js] No access token, returning null from getNowPlaying."
    );
    return null;
  }

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-store",
  });

  if (res.status === 204) {
    console.log("[spotify.js] 204 No Content - No song currently playing.");
    return null;
  }

  if (res.status > 400) {
    console.error(
      "[spotify.js] Error fetching now playing (Spotify API error):",
      res.status,
      await res.text()
    );
    return null;
  }

  const data = await res.json();
  console.log("[spotify.js] Now Playing data received.");
  return data;
}
