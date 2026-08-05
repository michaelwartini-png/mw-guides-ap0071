export type ErlebnisStatus = "Entwurf" | "In Bearbeitung" | "Veröffentlicht";

export type DashboardErlebnis = {
  id: string;
  name: string;
  kategorie: string;
  erlebniswelt: string;
  status: ErlebnisStatus;
  progress: number;
  /** ISO date string for sorting */
  lastModifiedAt: string;
  lastModifiedLabel: string;
};

export const DASHBOARD_ERLEBNISSE: DashboardErlebnis[] = [
  {
    id: "katamaran-konstanz-friedrichshafen",
    name: "Katamaran Konstanz–Friedrichshafen",
    kategorie: "Schifffahrt",
    erlebniswelt: "Wasser",
    status: "Entwurf",
    progress: 22,
    lastModifiedAt: "2026-08-05T09:45:00",
    lastModifiedLabel: "05.08.2026 · 09:45 Uhr",
  },
  {
    id: "wuppertaler-schwebebahn",
    name: "Wuppertaler Schwebebahn",
    kategorie: "Schwebebahn",
    erlebniswelt: "Technik",
    status: "Veröffentlicht",
    progress: 100,
    lastModifiedAt: "2026-08-04T16:20:00",
    lastModifiedLabel: "04.08.2026 · 16:20 Uhr",
  },
  {
    id: "glacier-express",
    name: "Glacier Express",
    kategorie: "Bahn",
    erlebniswelt: "Bahn",
    status: "Entwurf",
    progress: 8,
    lastModifiedAt: "2026-08-03T11:10:00",
    lastModifiedLabel: "03.08.2026 · 11:10 Uhr",
  },
];

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
