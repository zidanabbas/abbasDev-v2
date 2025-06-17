import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil semua tech stack
export async function GET() {
  try {
    const techStacks = await prisma.techStack.findMany();
    return NextResponse.json(techStacks, { status: 200 });
  } catch (error) {
    console.error("Error fetching tech stacks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tech stacks" },
      { status: 500 }
    );
  }
}

// POST: Buat tech stack baru
export async function POST(req) {
  try {
    const body = await req.json();
    const { title, iconName, iconType } = body;

    // Validasi input dasar
    if (!title || !iconName || !iconType) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Validasi iconType sesuai enum
    if (!["REACT_ICON", "IMAGE_URL"].includes(iconType)) {
      return NextResponse.json(
        { error: "Invalid iconType. Must be REACT_ICON or IMAGE_URL." },
        { status: 400 }
      );
    }

    const newTechStack = await prisma.techStack.create({
      data: {
        title,
        iconName,
        iconType,
      },
    });

    return NextResponse.json(newTechStack, { status: 201 });
  } catch (error) {
    console.error("Error creating tech stack:", error);
    return NextResponse.json(
      { error: "Failed to create tech stack" },
      { status: 500 }
    );
  }
}
