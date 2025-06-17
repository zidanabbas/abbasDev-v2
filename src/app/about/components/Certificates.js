"use client";
import { useState, useEffect } from "react";
import { BiBarcode } from "react-icons/bi";
import axios from "axios";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import CertificatesCard from "@/app/about/components/CertificatesCard";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get("/api/certificates");
        if (!response.status === 200) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = response.data;
        setCertificates(data);
      } catch (err) {
        console.error("Failed to fetch certificates:", err);
        setError("Failed to load certificates. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading title="Certificates" icon={<BiBarcode className="mr-1" />} />
          <SubHeading>
            <p>My Current Certificates.</p>
          </SubHeading>
        </div>
        <div className="text-center py-10">
          tunggu sebentar yaa, lagi memuat data nih 😊
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading title="Certificates" icon={<BiBarcode className="mr-1" />} />
          <SubHeading>
            <p>My Current Certificates.</p>
          </SubHeading>
        </div>
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (certificates.length === 0) {
    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading title="Certificates" icon={<BiBarcode className="mr-1" />} />
          <SubHeading>
            <p>My Current Certificates.</p>
          </SubHeading>
        </div>
        <div className="text-center py-10 text-neutral-500 dark:text-neutral-400">
          No certificates found.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Certificates" icon={<BiBarcode className="mr-1" />} />
        <SubHeading>
          <p>My Current Certificates.</p>
        </SubHeading>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {certificates.map((item, index) => {
          return (
            <CertificatesCard
              key={item.id || index}
              berlaku={item.berlaku}
              diberikan={item.diberikan}
              description={item.description}
              image={item.image}
              slug={item.slug}
              title={item.title}
              id_certificate={item.id_certificate}
            />
          );
        })}
      </div>
    </div>
  );
}
