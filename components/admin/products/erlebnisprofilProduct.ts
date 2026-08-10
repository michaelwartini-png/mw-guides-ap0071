import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import {
  getActiveBarrierefreiheitLabels,
  formatGps,
  getEffectiveOffizielleWebseite,
} from "@/components/admin/offizielleInformationenData";
import { getActiveHighlights, HIGHLIGHT_ICON_EMOJI } from "@/components/admin/highlightsData";
import {
  getActiveBilder,
  getBilderByKategorie,
  getGalerieBildById,
  getHeroVorschauBild,
  type GalerieBild,
} from "@/components/admin/galerieData";
import { getActiveTipps } from "@/components/admin/mwGuidesTippsData";
import type {
  GeneratedProductBundle,
  ProductCompleteness,
  ProductGenerator,
} from "@/components/admin/products/productTypes";

export type ErlebnisprofilStat = {
  label: string;
  value: string;
  source: string;
};

export type ErlebnisprofilImageRef = {
  src: string;
  alt: string;
  galerieBildId: string;
  source: string;
};

export type ErlebnisprofilFeature = {
  label: string;
  icon: string;
  description?: string;
  image?: ErlebnisprofilImageRef;
  source: string;
};

export type ErlebnisprofilGalleryImage = {
  src: string;
  alt: string;
  titel: string;
  source: string;
};

export type ErlebnisprofilReview = {
  source: "google" | "tripadvisor";
  rating: string;
  count: string;
  sourceField: string;
};

export type ErlebnisprofilTipp = {
  ueberschrift: string;
  beschreibung: string;
  image?: ErlebnisprofilImageRef;
  source: string;
};

export type ErlebnisprofilPracticalRow = {
  label: string;
  value: string;
  source: string;
};

export type ErlebnisprofilProduct = {
  slug: string;
  title: string;
  subtitle: string;
  badge?: string;
  heroImage: string;
  heroImageAlt: string;
  description: string;
  mwgScore: string;
  scoreBegruendung: string;
  stats: ErlebnisprofilStat[];
  features: ErlebnisprofilFeature[];
  gallery: ErlebnisprofilGalleryImage[];
  tipps: ErlebnisprofilTipp[];
  reviews: ErlebnisprofilReview[];
  practicalInfo: ErlebnisprofilPracticalRow[];
  operator: {
    name: string;
    phone: string;
    email: string;
    website: string;
    source: string;
  };
  standort: {
    adresse: string;
    gps: string;
    kartenlink: string;
    source: string;
  };
  officialLinks: {
    fahrplan: string;
    preise: string;
    ticketshop: string;
    source: string;
  };
  kategorie: string;
  erlebniswelt: string;
  laender: string[];
  regionen: string[];
  orte: string[];
};

function firstLine(value: string): string {
  return value.split("\n").map((line) => line.trim()).find(Boolean) ?? "";
}

/** AP-0018.4 — Bild aus Galerie-Referenz auflösen (keine Kopie). */
function resolveGalerieImageRef(
  galerieItems: GalerieBild[],
  galerieBildId: string | null,
): ErlebnisprofilImageRef | undefined {
  const bild = getGalerieBildById(galerieItems, galerieBildId);
  if (!bild?.bildUrl || !bild.aktiv) return undefined;

  return {
    src: bild.bildUrl,
    alt: bild.altText || bild.titel,
    galerieBildId: bild.id,
    source: "Galerie",
  };
}

function buildDescription(erlebnis: ErlebnisRecord): string {
  const parts: string[] = [];
  if (erlebnis.bewertungen.kurzbegruendung.trim()) {
    parts.push(erlebnis.bewertungen.kurzbegruendung.trim());
  }
  const highlights = getActiveHighlights(erlebnis.highlights.items);
  highlights.forEach((item) => {
    if (item.kurzbeschreibung.trim()) {
      parts.push(item.kurzbeschreibung.trim());
    }
  });
  return parts.join("\n\n");
}

function buildStats(erlebnis: ErlebnisRecord): ErlebnisprofilStat[] {
  const stats: ErlebnisprofilStat[] = [];
  const { allgemein, offizielleInformationen: offiziell, hero } = erlebnis;

  if (allgemein.untertitel.trim()) {
    stats.push({
      label: "Erlebnis",
      value: allgemein.untertitel.trim(),
      source: "Allgemein",
    });
  }
  if (allgemein.orte.length > 0) {
    stats.push({
      label: "Verbindung",
      value: allgemein.orte.join(" – "),
      source: "Allgemein",
    });
  }
  const preiseLine = firstLine(offiziell.preise);
  if (preiseLine) {
    stats.push({ label: "Preise", value: preiseLine, source: "Offizielle Informationen" });
  }
  const fahrplanLine = firstLine(offiziell.fahrplan);
  if (fahrplanLine) {
    stats.push({ label: "Betrieb", value: fahrplanLine, source: "Offizielle Informationen" });
  }
  if (offiziell.betreiber.trim()) {
    stats.push({
      label: "Betreiber",
      value: offiziell.betreiber.trim(),
      source: "Offizielle Informationen",
    });
  }
  if (hero.score.trim()) {
    stats.push({ label: "MW Guides Score", value: hero.score.trim(), source: "Hero" });
  }

  return stats;
}

function buildPracticalInfo(erlebnis: ErlebnisRecord): ErlebnisprofilPracticalRow[] {
  const rows: ErlebnisprofilPracticalRow[] = [];
  const offiziell = erlebnis.offizielleInformationen;

  if (offiziell.fahrplan.trim()) {
    rows.push({
      label: "Fahrplan",
      value: offiziell.fahrplan.trim(),
      source: "Offizielle Informationen",
    });
  }
  if (offiziell.preise.trim()) {
    rows.push({
      label: "Preise",
      value: offiziell.preise.trim(),
      source: "Offizielle Informationen",
    });
  }

  getActiveBarrierefreiheitLabels(offiziell).forEach((label) => {
    rows.push({
      label: "Barrierefreiheit",
      value: label,
      source: "Offizielle Informationen",
    });
  });

  if (offiziell.standortAnreise.anreiseHinweise.trim()) {
    rows.push({
      label: "Anreise",
      value: offiziell.standortAnreise.anreiseHinweise.trim(),
      source: "Offizielle Informationen",
    });
  }

  return rows;
}

export function generateErlebnisprofil(erlebnis: ErlebnisRecord): ErlebnisprofilProduct {
  const heroBild = getHeroVorschauBild(erlebnis.galerie.items);
  const galerieBilder = getBilderByKategorie(erlebnis.galerie.items, "galerie");
  const gallerySource =
    galerieBilder.length > 0 ? galerieBilder : getActiveBilder(erlebnis.galerie.items);

  return {
    slug: erlebnis.slug,
    title: erlebnis.allgemein.name.trim() || erlebnis.name,
    subtitle: erlebnis.allgemein.untertitel.trim() || erlebnis.hero.untertitel.trim(),
    badge: erlebnis.hero.badges[0],
    heroImage: heroBild?.bildUrl ?? gallerySource[0]?.bildUrl ?? "",
    heroImageAlt: heroBild?.altText ?? gallerySource[0]?.altText ?? "",
    description: buildDescription(erlebnis),
    mwgScore: erlebnis.bewertungen.mwgScore.trim() || erlebnis.hero.score.trim(),
    scoreBegruendung: erlebnis.bewertungen.kurzbegruendung.trim(),
    stats: buildStats(erlebnis),
    features: getActiveHighlights(erlebnis.highlights.items).map((item) => ({
      label: item.titel,
      icon: HIGHLIGHT_ICON_EMOJI[item.icon],
      description: item.kurzbeschreibung.trim() || undefined,
      image: resolveGalerieImageRef(erlebnis.galerie.items, item.galerieBildId),
      source: "Highlights",
    })),
    gallery: gallerySource.map((bild) => ({
      src: bild.bildUrl,
      alt: bild.altText || bild.titel,
      titel: bild.titel,
      source: "Galerie",
    })),
    tipps: getActiveTipps(erlebnis.mwGuidesTipps.items).map((tipp) => ({
      ueberschrift: tipp.ueberschrift,
      beschreibung: tipp.beschreibung,
      image: resolveGalerieImageRef(erlebnis.galerie.items, tipp.galerieBildId),
      source: "MW Guides Tipps",
    })),
    reviews: [
      erlebnis.bewertungen.google.bewertung.trim() && {
        source: "google" as const,
        rating: erlebnis.bewertungen.google.bewertung,
        count: erlebnis.bewertungen.google.anzahl,
        sourceField: "Bewertungen",
      },
      erlebnis.bewertungen.tripadvisor.bewertung.trim() && {
        source: "tripadvisor" as const,
        rating: erlebnis.bewertungen.tripadvisor.bewertung,
        count: erlebnis.bewertungen.tripadvisor.anzahl,
        sourceField: "Bewertungen",
      },
    ].filter(Boolean) as ErlebnisprofilReview[],
    practicalInfo: buildPracticalInfo(erlebnis),
    operator: {
      name: erlebnis.offizielleInformationen.betreiber,
      phone: erlebnis.offizielleInformationen.telefon,
      email: erlebnis.offizielleInformationen.email,
      website: getEffectiveOffizielleWebseite(erlebnis.offizielleInformationen),
      source: "Offizielle Informationen",
    },
    standort: {
      adresse: erlebnis.offizielleInformationen.standortAnreise.adresse,
      gps: formatGps(erlebnis.offizielleInformationen.standortAnreise) ?? "",
      kartenlink: erlebnis.offizielleInformationen.standortAnreise.kartenlink,
      source: "Offizielle Informationen",
    },
    officialLinks: {
      fahrplan: erlebnis.offizielleInformationen.fahrplan,
      preise: erlebnis.offizielleInformationen.preise,
      ticketshop: erlebnis.offizielleInformationen.ticketshop,
      source: "Offizielle Informationen",
    },
    kategorie: erlebnis.allgemein.kategorie,
    erlebniswelt: erlebnis.allgemein.erlebniswelt,
    laender: erlebnis.allgemein.laender,
    regionen: erlebnis.allgemein.regionen,
    orte: erlebnis.allgemein.orte,
  };
}

export function getErlebnisprofilCompleteness(erlebnis: ErlebnisRecord): ProductCompleteness {
  const heroBild = getHeroVorschauBild(erlebnis.galerie.items);
  const activeGallery = getActiveBilder(erlebnis.galerie.items);
  const activeHighlights = getActiveHighlights(erlebnis.highlights.items);
  const activeTipps = getActiveTipps(erlebnis.mwGuidesTipps.items);

  const items = [
    {
      id: "title",
      label: "Titel & Untertitel",
      ok: Boolean(erlebnis.allgemein.name.trim() && erlebnis.allgemein.untertitel.trim()),
      source: "Allgemein",
    },
    {
      id: "hero",
      label: "Hero-Bild",
      ok: Boolean(heroBild?.bildUrl),
      source: "Galerie",
    },
    {
      id: "description",
      label: "Beschreibung",
      ok: Boolean(
        erlebnis.bewertungen.kurzbegruendung.trim() || activeHighlights.length > 0,
      ),
      source: "Bewertungen / Highlights",
    },
    {
      id: "highlights",
      label: "Highlights",
      ok: activeHighlights.length >= 3,
      source: "Highlights",
    },
    {
      id: "tipps",
      label: "MW Guides Tipps",
      ok: activeTipps.length >= 2,
      source: "MW Guides Tipps",
    },
    {
      id: "gallery",
      label: "Galerie",
      ok: activeGallery.length >= 3,
      source: "Galerie",
    },
    {
      id: "bewertungen",
      label: "Bewertungen",
      ok: Boolean(erlebnis.bewertungen.mwgScore.trim()),
      source: "Bewertungen",
    },
    {
      id: "offiziell",
      label: "Offizielle Informationen",
      ok: Boolean(
        erlebnis.offizielleInformationen.betreiber.trim() &&
          erlebnis.offizielleInformationen.preise.trim(),
      ),
      source: "Offizielle Informationen",
    },
    {
      id: "standort",
      label: "Standort & Anreise",
      ok: Boolean(erlebnis.offizielleInformationen.standortAnreise.adresse.trim()),
      source: "Offizielle Informationen",
    },
  ];

  const filled = items.filter((item) => item.ok).length;
  return {
    filled,
    total: items.length,
    percent: Math.round((filled / items.length) * 100),
    items,
  };
}

export function canGenerateErlebnisprofil(erlebnis: ErlebnisRecord): boolean {
  const completeness = getErlebnisprofilCompleteness(erlebnis);
  return completeness.percent >= 70;
}

export function generateErlebnisprofilBundle(
  erlebnis: ErlebnisRecord,
): GeneratedProductBundle<ErlebnisprofilProduct> {
  return {
    meta: {
      productId: "erlebnisprofil",
      sourceSlug: erlebnis.slug,
      generatedAt: new Date().toISOString(),
      masterVersionLabel: erlebnis.lastModifiedLabel,
    },
    product: generateErlebnisprofil(erlebnis),
    completeness: getErlebnisprofilCompleteness(erlebnis),
  };
}

export const erlebnisprofilGenerator: ProductGenerator<ErlebnisprofilProduct> = {
  id: "erlebnisprofil",
  generate: generateErlebnisprofil,
  getCompleteness: getErlebnisprofilCompleteness,
  canGenerate: canGenerateErlebnisprofil,
};
