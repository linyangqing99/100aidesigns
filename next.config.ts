import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{
      source: "/studies/012-seaart-homepage",
      destination: "/studies/012-seaart/index.html",
    }, {
      source: "/studies/011-forgegui-homepage",
      destination: "/studies/011-forgegui/index.html",
    }];
  },
};

export default nextConfig;
