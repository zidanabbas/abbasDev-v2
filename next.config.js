/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
    ],
  },
  env: {
    // Tambahkan URL produksi atau URL yang sesuai dengan kebutuhan kamu
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://abbasdev.vercel.app/"
        : "http://localhost:3000",
  },
  // ... konfigurasi lainnya
};

module.exports = nextConfig;
