import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  const { id } = await params;

  try {
    const certificate = await prisma.certificate.findUnique({
      where: { id: id },
    });

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(certificate, { status: 200 });
  } catch (error) {
    console.error(`Error fetching certificate with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch certificate" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = await params;
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
      !title &&
      !image &&
      !description &&
      !diberikan &&
      !berlaku &&
      !id_certificate &&
      !issuer &&
      !slug
    ) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    const updatedCertificate = await prisma.certificate.update({
      where: { id: id },
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
    return NextResponse.json(updatedCertificate, { status: 200 });
  } catch (error) {
    console.error(`Error updating certificate with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { error: "Slug already exists for another certificate." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update certificate" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = await params;
  try {
    await prisma.certificate.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Certificate deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting certificate with ID ${id}:`, error);
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete certificate" },
      { status: 500 }
    );
  }
}
