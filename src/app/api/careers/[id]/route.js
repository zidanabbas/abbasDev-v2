import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { calculateDuration } from "@/utils/calculateDuration";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const career = await prisma.career.findUnique({
      where: { id },
    });

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        ...career,
        duration: calculateDuration(career.startDate, career.endDate),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching career:", error);
    return NextResponse.json(
      { error: "Failed to fetch career" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, logo, link, location, startDate, endDate, profession } = body;

    if (!name || !logo || !location || !startDate || !profession) {
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
        startDate,
        endDate,
        profession,
      },
    });

    return NextResponse.json(
      {
        ...newCareer,
        duration: calculateDuration(newCareer.startDate, newCareer.endDate),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating career:", error);
    return NextResponse.json(
      { error: "Failed to create career" },
      { status: 500 }
    );
  }
}
