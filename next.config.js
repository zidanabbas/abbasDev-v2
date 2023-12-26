/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "i.scdn.co"],
  },
  env: {
    // Tambahkan URL produksi atau URL yang sesuai dengan kebutuhan kamu
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://example.com"
        : "http://localhost:3000",
  },
  // ... konfigurasi lainnya
};

module.exports = nextConfig;
