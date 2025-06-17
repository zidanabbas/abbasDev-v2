import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const transformProjectData = (project) => {
  const tech_stack = project.techStacks.map((pts) => ({
    id: pts.techStack.id,
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

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    const transformedProjects = projects.map((project) =>
      transformProjectData(project)
    );

    return NextResponse.json(transformedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
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
      params,
      tech_stack,
    } = body;

    if (
      !title ||
      !description ||
      !slug ||
      !link_demo ||
      !link_github ||
      !image ||
      !params ||
      !params.slug
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields (title, description, slug, link_demo, link_github, image, params.slug)",
        },
        { status: 400 }
      );
    }

    const params_slug = params.slug;

    let techStackIdsToConnect = [];
    if (tech_stack && tech_stack.length > 0) {
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
              `TechStack with title '${item.title}' not found. It will not be linked.`
            );

            return NextResponse.json(
              { error: `TechStack '${item.title}' not found.` },
              { status: 400 }
            );
          }
        }
      }
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        slug,
        link_demo,
        link_github,
        image,
        is_show: is_show ?? false,
        is_featured: is_featured ?? false,
        aos_delay: aos_delay ?? 0,
        params_slug,
        ...(techStackIdsToConnect.length > 0 && {
          techStacks: {
            create: techStackIdsToConnect.map((techStackId) => ({
              techStack: {
                connect: { id: techStackId },
              },
            })),
          },
        }),
      },
    });

    const createdProjectWithRelations = await prisma.project.findUnique({
      where: { id: newProject.id },
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });

    const transformedNewProject = transformProjectData(
      createdProjectWithRelations
    );
    return NextResponse.json(transformedNewProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { error: "Slug already exists. Please choose a different slug." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
