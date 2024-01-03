import React from "react";
import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import { BiTimeFive } from "react-icons/bi";
import Progress from "./Progress";

function Stats() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Heading title={"Statistics"} icon={<BiTimeFive size={24} />} />
        <SubHeading>
          <p>My statistics.</p>
        </SubHeading>
      </div>
      {/* <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {STATLISTS.map((stat) => (
          <StatCard
            key={stat.title}
            isi={stat.isi}
            title={stat.title}
            angka={stat.angka}
            angka_show={stat.angka_show}
          />
        ))}
      </div> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Progress />
      </div>
    </div>
  );
}

export default Stats;
