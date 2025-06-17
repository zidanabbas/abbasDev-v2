"use client";

import useHasMounted from "@/components/hooks/useHasMounted";
import { BiPin, BiRightArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { iconMapper } from "@/components/utils/iconMapper"; // Pastikan path ini benar

export default function ProjectCard({
  is_featured,
  slug,
  image,
  title,
  description,
  tech_stack, // Ini adalah array objek tech stack dari API
  tooltip,
  Index, // Index mungkin tidak diperlukan jika Anda menggunakan project.id untuk key di parent
}) {
  const mounted = useHasMounted();
  if (!mounted) return null;

  return (
    <div>
      {/* Menggunakan key Index untuk Link mungkin tidak ideal, tapi ini hanya sebuah container */}
      <Link key={Index} href={`/projects/${slug}`}>
        <div className="rounded-xl transition-all duration-300 shadow-sm lg:hover:shadow-md relative border dark:bg-neutral-800 border-neutral-200 dark:border-neutral-800 lg:hover:scale-[102%] h-full cursor-pointer group">
          {is_featured && (
            <div className="rounded-tr-xl rounded-bl-xl bg-green-400 px-2 py-1 right-0 absolute text-xs text-center z-[2] text-neutral-700">
              <div className="flex gap-1 items-center">
                <BiPin size={18} className="rotate-[20deg]" /> Featured
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <div className="h-48 overflow-hidden w-auto rounded-t-xl">
              <motion.div
                initial={{ filter: "blur(20px)" }}
                animate={{ filter: "blur(0px)" }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="relative"
              >
                <div className="absolute hidden left-0 right-0 top-0 bottom-0 z-[2] group-hover:flex items-center justify-center group-hover:bg-neutral-900/70 text-white transition-all duration-300 ease-in-out">
                  <h1>View Project</h1>
                  <BiRightArrowAlt size={18} />
                </div>
                <Image
                  src={image}
                  alt={title}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="rounded-t-xl w-full "
                ></Image>
              </motion.div>
            </div>
            <div className="px-5 py-6 space-y-3 ">
              <h1 className="text-xl group-hover:text-teal-500">{title}</h1>
              <p className="line-clamp-2 text-sm">{description}</p>
              <div className="flex gap-2 pt-2">
                {/* PERBAIKAN 1: Gunakan tech.id sebagai key yang unik dan stabil */}
                {/* PERBAIKAN 2: Gunakan tech.iconName untuk memetakan ke komponen ikon */}
                {tech_stack?.map(
                  (
                    tech // Gunakan 'tech' sebagai nama parameter
                  ) => (
                    <span key={tech.id}>
                      {" "}
                      {/* Menggunakan tech.id sebagai key */}
                      {iconMapper[tech.iconName] || <span>{tech.title}</span>}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
