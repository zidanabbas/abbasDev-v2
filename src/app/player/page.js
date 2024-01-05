import React from "react";
import DashedDivider from "@/app/components/elements/DashedDivider";
import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title="Player" />
        <SubHeading>
          <p>Fetch API from Spotify</p>
        </SubHeading>
      </div>
      <DashedDivider />
    </div>
  );
}
