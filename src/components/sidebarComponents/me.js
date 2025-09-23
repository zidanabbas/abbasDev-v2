"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Verified from "@/components/elements/Verified.js";
import Status from "@/components/elements/Status.js";
import useHasMounted from "@/components/hooks/useHasMounted.js";

export default function Me({ activeProps }) {
  const mounted = useHasMounted();
  const [isOpen, setIsOpen] = useState(false);

  if (!mounted) return null;

  return (
    <>
      <div className="self-center md:self-auto ">
        <div className="rounded-lg hidden md:flex relative">
          <Status />
          <div className="dark:brightness-50 brightness-[0.96] relative w-full h-24 overflow-hidden rounded-xl">
            <Image
              src="https://res.cloudinary.com/dlshk9mf6/image/upload/v1748841208/abbas-gallery/bg-wave.jpg"
              width={640}
              height={480}
              alt="bgprofile"
              priority
              className="w-full rounded-xl scale-125 object-cover"
            />
          </div>
        </div>

        <div
          className={`flex md:flex-col ${
            activeProps ? "flex-col" : "flex-row  items-center"
          } md:justify-center md:items-center gap-2 md:gap-0 transition-all duration-1000 ease-in-out`}
        >
          <motion.div
            className="md:-mt-12 mt-0 shadow-md md:border-2 md:z-10 z-0 md:border-white dark:md:border-dark border-transparent  w-fit rounded-full overflow-hidden cursor-pointer"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            onClick={() => setIsOpen(true)} // <-- klik buka modal
          >
            <motion.div
              initial={{ filter: "blur(20px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="rounded-full overflow-hidden"
            >
              <Image
                src="https://res.cloudinary.com/dlshk9mf6/image/upload/v1758620436/abbas-gallery/IMG_9600_mke8tb.jpg"
                loading="lazy"
                width={90}
                height={90}
                alt="me"
                className={`rounded-full object-cover transition-all duration-300 delay-50 ease-linear md:w-[90px] md:h-[90px] ${
                  activeProps ? "w-[80px] h-[80px]" : "w-[40px] h-[40px]"
                }`}
              />
            </motion.div>
          </motion.div>

          <div className="md:mt-4 mt-2 text-xl font-semibold flex justify-center items-center gap-2">
            <h1 className="md:text-xl text-lg">zidane abbas</h1>
            <Verified />
          </div>

          <p className="text-sm text-neutral-700 dark:text-neutral-500 hidden md:flex">
            @hi.abbas
          </p>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)} // klik luar modal close
          >
            <motion.div
              className="relative bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-xl max-w-lg w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} 
            >
              <Image
                src="https://res.cloudinary.com/dlshk9mf6/image/upload/v1758620436/abbas-gallery/IMG_9600_mke8tb.jpg"
                width={600}
                height={600}
                alt="preview"
                className="w-full h-auto object-contain"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
