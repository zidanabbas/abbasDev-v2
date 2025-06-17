// app/api/projecttechstacks/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Sesuaikan path jika berbeda

// GET: Ambil relasi ProjectTechStack berdasarkan ID (ID dari tabel penghubung itu sendiri)
export async function GET(req, { params }) {
  const { id } = await params; // ID dari URL (e.g., /api/projecttechstacks/clx1abcde...)

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

// DELETE: Hapus relasi ProjectTechStack berdasarkan ID (ID dari tabel penghubung itu sendiri)
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
      // Record not found
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
