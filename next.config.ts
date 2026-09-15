import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [75, 95]
  },
  allowedDevOrigins: [
    "10.69.97.202",
    "http://10.69.97.202:3000",
    "*"
  ]
};

export default nextConfig;
