import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Layouts from "@/components/Layouts.js";
import SpotifyTop from "@/components/elements/SpotifyTop";
import TopLoader from "@/components/elements/TopLoader";
import { Suspense } from "react";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://abbasdev.vercel.app/",
    "https://abbasdev.vercel.app/"
  ),
  title: "Zidane Abbas | Frontend Developer",
  description:
    "Website pribadi Zidane Abbas, Web Developer spesialis Frontend (React, Tailwind, Next.js)e",
  keywords: [
    "Zidane Abbas",
    "Zidane Abbas Panjaitan",
    "Abbas Dev",
    "Frontend Developer",
    "React Developer",
    "Web Developer Tangerang Selatan",
  ],
  creator: "Zidane Abbas",
  openGraph: {
    title: "Zidane Abbas - Personal website",
    description: "Profil pribadi dan portfolio Abbas Dev.",
    url: "https://abbasdev.vercel.app/",
    siteName: "abbas dev",
    images: [
      {
        url: "https://res.cloudinary.com/dlshk9mf6/image/upload/v1748840542/abbas-gallery/foto-profil.jpg",
        width: 1200,
        height: 630,
        alt: "Zidane Abbas",
      },
    ],
    locale: "id-ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={sora.className}>
        <Providers>
          <SpotifyTop />
          <Suspense fallback={null}>
            <TopLoader />
          </Suspense>
          <Layouts>{children}</Layouts>
        </Providers>
      </body>
    </html>
  );
}
