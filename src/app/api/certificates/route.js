import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany({
      orderBy: {
        title: "asc",
      },
    });
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      title,
      image,
      description,
      diberikan,
      berlaku,
      id_certificate,
      issuer,
      slug,
    } = body;

    if (
      !title ||
      !image ||
      !description ||
      !diberikan ||
      !berlaku ||
      !issuer ||
      !slug
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newCertificate = await prisma.certificate.create({
      data: {
        title,
        image,
        description,
        diberikan,
        berlaku,
        id_certificate,
        issuer,
        slug,
      },
    });
    return NextResponse.json(newCertificate, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { error: "Slug already exists. Please choose a different slug." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
