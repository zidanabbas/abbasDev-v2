import React from "react";
import ContainerAOS from "@/components/elements/ContainerAOS";
import DashedDivider from "@/components/elements/DashedDivider";
import HeaderContent from "@/components/atoms/HeaderContent";
import { motion } from "framer-motion";
import FormContact from "./FormContact";

export const metadata = {
  title: "Contact | Abbas",
  description:
    "Get in touch with Abbas. Contact us for inquiries, support, or collaboration opportunities.",
  keywords: "Next.js , API routes, Dashboard API, Routes Serverless, Functions",
  alternates: {
    canonical: `${process.env.DOMAIN}/dashboard`,
  },
};

export default function ContactPage() {
  return (
    <ContainerAOS>
      <HeaderContent
        title={"Let's get in touch"}
        description={
          "Interested in working together or have a job offer? Contact me for job opportunities, collaborations, or exciting project discussions."
        }
      />
      <div className="h-full">
        <DashedDivider />
        <FormContact />
      </div>
    </ContainerAOS>
  );
}
