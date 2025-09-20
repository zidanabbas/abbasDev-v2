import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";

function Header() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Heading title={"Dashboard"} />
        <SubHeading>
          <p>My personal Dashboard</p>
        </SubHeading>
      </div>
    </div>
  );
}

export default Header;
