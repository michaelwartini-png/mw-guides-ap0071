import type { HighlightsData } from "@/components/admin/highlightsData";
import type { MWGuidesTippsData } from "@/components/admin/mwGuidesTippsData";
import {
  getHeroVorschauBild,
  getKategorieLabel,
  type BildKategorie,
  type GalerieBild,
} from "@/components/admin/galerieData";

export type GalerieUsageContext = {
  highlights: HighlightsData;
  mwGuidesTipps: MWGuidesTippsData;
};

export type GalerieUsageEntry = {
  id: string;
  label: string;
};

const KATEGORIE_PRODUKTE: Partial<Record<BildKategorie, string[]>> = {
  hero: ["Hero", "Erlebnisprofil", "Website"],
  galerie: ["Erlebnisprofil", "Website"],
  highlight: ["Erlebnisprofil"],
  "mw-guides-tipp": ["Erlebnisprofil", "MW Guides Tipps"],
  "social-media": ["Social Media"],
  handout: ["Handout", "PDF"],
  "ride-guide": ["Ride Guide"],
  "explore-trip": ["Explore Trip"],
};

function uniqueEntries(entries: GalerieUsageEntry[]): GalerieUsageEntry[] {
  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.id)) return false;
    seen.add(entry.id);
    return true;
  });
}

/** AP-0018.3 — Wo ein Galerie-Bild im Erlebnisbaustein / in Produkten verwendet wird. */
export function getGalerieBildUsage(
  bild: GalerieBild,
  galerieItems: GalerieBild[],
  context: GalerieUsageContext,
): GalerieUsageEntry[] {
  const entries: GalerieUsageEntry[] = [];

  const heroBild = getHeroVorschauBild(galerieItems);
  if (heroBild?.id === bild.id) {
    entries.push({ id: "hero", label: "Hero" });
  }

  bild.kategorien.forEach((kategorie) => {
    KATEGORIE_PRODUKTE[kategorie]?.forEach((produkt) => {
      entries.push({ id: `produkt-${produkt}`, label: produkt });
    });
    entries.push({
      id: `kategorie-${kategorie}`,
      label: `Kategorie · ${getKategorieLabel(kategorie)}`,
    });
  });

  context.highlights.items.forEach((highlight, index) => {
    if (highlight.galerieBildId !== bild.id) return;
    const label = highlight.titel.trim() || `Highlight ${index + 1}`;
    entries.push({ id: `highlight-${highlight.id}`, label: `Highlight · ${label}` });
  });

  context.mwGuidesTipps.items.forEach((tipp, index) => {
    if (tipp.galerieBildId !== bild.id) return;
    const label = tipp.ueberschrift.trim() || `Tipp ${index + 1}`;
    entries.push({ id: `tipp-${tipp.id}`, label: `MW Guides Tipp · ${label}` });
  });

  return uniqueEntries(entries);
}

export function hasGalerieBildUsage(
  bild: GalerieBild,
  galerieItems: GalerieBild[],
  context: GalerieUsageContext,
): boolean {
  return getGalerieBildUsage(bild, galerieItems, context).length > 0;
}
