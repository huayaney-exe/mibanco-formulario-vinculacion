import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Vercel deployment
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },

  // Trailing slashes for static export compatibility
  trailingSlash: true,
};

export default nextConfig;
