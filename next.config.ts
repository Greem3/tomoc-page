import type { NextConfig } from "next";
const path = require('path')

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatar.vercel.sh",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "iilio.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  transpilePackages: ["@mdxeditor/editor"],
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

export default nextConfig;
