import React from "react";
import ContainerAOS from "@/app/components/elements/ContainerAOS";
import RoadmapPage from "@/app/roadmap/components/Roadmap";
export const metadata = {
  title: "Roadmap | Abbas",
  description:
    "Learning path recomendation and free course playlist for software engineer.",
  keywords: "Roadmap , Nextjs Roadmap , Front End Roadmap",
  alternates: {
    canonical: `${process.env.DOMAIN}/roadmap`,
  },
};

function Roadmap() {
  return (
    <>
      <ContainerAOS>
        <RoadmapPage></RoadmapPage>
      </ContainerAOS>
    </>
  );
}

export default Roadmap;
