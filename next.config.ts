import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Works for static/local assets in public/
  },
};

export default nextConfig;
