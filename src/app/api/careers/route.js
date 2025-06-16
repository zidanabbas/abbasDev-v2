import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: ambil semua data career
export async function GET() {
  try {
    const careers = await prisma.career.findMany();
    return NextResponse.json(careers, { status: 200 });
  } catch (error) {
    console.error("Error fetching career", error);
    return NextResponse.json(
      {
        error: "Failed to fetching Career",
      },
      {
        status: 500,
      }
    );
  }
}

// POST: buat karir baru
export async function POST(req) {
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
          error: "Missing required fields",
        },
        {
          status: 400,
        }
      );
    }

    const newCareer = await prisma.career.create({
      data: body,
    });
    return NextResponse.json(newCareer, {
      status: 200,
    });
  } catch (error) {
    console.error("Error creating career", error);
    return NextResponse.json(
      {
        error: "Failed to create career",
      },
      { status: 500 }
    );
  }
}
