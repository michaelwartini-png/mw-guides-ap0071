import type { Erlebnisdetail } from "@/types/erlebnisdetail";
import type { ExplorerHighlight } from "@/types/explorerHighlight";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getHighlightBySlug } from "@/content/explorerHighlights";

/** Build a minimal detail page from highlight card data when no bespoke entry exists. */
export function createDetailFromHighlight(
  tripSlug: string,
  highlight: ExplorerHighlight,
): Erlebnisdetail {
  const trip = getExploreTripBySlug(tripSlug);
  const region = trip?.title ?? highlight.location;

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
      { icon: "route", label: "Region", value: region },
    ],
    score: 8.5,
    scoreCategories: [
      { label: "Komfort", value: 8.0 },
      { label: "Aussicht", value: 8.5 },
      { label: "Einzigartigkeit", value: 8.0 },
      { label: "Fotopotenzial", value: 8.5 },
    ],
    description: highlight.description,
    features: [{ icon: "view", label: `Einzigartiges Erlebnis in ${region}` }],
    practicalInfo: [
      { label: "Region", value: region },
      { label: "Saison", value: "Ganzjährig" },
    ],
    gallery: [{ src: highlight.image, alt: highlight.imageAlt }],
    reviews: [{ source: "google", rating: 4.0 }],
    recommendations: [],
    combinations: [],
    includedInTrips: trip
      ? [
          {
            slug: trip.slug,
            title: trip.title,
            image: trip.heroImage,
            imageAlt: trip.heroImageAlt,
          },
        ]
      : [],
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
