const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const PLAYER_ENDPOINT = "https://api.spotify.com/v1/me/player";
const PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const RECENTLY_PLAYED_ENDPOINT =
  "https://api.spotify.com/v1/me/player/recently-played";
const FOLLOWED_ARTISTS_ENDPOINT =
  "https://api.spotify.com/v1/me/following?type=artist";

export async function getAccessToken() {
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
    cache: "no-store",
  });

  if (!res.ok) {
    console.error(
      "[spotify.js] Error fetching access token:",
      res.status,
      await res.text()
    );
    return null;
  }

  const data = await res.json();
  return data.access_token;
}

export async function getNowPlaying() {
  const token = await getAccessToken();
  if (!token) return null;

  const res = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (res.status === 204 || res.status > 400) return null;
  return res.json();
}

export async function pauseTrack() {
  const token = await getAccessToken();
  if (!token) return null;
  return fetch(`${PLAYER_ENDPOINT}/pause`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function playTrack() {
  const token = await getAccessToken();
  if (!token) return null;
  return fetch(`${PLAYER_ENDPOINT}/play`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function nextTrack() {
  const token = await getAccessToken();
  if (!token) return null;
  return fetch(`${PLAYER_ENDPOINT}/next`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function previousTrack() {
  const token = await getAccessToken();
  if (!token) return null;
  return fetch(`${PLAYER_ENDPOINT}/previous`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getPlaylists() {
  const token = await getAccessToken();
  if (!token) return [];
  const res = await fetch(PLAYLISTS_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items || [];
}

export async function getRecentTracks() {
  const token = await getAccessToken();
  if (!token) return [];
  const res = await fetch(RECENTLY_PLAYED_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.items || [];
}

export async function getFollowedArtists() {
  const token = await getAccessToken();
  if (!token) return [];
  const res = await fetch(FOLLOWED_ARTISTS_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.artists?.items || [];
}
