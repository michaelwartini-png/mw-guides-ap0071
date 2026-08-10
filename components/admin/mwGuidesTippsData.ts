export const STANDARD_TIPP_THEMEN = [
  { id: "beste-besuchszeit", label: "Beste Besuchszeit" },
  { id: "beste-sitzplaetze", label: "Beste Sitzplätze" },
  { id: "beste-fotospots", label: "Beste Fotospots" },
  { id: "aussicht", label: "Aussicht" },
  { id: "sonnenuntergang", label: "Sonnenuntergang" },
  { id: "familien", label: "Familien" },
  { id: "kinder", label: "Kinder" },
  { id: "barrierefreiheit", label: "Barrierefreiheit" },
  { id: "fahrrad", label: "Fahrrad" },
  { id: "hunde", label: "Hunde" },
  { id: "essen-trinken", label: "Essen & Trinken" },
  { id: "toiletten", label: "Toiletten" },
  { id: "schlechtwetter", label: "Schlechtwetter" },
  { id: "menschenmengen", label: "Menschenmengen vermeiden" },
  { id: "dauer", label: "Dauer" },
  { id: "kombinationen", label: "Kombinationen" },
  { id: "unsere-empfehlung", label: "Unsere Empfehlung" },
] as const;

export type StandardTippThema = (typeof STANDARD_TIPP_THEMEN)[number]["id"];

export type TippTyp = "standard" | "frei";

export type TippPrioritaet = "" | "hoch" | "mittel" | "niedrig";

export type MWGuidesTippItem = {
  id: string;
  typ: TippTyp;
  thema?: StandardTippThema;
  ueberschrift: string;
  beschreibung: string;
  prioritaet: TippPrioritaet;
  /** AP-0018.3 — Referenz auf Galerie-Bild, kein eigener Upload. */
  galerieBildId: string | null;
  reihenfolge: number;
  aktiv: boolean;
};

export type MWGuidesTippsData = {
  items: MWGuidesTippItem[];
};

export const PRIORITAET_OPTIONS: { value: TippPrioritaet; label: string }[] = [
  { value: "", label: "Keine Priorität" },
  { value: "hoch", label: "Hoch" },
  { value: "mittel", label: "Mittel" },
  { value: "niedrig", label: "Niedrig" },
];

export const EMPTY_MW_GUIDES_TIPPS_DATA: MWGuidesTippsData = {
  items: [],
};

export function sortTipps(items: MWGuidesTippItem[]): MWGuidesTippItem[] {
  return [...items].sort((a, b) => a.reihenfolge - b.reihenfolge);
}

export function getActiveTipps(items: MWGuidesTippItem[]): MWGuidesTippItem[] {
  return sortTipps(items).filter((item) => item.aktiv);
}

export function getThemaLabel(thema: StandardTippThema): string {
  return STANDARD_TIPP_THEMEN.find((entry) => entry.id === thema)?.label ?? thema;
}

function createItem(
  partial: Omit<MWGuidesTippItem, "id"> & { id?: string },
): MWGuidesTippItem {
  return {
    id: partial.id ?? `tipp-${partial.reihenfolge}`,
    typ: partial.typ,
    thema: partial.thema,
    ueberschrift: partial.ueberschrift,
    beschreibung: partial.beschreibung,
    prioritaet: partial.prioritaet,
    galerieBildId: partial.galerieBildId ?? null,
    reihenfolge: partial.reihenfolge,
    aktiv: partial.aktiv,
  };
}

export function getNextReihenfolge(items: MWGuidesTippItem[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.reihenfolge)) + 1;
}

export function createStandardTipp(thema: StandardTippThema, reihenfolge: number): MWGuidesTippItem {
  const label = getThemaLabel(thema);
  return createItem({
    id: `tipp-${Date.now()}-${reihenfolge}`,
    typ: "standard",
    thema,
    ueberschrift: label,
    beschreibung: "",
    prioritaet: "",
    galerieBildId: null,
    reihenfolge,
    aktiv: true,
  });
}

export function createFreierTipp(reihenfolge: number): MWGuidesTippItem {
  return createItem({
    id: `tipp-${Date.now()}-${reihenfolge}`,
    typ: "frei",
    ueberschrift: "",
    beschreibung: "",
    prioritaet: "",
    galerieBildId: null,
    reihenfolge,
    aktiv: true,
  });
}

export function swapTippOrder(
  items: MWGuidesTippItem[],
  id: string,
  direction: "up" | "down",
): MWGuidesTippItem[] {
  const sorted = sortTipps(items);
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

export const TIPPS_KATAMARAN: MWGuidesTippsData = {
  items: [
    createItem({
      id: "tk1",
      typ: "standard",
      thema: "beste-sitzplaetze",
      ueberschrift: "Beste Sitzplätze",
      beschreibung:
        "Auf der Fahrt Richtung Friedrichshafen links sitzen – dort liegt die Sonnenseite und der Blick auf den Schweizer Uferbereich ist am schönsten.",
      prioritaet: "hoch",
      galerieBildId: "gk1",
      reihenfolge: 1,
      aktiv: true,
    }),
    createItem({
      id: "tk2",
      typ: "standard",
      thema: "beste-fotospots",
      ueberschrift: "Beste Fotospots",
      beschreibung:
        "Vom offenen Deck kurz vor der Ankunft in Friedrichshafen: Zeppelin im Hafen und Alpenkette im Hintergrund.",
      prioritaet: "mittel",
      galerieBildId: null,
      reihenfolge: 2,
      aktiv: true,
    }),
    createItem({
      id: "tk3",
      typ: "frei",
      ueberschrift: "Auf der Rückfahrt rechts sitzen",
      beschreibung:
        "Nachmittags Richtung Konstanz lohnt sich die rechte Seite – besonders bei klarem Wetter für den Blick auf Mainau und die Alpen.",
      prioritaet: "",
      galerieBildId: null,
      reihenfolge: 3,
      aktiv: true,
    }),
    createItem({
      id: "tk4",
      typ: "standard",
      thema: "kombinationen",
      ueberschrift: "Kombinationen",
      beschreibung:
        "Katamaran morgens nach Friedrichshafen, Zeppelinmuseum und dann mit der Fähre zurück – perfekter Halbtages-Trip.",
      prioritaet: "",
      galerieBildId: null,
      reihenfolge: 4,
      aktiv: true,
    }),
    createItem({
      id: "tk5",
      typ: "frei",
      ueberschrift: "Sonntag Strandsegler beobachten",
      beschreibung: "In Konstanz am Hafen kurz verweilen – am Sonntagvormittag besonders lebendig.",
      prioritaet: "niedrig",
      galerieBildId: null,
      reihenfolge: 5,
      aktiv: false,
    }),
  ],
};

export const TIPPS_SCHWEBEBAHN: MWGuidesTippsData = {
  items: [
    createItem({
      id: "ts1",
      typ: "standard",
      thema: "beste-besuchszeit",
      ueberschrift: "Beste Besuchszeit",
      beschreibung:
        "Früh morgens oder gegen Abend: weniger Berufspendler, besseres Licht für Fotos aus dem schwebenden Wagen.",
      prioritaet: "hoch",
      galerieBildId: null,
      reihenfolge: 1,
      aktiv: true,
    }),
    createItem({
      id: "ts2",
      typ: "standard",
      thema: "aussicht",
      ueberschrift: "Aussicht",
      beschreibung:
        "In der Kurve über der Wupper rechts hinten platzieren – von dort sieht man am weitesten ins Tal.",
      prioritaet: "hoch",
      galerieBildId: "gs3",
      reihenfolge: 2,
      aktiv: true,
    }),
    createItem({
      id: "ts3",
      typ: "standard",
      thema: "unsere-empfehlung",
      ueberschrift: "Unsere Empfehlung",
      beschreibung:
        "Kombination mit dem Verkehrsmuseum Wuppertal – ideal als Einstieg, bevor man die Linie komplett befährt.",
      prioritaet: "",
      galerieBildId: null,
      reihenfolge: 3,
      aktiv: true,
    }),
    createItem({
      id: "ts4",
      typ: "frei",
      ueberschrift: "Vom Zoo/Varresbecker Platz einsteigen",
      beschreibung: "Ruhigere Haltestelle als Hauptbahnhof – mehr Zeit, einen Fensterplatz zu ergattern.",
      prioritaet: "",
      galerieBildId: null,
      reihenfolge: 4,
      aktiv: true,
    }),
  ],
};

export const TIPPS_GLACIER: MWGuidesTippsData = {
  items: [
    createItem({
      id: "tg1",
      typ: "standard",
      thema: "beste-sitzplaetze",
      ueberschrift: "Beste Sitzplätze",
      beschreibung:
        "Links in Fahrtrichtung von Zermatt nach St. Moritz – Panoramafenster zum Mattertal und den Gletscherregionen.",
      prioritaet: "hoch",
      galerieBildId: "gg1",
      reihenfolge: 1,
      aktiv: true,
    }),
    createItem({
      id: "tg2",
      typ: "standard",
      thema: "dauer",
      ueberschrift: "Dauer",
      beschreibung:
        "Die volle Strecke braucht fast einen Tag – lieber früh starten und Puffer für Fotostopps einplanen.",
      prioritaet: "mittel",
      galerieBildId: null,
      reihenfolge: 2,
      aktiv: true,
    }),
    createItem({
      id: "tg3",
      typ: "frei",
      ueberschrift: "Excellence Class lohnt sich bei Sonne",
      beschreibung:
        "Bei klarer Sicht rechtfertigt die Excellence Class den Aufpreis – Service und Aussicht sind dann unschlagbar.",
      prioritaet: "",
      galerieBildId: null,
      reihenfolge: 3,
      aktiv: true,
    }),
  ],
};
