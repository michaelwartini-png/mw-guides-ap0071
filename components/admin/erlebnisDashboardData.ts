import {
  ERLEBNIS_LIST,
  type ErlebnisRecord,
} from "@/components/admin/erlebnisData";

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
};

function toDashboardErlebnis(record: ErlebnisRecord): DashboardErlebnis {
  return {
    id: record.slug,
    name: record.name,
    kategorie: record.kategorie,
    erlebniswelt: record.erlebniswelt,
    status: record.profileStatus as ErlebnisStatus,
    progress: record.progress,
    lastModifiedAt: record.lastModifiedAt,
    lastModifiedLabel: record.lastModifiedLabel,
  };
}

export const DASHBOARD_ERLEBNISSE: DashboardErlebnis[] = ERLEBNIS_LIST.map(toDashboardErlebnis);

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
