import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
export default function Header() {
  return (
    <>
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading title="About" />
          <SubHeading>
            <p className="text-md dark:text-neutral-400">
              A short story of me, not important but seem better than nothing.
            </p>
          </SubHeading>
        </div>
        <div className="border-b border-dashed border-neutral-600 dark:border-neutral-500"></div>
        <p className="font-light text-md leading-7">
          A Frontend Developer with over 1 year of experience building
          responsive, fast, and high-performance web applications. I am highly
          skilled in modern technologies, including React.js, Next.js, Tailwind
          CSS, TypeScript, and Node.js. My expertise lies in translating design
          concepts into seamless web functionality, designing scalable web
          solutions, and integrating third-party APIs. I'm adept at delivering
          projects both independently and as a collaborative team member.
        </p>
      </div>
    </>
  );
}
