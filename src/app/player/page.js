import React from "react";
import DashedDivider from "@/components/elements/DashedDivider";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";

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
