// src/app/api/careers/[id]/route.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Menggunakan path alias

// GET: Ambil karir berdasarkan ID
export async function GET(req, { params }) {
  const { id } = await params; // ID dari URL (string CUID)

  try {
    const career = await prisma.career.findUnique({
      where: { id: id },
    });

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error(`Error fetching career with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch career" },
      { status: 500 }
    );
  }
}

// PUT: Perbarui karir berdasarkan ID
export async function PUT(req, { params }) {
  const { id } = await params; // ID dari URL (string CUID)
  try {
    const body = await req.json();
    const { name, logo, link, location, date, during, profession } = body;

    // Validasi dasar: Setidaknya satu field harus disediakan untuk update
    if (
      !name &&
      !logo &&
      !link &&
      !location &&
      !date &&
      !during &&
      !profession
    ) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    const updatedCareer = await prisma.career.update({
      where: { id: id },
      data: {
        name,
        logo,
        link,
        location,
        date,
        during,
        profession,
      },
    });
    return NextResponse.json(updatedCareer, { status: 200 });
  } catch (error) {
    console.error(`Error updating career with ID ${id}:`, error);
    if (error.code === "P2025") {
      // Record not found
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update career" },
      { status: 500 }
    );
  }
}

// DELETE: Hapus karir berdasarkan ID
export async function DELETE(req, { params }) {
  const { id } = await params; // ID dari URL (string CUID)
  try {
    await prisma.career.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Career deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting career with ID ${id}:`, error);
    if (error.code === "P2025") {
      // Record not found
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete career" },
      { status: 500 }
    );
  }
}
