"use client";
import React from "react";
import DashedDivider from "@/app/components/elements/DashedDivider";
import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import useIsMobile from "@/app/components/hooks/useIsMobile";
import CourseList from "./CourseList";

function RoadmapPage() {
  const isMobile = useIsMobile();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Roadmap" />
        <SubHeading>
          <p>My journey of learning.</p>
          <p className="text-xs">
            Click on the {isMobile ? "ID/EN" : "Indonesia/English"} Button
          </p>
        </SubHeading>
      </div>
      <DashedDivider />
      <CourseList />
    </div>
  );
}

export default RoadmapPage;
