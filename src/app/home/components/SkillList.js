import { HiCode } from "react-icons/hi";
import SkillCard from "./SkillCard";
import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import Stacks from "@/app/components/dataDummy/Stacks";
export default function SkillList() {
  return (
    <section className="space-y-6">
      <div className="space-y-2">
        <Heading title="Skills" icon={<HiCode className="mr-1" />} />
        <SubHeading>
          <p className="dark:text-neutral-400">My coding skills.</p>
        </SubHeading>
      </div>

      <div className="grid md:grid-cols-12 grid-cols-6 space-y-1">
        {Stacks.map((stack) => (
          <SkillCard key={stack.name} name={stack.name} icon={stack.icon} />
        ))}
      </div>
    </section>
  );
}
