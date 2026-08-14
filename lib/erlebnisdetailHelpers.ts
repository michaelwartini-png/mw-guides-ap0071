import type { Erlebnisdetail, ErlebnisdetailOfficialInfo } from "@/types/erlebnisdetail";

export const OFFICIAL_INFO_PLACEHOLDER = "—";

function normalizeWebsiteHref(website: string): string {
  if (website.startsWith("http://") || website.startsWith("https://")) {
    return website;
  }
  return `https://${website}`;
}

/** Derive official info from existing detail fields when not explicitly provided. */
export function resolveOfficialInfo(detail: Erlebnisdetail): ErlebnisdetailOfficialInfo {
  if (detail.officialInfo) {
    return detail.officialInfo;
  }

  const euroStat = detail.stats.find((s) => s.icon === "euro");
  const freqRow = detail.practicalInfo.find((r) => r.label === "Frequenz");
  const saisonRow = detail.practicalInfo.find((r) => r.label === "Saison");

  const website = detail.operator?.website;
  const schedule = freqRow?.value ?? saisonRow?.value;

  return {
    website,
    websiteHref: website ? normalizeWebsiteHref(website) : undefined,
    map: detail.mapInfo?.coordinates,
    schedule,
    prices: euroStat?.value,
    ticketsHref: detail.ticketCtaHref,
    ticketsLabel: detail.ticketCtaLabel ?? "Tickets buchen",
  };
}

export function getPracticalIcon(label: string): string | null {
  const normalized = label.toLowerCase();
  if (normalized.includes("fahrrad")) return "🚲";
  if (normalized.includes("ticket")) return "🎟️";
  if (normalized.includes("preis")) return "💶";
  if (normalized.includes("fahrplan") || normalized.includes("öffnung")) return "🕒";
  if (normalized.includes("barrierefrei")) return "♿";
  if (normalized.includes("hund")) return "🐶";
  if (
    normalized.includes("gastronomie") ||
    normalized.includes("bistro") ||
    normalized.includes("café") ||
    normalized.includes("cafe")
  ) {
    return "☕";
  }
  if (normalized.includes("wc") || normalized.includes("toilette")) return "🚻";
  if (normalized.includes("kinderwagen")) return "👶";
  return null;
}

export function hasMapSection(detail: Erlebnisdetail): boolean {
  return Boolean(detail.mapImage || detail.mapInfo);
}
