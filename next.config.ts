import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite que los archivos JS existentes de la landing coexistan con TS
  experimental: {
    typedRoutes: false,
  },
};

export default nextConfig;
