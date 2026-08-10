export const BILD_KATEGORIEN = [
  { id: "hero", label: "Hero" },
  { id: "galerie", label: "Galerie" },
  { id: "highlight", label: "Highlight" },
  { id: "mw-guides-tipp", label: "MW Guides Tipp" },
  { id: "social-media", label: "Social Media" },
  { id: "handout", label: "Handout" },
  { id: "ride-guide", label: "Ride Guide" },
  { id: "explore-trip", label: "Explore Trip" },
] as const;

export type BildKategorie = (typeof BILD_KATEGORIEN)[number]["id"];

export const BILD_TYPEN = [
  { id: "offizielles-pressefoto", label: "Offizielles Pressefoto" },
  { id: "eigenes-foto", label: "Eigenes Foto" },
  { id: "wikimedia-commons", label: "Wikimedia Commons" },
  { id: "betreiberfoto", label: "Betreiberfoto" },
  { id: "ki-generiert", label: "KI-generiert (nur intern)" },
  { id: "screenshot", label: "Screenshot" },
  { id: "historisches-foto", label: "Historisches Foto" },
] as const;

export type BildTyp = (typeof BILD_TYPEN)[number]["id"];

export const KI_BILD_STATUS_OPTIONS = [
  { id: "neu", label: "Neu" },
  { id: "geprueft", label: "Geprüft" },
  { id: "freigegeben", label: "Freigegeben" },
  { id: "abgelehnt", label: "Abgelehnt" },
] as const;

export type KiBildStatus = (typeof KI_BILD_STATUS_OPTIONS)[number]["id"];

export const JAHRESZEIT_OPTIONS = [
  { value: "", label: "Keine Angabe" },
  { value: "fruehling", label: "Frühling" },
  { value: "sommer", label: "Sommer" },
  { value: "herbst", label: "Herbst" },
  { value: "winter", label: "Winter" },
] as const;

export type Jahreszeit = (typeof JAHRESZEIT_OPTIONS)[number]["value"];

export type GalerieBild = {
  id: string;
  bildUrl: string;
  titel: string;
  kurzbeschreibung: string;
  fotograf: string;
  quelle: string;
  lizenz: string;
  copyright: string;
  altText: string;
  reihenfolge: number;
  aktiv: boolean;
  kategorien: BildKategorie[];
  bildtyp: BildTyp;
  pflichtbild: boolean;
  aufnahmeort: string;
  gps: string;
  aufnahmedatum: string;
  blickrichtung: string;
  jahreszeit: Jahreszeit;
  sternBewertung: number;
  mwGuidesBildscore: number;
  kiQuelle: string;
  kiStatus: KiBildStatus;
};

export type GalerieData = {
  items: GalerieBild[];
};

export const EMPTY_GALERIE_DATA: GalerieData = {
  items: [],
};

export const PRESET_BILDER = [
  { url: "/images/explore-trips/bodensee-schifffahrt.jpg", label: "Katamaran auf dem Bodensee" },
  { url: "/images/explore-trips/bodensee-konstanz.jpg", label: "Konstanz Hafen" },
  { url: "/images/explore-trips/bodensee-zeppelin.jpg", label: "Zeppelin über dem See" },
  { url: "/images/explore-trips/bodensee-hero.jpg", label: "Bodensee Panorama" },
  { url: "/images/explore-trips/bodensee-natur.jpg", label: "Alpenpanorama Bodensee" },
  { url: "/images/tours/schwebebahn-detail-hero.webp", label: "Schwebebahn Detail" },
  { url: "/images/reiseideen/125-jahre-historisch.jpg", label: "Schwebebahn historisch" },
  { url: "/images/reiseideen/dieselbe-kurve-01.jpg", label: "Schwebebahn Kurve" },
  { url: "/images/explore-trips/mailand-natur.jpg", label: "Alpenlandschaft" },
  { url: "/images/explore-trips/wachau.jpg", label: "Viadukt Panorama" },
] as const;

export function sortGalerieBilder(items: GalerieBild[]): GalerieBild[] {
  return [...items].sort((a, b) => a.reihenfolge - b.reihenfolge);
}

export function getActiveBilder(items: GalerieBild[]): GalerieBild[] {
  return sortGalerieBilder(items).filter((item) => item.aktiv);
}

export function getBilderByKategorie(
  items: GalerieBild[],
  kategorie: BildKategorie,
  onlyActive = true,
): GalerieBild[] {
  const filtered = items.filter(
    (item) => item.kategorien.includes(kategorie) && (!onlyActive || item.aktiv),
  );
  return sortGalerieBilder(filtered);
}

export function getHeroVorschauBild(items: GalerieBild[]): GalerieBild | undefined {
  const heroBilder = getBilderByKategorie(items, "hero");
  if (heroBilder.length === 0) return undefined;
  return [...heroBilder].sort(
    (a, b) => b.mwGuidesBildscore - a.mwGuidesBildscore || a.reihenfolge - b.reihenfolge,
  )[0];
}

export function getGalerieBildById(
  items: GalerieBild[],
  id: string | null | undefined,
): GalerieBild | undefined {
  if (!id) return undefined;
  return items.find((item) => item.id === id);
}

export function getKategorieLabel(id: BildKategorie): string {
  return BILD_KATEGORIEN.find((entry) => entry.id === id)?.label ?? id;
}

export function getBildtypLabel(id: BildTyp): string {
  return BILD_TYPEN.find((entry) => entry.id === id)?.label ?? id;
}

export function getKiStatusLabel(id: KiBildStatus): string {
  return KI_BILD_STATUS_OPTIONS.find((entry) => entry.id === id)?.label ?? id;
}

export function getNextReihenfolge(items: GalerieBild[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.reihenfolge)) + 1;
}

function createBild(partial: Omit<GalerieBild, "id"> & { id?: string }): GalerieBild {
  return {
    id: partial.id ?? `bild-${partial.reihenfolge}`,
    bildUrl: partial.bildUrl,
    titel: partial.titel,
    kurzbeschreibung: partial.kurzbeschreibung,
    fotograf: partial.fotograf,
    quelle: partial.quelle,
    lizenz: partial.lizenz,
    copyright: partial.copyright,
    altText: partial.altText,
    reihenfolge: partial.reihenfolge,
    aktiv: partial.aktiv,
    kategorien: partial.kategorien,
    bildtyp: partial.bildtyp,
    pflichtbild: partial.pflichtbild,
    aufnahmeort: partial.aufnahmeort,
    gps: partial.gps,
    aufnahmedatum: partial.aufnahmedatum,
    blickrichtung: partial.blickrichtung,
    jahreszeit: partial.jahreszeit,
    sternBewertung: partial.sternBewertung,
    mwGuidesBildscore: partial.mwGuidesBildscore,
    kiQuelle: partial.kiQuelle,
    kiStatus: partial.kiStatus,
  };
}

export function createGalerieBild(
  partial: Partial<Omit<GalerieBild, "id">> & { reihenfolge: number; id?: string },
): GalerieBild {
  return createBild({
    id: partial.id ?? `bild-${Date.now()}-${partial.reihenfolge}`,
    bildUrl: partial.bildUrl ?? "",
    titel: partial.titel ?? "",
    kurzbeschreibung: partial.kurzbeschreibung ?? "",
    fotograf: partial.fotograf ?? "",
    quelle: partial.quelle ?? "",
    lizenz: partial.lizenz ?? "",
    copyright: partial.copyright ?? "",
    altText: partial.altText ?? "",
    reihenfolge: partial.reihenfolge,
    aktiv: partial.aktiv ?? true,
    kategorien: partial.kategorien ?? ["galerie"],
    bildtyp: partial.bildtyp ?? "eigenes-foto",
    pflichtbild: partial.pflichtbild ?? false,
    aufnahmeort: partial.aufnahmeort ?? "",
    gps: partial.gps ?? "",
    aufnahmedatum: partial.aufnahmedatum ?? "",
    blickrichtung: partial.blickrichtung ?? "",
    jahreszeit: partial.jahreszeit ?? "",
    sternBewertung: partial.sternBewertung ?? 0,
    mwGuidesBildscore: partial.mwGuidesBildscore ?? 0,
    kiQuelle: partial.kiQuelle ?? "",
    kiStatus: partial.kiStatus ?? "neu",
  });
}

export function swapGalerieOrder(
  items: GalerieBild[],
  id: string,
  direction: "up" | "down",
): GalerieBild[] {
  const sorted = sortGalerieBilder(items);
  const index = sorted.findIndex((item) => item.id === id);
  if (index === -1) return items;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= sorted.length) return items;

  const current = sorted[index];
  const target = sorted[targetIndex];

  return items.map((item) => {
    if (item.id === current.id) return { ...item, reihenfolge: target.reihenfolge };
    if (item.id === target.id) return { ...item, reihenfolge: current.reihenfolge };
    return item;
  });
}

export function toggleKategorie(
  kategorien: BildKategorie[],
  kategorie: BildKategorie,
): BildKategorie[] {
  return kategorien.includes(kategorie)
    ? kategorien.filter((entry) => entry !== kategorie)
    : [...kategorien, kategorie];
}

/** Entfernt Hero-Kategorie bei allen Bildern außer targetId. */
export function removeHeroFromOthers(items: GalerieBild[], targetId: string): GalerieBild[] {
  return items.map((item) =>
    item.id === targetId
      ? item
      : { ...item, kategorien: item.kategorien.filter((entry) => entry !== "hero") },
  );
}

/** Setzt genau ein Hero-Bild – entfernt Hero bei allen anderen. */
export function applyExclusiveHero(items: GalerieBild[], targetId: string): GalerieBild[] {
  const withHero = items.map((item): GalerieBild => {
    if (item.id !== targetId) return item;
    const kategorien: BildKategorie[] = item.kategorien.includes("hero")
      ? item.kategorien
      : [...item.kategorien, "hero"];
    return { ...item, kategorien };
  });
  return removeHeroFromOthers(withHero, targetId);
}

/** Kategorie umschalten – bei Hero gilt Exklusivitätsregel. */
export function toggleKategorieWithHeroRule(
  items: GalerieBild[],
  targetId: string,
  kategorie: BildKategorie,
): GalerieBild[] {
  const target = items.find((item) => item.id === targetId);
  if (!target) return items;

  const addingHero = kategorie === "hero" && !target.kategorien.includes("hero");

  let updated = items.map((item) => {
    if (item.id !== targetId) return item;
    return { ...item, kategorien: toggleKategorie(item.kategorien, kategorie) };
  });

  if (addingHero) {
    updated = removeHeroFromOthers(updated, targetId);
  }

  return updated;
}

/** Setzt genau ein Pflichtbild – deaktiviert Pflichtbild-Markierung bei allen anderen. */
export function setPflichtbildForItem(
  items: GalerieBild[],
  targetId: string,
  value: boolean,
): GalerieBild[] {
  if (!value) {
    return items.map((item) =>
      item.id === targetId ? { ...item, pflichtbild: false } : item,
    );
  }
  return items.map((item) => ({
    ...item,
    pflichtbild: item.id === targetId,
  }));
}

export const VORSCHAU_KATEGORIEN: BildKategorie[] = [
  "hero",
  "galerie",
  "highlight",
  "mw-guides-tipp",
  "social-media",
  "handout",
  "ride-guide",
  "explore-trip",
];

export const GALERIE_KATAMARAN: GalerieData = {
  items: [
    createBild({
      id: "gk1",
      bildUrl: "/images/explore-trips/bodensee-schifffahrt.jpg",
      titel: "Katamaran auf dem Bodensee",
      kurzbeschreibung: "Der Schnellfähre-Katamaran in voller Fahrt Richtung Friedrichshafen.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Weißer Katamaran auf blauem Bodensee mit Alpenpanorama",
      reihenfolge: 1,
      aktiv: true,
      kategorien: ["hero", "galerie", "explore-trip"],
      bildtyp: "eigenes-foto",
      pflichtbild: true,
      aufnahmeort: "Bodensee, offene Fahrtstrecke",
      gps: "47.65, 9.18",
      aufnahmedatum: "2025-07-14",
      blickrichtung: "Südost",
      jahreszeit: "sommer",
      sternBewertung: 5,
      mwGuidesBildscore: 96,
      kiQuelle: "",
      kiStatus: "freigegeben",
    }),
    createBild({
      id: "gk2",
      bildUrl: "/images/explore-trips/bodensee-konstanz.jpg",
      titel: "Ankunft Konstanz",
      kurzbeschreibung: "Der Hafenbereich von Konstanz kurz vor dem Einlaufen.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Katamaran im Hafen von Konstanz",
      reihenfolge: 2,
      aktiv: true,
      kategorien: ["galerie", "ride-guide"],
      bildtyp: "eigenes-foto",
      pflichtbild: false,
      aufnahmeort: "Konstanz Hafen",
      gps: "47.66, 9.18",
      aufnahmedatum: "2025-07-14",
      blickrichtung: "Nord",
      jahreszeit: "sommer",
      sternBewertung: 4,
      mwGuidesBildscore: 82,
      kiQuelle: "",
      kiStatus: "freigegeben",
    }),
    createBild({
      id: "gk3",
      bildUrl: "/images/explore-trips/bodensee-zeppelin.jpg",
      titel: "Zeppelin über dem See",
      kurzbeschreibung: "Klassischer Blick vom Deck – Zeppelin und Alpen im Hintergrund.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Zeppelin über dem Bodensee vom Katamaran-Deck aus",
      reihenfolge: 3,
      aktiv: true,
      kategorien: ["galerie", "social-media", "highlight"],
      bildtyp: "eigenes-foto",
      pflichtbild: false,
      aufnahmeort: "Mitte Bodensee",
      gps: "",
      aufnahmedatum: "2025-08-02",
      blickrichtung: "Ost",
      jahreszeit: "sommer",
      sternBewertung: 5,
      mwGuidesBildscore: 91,
      kiQuelle: "",
      kiStatus: "geprueft",
    }),
    createBild({
      id: "gk4",
      bildUrl: "/images/explore-trips/bodensee-natur.jpg",
      titel: "Alpenpanorama vom Deck",
      kurzbeschreibung: "Weitblick auf die Schweizer Alpen bei klarer Sicht.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Alpenpanorama vom Katamaran-Deck",
      reihenfolge: 4,
      aktiv: true,
      kategorien: ["galerie", "handout"],
      bildtyp: "eigenes-foto",
      pflichtbild: false,
      aufnahmeort: "",
      gps: "",
      aufnahmedatum: "",
      blickrichtung: "",
      jahreszeit: "",
      sternBewertung: 4,
      mwGuidesBildscore: 78,
      kiQuelle: "Foto-Agent Vorschlag",
      kiStatus: "neu",
    }),
    createBild({
      id: "gk5",
      bildUrl: "/images/explore-trips/bodensee-hero.jpg",
      titel: "Sonnenuntergang Bodensee",
      kurzbeschreibung: "Abendstimmung – ideal für Social-Media-Posts.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Sonnenuntergang über dem Bodensee",
      reihenfolge: 5,
      aktiv: false,
      kategorien: ["social-media"],
      bildtyp: "eigenes-foto",
      pflichtbild: false,
      aufnahmeort: "",
      gps: "",
      aufnahmedatum: "2025-06-20",
      blickrichtung: "West",
      jahreszeit: "sommer",
      sternBewertung: 3,
      mwGuidesBildscore: 65,
      kiQuelle: "",
      kiStatus: "abgelehnt",
    }),
  ],
};

export const GALERIE_SCHWEBEBAHN: GalerieData = {
  items: [
    createBild({
      id: "gs1",
      bildUrl: "/images/tours/schwebebahn-detail-hero.webp",
      titel: "Kaiserwagen der Schwebebahn",
      kurzbeschreibung: "Der historische Kaiserwagen – Pflichtmotiv für jedes Schwebebahn-Profil.",
      fotograf: "WSW mobil",
      quelle: "Offizielle Pressestelle",
      lizenz: "Pressefreigabe WSW",
      copyright: "© WSW mobil",
      altText: "Historischer Kaiserwagen der Wuppertaler Schwebebahn",
      reihenfolge: 1,
      aktiv: true,
      kategorien: ["hero", "galerie", "handout", "explore-trip"],
      bildtyp: "offizielles-pressefoto",
      pflichtbild: true,
      aufnahmeort: "Wuppertal, Station Vohwinkel",
      gps: "51.26, 7.09",
      aufnahmedatum: "2023-05-12",
      blickrichtung: "Süd",
      jahreszeit: "fruehling",
      sternBewertung: 5,
      mwGuidesBildscore: 98,
      kiQuelle: "",
      kiStatus: "freigegeben",
    }),
    createBild({
      id: "gs2",
      bildUrl: "/images/reiseideen/125-jahre-historisch.jpg",
      titel: "Schwebebahn 1901",
      kurzbeschreibung: "Historische Aufnahme aus dem Eröffnungsjahr.",
      fotograf: "Unbekannt",
      quelle: "Stadtarchiv Wuppertal",
      lizenz: "Public Domain",
      copyright: "Gemeinfrei",
      altText: "Historische Schwebebahn in Wuppertal 1901",
      reihenfolge: 2,
      aktiv: true,
      kategorien: ["galerie", "highlight"],
      bildtyp: "historisches-foto",
      pflichtbild: false,
      aufnahmeort: "Wuppertal",
      gps: "",
      aufnahmedatum: "1901-03-01",
      blickrichtung: "",
      jahreszeit: "",
      sternBewertung: 4,
      mwGuidesBildscore: 88,
      kiQuelle: "",
      kiStatus: "freigegeben",
    }),
    createBild({
      id: "gs3",
      bildUrl: "/images/reiseideen/dieselbe-kurve-01.jpg",
      titel: "Schwebebahn in der Kurve",
      kurzbeschreibung: "Die berühmte Kurve über der Wupper – bester Fotospot.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Schwebebahnwagen schwebt durch eine Kurve über der Wupper",
      reihenfolge: 3,
      aktiv: true,
      kategorien: ["galerie", "social-media", "ride-guide"],
      bildtyp: "eigenes-foto",
      pflichtbild: false,
      aufnahmeort: "Wuppertal, Wupperkurve",
      gps: "51.25, 7.15",
      aufnahmedatum: "2024-10-05",
      blickrichtung: "West",
      jahreszeit: "herbst",
      sternBewertung: 5,
      mwGuidesBildscore: 93,
      kiQuelle: "",
      kiStatus: "freigegeben",
    }),
    createBild({
      id: "gs4",
      bildUrl: "/images/reiseideen/neue-generation-hero.jpg",
      titel: "Generation 15 Wagen",
      kurzbeschreibung: "Die neue Wagen-Generation seit 2016 im Einsatz.",
      fotograf: "WSW mobil",
      quelle: "Betreiber",
      lizenz: "Pressefreigabe WSW",
      copyright: "© WSW mobil",
      altText: "Moderner blauer Schwebebahnwagen Generation 15",
      reihenfolge: 4,
      aktiv: true,
      kategorien: ["galerie", "mw-guides-tipp"],
      bildtyp: "betreiberfoto",
      pflichtbild: false,
      aufnahmeort: "",
      gps: "",
      aufnahmedatum: "",
      blickrichtung: "",
      jahreszeit: "",
      sternBewertung: 3,
      mwGuidesBildscore: 72,
      kiQuelle: "Asset-Agent",
      kiStatus: "geprueft",
    }),
  ],
};

export const GALERIE_GLACIER: GalerieData = {
  items: [
    createBild({
      id: "gg1",
      bildUrl: "/images/explore-trips/wachau.jpg",
      titel: "Landwasserviadukt",
      kurzbeschreibung: "Das ikonische Viadukt – Pflichtmotiv für jedes Glacier-Express-Profil.",
      fotograf: "Rhaetian Railway",
      quelle: "Offizielle Pressestelle",
      lizenz: "Pressefreigabe RhB",
      copyright: "© Rhätische Bahn",
      altText: "Roter Glacier Express auf dem Landwasserviadukt",
      reihenfolge: 1,
      aktiv: true,
      kategorien: ["hero", "galerie", "explore-trip", "handout"],
      bildtyp: "offizielles-pressefoto",
      pflichtbild: true,
      aufnahmeort: "Filisur, Graubünden",
      gps: "46.68, 9.67",
      aufnahmedatum: "2024-09-18",
      blickrichtung: "Nord",
      jahreszeit: "herbst",
      sternBewertung: 5,
      mwGuidesBildscore: 99,
      kiQuelle: "",
      kiStatus: "freigegeben",
    }),
    createBild({
      id: "gg2",
      bildUrl: "/images/explore-trips/mailand-natur.jpg",
      titel: "Alpenpanorama im Zug",
      kurzbeschreibung: "Panoramafenster mit Blick auf Gletscherregionen.",
      fotograf: "MW Guides",
      quelle: "Eigenaufnahme",
      lizenz: "© MW Guides",
      copyright: "© MW Guides",
      altText: "Alpenpanorama durch Panoramafenster im Glacier Express",
      reihenfolge: 2,
      aktiv: true,
      kategorien: ["galerie", "highlight"],
      bildtyp: "eigenes-foto",
      pflichtbild: false,
      aufnahmeort: "Oberalp Pass",
      gps: "",
      aufnahmedatum: "2025-03-10",
      blickrichtung: "Süd",
      jahreszeit: "winter",
      sternBewertung: 4,
      mwGuidesBildscore: 85,
      kiQuelle: "",
      kiStatus: "geprueft",
    }),
    createBild({
      id: "gg3",
      bildUrl: "/images/explore-trips/mailand-hero.jpg",
      titel: "Glacier Express Excellence Class",
      kurzbeschreibung: "Innenraum der Excellence Class – ideal für Handouts.",
      fotograf: "Glacier Express AG",
      quelle: "Betreiber",
      lizenz: "Pressefreigabe",
      copyright: "© Glacier Express AG",
      altText: "Luxuriöser Innenraum der Excellence Class",
      reihenfolge: 3,
      aktiv: true,
      kategorien: ["galerie", "handout", "social-media"],
      bildtyp: "betreiberfoto",
      pflichtbild: false,
      aufnahmeort: "",
      gps: "",
      aufnahmedatum: "",
      blickrichtung: "",
      jahreszeit: "",
      sternBewertung: 3,
      mwGuidesBildscore: 70,
      kiQuelle: "Foto-Agent Vorschlag",
      kiStatus: "neu",
    }),
  ],
};
