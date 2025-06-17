import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const education = await prisma.education.findUnique({
      where: { id: id },
    });

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    console.error(`Error fetching education with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
  try {
    const body = await req.json();
    const { title, logo, href, year, school, gtw, jurusan } = body;

    if (!title && !logo && !href && !year && !school && !gtw && !jurusan) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    const updatedEducation = await prisma.education.update({
      where: { id: id },
      data: {
        title,
        logo,
        href,
        year,
        school,
        gtw,
        jurusan,
      },
    });
    return NextResponse.json(updatedEducation, { status: 200 });
  } catch (error) {
    console.error(`Error updating education with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await prisma.education.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Education deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting education with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete education" },
      { status: 500 }
    );
  }
}
