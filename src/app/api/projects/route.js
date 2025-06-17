import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET: Ambil semua proyek dengan format sesuai dummy data
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        techStacks: {
          // Ini adalah tabel penghubung
          include: {
            techStack: true, // Sertakan detail TechStack terkait
          },
        },
      },
      orderBy: {
        id: "asc", // Urutkan berdasarkan ID agar konsisten, sesuaikan jika perlu
      },
    });

    const transformedProjects = projects.map((project) => {
      // Mengubah relasi techStacks menjadi format tech_stack yang diinginkan
      const tech_stack = project.techStacks.map((pts) => ({
        title: pts.techStack.title,
        iconName: pts.techStack.iconName, // Mengirimkan nama ikon
        iconType: pts.techStack.iconType, // Mengirimkan tipe ikon (REACT_ICON/IMAGE_URL)
        // Catatan: Komponen React itu sendiri (<SiJavascript />) TIDAK BISA dikirim dari backend.
        // Anda harus me-render ikon di frontend berdasarkan iconName dan iconType.
      }));

      // Membuat tooltip dari tech_stack
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
    });

    return NextResponse.json(transformedProjects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST: Buat proyek baru dari format yang mirip dummy data
export async function POST(req) {
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
      params, // Menerima objek params
      tech_stack, // Menerima array objek tech_stack
      // tooltip field akan diabaikan karena tidak ada di schema.prisma
    } = body;

    // Validasi input dasar, sesuaikan untuk params.slug
    if (
      !title ||
      !description ||
      !slug ||
      !link_demo ||
      !link_github ||
      !image ||
      !params ||
      !params.slug
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields (title, description, slug, link_demo, link_github, image, params.slug)",
        },
        { status: 400 }
      );
    }

    // Ekstrak params_slug dari objek params
    const params_slug = params.slug;

    // Proses tech_stack: Dapatkan ID TechStack dari database berdasarkan judul
    let techStackIdsToConnect = [];
    if (tech_stack && tech_stack.length > 0) {
      // Ambil semua tech stack dari DB sekali untuk performa
      const allTechStacks = await prisma.techStack.findMany({
        select: { id: true, title: true }, // Hanya ambil id dan title
      });

      // Buat map judul ke ID untuk pencarian cepat
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
              `TechStack with title '${item.title}' not found. It will not be linked.`
            );
            return NextResponse.json(
              { error: `TechStack '${item.title}' not found.` },
              { status: 400 }
            );
          }
        }
      }
    }

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        slug,
        link_demo,
        link_github,
        image,
        is_show: is_show ?? false,
        is_featured: is_featured ?? false,
        aos_delay: aos_delay ?? 0,
        params_slug, // Gunakan params_slug yang sudah diekstrak
        ...(techStackIdsToConnect.length > 0 && {
          // Hanya tambahkan jika ada tech stack untuk dihubungkan
          techStacks: {
            create: techStackIdsToConnect.map((techStackId) => ({
              techStack: {
                connect: { id: techStackId },
              },
            })),
          },
        }),
      },
    });

    // Transformasi respons POST agar mirip dengan format GET
    const createdProjectWithRelations = await prisma.project.findUnique({
      where: { id: newProject.id },
      include: {
        techStacks: {
          include: {
            techStack: true,
          },
        },
      },
    });

    const transformedNewProject = {
      id: createdProjectWithRelations.id,
      title: createdProjectWithRelations.title,
      description: createdProjectWithRelations.description,
      slug: createdProjectWithRelations.slug,
      link_demo: createdProjectWithRelations.link_demo,
      link_github: createdProjectWithRelations.link_github,
      tech_stack: createdProjectWithRelations.techStacks.map((pts) => ({
        title: pts.techStack.title,
        iconName: pts.techStack.iconName,
        iconType: pts.techStack.iconType,
      })),
      tooltip: createdProjectWithRelations.techStacks.map(
        (pts) => pts.techStack.title
      ),
      aos_delay: createdProjectWithRelations.aos_delay,
      image: createdProjectWithRelations.image,
      is_show: createdProjectWithRelations.is_show,
      is_featured: createdProjectWithRelations.is_featured,
      params: {
        slug: createdProjectWithRelations.params_slug,
      },
    };

    return NextResponse.json(transformedNewProject, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    if (error.code === "P2002" && error.meta?.target?.includes("slug")) {
      return NextResponse.json(
        { error: "Slug already exists. Please choose a different slug." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
