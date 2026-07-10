import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // typedRoutes pasó de experimental a top-level en Next 15.5
  typedRoutes: false,
};

export default nextConfig;
