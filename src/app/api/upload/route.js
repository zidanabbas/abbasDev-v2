import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary";
import prisma from "../../lib/prisma";
import formidable from "formidable";
import fs from "fs";

// Disable Next.js built-in body parser supaya formidable bisa parse form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        resolve(
          NextResponse.json(
            { error: "Failed to parse form data" },
            { status: 500 }
          )
        );
        return;
      }

      const file = files.image; // key 'image' harus sesuai frontend upload

      if (!file) {
        resolve(
          NextResponse.json({ error: "No file uploaded" }, { status: 400 })
        );
        return;
      }

      try {
        // Upload file ke Cloudinary via local filepath
        const result = await cloudinary.uploader.upload(file.filepath, {
          folder: "abbas-gallery",
        });

        // Hapus file lokal setelah upload sukses
        fs.unlinkSync(file.filepath);

        // Simpan URL ke Neon lewat Prisma
        const savedImage = await prisma.image.create({
          data: {
            imageUrl: result.secure_url,
          },
        });

        resolve(
          NextResponse.json(
            { message: "Upload success", data: savedImage },
            { status: 200 }
          )
        );
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
        resolve(NextResponse.json({ error: "Upload failed" }, { status: 500 }));
      }
    });
  });
}
