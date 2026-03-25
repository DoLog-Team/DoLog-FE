import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["components", "api", "utils"],
};

export default nextConfig;
