"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/elements/BackButton";
import Heading from "@/components/elements/Heading";
import SubHeading from "@/components/elements/SubHeading";
import DashedDivider from "@/components/elements/DashedDivider";
import { SiGithub } from "react-icons/si";
import { BiLinkExternal } from "react-icons/bi";
import Link from "next/link";
import { iconMapper } from "@/components/utils/iconMapper"; // Pastikan path ini benar

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const _params = useParams();
  const { slug } = _params;

  useEffect(() => {
    const fetchProjectBySlug = async () => {
      try {
        setLoading(true);
        setError(null);

        // Ambil semua proyek dari API
        const response = await axios.get("/api/projects");
        const allProjects = response.data;

        // Cari proyek yang sesuai berdasarkan slug
        const foundProject = allProjects.find((p) => p.slug === slug);

        if (foundProject) {
          setProject(foundProject);
        } else {
          setError("Project not found");
        }
      } catch (err) {
        console.error("Failed to fetch project details:", err);
        setError("Failed to load project data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchProjectBySlug();
  }, [slug]);

  if (loading) {
    return (
      <div className="space-y-6">
        <BackButton href={"/projects"} />
        <Heading title="Loading Project..." />
        <div className="text-center py-10">Loading project details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <BackButton href={"/projects"} />
        <Heading title="Error" />
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {project && (
        <>
          <div className="space-y-2">
            <BackButton href={"/projects"} />
            <Heading title={project.title} />
            <SubHeading>
              <p>{project.description}</p>
            </SubHeading>
          </div>

          <DashedDivider />

          <div className="flex md:justify-between md:flex-row flex-col space-y-6 md:space-y-0">
            <div className="flex items-center gap-2 text-sm">
              Tech Stack:
              <div className="flex items-center text-2xl gap-4">
                {/* PERBAIKAN 1: Gunakan project.tech_stack (dengan underscore) */}
                {/* PERBAIKAN 2: Gunakan tech.iconName alih-alih tech.icon */}
                {project.tech_stack?.map((tech, index) => (
                  <span key={index}>
                    {iconMapper[tech.iconName] || <span>{tech.title}</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={project.link_github}
                target="_blank"
                className="flex items-center gap-2"
              >
                <SiGithub className="text-2xl" />
                Source Code
              </Link>
              |
              <Link
                href={project.link_demo}
                target="_blank"
                className="flex items-center gap-2"
              >
                <BiLinkExternal className="text-2xl" />
                Demo
              </Link>
            </div>
          </div>

          <div className="overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              width={900}
              height={900}
              priority
              className="w-full hover:scale-105 transition-all duration-300 ease-in-out"
            />
          </div>
        </>
      )}
    </div>
  );
}
