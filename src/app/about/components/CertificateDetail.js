"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/elements/BackButton";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";

export default function CertificateDetail() {
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const _params = useParams();
  const { slug } = _params;

  useEffect(() => {
    const fetchCertificateBySlug = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`/api/certificates`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allCertificates = response.data;

        const foundCertificate = allCertificates.find(
          (cert) => cert.slug === slug
        );

        if (foundCertificate) {
          setCertificate(foundCertificate);
        } else {
          setError("Ceritifcate not found");
        }
      } catch (error) {
        console.error("Failed to fetch certificate details:", error);
        setError("Failed to load career data. Please try again later");
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchCertificateBySlug();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <BackButton href={"/about"} />
          <Heading title="Loading Certificate..." />
        </div>
        <div className="text-center py-10">Loading certificate details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <BackButton href={"/about"} />
          <Heading title="Error" />
        </div>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      {certificate && (
        <div className="space-y-6">
          <div className="space-y-2">
            <BackButton href={"/about"} />
            <Heading title={certificate.title} />
            <SubHeading>
              <p>{certificate.description}</p>
            </SubHeading>
            <p className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
              By{" "}
              <span className="hover:underline underline-offset-2">
                {certificate.issuer}
              </span>
            </p>
          </div>
          <div className="w-full px-4 md:px-6 lg:px-8 hover:scale-[1.02] transition-all ease-in-out duration-300">
            <Image
              src={certificate.image}
              alt={certificate.title}
              width={1000}
              height={1000}
              className="w-full"
            />
          </div>
          <div className="flex sm:justify-between sm:flex-row flex-col w-full gap-4 p-2">
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
              Awarded on {certificate.diberikan}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm font-medium">
              Valid until {certificate.berlaku}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
