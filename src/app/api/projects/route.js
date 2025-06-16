import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: ambil semua data projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetching projects",
      },
      { status: 500 }
    );
  }
}

// POST: tambah data projects
export async function POST(req) {
  const body = req.json();
  const {
    title,
    description,
    slug,
    link_demo,
    link_github,
    image,
    is_show,
    is_featured,
    aos_delay,
    params_slug,
  } = body;

  if (
    !title ||
    !description ||
    !slug ||
    !link_demo ||
    !link_github ||
    !image ||
    !is_show ||
    !is_featured ||
    !aos_delay ||
    !params_slug
  ) {
    return NextResponse.json(
      {
        error: "Missing required fields",
      },
      { status: 400 }
    );
  }

  const newProject = await prisma.project.create({
    data: {
      title,
      description,
      slug,
      link_demo,
      link_github,
      image,
      is_show,
      is_featured,
      aos_delay,
      params_slug,
    },
  });
  return NextResponse.json(newProject, { status: 201 });
}
