import type { NextConfig } from "next";
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  swcMinify: true,
  disable: process.env.NODE_ENV === "development",
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { webpack, isServer, nextRuntime }) => {
    if (nextRuntime === 'edge') {
      config.resolve.alias['ws'] = false;
      config.resolve.alias['buffer'] = false;
    }
    return config;
  },
};

export default withPWA(nextConfig);
