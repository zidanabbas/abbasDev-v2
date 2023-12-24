import Link from "next/link";
import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import { BiRocket } from "react-icons/bi";

export default function ContactCard() {
  return (
    <div className="space-y-6">
      <Heading title={"What I've Been Working On"} />
      <SubHeading>
        <p>
          I assist brands, companies, institutions, and startups in creating
          exceptional digital experiences for their businesses through strategic
          development services.
        </p>
      </SubHeading>
      <div className="rounded-xl transition-all duration-300 flex items-center gap-5 p-8 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-800">
        <div className="space-y-6">
          <div className="flex gap-2 items-center">
            <BiRocket size={26} />
            <p className="md:text-xl text-lg">Lets work together!</p>
          </div>
          <div>
            <p className="font-light">
              I'm open for freelance projects, feel free to email me to see how
              can we collaborate.
            </p>
          </div>
          <div>
            <Link
              href="/contact"
              className="py-2 px-4 bg-neutral-600 hover:bg-neutral-700 text-neutral-200 rounded-lg "
            >
              Contact Me
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
