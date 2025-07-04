"use client";
import useHasMounted from "@/components/hooks/useHasMounted";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Edulist } from "../../../components/dataDummy/Edulist";

export default function EducationCard() {
  const mounted = useHasMounted();

  if (!mounted) return null;
  return (
    <>
      {Edulist.map((item, Index) => {
        return (
          <div
            key={Index}
            className="rounded-xl transition-all duration-300 shadow-sm lg:hover:shadow-md flex items-center gap-5 py-4 px-6 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800"
          >
            <motion.div
              initial={{ filter: "blur(20px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className=""
            >
              <div style={{ position: "relative", width: 60, height: 60 }}>
                <Image
                  src={item.logo}
                  fill
                  alt={item.title}
                  style={{ objectFit: "contain" }}
                  sizes="60px"
                />
              </div>
            </motion.div>
            <div className="flex flex-col space-y-2">
              <Link
                href={item.href}
                target="_blank"
                className="md:text-md text-sm font-medium"
              >
                {item.title}
              </Link>
              <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-2 font-light text-sm text-neutral-500 dark:text-neutral-300">
                <h1>{item.school}</h1>
                <span className="lg:flex hidden">{item.gtw}</span>
                <h1 className="lg:mt-0 mt-1">{item.jurusan}</h1>
              </div>
              <h1 className="font-light text-sm text-neutral-500 dark:text-neutral-300">
                {item.year}
              </h1>
            </div>
          </div>
        );
      })}
    </>
  );
}
