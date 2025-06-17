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
          A proactive Front-End Developer with over 1 year of professional
          experience in web development, focusing on building responsive and
          performant applications. Skilled in using modern tools and frameworks
          including React.js, Next.js, Tailwind CSS, TypeScript, and Node.js.
          Adept at designing scalable web solutions and integrating third-party
          APIs. Proven ability to deliver projects both independently and as
          part of a team
        </p>
      </div>
    </>
  );
}
