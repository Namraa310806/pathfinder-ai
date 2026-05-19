/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
  // Clerk and Prisma should not be bundled into edge/server unnecessarily
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
