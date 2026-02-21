import type { NextConfig } from "next";

const isProduction = process.env.NODE_ENV === "production";
const repoName = "brians-website";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  images: {
    unoptimized: true,
  },
  ...(isProduction && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}/`,
  }),
};

export default nextConfig;
