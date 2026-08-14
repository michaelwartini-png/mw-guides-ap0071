import { BITTE_WAEHLEN } from "@/components/admin/allgemeinData";
import { EMPTY_BEWERTUNGEN_DATA } from "@/components/admin/bewertungenData";
import {
  ERLEBNISSE,
  getErlebnisBySlug,
  type ErlebnisRecord,
} from "@/components/admin/erlebnisData";
import { EMPTY_GALERIE_DATA } from "@/components/admin/galerieData";
import { EMPTY_HERO_DATA } from "@/components/admin/heroData";
import { EMPTY_HIGHLIGHTS_DATA } from "@/components/admin/highlightsData";
import { EMPTY_MW_GUIDES_TIPPS_DATA } from "@/components/admin/mwGuidesTippsData";
import { EMPTY_OFFIZIELLE_INFORMATIONEN } from "@/components/admin/offizielleInformationenData";
import type { WorkflowSection } from "@/components/admin/workflowData";

export const ERLEBNIS_SESSION_STORAGE_KEY = "mwg-erlebnis-records-v4";

const NEW_ERLEBNIS_SECTIONS: WorkflowSection[] = [
  { id: "allgemein", label: "Allgemein", status: "open", fieldsFilled: 0, fieldsTotal: 8 },
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

function formatTimestamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} · ${pad(date.getHours())}:${pad(date.getMinutes())} Uhr`;
}

export function slugifyErlebnisName(name: string): string {
  return (
    name
      .trim()
      .toLowerCase()
      .replace(/[–—]/g, "-")
      .replace(/ä/g, "ae")
      .replace(/ö/g, "oe")
      .replace(/ü/g, "ue")
      .replace(/ß/g, "ss")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "neues-erlebnis"
  );
}

export function loadSessionErlebnisse(): Record<string, ErlebnisRecord> {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.sessionStorage.getItem(ERLEBNIS_SESSION_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, ErlebnisRecord>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveSessionErlebnis(record: ErlebnisRecord): void {
  if (typeof window === "undefined") return;

  const all = loadSessionErlebnisse();
  all[record.slug] = record;
  window.sessionStorage.setItem(ERLEBNIS_SESSION_STORAGE_KEY, JSON.stringify(all));
}

export function getSessionErlebnisBySlug(slug: string): ErlebnisRecord | undefined {
  return loadSessionErlebnisse()[slug];
}

export function getAllKnownSlugs(): Set<string> {
  const slugs = new Set<string>(Object.keys(ERLEBNISSE));
  Object.keys(loadSessionErlebnisse()).forEach((slug) => slugs.add(slug));
  return slugs;
}

export function resolveErlebnisRecord(slug: string): ErlebnisRecord | undefined {
  return getSessionErlebnisBySlug(slug) ?? getErlebnisBySlug(slug);
}

function getUniqueSlug(baseName: string): string {
  const existingSlugs = getAllKnownSlugs();
  let slug = slugifyErlebnisName(baseName);

  if (!existingSlugs.has(slug)) return slug;

  let counter = 2;
  while (existingSlugs.has(`${slug}-${counter}`)) {
    counter += 1;
  }

  return `${slug}-${counter}`;
}

function getDuplicateSlug(sourceSlug: string): string {
  const baseSlug = sourceSlug.replace(/-kopie(-\d+)?$/, "");
  const existingSlugs = getAllKnownSlugs();
  let slug = `${baseSlug}-kopie`;

  if (!existingSlugs.has(slug)) return slug;

  let counter = 2;
  while (existingSlugs.has(`${baseSlug}-kopie-${counter}`)) {
    counter += 1;
  }

  return `${baseSlug}-kopie-${counter}`;
}

function duplicateDisplayName(name: string): string {
  return `${name.replace(/ \(Kopie\)$/, "")} (Kopie)`;
}

export function buildNewErlebnisRecord(input: { name: string; slug: string }): ErlebnisRecord {
  const now = new Date();
  const displayName = input.name.trim() || "Neues Erlebnis";
  const slug = input.slug;
  const timestamp = formatTimestamp(now);

  return {
    slug,
    name: displayName,
    kategorie: BITTE_WAEHLEN,
    erlebniswelt: BITTE_WAEHLEN,
    profileStatus: "Entwurf",
    progress: 0,
    lastModifiedAt: now.toISOString(),
    lastModifiedLabel: timestamp,
    lastSaved: { date: timestamp.split(" · ")[0] ?? timestamp, time: timestamp.split(" · ")[1] ?? "" },
    allgemein: {
      name: displayName,
      untertitel: "",
      kategorie: BITTE_WAEHLEN,
      erlebniswelt: BITTE_WAEHLEN,
      laender: [],
      regionen: [],
      orte: [],
      status: "Entwurf",
    },
    hero: structuredClone(EMPTY_HERO_DATA),
    bewertungen: structuredClone(EMPTY_BEWERTUNGEN_DATA),
    offizielleInformationen: structuredClone(EMPTY_OFFIZIELLE_INFORMATIONEN),
    highlights: structuredClone(EMPTY_HIGHLIGHTS_DATA),
    mwGuidesTipps: structuredClone(EMPTY_MW_GUIDES_TIPPS_DATA),
    galerie: structuredClone(EMPTY_GALERIE_DATA),
    workflowSections: structuredClone(NEW_ERLEBNIS_SECTIONS),
  };
}

export function buildDuplicateErlebnisRecord(
  source: ErlebnisRecord,
  duplicateSlug: string,
): ErlebnisRecord {
  const duplicate: ErlebnisRecord = structuredClone(source);
  duplicate.slug = duplicateSlug;
  duplicate.name = duplicateDisplayName(source.name);
  duplicate.profileStatus = "Entwurf";
  duplicate.allgemein.name = duplicateDisplayName(source.allgemein.name);
  duplicate.allgemein.status = "Entwurf";
  delete duplicate.publishedAt;

  return duplicate;
}

export function registerNewErlebnis(input: { name: string; slug: string }): ErlebnisRecord {
  const record = buildNewErlebnisRecord(input);
  saveSessionErlebnis(record);
  return record;
}

export function registerDuplicateErlebnis(
  sourceSlug: string,
  duplicateSlug: string,
): ErlebnisRecord | undefined {
  const source = resolveErlebnisRecord(sourceSlug);
  if (!source) return undefined;

  const record = buildDuplicateErlebnisRecord(source, duplicateSlug);
  saveSessionErlebnis(record);
  return record;
}
