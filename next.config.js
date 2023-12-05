/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rnlheglxjbccptvxmtxn.supabase.co",
        pathname: "/storage/v1/**",
      },
    ],
  },
};

module.exports = nextConfig;


