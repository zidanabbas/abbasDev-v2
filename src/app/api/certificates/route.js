import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET : ambil semua data sertifikat
export async function GET() {
  try {
    const certificates = await prisma.certificate.findMany();
    return NextResponse.json(certificates, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fecth certificates",
      },
      {
        status: 500,
      }
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
      id_cerificates,
      by,
      slug,
    } = body;

    // Validasi input dasar
    if (
      !title ||
      !image ||
      !description ||
      !diberikan ||
      !berlaku ||
      !id_cerificates ||
      !by ||
      !slug
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

    const newCertificates = await prisma.certificate.create({
      data: {
        title,
        image,
        description,
        diberikan,
        berlaku,
        id_cerificates,
        by,
        slug,
      },
    });
    return NextResponse.json(newCertificates, {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating certificates", error);

    // Validasi error slug unik jika sudah ada
    if (error.code == "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        {
          error: "Slug already exists. Please choose a different slug.",
        },
        {
          status: 409,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Failed to create Ceritificates",
      },
      { status: 500 }
    );
  }
}
