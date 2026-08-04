/**
 * AP-011 — Explorer highlight cards (Ebene 2 middle column).
 * Each highlight belongs to one Erlebniswelt and links to an Erlebnisdetail page.
 */

export interface ExplorerHighlight {
  slug: string;
  erlebnisweltSlug: string;
  title: string;
  location: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Times this highlight was added to trips (social proof on detail page). */
  addedCount?: number;
}

export interface ExplorerHighlightsByTrip {
  tripSlug: string;
  highlights: ExplorerHighlight[];
}
