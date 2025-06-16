import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: ambil data berdasarkan ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const career = await prisma.career.findUnique({
      where: id,
    });
    if (!career) {
      return NextResponse.json(
        {
          error: "Career not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(career, { status: 200 });
  } catch (error) {
    console.error(`Error fetching data with ID: ${id}`, error);
    return NextResponse.json(
      {
        error: "Failed to fetch Career",
      },
      { status: 500 }
    );
  }
}

// PUT: perbarui career berdasarkan ID
export async function PUT(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const { name, logo, link, location, date, during, profession } = body;

    if (
      !name ||
      !logo ||
      !link ||
      !location ||
      !date ||
      !during ||
      !profession
    ) {
      return NextResponse.json(
        {
          error: "No fields to update provided",
        },
        { status: 400 }
      );
    }

    const updateCareer = await prisma.career.update({
      where: id,
      data: body,
    });
    return NextResponse.json(updateCareer, {
      status: 200,
    });
  } catch (error) {
    console.error(`Error updating career with ID: ${id}`, error);
    if (error.code === "P2002" && error.meta?.targer?.includes("slug")) {
      return NextResponse.json(
        {
          error: "Slug already exists for another career.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update career" },
      {
        status: 500,
      }
    );
  }
}

// Delete: hapus data berdasarkan ID
export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    await prisma.career.delete({
      where: id,
    });
    return NextResponse.json(
      {
        message: "Career deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting career with ID: ${id}`, error);
    if (error.code === "P2002") {
      return NextResponse.json(
        {
          error: "Career not found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        error: "Failed to delete career",
      },
      { status: 500 }
    );
  }
}
