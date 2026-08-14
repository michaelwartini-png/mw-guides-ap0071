/**
 * AP-MR001 — Meine Reise V1 dashboard (presentation only).
 * No login, checkout, or persistence.
 */

export type MeineReiseNavId =
  | "uebersicht"
  | "reiseplan"
  | "unterlagen"
  | "aufgaben"
  | "packliste"
  | "kalender"
  | "wetter";

export interface MeineReiseNavItem {
  id: MeineReiseNavId;
  label: string;
  href: string;
}

export interface MeineReiseTripListItem {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
  href: string;
  active?: boolean;
}

export interface MeineReiseTask {
  id: string;
  title: string;
  detail: string;
  dueLabel?: string;
  important?: boolean;
}

export interface MeineReisePlanStop {
  time: string;
  title: string;
  meta?: string;
  ticketHref?: string;
  ticketLabel?: string;
}

export interface MeineReisePlanDay {
  day: number;
  tabLabel: string;
  title: string;
  dateLabel: string;
  stops: MeineReisePlanStop[];
}

export interface MeineReiseWeatherDay {
  label: string;
  condition: string;
  high: number;
  low: number;
}

export interface MeineReiseDocument {
  id: string;
  title: string;
  meta: string;
  kind: "guide" | "handout" | "tickets" | "pdf";
  href?: string;
  external?: boolean;
  /** Capability badge — only on Premium Guide (AP-MR001 §6). */
  offlineAvailable?: boolean;
}

export interface MeineReiseDashboard {
  travelerFirstName: string;
  tripSlug: string;
  tripTitle: string;
  dateRangeLabel: string;
  countdownLabel: string;
  progressPercent: number;
  progressLabel: string;
  heroImage: string;
  heroImageAlt: string;
  editHref: string;
  nav: MeineReiseNavItem[];
  trips: MeineReiseTripListItem[];
  premiumBenefits: readonly string[];
  tasks: MeineReiseTask[];
  plan: MeineReisePlanDay[];
  weather: {
    location: string;
    temperature: number;
    condition: string;
    feelsLike: number;
    forecast: MeineReiseWeatherDay[];
    attribution: string;
  };
  overview: {
    days: number;
    highlights: number;
    budgetLabel: string;
    styleLabel: string;
  };
  documents: MeineReiseDocument[];
}
