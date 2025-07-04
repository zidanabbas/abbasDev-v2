import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const projectTechStacks = await prisma.projectTechStack.findMany({
      include: {
        project: true,
        techStack: true,
      },
    });
    return NextResponse.json(projectTechStacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching ProjectTechStacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch ProjectTechStacks" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { projectId, techStackId } = body;

    if (!projectId || !techStackId) {
      return NextResponse.json(
        { error: "Missing required fields: projectId and techStackId" },
        { status: 400 }
      );
    }

    const newProjectTechStack = await prisma.projectTechStack.create({
      data: {
        project: {
          connect: { id: parseInt(projectId) },
        },
        techStack: {
          connect: { id: techStackId },
        },
      },
    });

    return NextResponse.json(newProjectTechStack, { status: 201 });
  } catch (error) {
    console.error("Error creating ProjectTechStack:", error);

    if (
      error.code === "P2002" &&
      error.meta?.target?.includes("projectId") &&
      error.meta?.target?.includes("techStackId")
    ) {
      return NextResponse.json(
        { error: "This project is already linked to this tech stack." },
        { status: 409 }
      );
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Project or TechStack not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create ProjectTechStack" },
      { status: 500 }
    );
  }
}
