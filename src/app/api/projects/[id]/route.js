import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Fungsi bantuan untuk transformasi data proyek
// Ini sama dengan logika transformasi di GET /api/projects/route.js
const transformProjectData = (project) => {
  const tech_stack = project.techStacks.map((pts) => ({
    title: pts.techStack.title,
    iconName: pts.techStack.iconName,
    iconType: pts.techStack.iconType,
  }));

  const tooltip = tech_stack.map((ts) => ts.title);

  return {
    id: project.id,
    title: project.title,
    description: project.description,
    slug: project.slug,
    link_demo: project.link_demo,
    link_github: project.link_github,
    tech_stack: tech_stack,
    tooltip: tooltip,
    aos_delay: project.aos_delay,
    image: project.image,
    is_show: project.is_show,
    is_featured: project.is_featured,
    params: {
      slug: project.params_slug,
    },
  };
};

// GET: Ambil proyek berdasarkan ID
export async function GET(req, { params }) {
  const { id } = await params; // ID dari URL adalah String (CUID)

  try {
    const project = await prisma.project.findUnique({
      where: { id: id },
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Transformasi data agar sesuai dengan format dummy
    const transformedProject = transformProjectData(project);
    return NextResponse.json(transformedProject, { status: 200 });
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT: Perbarui proyek berdasarkan ID
export async function PUT(req, { params }) {
  const { id } = await params; // ID dari URL adalah String (CUID)
  try {
    const body = await req.json();
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
      params: incomingParams, // Menerima objek params
      tech_stack, // Menerima array objek tech_stack
    } = body;

    // Validasi dasar: Setidaknya satu field harus disediakan untuk update
    if (
      !title &&
      !description &&
      !slug &&
      !link_demo &&
      !link_github &&
      !image &&
      typeof is_show === "undefined" &&
      typeof is_featured === "undefined" &&
      typeof aos_delay === "undefined" &&
      !incomingParams &&
      !tech_stack
    ) {
      return NextResponse.json(
        { error: "No fields to update provided" },
        { status: 400 }
      );
    }

    // Siapkan data untuk update Prisma
    const dataToUpdate = {};
    if (title) dataToUpdate.title = title;
    if (description) dataToUpdate.description = description;
    if (slug) dataToUpdate.slug = slug;
    if (link_demo) dataToUpdate.link_demo = link_demo;
    if (link_github) dataToUpdate.link_github = link_github;
    if (image) dataToUpdate.image = image;
    if (typeof is_show !== "undefined") dataToUpdate.is_show = is_show;
    if (typeof is_featured !== "undefined")
      dataToUpdate.is_featured = is_featured;
    if (typeof aos_delay !== "undefined") dataToUpdate.aos_delay = aos_delay;
    if (incomingParams && incomingParams.slug)
      dataToUpdate.params_slug = incomingParams.slug;

    // Proses tech_stack untuk update relasi many-to-many
    if (tech_stack) {
      // Hanya update jika tech_stack disediakan di body
      // Hapus relasi ProjectTechStack yang ada untuk proyek ini terlebih dahulu
      await prisma.projectTechStack.deleteMany({
        where: { projectId: id },
      });

      let techStackIdsToConnect = [];
      if (tech_stack.length > 0) {
        // Ambil semua tech stack dari DB sekali untuk performa
        const allTechStacks = await prisma.techStack.findMany({
          select: { id: true, title: true },
        });
        const techStackMap = new Map(
          allTechStacks.map((ts) => [ts.title, ts.id])
        );

        for (const item of tech_stack) {
          if (item.title) {
            const techStackId = techStackMap.get(item.title);
            if (techStackId) {
              techStackIdsToConnect.push(techStackId);
            } else {
              console.warn(
                `TechStack with title '${item.title}' not found during update. It will not be linked.`
              );
            }
          }
        }
      }

      // Buat relasi baru
      dataToUpdate.techStacks = {
        create: techStackIdsToConnect.map((techStackId) => ({
          techStack: {
            connect: { id: techStackId },
          },
        })),
      };
    }

    const updatedProject = await prisma.project.update({
      where: { id: id },
      data: dataToUpdate,
    });

    // Ambil proyek yang diperbarui dengan relasi untuk respons
    const updatedProjectWithRelations = await prisma.project.findUnique({
      where: { id: updatedProject.id },
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });

    // Transformasi respons agar sesuai dengan format dummy
    const transformedUpdatedProject = transformProjectData(
      updatedProjectWithRelations
    );
    return NextResponse.json(transformedUpdatedProject, { status: 200 });
  } catch (error) {
    console.error(`Error updating project with ID ${id}:`, error);
    if (error.code === "P2025") {
      // Record not found
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      // Slug conflict
      return NextResponse.json(
        { error: "Slug already exists for another project." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE: Hapus proyek berdasarkan ID
export async function DELETE(req, { params }) {
  const { id } = await params; // ID dari URL adalah String (CUID)
  try {
    // Karena onDelete: Cascade sudah diatur di schema.prisma
    // pada relasi ProjectTechStack, kita hanya perlu menghapus Project.
    // Relasi yang terhubung akan otomatis dihapus oleh database.
    await prisma.project.delete({
      where: { id: id },
    });
    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`Error deleting project with ID ${id}:`, error);
    if (error.code === "P2025") {
      // Record not found
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    // Jika masih ada error P2003 (Foreign Key constraint),
    // artinya onDelete: Cascade belum aktif atau ada relasi lain yang menghalangi.
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error:
            "Cannot delete project due to existing relations. Ensure onDelete: Cascade is configured correctly or delete related entries first.",
        },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
