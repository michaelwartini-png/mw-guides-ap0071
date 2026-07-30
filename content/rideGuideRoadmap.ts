import type { RideGuideCategory } from "@/types/taxonomy";

/**
 * Future Ride Guide lines named in the brief. Plain titles only — no
 * fabricated descriptions, images, or itineraries. Rendered as unlinked
 * "geplant" entries within their category on /touren. Entries the
 * platform already has a real tour for (Wien Linie D, Belgische
 * Küstentram) are intentionally excluded here to avoid a duplicate,
 * empty-looking entry next to the real one.
 */
export const rideGuideRoadmap: Record<RideGuideCategory, string[]> = {
  schwebebahnen: [],
  strassenbahnen: [
    "Essen — Kulturlinie 107",
    "Köln — Linie 17",
    "Düsseldorf — U79",
    "Mailand",
    "Lissabon",
  ],
  panoramabahnstrecken: [
    "Mittelrheintal",
    "Semmeringbahn",
    "Bergenbahn",
    "Flåmbahn",
    "Schwarzwaldbahn",
  ],
  "faehren-waterbusse": [
    "Venedig — Vaporetto",
    "Rotterdam Waterbus",
    "Stockholm",
    "Hamburger Hafenfähren",
    "Istanbul",
  ],
  seilbahnen: ["Kölner Seilbahn", "Drachenfelsbahn", "Innsbruck"],
  sonstige: [],
};
