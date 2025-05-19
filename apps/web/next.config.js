const { withContentCollections } = require("@content-collections/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => [
    {
      source: "/ingest/static/:path*",
      destination: "https://t.posthog.com/:path*",
    },
    {
      source: "/ingest/:path*",
      destination: "https://t.posthog.com/:path*",
    },
    {
      source: "/ingest/decide",
      destination: "https://t.posthog.com/decide",
    },
  ],
  skipTrailingSlashRedirect: true,
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer", "jotai-devtools", "pdfjs-dist"],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  productionBrowserSourceMaps: true,
};

module.exports = withContentCollections(nextConfig); 