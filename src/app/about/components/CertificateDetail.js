"use client";

import BackButton from "@/components/elements/BackButton";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import { CertificatesList } from "@/components/dataDummy/CertificatesList.js";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CertificateDetail() {
  const _params = useParams();

  const ceritificate = CertificatesList.find((ceritificate) => {
    return ceritificate.slug === _params.slug;
  });

  return (
    <div>
      {ceritificate && (
        <div className="space-y-6">
          <div className="space-y-2">
            <BackButton href={"/about"} />
            <Heading title={ceritificate.title} />
            <SubHeading>
              <p>{ceritificate.description}</p>
            </SubHeading>
            <p className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              By{" "}
              <span className="hover:underline underline-offset-2">
                {ceritificate.by}
              </span>
            </p>
          </div>
          <div className="w-full px-4 md:px-6 lg:px-8 hover:scale-[1.02] transition-all ease-in-out duration-300">
            <Image
              src={ceritificate.image}
              alt={ceritificate.title}
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
          <div className="flex sm:justify-between sm:flex-row flex-col w-full gap-4 p-2">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
              Awarded on {ceritificate.diberikan}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
              Valid until {ceritificate.berlaku}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
