import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8081/api/:path*', // Proxy al backend para evitar CORS
      },
    ];
  },
};

export default nextConfig;
