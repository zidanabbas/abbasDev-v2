// src/app/api/playlistSpotify/route.js
// File ini saat ini tidak digunakan oleh SpotifyCard.js.
// Jika Anda bermaksud menggunakannya, Anda perlu mengimplementasikan fungsi getPlaylist
// di lib/spotify.js dan mungkin meneruskan ID playlist.
import { getAccessToken } from "../../../lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json(
      { error: "Error fetching access_token from Spotify" },
      { status: 500 }
    );
  }

  // Untuk saat ini, rute ini hanya mengembalikan pesan sukses jika access token berhasil didapatkan.
  // Anda dapat memodifikasi ini jika Anda ingin menggunakannya untuk mengambil detail playlist tertentu.
  return NextResponse.json(
    { message: "Access token obtained successfully", accessToken: accessToken },
    { status: 200 }
  );
}
