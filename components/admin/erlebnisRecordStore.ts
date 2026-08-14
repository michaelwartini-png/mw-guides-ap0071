import type { AllgemeinData } from "@/components/admin/allgemeinData";
import type { BewertungenData } from "@/components/admin/bewertungenData";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import type { GalerieData } from "@/components/admin/galerieData";
import type { HeroData } from "@/components/admin/heroData";
import type { HighlightsData } from "@/components/admin/highlightsData";
import type { MWGuidesTippsData } from "@/components/admin/mwGuidesTippsData";
import type { OffizielleInformationenData } from "@/components/admin/offizielleInformationenData";
import { fetchErlebnisRecord, saveErlebnisRecord } from "@/lib/erlebnisApiClient";

export type ErlebnisSectionKey =
  | "allgemein"
  | "hero"
  | "bewertungen"
  | "offizielleInformationen"
  | "highlights"
  | "mwGuidesTipps"
  | "galerie";

type ErlebnisSectionDataMap = {
  allgemein: AllgemeinData;
  hero: HeroData;
  bewertungen: BewertungenData;
  offizielleInformationen: OffizielleInformationenData;
  highlights: HighlightsData;
  mwGuidesTipps: MWGuidesTippsData;
  galerie: GalerieData;
};

function formatTimestamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} · ${pad(date.getHours())}:${pad(date.getMinutes())} Uhr`;
}

/** Lädt Erlebnis aus dem serverseitigen Store (AP-0023). */
export async function loadErlebnisRecord(slug: string): Promise<ErlebnisRecord | undefined> {
  return fetchErlebnisRecord(slug);
}

export function mergeErlebnisSection<K extends ErlebnisSectionKey>(
  record: ErlebnisRecord,
  section: K,
  data: ErlebnisSectionDataMap[K],
): ErlebnisRecord {
  const now = new Date();
  const timestamp = formatTimestamp(now);
  const [date, time] = timestamp.split(" · ");

  const next: ErlebnisRecord = {
    ...record,
    lastModifiedAt: now.toISOString(),
    lastModifiedLabel: timestamp,
    lastSaved: { date: date ?? timestamp, time: time ?? "" },
    [section]: structuredClone(data),
  };

  if (section === "allgemein") {
    const allgemein = data as AllgemeinData;
    next.name = allgemein.name.trim() || record.name;
    next.kategorie = allgemein.kategorie;
    next.erlebniswelt = allgemein.erlebniswelt;
    next.profileStatus = allgemein.status;
  }

  return next;
}

export async function persistErlebnisSection<K extends ErlebnisSectionKey>(
  record: ErlebnisRecord,
  section: K,
  data: ErlebnisSectionDataMap[K],
): Promise<ErlebnisRecord> {
  const next = mergeErlebnisSection(record, section, data);
  return saveErlebnisRecord(next);
}
