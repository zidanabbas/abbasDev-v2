import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const projectTechStack = await prisma.projectTechStack.findUnique({
      where: { id: id },
      include: {
        project: true,
        techStack: true,
      },
    });

    if (!projectTechStack) {
      return NextResponse.json(
        { error: "ProjectTechStack relation not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(projectTechStack, { status: 200 });
  } catch (error) {
    console.error(`Error fetching ProjectTechStack with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch ProjectTechStack relation" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await prisma.projectTechStack.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "ProjectTechStack relation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting ProjectTechStack with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "ProjectTechStack relation not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete ProjectTechStack relation" },
      { status: 500 }
    );
  }
}
