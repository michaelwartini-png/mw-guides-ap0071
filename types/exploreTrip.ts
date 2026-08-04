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

/**
 * AP-007.1 — Ebene 1 landing page layout. Trips with `layout: "landing"`
 * render the full inspiration landing page (Hero → USP bar → Warum →
 * Erlebniswelten → Ride Guides → Warum MW Guides → Closing CTA) instead
 * of the AP-007/AP-008.2 premium magazine blocks. Magazine articles
 * (`sections` only) and legacy premium trips (Mailand, Wien) are unaffected.
 */
export type ExploreTripLayout = "magazine" | "premium" | "landing";

/** Lucide icon key for USP bar items (see landing UspBar). */
export type ExploreTripLandingUspIcon =
  | "bed"
  | "globe"
  | "transport"
  | "star"
  | "nodes"
  | "suitcase"
  | "sparkles";

/** Short premium card in the horizontal USP bar beneath the hero. */
export interface ExploreTripLandingUsp {
  title: string;
  description: string;
  icon: ExploreTripLandingUspIcon;
}

/** AP-010.1 — illustrated concept map (Ebene 1 standard, swappable per trip). */
export interface ExploreTripConceptIllustration {
  src: string;
  alt: string;
}

/** Ride Guide card on the landing page — may link to a real tour or show status label. */
export interface ExploreTripLandingRideGuide {
  slug: string;
  title: string;
  /** Short card description beneath the title. */
  description?: string;
  image: string;
  imageAlt: string;
  available: boolean;
  /** When available, links to `/touren/[tourSlug]`. */
  tourSlug?: string;
  duration?: string;
  format?: string;
  price?: string;
  /** Display label when not yet available, e.g. "Bald verfügbar". */
  status?: string;
}

/** Platform USP with a Lucide icon name (see landing PlatformUspsSection). */
export interface ExploreTripPlatformUsp {
  title: string;
  description: string;
  icon:
    | "users"
    | "calendar"
    | "train"
    | "layers"
    | "languages"
    | "map-pin"
    | "headphones";
}

/** Text link or button target on the landing page. */
export interface ExploreTripLandingCta {
  href: string;
  label: string;
}

/** Optional title override when pulling Erlebniswelten from Trip Explorer data. */
export interface ExploreTripLandingErlebnisweltRef {
  slug: string;
  title?: string;
}

/**
 * AP-007.1 / AP-010.1 — all content blocks for the Ebene 1 landing page.
 * Every visible string is overridable here so future trips reuse the same
 * master template without markup changes.
 */
export interface ExploreTripLanding {
  languageHint?: string;
  /** Primary hero CTA — defaults to "#konzept" / "Trip entdecken" when omitted. */
  heroPrimaryCta?: ExploreTripLandingCta;
  /** Secondary hero CTA, e.g. "Später speichern". */
  heroSecondaryCta?: ExploreTripLandingCta;
  uspBar: ExploreTripLandingUsp[];
  /** Left column body copy in "Das Konzept". */
  conceptIntro: string;
  /** H2 in "Das Konzept", e.g. "Ein See. Drei Länder. Tausend Möglichkeiten." */
  conceptHeading: string;
  /** Optional link beneath the concept copy. */
  conceptLink?: ExploreTripLandingCta;
  /** AP-010.1 — illustrated concept map in the right column of "Das Konzept". */
  conceptIllustration: ExploreTripConceptIllustration;
  /** Erlebniswelten section eyebrow — defaults to "Erlebniswelten". */
  erlebnisweltenEyebrow?: string;
  /** Erlebniswelten H2 — derived from trip title when omitted. */
  erlebnisweltenHeading?: string;
  /** Top-right link in the Erlebniswelten header, e.g. "Alle Welten anzeigen". */
  erlebnisweltenViewAll?: ExploreTripLandingCta;
  /** Pull Erlebniswelten from the Trip Explorer registry; filter/order via refs. */
  erlebnisweltenFromExplorer: ExploreTripLandingErlebnisweltRef[];
  /** Ride Guides H2 — e.g. "Ride Guides – Deine Touren am und rund um den Bodensee." */
  rideGuidesHeading: string;
  rideGuides: ExploreTripLandingRideGuide[];
  /** Trailing "view all" card in the Ride Guides row. */
  rideGuidesViewAll?: ExploreTripLandingCta;
  platformUsps: ExploreTripPlatformUsp[];
  closingImage: string;
  closingImageAlt: string;
  closingHeadline: string;
  closingSubtitle: string;
  /** Subtext beneath the Trip Explorer button in the closing section. */
  closingButtonSubtext?: string;
  /** @deprecated Renamed to `conceptIntro` in AP-010.1 — kept for migration only. */
  whyIntro?: string;
  /** @deprecated Renamed to `rideGuidesHeading` — use full heading string instead. */
  rideGuidesRegion?: string;
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

  /**
   * AP-007.1 — page layout selector. Omit or `"magazine"` for article-style
   * trips; `"premium"` for AP-007 blocks; `"landing"` for the Ebene 1
   * inspiration landing page.
   */
  layout?: ExploreTripLayout;
  /** Required when `layout === "landing"`. */
  landing?: ExploreTripLanding;
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
