import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/page/0",
        destination: "/",
        permanent: true,
      },
      {
        source: "/page/1",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
