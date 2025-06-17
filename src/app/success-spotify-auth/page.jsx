"use client";

import Link from "next/link";

export default function SuccessSpotifyAuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Otorisasi Spotify Berhasil!</h1>
      <p className="text-lg mb-8">
        Aplikasi Anda sekarang terhubung dengan Spotify.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
