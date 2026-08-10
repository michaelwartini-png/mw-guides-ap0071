import {
  ERLEBNIS_LIST,
  type ErlebnisRecord,
} from "@/components/admin/erlebnisData";
import { getErlebnisprofilCompleteness } from "@/components/admin/products/erlebnisprofilProduct";
import { loadSessionErlebnisse } from "@/components/admin/erlebnisSessionStore";

export type ErlebnisStatus = "Entwurf" | "In Bearbeitung" | "Veröffentlicht";

export type DashboardErlebnis = {
  id: string;
  name: string;
  kategorie: string;
  erlebniswelt: string;
  status: ErlebnisStatus;
  progress: number;
  lastModifiedAt: string;
  lastModifiedLabel: string;
  /** Dynamische Karte (Neu/Duplikat) – gespeichert in sessionStorage */
  isTemporary?: boolean;
};

function toDashboardErlebnis(record: ErlebnisRecord, isTemporary = false): DashboardErlebnis {
  const completeness = getErlebnisprofilCompleteness(record).percent;
  return {
    id: record.slug,
    name: record.name,
    kategorie: record.kategorie,
    erlebniswelt: record.erlebniswelt,
    status: record.profileStatus as ErlebnisStatus,
    progress: completeness > 0 ? completeness : record.progress,
    lastModifiedAt: record.lastModifiedAt,
    lastModifiedLabel: record.lastModifiedLabel,
    isTemporary,
  };
}

export const DASHBOARD_ERLEBNISSE: DashboardErlebnis[] = ERLEBNIS_LIST.map((record) =>
  toDashboardErlebnis(record),
);

export function toDashboardErlebnisFromRecord(record: ErlebnisRecord): DashboardErlebnis {
  return toDashboardErlebnis(record, true);
}

export function getInitialDashboardErlebnisse(): DashboardErlebnis[] {
  const session = loadSessionErlebnisse();

  const mergedSeeds = ERLEBNIS_LIST.map((seed) => {
    const sessionRecord = session[seed.slug];
    if (sessionRecord) {
      return toDashboardErlebnis(sessionRecord, false);
    }
    return toDashboardErlebnis(seed);
  });

  const sessionOnlySlugs = new Set(ERLEBNIS_LIST.map((record) => record.slug));
  const sessionOnly = Object.values(session)
    .filter((record) => !sessionOnlySlugs.has(record.slug))
    .map((record) => toDashboardErlebnisFromRecord(record));

  return [...mergedSeeds, ...sessionOnly];
}

export type ErlebnisFilter = "Alle" | ErlebnisStatus;

export type ErlebnisSort = "Zuletzt geändert" | "Alphabetisch" | "Fortschritt";

export function getDashboardStats(erlebnisse: DashboardErlebnis[]) {
  return {
    total: erlebnisse.length,
    entwurf: erlebnisse.filter((item) => item.status === "Entwurf").length,
    veroeffentlicht: erlebnisse.filter((item) => item.status === "Veröffentlicht").length,
    inBearbeitung: erlebnisse.filter((item) => item.status === "In Bearbeitung").length,
  };
}

export function filterErlebnisse(
  erlebnisse: DashboardErlebnis[],
  query: string,
  filter: ErlebnisFilter,
): DashboardErlebnis[] {
  const normalizedQuery = query.trim().toLowerCase();

  return erlebnisse.filter((item) => {
    const matchesFilter = filter === "Alle" || item.status === filter;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      item.name.toLowerCase().includes(normalizedQuery) ||
      item.kategorie.toLowerCase().includes(normalizedQuery) ||
      item.erlebniswelt.toLowerCase().includes(normalizedQuery);

    return matchesFilter && matchesQuery;
  });
}

export function sortErlebnisse(
  erlebnisse: DashboardErlebnis[],
  sort: ErlebnisSort,
): DashboardErlebnis[] {
  const sorted = [...erlebnisse];

  switch (sort) {
    case "Alphabetisch":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "de"));
    case "Fortschritt":
      return sorted.sort((a, b) => b.progress - a.progress);
    case "Zuletzt geändert":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.lastModifiedAt).getTime() - new Date(a.lastModifiedAt).getTime(),
      );
  }
}
