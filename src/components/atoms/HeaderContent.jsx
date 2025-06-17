import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";

function HeaderContent({ title, description }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title={title} />
        <SubHeading>
          <p>{description}</p>
        </SubHeading>
      </div>
    </div>
  );
}

export default HeaderContent;
