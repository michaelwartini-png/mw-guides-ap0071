import type { AllgemeinData } from "@/components/admin/allgemeinData";
import type { BewertungenData } from "@/components/admin/bewertungenData";
import {
  BEWERTUNGEN_GLACIER,
  BEWERTUNGEN_KATAMARAN,
  BEWERTUNGEN_SCHWEBEBAHN,
} from "@/components/admin/bewertungenData";
import type { HeroData } from "@/components/admin/heroData";
import type { HighlightsData } from "@/components/admin/highlightsData";
import {
  HIGHLIGHTS_GLACIER,
  HIGHLIGHTS_KATAMARAN,
  HIGHLIGHTS_SCHWEBEBAHN,
} from "@/components/admin/highlightsData";
import type { OffizielleInformationenData } from "@/components/admin/offizielleInformationenData";
import {
  OFFIZIELLE_GLACIER,
  OFFIZIELLE_KATAMARAN,
  OFFIZIELLE_SCHWEBEBAHN,
} from "@/components/admin/offizielleInformationenData";
import type { GalerieData } from "@/components/admin/galerieData";
import {
  GALERIE_GLACIER,
  GALERIE_KATAMARAN,
  GALERIE_SCHWEBEBAHN,
} from "@/components/admin/galerieData";
import type { MWGuidesTippsData } from "@/components/admin/mwGuidesTippsData";
import {
  TIPPS_GLACIER,
  TIPPS_KATAMARAN,
  TIPPS_SCHWEBEBAHN,
} from "@/components/admin/mwGuidesTippsData";
import type { WorkflowSection } from "@/components/admin/workflowData";

export type ErlebnisSlug =
  | "katamaran-konstanz-friedrichshafen"
  | "wuppertaler-schwebebahn"
  | "glacier-express";

export type ErlebnisRecord = {
  slug: string;
  name: string;
  kategorie: string;
  erlebniswelt: string;
  profileStatus: string;
  progress: number;
  lastModifiedAt: string;
  lastModifiedLabel: string;
  lastSaved: {
    date: string;
    time: string;
  };
  allgemein: AllgemeinData;
  hero: HeroData;
  bewertungen: BewertungenData;
  offizielleInformationen: OffizielleInformationenData;
  highlights: HighlightsData;
  mwGuidesTipps: MWGuidesTippsData;
  galerie: GalerieData;
  workflowSections: WorkflowSection[];
};

const KATAMARAN_SECTIONS: WorkflowSection[] = [
  { id: "allgemein", label: "Allgemein", status: "completed", fieldsFilled: 8, fieldsTotal: 8 },
  { id: "hero", label: "Hero", status: "completed", fieldsFilled: 4, fieldsTotal: 8 },
  { id: "bewertungen", label: "Bewertungen", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  {
    id: "offizielle-informationen",
    label: "Offizielle Informationen",
    status: "open",
    fieldsFilled: 0,
    fieldsTotal: 7,
  },
  { id: "highlights", label: "Highlights", status: "open", fieldsFilled: 0, fieldsTotal: 5 },
  {
    id: "mw-guides-tipps",
    label: "MW Guides Tipps",
    status: "open",
    fieldsFilled: 0,
    fieldsTotal: 5,
  },
  { id: "galerie", label: "Galerie & Bildverwaltung", status: "open", fieldsFilled: 0, fieldsTotal: 8 },
  { id: "produkte", label: "Produkte", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  { id: "videos", label: "Videos", status: "open", fieldsFilled: 0, fieldsTotal: 3 },
  { id: "faq", label: "FAQ", status: "open", fieldsFilled: 0, fieldsTotal: 4 },
];

const SCHWEBEBAHN_SECTIONS: WorkflowSection[] = [
  { id: "allgemein", label: "Allgemein", status: "completed", fieldsFilled: 8, fieldsTotal: 8 },
  { id: "hero", label: "Hero", status: "completed", fieldsFilled: 8, fieldsTotal: 8 },
  { id: "bewertungen", label: "Bewertungen", status: "completed", fieldsFilled: 6, fieldsTotal: 6 },
  {
    id: "offizielle-informationen",
    label: "Offizielle Informationen",
    status: "completed",
    fieldsFilled: 7,
    fieldsTotal: 7,
  },
  { id: "highlights", label: "Highlights", status: "completed", fieldsFilled: 5, fieldsTotal: 5 },
  {
    id: "mw-guides-tipps",
    label: "MW Guides Tipps",
    status: "completed",
    fieldsFilled: 5,
    fieldsTotal: 5,
  },
  { id: "galerie", label: "Galerie & Bildverwaltung", status: "completed", fieldsFilled: 8, fieldsTotal: 8 },
  { id: "produkte", label: "Produkte", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  { id: "videos", label: "Videos", status: "completed", fieldsFilled: 3, fieldsTotal: 3 },
  { id: "faq", label: "FAQ", status: "completed", fieldsFilled: 4, fieldsTotal: 4 },
];

const GLACIER_SECTIONS: WorkflowSection[] = [
  { id: "allgemein", label: "Allgemein", status: "open", fieldsFilled: 1, fieldsTotal: 8 },
  { id: "hero", label: "Hero", status: "open", fieldsFilled: 0, fieldsTotal: 8 },
  { id: "bewertungen", label: "Bewertungen", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  {
    id: "offizielle-informationen",
    label: "Offizielle Informationen",
    status: "open",
    fieldsFilled: 0,
    fieldsTotal: 7,
  },
  { id: "highlights", label: "Highlights", status: "open", fieldsFilled: 0, fieldsTotal: 5 },
  {
    id: "mw-guides-tipps",
    label: "MW Guides Tipps",
    status: "open",
    fieldsFilled: 0,
    fieldsTotal: 5,
  },
  { id: "galerie", label: "Galerie & Bildverwaltung", status: "open", fieldsFilled: 0, fieldsTotal: 8 },
  { id: "produkte", label: "Produkte", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  { id: "videos", label: "Videos", status: "open", fieldsFilled: 0, fieldsTotal: 3 },
  { id: "faq", label: "FAQ", status: "open", fieldsFilled: 0, fieldsTotal: 4 },
];

export const ERLEBNISSE: Record<ErlebnisSlug, ErlebnisRecord> = {
  "katamaran-konstanz-friedrichshafen": {
    slug: "katamaran-konstanz-friedrichshafen",
    name: "Katamaran Konstanz–Friedrichshafen",
    kategorie: "Schifffahrt",
    erlebniswelt: "Wasser",
    profileStatus: "Entwurf",
    progress: 22,
    lastModifiedAt: "2026-08-05T09:45:00",
    lastModifiedLabel: "05.08.2026 · 09:45 Uhr",
    lastSaved: { date: "05.08.2026", time: "09:45 Uhr" },
    allgemein: {
      name: "Katamaran Konstanz – Friedrichshafen",
      untertitel: "In 52 Minuten über den Bodensee",
      kategorie: "Schifffahrt",
      erlebniswelt: "Wasser",
      laender: ["Deutschland"],
      regionen: ["Bodensee"],
      orte: ["Konstanz", "Friedrichshafen"],
      status: "Entwurf",
    },
    hero: {
      titel: "Katamaran Konstanz – Friedrichshafen",
      untertitel: "In 52 Minuten über den Bodensee.",
      hasHeroImage: true,
      galerieCount: 4,
      badges: ["Bestseller", "Ganzjährig", "Panoramablick"],
      score: "9.0",
      rideGuideAvailable: true,
    },
    bewertungen: BEWERTUNGEN_KATAMARAN,
    offizielleInformationen: OFFIZIELLE_KATAMARAN,
    highlights: HIGHLIGHTS_KATAMARAN,
    mwGuidesTipps: TIPPS_KATAMARAN,
    galerie: GALERIE_KATAMARAN,
    workflowSections: KATAMARAN_SECTIONS,
  },
  "wuppertaler-schwebebahn": {
    slug: "wuppertaler-schwebebahn",
    name: "Wuppertaler Schwebebahn",
    kategorie: "Schwebebahn",
    erlebniswelt: "Technik",
    profileStatus: "Veröffentlicht",
    progress: 100,
    lastModifiedAt: "2026-08-04T16:20:00",
    lastModifiedLabel: "04.08.2026 · 16:20 Uhr",
    lastSaved: { date: "04.08.2026", time: "16:20 Uhr" },
    allgemein: {
      name: "Wuppertaler Schwebebahn",
      untertitel: "Schwebe durch Wuppertal – seit 1901",
      kategorie: "Schwebebahn",
      erlebniswelt: "Technik",
      laender: ["Deutschland"],
      regionen: ["Bergisches Land"],
      orte: ["Wuppertal"],
      status: "Veröffentlicht",
    },
    hero: {
      titel: "Wuppertaler Schwebebahn",
      untertitel: "Die schwebende Ikone des Bergischen Lands.",
      hasHeroImage: true,
      galerieCount: 6,
      badges: ["Bestseller", "Ganzjährig", "Panoramablick", "Familienfreundlich"],
      score: "9.2",
      rideGuideAvailable: true,
    },
    bewertungen: BEWERTUNGEN_SCHWEBEBAHN,
    offizielleInformationen: OFFIZIELLE_SCHWEBEBAHN,
    highlights: HIGHLIGHTS_SCHWEBEBAHN,
    mwGuidesTipps: TIPPS_SCHWEBEBAHN,
    galerie: GALERIE_SCHWEBEBAHN,
    workflowSections: SCHWEBEBAHN_SECTIONS,
  },
  "glacier-express": {
    slug: "glacier-express",
    name: "Glacier Express",
    kategorie: "Bahn",
    erlebniswelt: "Bahn",
    profileStatus: "Entwurf",
    progress: 8,
    lastModifiedAt: "2026-08-03T11:10:00",
    lastModifiedLabel: "03.08.2026 · 11:10 Uhr",
    lastSaved: { date: "03.08.2026", time: "11:10 Uhr" },
    allgemein: {
      name: "Glacier Express",
      untertitel: "Die langsamste Expresszug der Welt",
      kategorie: "Bahn",
      erlebniswelt: "Bahn",
      laender: ["Schweiz"],
      regionen: ["Alpen"],
      orte: ["Zermatt", "St. Moritz"],
      status: "Entwurf",
    },
    hero: {
      titel: "Glacier Express",
      untertitel: "Von Gletscher zu Gletscher durch die Schweizer Alpen.",
      hasHeroImage: true,
      galerieCount: 2,
      badges: ["Panoramablick", "Ganzjährig"],
      score: "8.8",
      rideGuideAvailable: false,
    },
    bewertungen: BEWERTUNGEN_GLACIER,
    offizielleInformationen: OFFIZIELLE_GLACIER,
    highlights: HIGHLIGHTS_GLACIER,
    mwGuidesTipps: TIPPS_GLACIER,
    galerie: GALERIE_GLACIER,
    workflowSections: GLACIER_SECTIONS,
  },
};

export const ERLEBNIS_LIST = Object.values(ERLEBNISSE);

export function getErlebnisBySlug(slug: string): ErlebnisRecord | undefined {
  return ERLEBNISSE[slug as ErlebnisSlug];
}

export function isErlebnisSlug(slug: string): slug is ErlebnisSlug {
  return slug in ERLEBNISSE;
}

/** Fallback für den Neues-Erlebnis-Prototyp ohne Slug. */
export function getDefaultErlebnis(): ErlebnisRecord {
  return ERLEBNISSE["katamaran-konstanz-friedrichshafen"];
}
