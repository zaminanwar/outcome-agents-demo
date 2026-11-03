import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes the export to `out/`, which the
  // Dockerfile copies into nginx. Every route is prerendered.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
