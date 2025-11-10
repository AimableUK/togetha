const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: false,
});
// process.env.NODE_ENV === "development"

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: "https",
        hostname: "cdn.togetha.app",
      },
    ],
  },
};

module.exports = withPWA(nextConfig);
