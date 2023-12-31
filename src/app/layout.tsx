import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Layouts from "@/app/components/Layouts.js";
import SpotifyTop from "@/app/components/elements/SpotifyTop";
import TopLoader from "@/app/components/elements/TopLoader";

const inter = Inter({ subsets: ["latin"] });
const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Home | Zidane Abbas",
  description: "Personal Website, Portofolio, roadMap and More",
  keywords: "Zidane Abbas, zdnabbs, zidaneabbs, portofolio abbas",
  creator: "Zidane Abbas",
  openGraph: {
    title: "Zidane Abbas - Personal website",
    description: "Personal Website, Portofolio, roadMap and More",
    url: "https://abbasdev.vercel.app/",
    siteName: "zdnabbs",
    images: [
      {
        url: "https://res.cloudinary.com/dlshk9mf6/image/upload/c_crop,g_face,h_1400,w_1400/abbasImage/ywo8qfhriij23ya8refa.jpg",
        width: 1200,
        height: 630,
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
    <html lang="en" className="light">
      <body className={sora.className}>
        <Providers>
          <SpotifyTop />
          <TopLoader />
          <Layouts>{children}</Layouts>
        </Providers>
      </body>
    </html>
  );
}
