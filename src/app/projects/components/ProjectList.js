"use client";
import ProjectCard from "./ProjectCard";
import DashedDivider from "@/components/elements/DashedDivider";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ProjectList } from "@/components/dataDummy/ProjectList";

const LazyprojectCard = dynamic(() => import("./ProjectCard"));

export default function ProjectsLists() {
  const filteredProjects = ProjectList.filter((project) => project?.is_show);

  if (filteredProjects.length === 0) {
    return <Heading title={"No Projects Found"} />;
  }

  return (
    <div className="">
      <div className="space-y-6">
        <div className="space-y-2">
          <Heading title="Projects" />
          <SubHeading>
            <p className="dark:text-neutral-400">
              Showcasing my passion for technology, design, and problem-solving
              through code.
            </p>
          </SubHeading>
        </div>
        <DashedDivider />
        <div className="grid sm:grid-cols-2  justify-center gap-5 mb-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard
                is_featured={project.is_featured}
                Index={index}
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tech_stack={project.tech_stack}
                slug={project.slug}
                link_demo={project.link_demo}
                link_github={project.link_github}
                tooltip={project.tooltip}
              />
              {/* <LazyprojectCard
                is_featured={project.is_featured}
                Index={index}
                key={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tech_stack={project.tech_stack}
                slug={project.slug}
              /> */}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
