import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const careers = await prisma.career.findMany({
      orderBy: {
        date: "desc",
      },
    });
    return NextResponse.json(careers, { status: 200 });
  } catch (error) {
    console.error("Error fetching careers:", error);
    return NextResponse.json(
      { error: "Failed to fetch careers" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, logo, link, location, date, during, profession } = body;

    if (!name || !logo || !location || !date || !during || !profession) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCareer = await prisma.career.create({
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
    return NextResponse.json(newCareer, { status: 201 });
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}
