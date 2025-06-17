import React from "react";
import ContainerAOS from "@/components/elements/ContainerAOS";
import DashedDivider from "@/components/elements/DashedDivider";
import { Divider } from "@nextui-org/react";
import Header from "../dashboard/components/Header";
import GithubHeader from "../dashboard/components/GithubHeader";
import Spotify from "../dashboard/components/spotify/index";
import Stats from "../dashboard/components/stats/Stat";

export const metadata = {
  title: "Dashboard | Abbas",
  description:
    "this is a personal dashboard built with Next.js API routes deployed as serverless functions.",
  keywords: "Next.js , API routes, Dashboard API, Routes Serverless, Functions",
  alternates: {
    canonical: `${process.env.DOMAIN}/dashboard`,
  },
};

export default function Dashboard() {
  return (
    <>
      <ContainerAOS>
        <div className="h-full">
          <Header />
          <DashedDivider />
          <Stats />
          <Divider className="my-6" />
          <GithubHeader />
          <Divider className="my-6" />
          <Spotify />
        </div>
      </ContainerAOS>
    </>
  );
}
