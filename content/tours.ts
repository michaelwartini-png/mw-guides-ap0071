import type { Tour } from "@/types/tour";

/**
 * Placeholder tour content for the homepage and /touren overview.
 * Replace with real content or a CMS/API source in a later work package.
 *
 * AP-002.0: added the `story` one-liner for the large editorial tiles.
 * Existing fields (price, offline, gpsGuided, badge, rating) are kept —
 * homepage tiles now surface only place, title and story to stay
 * uncluttered, per the brief; the full metadata still renders on each
 * tour's detail page. See README "Offene Punkte".
 *
 * AP-002 (Plattformarchitektur V2): `category`/`citySlug` added so
 * `/touren` can group these as "Ride Guides". Bruegge is filed under
 * "sonstige" rather than a vehicle category — it's a walking tour, not
 * bound to a specific means of transport. See
 * docs/AP-002-platform-architecture-strategy.md §2.
 */
export const tours: Tour[] = [
  {
    slug: "schwebebahn",
    place: "Wuppertal",
    title: "Wuppertaler Schwebebahn",
    story: "Die einzige Schwebebahn der Welt.",
    description:
      "Die schwebende Bahn über der Wupper — Geschichte, Technik und Geschichten entlang der Strecke.",
    duration: "2 Std 15 Min",
    language: "DE",
    priceFrom: "ab 3,99 €",
    offline: true,
    gpsGuided: true,
    badge: "Bestseller",
    tint: "from-[#242320] to-[#0e0e0d]",
    category: "schwebebahnen",
    citySlug: "wuppertal",
    difficulty: "leicht",
  },
  {
    slug: "wien-linie-d",
    place: "Wien",
    title: "Wien – Linie D",
    story: "Die Stadt erleben, vom Fenster der Linie D aus.",
    description:
      "Vom Nussdorf zum Hauptbahnhof: eine Straßenbahnlinie als roter Faden durch die Stadt.",
    duration: "1 Std 40 Min",
    language: "DE",
    priceFrom: "ab 3,99 €",
    offline: true,
    gpsGuided: true,
    tint: "from-[#242320] to-[#0e0e0d]",
    category: "strassenbahnen",
    citySlug: "wien",
    difficulty: "leicht",
  },
  {
    slug: "kuestentram",
    place: "Belgische Küste",
    title: "Belgische Küstentram",
    story: "Europas längste Straßenbahnlinie.",
    description:
      "Die längste Straßenbahnlinie der Welt: 68 Kilometer Nordsee, Dünen und Hafenstädte.",
    duration: "3 Std 00 Min",
    language: "DE",
    priceFrom: "ab 3,99 €",
    offline: true,
    gpsGuided: true,
    badge: "Neu",
    tint: "from-[#242320] to-[#0e0e0d]",
    category: "strassenbahnen",
    difficulty: "mittel",
  },
  {
    slug: "bruegge",
    place: "Brügge",
    title: "Brügge",
    story: 'Kopfsteinpflaster und Kanäle im "Venedig des Nordens".',
    description:
      'Kanäle, Kopfsteinpflaster und Kirchtürme — ein Spaziergang durch das "Venedig des Nordens".',
    duration: "2 Std 00 Min",
    language: "DE",
    priceFrom: "ab 3,99 €",
    offline: true,
    gpsGuided: true,
    tint: "from-[#242320] to-[#0e0e0d]",
    category: "sonstige",
    citySlug: "bruegge",
    difficulty: "leicht",
  },
];

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}
