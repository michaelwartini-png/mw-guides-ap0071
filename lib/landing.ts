import type { Metadata } from "next";
import { counterpartPath, landingPaths, type LandingLocale } from "@/content/landing";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mw-guides.de";

const OG_IMAGE = {
  url: "/images/reiseideen/neue-generation-hero.jpg",
  width: 1600,
  height: 1067,
  alt: "MW Guides",
};

export function landingMetadata(
  locale: LandingLocale,
  options?: { title?: string; description?: string; path?: string }
): Metadata {
  const path = options?.path ?? landingPaths[locale].home;
  const title = options?.title ?? "MW Guides | Digital Travel Experiences";
  const description =
    options?.description ?? "Digital travel experiences currently in development.";
  const canonical = `${siteUrl}${path}`;
  const isHome = path === landingPaths[locale].home;

  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        de: `${siteUrl}${counterpartPath(path, "de")}`,
        en: `${siteUrl}${counterpartPath(path, "en")}`,
        "x-default": siteUrl,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_GB" : "de_DE",
      url: canonical,
      siteName: "MW Guides",
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export { siteUrl };
