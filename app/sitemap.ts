import type { MetadataRoute } from "next";
import { landingPaths } from "@/content/landing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mw-guides.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    landingPaths.de.home,
    landingPaths.en.home,
    landingPaths.de.about,
    landingPaths.en.about,
    landingPaths.de.contact,
    landingPaths.en.contact,
    landingPaths.de.imprint,
    landingPaths.en.imprint,
    landingPaths.de.privacy,
    landingPaths.en.privacy,
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route === "/" ? "" : route}`,
    lastModified: new Date(),
  }));
}
