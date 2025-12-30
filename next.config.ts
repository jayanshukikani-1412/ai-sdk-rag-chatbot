import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/chat",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/chat",
        permanent: true,
      },
    ];
  },
  serverExternalPackages: ["pdf-parse"],
};

export default nextConfig;
