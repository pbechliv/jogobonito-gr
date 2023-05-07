/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: ["images.ctfassets.net"],
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

module.exports = nextConfig;
