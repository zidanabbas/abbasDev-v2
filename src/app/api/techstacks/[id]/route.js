import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil tech stack berdasarkan ID
export async function GET(req, { params }) {
  const { id } = await params; // ID dari URL (e.g., /api/techstacks/clx1abcde...)

  try {
    const techStack = await prisma.techStack.findUnique({
      where: { id: id },
    });

    if (!techStack) {
      return NextResponse.json(
        { error: "TechStack not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(techStack, { status: 200 });
  } catch (error) {
    console.error(`Error fetching tech stack with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch tech stack" },
      { status: 500 }
    );
  }
}

// PUT: Perbarui tech stack berdasarkan ID
export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, iconName, iconType } = body;

    // Validasi input dasar
    if (!title && !iconName && !iconType) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }
    // Validasi iconType jika disediakan
    if (iconType && !["REACT_ICON", "IMAGE_URL"].includes(iconType)) {
      return NextResponse.json(
        { error: "Invalid iconType. Must be REACT_ICON or IMAGE_URL." },
        { status: 400 }
      );
    }

    const updatedTechStack = await prisma.techStack.update({
      where: { id: id },
      data: {
        title,
        iconName,
        iconType,
      },
    });

    return NextResponse.json(updatedTechStack, { status: 200 });
  } catch (error) {
    console.error(`Error updating tech stack with ID ${id}:`, error);
    if (error.code === "P2025") {
      // Record not found
      return NextResponse.json(
        { error: "TechStack not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update tech stack" },
      { status: 500 }
    );
  }
}

// DELETE: Hapus tech stack berdasarkan ID
export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    // Perhatian: Jika ada ProjectTechStack yang terhubung, ini akan gagal
    // Anda mungkin perlu menghapus ProjectTechStack terkait terlebih dahulu
    // atau mengatur relasi CASCADE DELETE di schema.prisma
    await prisma.techStack.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "TechStack deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting tech stack with ID ${id}:`, error);
    if (error.code === "P2025") {
      // Record not found
      return NextResponse.json(
        { error: "TechStack not found" },
        { status: 404 }
      );
    }
    // Tangani error jika ada relasi yang masih terhubung (Foreign Key Constraint)
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Cannot delete TechStack because it is linked to existing projects.",
        },
        { status: 409 } // Conflict
      );
    }
    return NextResponse.json(
      { error: "Failed to delete tech stack" },
      { status: 500 }
    );
  }
}
