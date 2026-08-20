import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_API_URL ||
      "http://localhost:8000/api";

    return [
      {
        source: "/api/:path*",
        destination: `${backendUrl.replace(/\/$/, "")}/:path*`,
      },
    ];
  },
};

export default nextConfig;
