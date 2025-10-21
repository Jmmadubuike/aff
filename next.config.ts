import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"], // allow images from Cloudinary
  },
};

export default nextConfig;
