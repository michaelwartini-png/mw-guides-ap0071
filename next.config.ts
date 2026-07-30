import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * AP-002.2: "Reiseideen" was merged into "Explore Trips" — these
   * redirects keep any existing /reiseideen links working instead of
   * 404ing.
   */
  async redirects() {
    return [
      { source: "/reiseideen", destination: "/explore-trips", permanent: true },
      { source: "/reiseideen/:slug", destination: "/explore-trips/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
