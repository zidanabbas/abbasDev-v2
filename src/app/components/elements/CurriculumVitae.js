import React from "react";
import Link from "next/link";
import { LuDownloadCloud } from "react-icons/lu";

export default function CurriculumVitae() {
  return (
    <>
      <Link
        href="/cv/CV_TranskipNilai_Ijazah_Zidane_Abbas.pdf"
        target="_blank"
        aria-label="curriculum-vitae"
        download={"CV_TranskipNilai_Ijazah_Zidane_Abbas.pdf"}
      >
        <LuDownloadCloud size={24} className="text-3xl" />
      </Link>
    </>
  );
}
