import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import EducationCard from "./EducationCard";
import { TbSchool } from "react-icons/tb";

export default function Education() {
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2 ">
          <Heading title="Education" icon={<TbSchool className="mr-1" />} />
          <SubHeading>
            <p>My educational journey.</p>
          </SubHeading>
        </div>
        <EducationCard />
      </div>
    </>
  );
}
