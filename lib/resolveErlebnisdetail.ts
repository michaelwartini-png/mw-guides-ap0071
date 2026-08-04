import type { Erlebnisdetail } from "@/types/erlebnisdetail";
import type { ExplorerHighlight } from "@/types/explorerHighlight";
import { getHighlightBySlug } from "@/content/explorerHighlights";

/** Build a minimal detail page from highlight card data when no bespoke entry exists. */
export function createDetailFromHighlight(
  tripSlug: string,
  highlight: ExplorerHighlight,
): Erlebnisdetail {
  return {
    slug: highlight.slug,
    tripSlug,
    erlebnisweltSlug: highlight.erlebnisweltSlug,
    title: highlight.title,
    subtitle: highlight.description,
    heroImage: highlight.image,
    heroImageAlt: highlight.imageAlt,
    stats: [
      { icon: "calendar", label: "Saison", value: "Ganzjährig" },
      { icon: "route", label: "Region", value: "Bodensee" },
    ],
    score: 8.5,
    scoreCategories: [
      { label: "Komfort", value: 8.0 },
      { label: "Aussicht", value: 8.5 },
      { label: "Einzigartigkeit", value: 8.0 },
      { label: "Fotopotenzial", value: 8.5 },
    ],
    description: highlight.description,
    features: [{ icon: "view", label: "Einzigartiges Erlebnis am Bodensee" }],
    practicalInfo: [
      { label: "Region", value: "Bodensee" },
      { label: "Saison", value: "Ganzjährig" },
    ],
    gallery: [{ src: highlight.image, alt: highlight.imageAlt }],
    reviews: [{ source: "google", rating: 4.0 }],
    recommendations: [],
    combinations: [],
    includedInTrips: [
      {
        slug: "bodensee",
        title: "Bodensee Unlimited",
        image: "/images/explore-trips/bodensee-hero.jpg",
        imageAlt: "Bodensee Unlimited",
      },
    ],
    addedCount: highlight.addedCount,
  };
}

export function resolveErlebnisdetail(
  tripSlug: string,
  erlebnisSlug: string,
  getDetail: (slug: string) => Erlebnisdetail | undefined,
): Erlebnisdetail | undefined {
  const bespoke = getDetail(erlebnisSlug);
  if (bespoke) return bespoke;

  const highlight = getHighlightBySlug(tripSlug, erlebnisSlug);
  if (!highlight) return undefined;

  return createDetailFromHighlight(tripSlug, highlight);
}
