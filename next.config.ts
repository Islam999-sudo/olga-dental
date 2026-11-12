import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // /services/caries/index.html works on ordinary Apache hosting without rewrites.
  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  allowedDevOrigins: [
    "192.168.0.9",
    "192.168.0.9:3000",
    "http://192.168.0.9:3000",
  ],
};

export default nextConfig;