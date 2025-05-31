"use client";
import "../style/nprogress.css";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 500,
  showSpinner: false,
});

function NProgressDone() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      NProgress.done();
    }, 500); // Menetapkan waktu penundaan untuk menunggu perubahan path selesai

    return () => clearTimeout(timer); // Membersihkan timer pada unmount komponen
  }, [pathname, searchParams]);

  useEffect(() => {
    NProgress.start(); // Memulai progress saat path berubah
    return () => {
      NProgress.done(); // Menghentikan progress saat komponen dibongkar
    };
  }, []);

  return null; // Tidak mengembalikan apapun karena komponen ini hanya digunakan untuk efek samping
}

export default function TopLoader() {
  return <NProgressDone />;
}
