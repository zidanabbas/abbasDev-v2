import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import Verified from "@/components/elements/Verified.js";
import Status from "@/components/elements/Status.js";
import useHasMounted from "@/components/hooks/useHasMounted.js";

export default function Me({ activeProps }) {
  const mounted = useHasMounted();

  if (!mounted) return null;

  return (
    <>
      <div className="self-center md:self-auto ">
        <div className=" rounded-lg hidden md:flex relative">
          <Status />
          <div className="dark:brightness-50 brightness-[0.96] relative w-full h-24 overflow-hidden rounded-xl">
            <Image
              src="https://res.cloudinary.com/dlshk9mf6/image/upload/v1748841208/abbas-gallery/bg-wave.jpg"
              width={640}
              height={480}
              alt="bgprofile"
              priority
              className="w-full rounded-xl aspect-auto scale-125"
            ></Image>
          </div>
        </div>

        <div
          className={`flex md:flex-col ${
            activeProps ? "flex-col" : "flex-row  items-center"
          } md:justify-center md:items-center gap-2 md:gap-0 transition-all duration-1000 ease-in-out`}
        >
          <motion.div
            className="md:-mt-12 mt-0 shadow-md md:border-2 md:z-10 z-0 md:border-white dark:md:border-dark border-transparent  w-fit rounded-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.div
              initial={{ filter: "blur(20px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.5 }}
              className="rounded-full overflow-hidden "
            >
              <Image
                src="https://res.cloudinary.com/dlshk9mf6/image/upload/v1748840542/abbas-gallery/foto-profil.jpg"
                loading="lazy"
                width={90}
                height={90}
                alt="me"
                className={`rounded-full scale-110 aspect-square transition-all duration-300  delay-50 ease-linear md:w-[90px]  md:h-[90px]  ${
                  activeProps ? "w-[80px] h-[80px] " : "h-[40px] w-[40px]"
                } `}
              ></Image>
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
    </>
  );
}
