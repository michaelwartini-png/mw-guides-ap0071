/**
 * Shared taxonomy for the MW Guides platform (AP-002, Plattformarchitektur V2).
 *
 * Defined once, referenced by Ride Guides, Explore Trips, and (in the
 * future) Magazin articles — so a new content type never needs its own
 * parallel category system. No database yet, per the brief: these are
 * plain, statically-imported structures that can move to a CMS/DB later
 * without changing the shape consumers rely on.
 */

/**
 * Ride Guide categories. Matches the brief's taxonomy exactly, including
 * the categories with zero real content today (rendered as roadmap
 * entries, never fabricated articles — see the strategy doc).
 */
export type RideGuideCategory =
  | "schwebebahnen"
  | "strassenbahnen"
  | "panoramabahnstrecken"
  | "faehren-waterbusse"
  | "seilbahnen"
  /** Doesn't fit the vehicle-bound taxonomy — see strategy doc §2 (Brügge). */
  | "sonstige";

export const rideGuideCategoryLabels: Record<RideGuideCategory, string> = {
  schwebebahnen: "Schwebebahnen",
  strassenbahnen: "Straßenbahnen",
  panoramabahnstrecken: "Panoramabahnstrecken",
  "faehren-waterbusse": "Fähren & Waterbusse",
  seilbahnen: "Seilbahnen & Standseilbahnen",
  sonstige: "Weitere Strecken",
};

/**
 * Future Ride Guide categories named in the brief as direction, not yet
 * populated with any entries (real or planned) — kept separate from
 * RideGuideCategory so adding one later is additive, not a breaking
 * change to existing content.
 */
export const futureRideGuideCategoryLabels: readonly string[] = [
  "Außergewöhnliche Buslinien",
  "Metro-Systeme",
  "Historische Bahnen",
  "Zahnradbahnen",
  "Museumsbahnen",
];

export type Country =
  | "deutschland"
  | "oesterreich"
  | "belgien"
  | "italien"
  | "portugal"
  | "niederlande"
  | "schweiz"
  | "skandinavien"
  /** Added for AP-007 (Bratislava, Wien & Bratislava Explore Trip). */
  | "slowakei";

export const countryLabels: Record<Country, string> = {
  deutschland: "Deutschland",
  oesterreich: "Österreich",
  belgien: "Belgien",
  italien: "Italien",
  portugal: "Portugal",
  niederlande: "Niederlande",
  schweiz: "Schweiz",
  skandinavien: "Skandinavien",
  slowakei: "Slowakei",
};

/**
 * Optional shared city reference. Lets a Ride Guide and a future Explore
 * Trip both point at "Wien" without a duplicate, unlinked city concept in
 * each content type (see strategy doc §5).
 *
 * AP-007: added Mailand, Bratislava, Konstanz and Friedrichshafen for the
 * three new Explore Trips (Mailand Unlimited, Wien & Bratislava,
 * Bodensee) — purely additive, existing entries untouched.
 */
export interface City {
  slug: string;
  name: string;
  country: Country;
}

export const cities: City[] = [
  { slug: "wuppertal", name: "Wuppertal", country: "deutschland" },
  { slug: "wien", name: "Wien", country: "oesterreich" },
  { slug: "bruegge", name: "Brügge", country: "belgien" },
  { slug: "mailand", name: "Mailand", country: "italien" },
  { slug: "bratislava", name: "Bratislava", country: "slowakei" },
  { slug: "konstanz", name: "Konstanz", country: "deutschland" },
  { slug: "friedrichshafen", name: "Friedrichshafen", country: "deutschland" },
];

export type Difficulty = "leicht" | "mittel" | "anspruchsvoll";

export const difficultyLabels: Record<Difficulty, string> = {
  leicht: "Leicht",
  mittel: "Mittel",
  anspruchsvoll: "Anspruchsvoll",
};

/**
 * Feature flags shared across content types. Booleans today; the shape
 * is stable if any of these later need richer values (e.g. `language`
 * becoming a list once real multilingual content exists).
 */
export interface ContentFeatures {
  gpsGuided: boolean;
  audioAvailable: boolean;
  pdfAvailable: boolean;
  offlineAvailable: boolean;
  language: string;
}
