import type { MetadataRoute } from "next";
import { tours } from "@/content/tours";
import { exploreTrips } from "@/content/exploreTrips";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mw-guides.de";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/touren",
    "/explore-trips",
    "/reiseziele",
    "/fotospots",
    "/blog",
    "/ueber",
    "/kontakt",
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const tourRoutes = tours.map((tour) => ({
    url: `${siteUrl}/touren/${tour.slug}`,
    lastModified: new Date(),
  }));

  const exploreTripRoutes = exploreTrips.map((trip) => ({
    url: `${siteUrl}/explore-trips/${trip.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...tourRoutes, ...exploreTripRoutes];
}
