import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/invest-lagos-3.0',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
