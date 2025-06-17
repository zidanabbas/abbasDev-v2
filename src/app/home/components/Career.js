"use client"; // Tambahkan ini karena kita akan menggunakan React Hooks

import { useState, useEffect } from "react";
import { BiBriefcaseAlt2 } from "react-icons/bi";
import Heading from "@/components/elements/Heading.js";
import SubHeading from "@/components/elements/SubHeading.js";
import Link from "next/link";
import Image from "next/image";

export default function Career() {
  const [careers, setCareers] = useState([]); // State untuk menyimpan data karir dari API
  const [loading, setLoading] = useState(true); // State untuk status loading
  const [error, setError] = useState(null); // State untuk error

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true); // Set loading ke true saat memulai fetch
        setError(null); // Reset error
        const response = await fetch("/api/careers"); // Panggil API karir Anda
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCareers(data); // Simpan data ke state
      } catch (err) {
        console.error("Failed to fetch careers:", err);
        setError("Failed to load career data. Please try again later."); // Set pesan error
      } finally {
        setLoading(false); // Set loading ke false setelah fetch selesai (berhasil atau gagal)
      }
    };

    fetchCareers(); // Panggil fungsi fetch saat komponen di-mount
  }, []); // Array dependensi kosong berarti efek ini hanya berjalan sekali saat mount

  // UI saat loading
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading
            icon={<BiBriefcaseAlt2 className="mr-1" />}
            title={"Career"}
          />
          <SubHeading>
            <p className="dark:text-neutral-400 text-md font-light">
              My professional career journey.
            </p>
          </SubHeading>
        </div>
        <div className="text-center py-10">
          tunggu sebentar yaa, lagi memuat data nih 😊.
        </div>
      </div>
    );
  }

  // UI saat error
  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading
            icon={<BiBriefcaseAlt2 className="mr-1" />}
            title={"Career"}
          />
          <SubHeading>
            <p className="dark:text-neutral-400 text-md font-light">
              My professional career journey.
            </p>
          </SubHeading>
        </div>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  // UI saat tidak ada data
  if (careers.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading
            icon={<BiBriefcaseAlt2 className="mr-1" />}
            title={"Career"}
          />
          <SubHeading>
            <p className="dark:text-neutral-400 text-md font-light">
              My professional career journey.
            </p>
          </SubHeading>
        </div>
        <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
          No career entries found.
        </div>
      </div>
    );
  }

  // UI saat data berhasil dimuat
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading icon={<BiBriefcaseAlt2 className="mr-1" />} title={"Career"} />
        <SubHeading>
          <p className="dark:text-neutral-400 text-md font-light">
            My professional career journey.
          </p>
        </SubHeading>
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          {careers.map(
            ({ id, name, link, logo, location, date, during, profession }) => {
              return (
                <div
                  key={id} // Gunakan 'id' dari API sebagai key yang unik
                  className="rounded-xl transition-all duration-300 shadow-sm lg:hover:shadow-md flex items-center gap-5 py-4 px-6 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800"
                >
                  <div className="bg-neutral-300 items-center dark:bg-neutral-600 rounded-full">
                    <Image
                      src={logo}
                      alt={name}
                      width={70}
                      height={70}
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex-col flex space-y-2">
                    <h1>{profession}</h1>
                    <div className="flex items-center gap-1 md:gap-2 text-xs mt-1">
                      {link ? ( // Tampilkan Link jika ada
                        <Link
                          href={link}
                          className="text-neutral-500 dark:text-neutral-400 underline underline-offset-2"
                          target="_blank"
                        >
                          {name}
                        </Link>
                      ) : (
                        // Jika tidak ada link, tampilkan nama saja
                        <p className="text-neutral-500 dark:text-neutral-400">
                          {name}
                        </p>
                      )}
                      <span className="text-neutral-500 dark:text-neutral-400">
                        •
                      </span>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        {location}
                      </p>
                    </div>
                    <div className="text-xs space-y-1">
                      <p className="text-neutral-500 dark:text-neutral-400">
                        {date}
                      </p>
                      <p className="text-neutral-500 dark:text-neutral-400">
                        {during}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
