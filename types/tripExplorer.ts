/**
 * AP-007 — Trip Explorer (Ebene 2).
 *
 * A discovery/inspiration layer beneath an Explore Trip preview — not a
 * travel plan. Each Explore Trip with explorer data gets its own page at
 * `/explore-trips/[slug]/explorer`.
 */

export interface TripExplorerErlebniswelt {
  slug: string;
  title: string;
  /** Optional longer label for the Ebene 2 sidebar (AP-011). */
  explorerTitle?: string;
  /** Two to three lines of teaser copy. */
  description: string;
  image: string;
  imageAlt: string;
  /** Number of available experiences in this world. */
  experienceCount: number;
}

export interface TripExplorerHighlightCard {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
}

/** AP-011 workspace = three-column Trip Explorer; discovery = legacy overview. */
export type TripExplorerLayout = "workspace" | "discovery";

export interface TripExplorer {
  /** Must match an ExploreTrip.slug in content/exploreTrips.ts. */
  tripSlug: string;
  /** AP-011 — workspace enables the interactive three-column explorer. */
  layout?: TripExplorerLayout;
  /** Hero headline — usually the region name. */
  heroTitle: string;
  /** Hero subline, e.g. "In 7 Tagen den gesamten Bodensee entdecken." */
  heroSubtitle: string;
  heroImage: string;
  heroImageAlt: string;
  erlebniswelten: TripExplorerErlebniswelt[];
  highlightRideGuides: TripExplorerHighlightCard[];
  besondereErlebnisse: TripExplorerHighlightCard[];
}
