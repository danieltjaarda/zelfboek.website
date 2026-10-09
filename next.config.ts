import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Turbopacks bestandssysteem-cache uit: op Vercel bleef de CSS-module (globals.css via @tailwindcss/turbopack) uit de
     cache van een vorige build komen, waardoor nieuwe HTML met oude CSS live kwam (9 okt 2026). Ook in dev pikte die
     cache wijzigingen in globals.css niet op. Builds duren zo iets langer, maar kloppen altijd. */
  experimental: {
    turbopackFileSystemCacheForBuild: false,
    turbopackFileSystemCacheForDev: false,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
