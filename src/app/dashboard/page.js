import React from "react";
import ContainerAOS from "@/app/components/elements/ContainerAOS";
import DashedDivider from "@/app/components/elements/DashedDivider";
import { Divider } from "@nextui-org/react";

export const metadata = {
  title: "Dashboard | Abbas",
  description:
    "this is a personal dashboard built with Next.js API routes deployed as serverless functions.",
  keywords: "Next.js , API routes, Dashboard API, Routes Serverless, Functions",
};

export default function Dashboard() {
  return (
    <>
      <ContainerAOS>
        <div className="h-full"></div>
      </ContainerAOS>
    </>
  );
}
