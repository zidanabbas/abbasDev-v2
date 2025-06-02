import { NextResponse } from "next/server";
import cloudinary from "../../lib/cloudinary.js"; // Pastikan path ini benar

export async function POST(req) {
  try {
    // 1. Dapatkan FormData dari request menggunakan Web API
    const formData = await req.formData();

    // 2. Ambil file dari FormData. 'image' harus sesuai dengan nama input di frontend
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Konversi File object (Blob) menjadi Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 4. Upload Buffer ke Cloudinary menggunakan upload_stream
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: "abbas-gallery" }, // Folder di Cloudinary
          (error, uploadResult) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              return reject(new Error("Cloudinary upload failed"));
            }
            resolve(uploadResult);
          }
        )
        .end(buffer); // Mengunggah buffer langsung
    });

    // 5. Kembalikan URL gambar ke frontend
    return NextResponse.json(
      { message: "Upload success", imageUrl: result.secure_url },
      { status: 200 }
    );
  } catch (error) {
    console.error("General upload error:", error);
    return NextResponse.json(
      { error: `An unexpected error occurred: ${error.message}` },
      { status: 500 }
    );
  }
}
