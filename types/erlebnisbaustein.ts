import type { City } from "@/types/taxonomy";

/**
 * AP-007 — Erlebnisbausteine ("experience modules").
 *
 * Explicitly NOT the same concept as a Ride Guide (types/tour.ts):
 * a Ride Guide is a standalone, sellable GPS-audio product. An
 * Erlebnisbaustein is a lighter-weight building block of an Explore
 * Trip — a tram line, a viewpoint, a neighbourhood — that describes
 * *what the trip is made of* without implying a purchasable product
 * exists for it yet.
 *
 * "Ein Erlebnisbaustein kann Bestandteil mehrerer Explore Trips sein"
 * (brief) — so, like `cities` in taxonomy.ts, these are defined once in
 * content/erlebnisbausteine.ts and referenced by slug from any number of
 * Explore Trips. Trip Explorer UI (AP-007 Ebene 2) lives at
 * `/explore-trips/[slug]/explorer` — see content/tripExplorers.ts.
 */
export type ErlebnisbausteinType =
  | "strassenbahn"
  | "schwebebahn"
  | "zugstrecke"
  | "schifffahrt"
  | "standseilbahn"
  | "seilbahn"
  | "aussichtspunkt"
  | "stadtviertel"
  | "attraktion";

export const erlebnisbausteinTypeLabels: Record<ErlebnisbausteinType, string> = {
  strassenbahn: "Straßenbahnlinie",
  schwebebahn: "Schwebebahn",
  zugstrecke: "Zugstrecke",
  schifffahrt: "Schifffahrt",
  standseilbahn: "Standseilbahn",
  seilbahn: "Seilbahn",
  aussichtspunkt: "Aussichtspunkt",
  stadtviertel: "Stadtviertel",
  attraktion: "Besondere Attraktion",
};

export interface Erlebnisbaustein {
  slug: string;
  type: ErlebnisbausteinType;
  title: string;
  /** One to two sentences — trip-card length, not a full article. */
  description: string;
  citySlug?: City["slug"];
  /** Set when a real, purchasable Ride Guide exists for this module (types/tour.ts `slug`). Absent = honestly "not yet a product". */
  rideGuideSlug?: string;
}
