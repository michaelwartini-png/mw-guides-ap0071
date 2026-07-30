/**
 * "Explore Trips" — AP-002.2 merges what was briefly a separate
 * "Reiseideen"/"Magazin" layer directly into Explore Trips, per explicit
 * instruction: "Explore Trips sind unsere Reiseideen. Es gibt keine
 * zusätzliche eigenständige Kategorie 'Reiseideen' oder 'Magazin'."
 *
 * MW Guides has exactly two content worlds: Ride Guides (types/tour.ts)
 * and Explore Trips (this file). The three real articles previously
 * published under /reiseideen now live at /explore-trips/[slug] with
 * their content unchanged — see docs/AP-002.2-ia-simplification.md.
 *
 * AP-007: Explore Trips are no longer only magazine articles. Three new
 * entries (Mailand Unlimited, Wien & Bratislava, Bodensee) need a richer
 * "premium travel-magazine landing page" shape — emotional intro, USP,
 * highlights, recommended duration, Erlebnisbausteine, included Ride
 * Guides, gallery, CTA. All new fields below are optional so the three
 * existing Schwebebahn articles keep rendering exactly as before with
 * `sections` alone; the detail page only renders a block when its data
 * is present.
 */

export type ExploreTripTheme =
  | "schwebebahn"
  | "strassenbahn"
  | "bahnreisen"
  | "wasserwege"
  | "faehren"
  | "kreuzfahrtausfluege"
  | "staedte"
  /** AP-007: multi-destination/region trips that don't fit a single vehicle theme. */
  | "reiseregion";

export interface ExploreTripHighlight {
  title: string;
  text: string;
}

export interface ExploreTripGalleryImage {
  image: string;
  alt: string;
}

export interface ExploreTrip {
  slug: string;
  theme: ExploreTripTheme;
  title: string;
  /** One-line teaser for cards and listings. */
  teaser: string;
  heroImage: string;
  heroImageAlt: string;
  /** Body content as image+text blocks, rendered in order on the detail page. */
  sections: {
    heading: string;
    paragraphs: string[];
    image?: string;
    imageAlt?: string;
    imagePosition?: "left" | "right";
  }[];

  /** AP-007 — premium landing page fields, all optional (see file doc comment). */

  /** Short claim under the hero title, e.g. "Ein Hotel. Unzählige Möglichkeiten." */
  subtitle?: string;
  /** Alleinstellungsmerkmal — one paragraph, what makes this trip different from a classic round trip. */
  usp?: string;
  /**
   * AP-008.2 — the explicit "Alles kann – nichts muss" statement. Kept
   * separate from `usp` (which explains the fixed-base *concept*) so the
   * template can render two distinct ideas in sequence: why one base is
   * better, then why nothing here is a fixed itinerary.
   */
  flexibility?: string;
  /** 4–6 short highlight cards. */
  highlights?: ExploreTripHighlight[];
  /** e.g. "5–7 Tage, frei wählbar". */
  recommendedDuration?: string;
  /** References content/erlebnisbausteine.ts by slug — modules this trip is built from. */
  erlebnisbausteineSlugs?: string[];
  /** References content/tours.ts (Tour.slug) — real, purchasable Ride Guides included in this trip, if any exist yet. */
  rideGuideSlugs?: string[];
  gallery?: ExploreTripGalleryImage[];
  /** Defaults to "Alle Explore Trips" if omitted (see detail page). */
  ctaLabel?: string;
}

/**
 * Roadmap-only entries — real titles, no fabricated content. Rendered as
 * unlinked "in Konzeption" text on /explore-trips, never as articles.
 *
 * AP-007: "Mailand Unlimited", "Bodensee ohne Auto" and
 * "Wien – Wachau – Passau" removed from this list — they are now real,
 * published Explore Trips (see content/exploreTrips.ts) and would
 * otherwise appear twice, once as a real card and once as a contradictory
 * "in Konzeption" placeholder.
 */
export interface UpcomingExploreTrip {
  title: string;
}

export const upcomingExploreTrips: UpcomingExploreTrip[] = [
  { title: "Schwebebahnen der Welt" },
  { title: "Straßenbahnstädte Europas" },
  { title: "Bahnreisen" },
  { title: "Fähren" },
  { title: "Wasserwege" },
  { title: "Kreuzfahrtausflüge" },
];
