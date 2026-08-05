import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Set the API image hostname here or via NEXT_PUBLIC_IMAGE_HOST
const imageHost = process.env.NEXT_PUBLIC_IMAGE_HOST;

const nextConfig: NextConfig = {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  images: {
    remotePatterns: imageHost
      ? [
          {
            protocol: "https",
            hostname: imageHost,
          },
        ]
      : [],
  },
};

export default withNextIntl(nextConfig);
