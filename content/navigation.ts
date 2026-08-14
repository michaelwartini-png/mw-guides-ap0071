export interface NavLink {
  label: string;
  href: string;
  /** Optional quiet caption — display only, no new behaviour. */
  hint?: string;
  /** Visual weight in the primary nav — hierarchy only, no new destinations. */
  weight?: "featured" | "quiet";
}

export const meineReiseHint =
  "Speichere Explore Trips und setze deine Planung jederzeit fort.";

/**
 * AP-002.2: exactly two content worlds, per explicit instruction —
 * "MW Guides besteht nicht aus drei Bereichen, sondern aus zwei
 * gleichwertigen Erlebniswelten." "Reiseideen"/"Magazin" was merged
 * entirely into Explore Trips (see content/exploreTrips.ts); no
 * separate nav entry for it. "Touren" → "Ride Guides" remains a label
 * change only (URL unchanged). Reiseziele/Fotospots/Blog stay in
 * `secondaryNav` (footer-only) — see
 * docs/AP-002-platform-architecture-strategy.md §6.
 */
export const primaryNav: NavLink[] = [
  { label: "Explore Trips", href: "/explore-trips", weight: "featured" },
  { label: "Ride Guides", href: "/touren", weight: "quiet" },
  { label: "Meine Reise", href: "/meine-reise", hint: meineReiseHint },
  { label: "Über MW Guides", href: "/ueber" },
];

/** Existing placeholder pages, demoted from primary nav to footer-only — not removed. */
export const secondaryNav: NavLink[] = [
  { label: "Reiseziele", href: "/reiseziele" },
  { label: "Fotospots", href: "/fotospots" },
  { label: "Blog", href: "/blog" },
];

export const footerCompanyNav: NavLink[] = [
  { label: "Über MW Guides", href: "/ueber" },
  { label: "Kontakt", href: "/kontakt" },
  { label: "Presse", href: "/ueber" },
  { label: "Partner werden", href: "/kontakt" },
];

export const footerLegalNav: NavLink[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
];
