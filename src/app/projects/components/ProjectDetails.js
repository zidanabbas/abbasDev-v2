"use client";

import { useParams } from "next/navigation";
import { ProjectList } from "@/app/components/dataDummy/ProjectList";
import Heading from "@/app/components/elements/Heading";
import SubHeading from "@/app/components/elements/SubHeading";
import BackButton from "@/app/components/elements/BackButton";
import DashedDivider from "@/app/components/elements/DashedDivider";
import { SiGithub } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import Image from "next/image";

export default function ProjectDetail({ params }) {
  const _params = useParams();

  const project = ProjectList.find((project) => project.slug === _params.slug);

  return (
    <>
      <div className="h-screen">
        {project && (
          <div className="space-y-6 ">
            <div className="space-y-2">
              <BackButton href={"/projects"} />
              <Heading title={project.title} />
              <SubHeading>
                <p>{project.description}</p>
              </SubHeading>
            </div>
            <DashedDivider />
            <div className="space-y-2">
              <div className="flex md:justify-between md:flex-row flex-col space-y-6 md:space-y-0">
                <div className="flex  items-center gap-2 text-sm">
                  Tech Stack :
                  <div className="flex items-center  text-2xl gap-4">
                    {project.tech_stack.map((children) => {
                      return <>{children.icon}</>;
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={project.link_github}
                    className="flex items-center gap-2"
                  >
                    <SiGithub className="text-2xl" /> Source Code
                  </Link>{" "}
                  |{" "}
                  <Link
                    href={project.link_demo}
                    className="flex items-center gap-2"
                  >
                    <BiLinkExternal className="text-2xl" /> Demo
                  </Link>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                width={900}
                height={900}
                priority
                className="w-full hover:scale-105 scale-100 transition-all duration-300 ease-in-out"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
