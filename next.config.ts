import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/academy',
        destination: 'https://knowledgegroove-academy.vercel.app/academy',
      },
      {
        source: '/academy/:path*',
        destination: 'https://knowledgegroove-academy.vercel.app/academy/:path*',
      },
    ];
  },
};

export default nextConfig;
