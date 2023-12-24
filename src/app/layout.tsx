import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Home || Zidane Abbas",
  description: "Personal Website, Portofolio, roadMap and More",
  keywords: "Zidane Abbas, zdnabbs, zidaneabbs, portofolio abbas",
  creator: "Zidane Abbas",
  openGraph: {
    title: "Zidane Abbas - Personal website",
    description: "Personal Website, Portofolio, roadMap and More",
    siteName: "zdnabbs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
