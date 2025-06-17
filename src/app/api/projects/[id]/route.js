import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const transformProjectData = (project) => {
  const tech_stack = project.techStacks.map((pts) => ({
    title: pts.techStack.title,
    iconName: pts.techStack.iconName,
    iconType: pts.techStack.iconType,
  }));

  const tooltip = tech_stack.map((ts) => ts.title);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    slug: project.slug,
    link_demo: project.link_demo,
    link_github: project.link_github,
    tech_stack: tech_stack,
    tooltip: tooltip,
    aos_delay: project.aos_delay,
    image: project.image,
    is_show: project.is_show,
    is_featured: project.is_featured,
    params: {
      slug: project.params_slug,
    },
  };
};

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const project = await prisma.project.findUnique({
      where: { id: id },
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const transformedProject = transformProjectData(project);
    return NextResponse.json(transformedProject, { status: 200 });
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const {
      title,
      description,
      slug,
      link_demo,
      link_github,
      image,
      is_show,
      is_featured,
      aos_delay,
      params: incomingParams,
      tech_stack,
    } = body;

    if (
      !title &&
      !description &&
      !slug &&
      !link_demo &&
      !link_github &&
      !image &&
      typeof is_show === "undefined" &&
      typeof is_featured === "undefined" &&
      typeof aos_delay === "undefined" &&
      !incomingParams &&
      !tech_stack
    ) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (description) dataToUpdate.description = description;
    if (slug) dataToUpdate.slug = slug;
    if (link_demo) dataToUpdate.link_demo = link_demo;
    if (link_github) dataToUpdate.link_github = link_github;
    if (image) dataToUpdate.image = image;
    if (typeof is_show !== "undefined") dataToUpdate.is_show = is_show;
    if (typeof is_featured !== "undefined")
      dataToUpdate.is_featured = is_featured;
    if (typeof aos_delay !== "undefined") dataToUpdate.aos_delay = aos_delay;
    if (incomingParams && incomingParams.slug)
      dataToUpdate.params_slug = incomingParams.slug;

    if (tech_stack) {
      await prisma.projectTechStack.deleteMany({
        where: { projectId: id },
      });

      let techStackIdsToConnect = [];
      if (tech_stack.length > 0) {
        const allTechStacks = await prisma.techStack.findMany({
          select: { id: true, title: true },
        });
        const techStackMap = new Map(
          allTechStacks.map((ts) => [ts.title, ts.id])
        );

        for (const item of tech_stack) {
          if (item.title) {
            const techStackId = techStackMap.get(item.title);
            if (techStackId) {
              techStackIdsToConnect.push(techStackId);
            } else {
              console.warn(
                `TechStack with title '${item.title}' not found during update. It will not be linked.`
              );
            }
          }
        }
      }

      dataToUpdate.techStacks = {
        create: techStackIdsToConnect.map((techStackId) => ({
          techStack: {
            connect: { id: techStackId },
          },
        })),
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: dataToUpdate,
    });

    const updatedProjectWithRelations = await prisma.project.findUnique({
      where: { id: updatedProject.id },
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });

    const transformedUpdatedProject = transformProjectData(
      updatedProjectWithRelations
    );
    return NextResponse.json(transformedUpdatedProject, { status: 200 });
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { error: "Slug already exists for another project." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await prisma.project.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Cannot delete project due to existing relations. Ensure onDelete: Cascade is configured correctly or delete related entries first.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
