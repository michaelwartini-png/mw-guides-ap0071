/**
 * AP-011 — Erlebnisdetail page (Ebene 2 detail view).
 * Experience-first content; Ride Guide product link appears only when available.
 */

export interface ErlebnisdetailStat {
  icon: "clock" | "calendar" | "euro" | "building" | "route";
  label: string;
  value: string;
}

export interface ErlebnisdetailScoreCategory {
  label: string;
  value: number;
}

export interface ErlebnisdetailFeature {
  icon: "view" | "city" | "food" | "bike" | "accessibility";
  label: string;
}

export interface ErlebnisdetailPracticalRow {
  label: string;
  value: string;
}

export interface ErlebnisdetailMapInfo {
  departureA?: string;
  departureB?: string;
  parking?: string;
  coordinates?: string;
}

export interface ErlebnisdetailReview {
  source: "google" | "tripadvisor";
  rating: number;
  reviewCount?: number;
}

export interface ErlebnisdetailCombination {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
}

export interface ErlebnisdetailGalleryImage {
  src: string;
  alt: string;
}

export interface ErlebnisdetailRideGuide {
  title: string;
  price: string;
  href?: string;
}

export interface Erlebnisdetail {
  slug: string;
  tripSlug: string;
  erlebnisweltSlug: string;
  title: string;
  subtitle: string;
  badge?: string;
  heroImage: string;
  heroImageAlt: string;
  introVideoLabel?: string;
  stats: ErlebnisdetailStat[];
  score: number;
  scoreCategories: ErlebnisdetailScoreCategory[];
  rideGuide?: ErlebnisdetailRideGuide;
  description: string;
  features: ErlebnisdetailFeature[];
  mapImage?: string;
  mapImageAlt?: string;
  mapInfo?: ErlebnisdetailMapInfo;
  ticketImage?: string;
  ticketImageAlt?: string;
  ticketBullets?: string[];
  ticketCtaLabel?: string;
  ticketCtaHref?: string;
  practicalInfo: ErlebnisdetailPracticalRow[];
  operator?: {
    name: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  gallery: ErlebnisdetailGalleryImage[];
  reviews: ErlebnisdetailReview[];
  recommendations: ErlebnisdetailCombination[];
  combinations: ErlebnisdetailCombination[];
  includedInTrips: { slug: string; title: string; image: string; imageAlt: string }[];
  addedCount?: number;
}
