import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const educationList = await prisma.education.findMany({
      orderBy: {
        year: "asc",
      },
    });
    return NextResponse.json(educationList, { status: 200 });
  } catch (error) {
    console.error("Error fetching education list:", error);
    return NextResponse.json(
      { error: "Failed to fetch education list" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, logo, href, year, school, gtw, jurusan } = body;

    if (!title || !logo || !year || !school || !jurusan) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newEducation = await prisma.education.create({
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
    return NextResponse.json(newEducation, { status: 201 });
  } catch (error) {
    console.error("Error creating education entry:", error);
    return NextResponse.json(
      { error: "Failed to create education entry" },
      { status: 500 }
    );
  }
}
