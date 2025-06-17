"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // <-- Tambahkan import ini
import ProjectCard from "./ProjectCard";
import DashedDivider from "@/components/elements/DashedDivider";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
// import { ProjectList } from "@/components/dataDummy/ProjectList"; // Hapus atau nonaktifkan ini

export default function ProjectsLists() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        // Periksa response.status karena axios melempar error untuk status non-2xx
        const response = await axios.get("/api/projects");
        // Axios melempar error untuk status non-2xx, jadi tidak perlu `if (!response.ok)`
        const data = response.data; // Data from Axios is in response.data
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        // Perbaiki penanganan error axios jika perlu detail lebih lanjut dari error response
        if (axios.isAxiosError(err) && err.response) {
          setError(
            `Failed to load projects: ${err.response.status} ${err.response.statusText}`
          );
        } else {
          setError("Failed to load projects. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => project?.is_show);

  if (loading) {
    return (
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
        <div className="text-center py-10">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
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
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  if (filteredProjects.length === 0) {
    return (
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
        <Heading title="No Projects Found" />
      </div>
    );
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
        <div className="grid sm:grid-cols-2 justify-center gap-5 mb-10">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ProjectCard
                is_featured={project.is_featured}
                Index={index}
                image={project.image}
                title={project.title}
                description={project.description}
                tech_stack={project.tech_stack}
                slug={project.slug}
                link_demo={project.link_demo}
                link_github={project.link_github}
                tooltip={project.tooltip}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
