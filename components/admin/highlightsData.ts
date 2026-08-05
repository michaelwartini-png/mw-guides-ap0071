export const HIGHLIGHT_ICON_OPTIONS = [
  { value: "view", label: "Aussicht", emoji: "👁" },
  { value: "city", label: "Stadt", emoji: "🏙" },
  { value: "food", label: "Gastronomie", emoji: "☕" },
  { value: "bike", label: "Fahrrad", emoji: "🚲" },
  { value: "accessibility", label: "Barrierefrei", emoji: "♿" },
] as const;

export type HighlightIcon = (typeof HIGHLIGHT_ICON_OPTIONS)[number]["value"];

export type HighlightItem = {
  id: string;
  titel: string;
  kurzbeschreibung: string;
  icon: HighlightIcon;
  hasBild: boolean;
  reihenfolge: number;
  aktiv: boolean;
};

export type HighlightsData = {
  items: HighlightItem[];
};

export const HIGHLIGHT_ICON_EMOJI: Record<HighlightIcon, string> = {
  view: "👁",
  city: "🏙",
  food: "☕",
  bike: "🚲",
  accessibility: "♿",
};

export const MIN_HIGHLIGHTS = 1;
export const MAX_HIGHLIGHTS = 10;

export function sortHighlights(items: HighlightItem[]): HighlightItem[] {
  return [...items].sort((a, b) => a.reihenfolge - b.reihenfolge);
}

export function getActiveHighlights(items: HighlightItem[]): HighlightItem[] {
  return sortHighlights(items).filter((item) => item.aktiv);
}

function createItem(
  partial: Omit<HighlightItem, "id"> & { id?: string },
): HighlightItem {
  return {
    id: partial.id ?? `h-${partial.reihenfolge}`,
    titel: partial.titel,
    kurzbeschreibung: partial.kurzbeschreibung,
    icon: partial.icon,
    hasBild: partial.hasBild,
    reihenfolge: partial.reihenfolge,
    aktiv: partial.aktiv,
  };
}

export const DEFAULT_HIGHLIGHTS_DATA: HighlightsData = {
  items: [
    createItem({
      id: "k1",
      titel: "Panoramablick auf See und Alpen",
      kurzbeschreibung: "Unverstellter Blick vom offenen Deck und aus der Panoramalounge.",
      icon: "view",
      hasBild: true,
      reihenfolge: 1,
      aktiv: true,
    }),
    createItem({
      id: "k2",
      titel: "Stadtzentrum zu Stadtzentrum",
      kurzbeschreibung: "Direkte Verbindung zwischen Konstanz und Friedrichshafen ohne Umweg.",
      icon: "city",
      hasBild: true,
      reihenfolge: 2,
      aktiv: true,
    }),
    createItem({
      id: "k3",
      titel: "Bistro an Bord",
      kurzbeschreibung: "Snacks und Getränke während der 52-minütigen Überfahrt.",
      icon: "food",
      hasBild: false,
      reihenfolge: 3,
      aktiv: true,
    }),
    createItem({
      id: "k4",
      titel: "Fahrradmitnahme möglich",
      kurzbeschreibung: "Bis zu 30 Fahrräder pro Fahrt – ideal für Radtouren am See.",
      icon: "bike",
      hasBild: false,
      reihenfolge: 4,
      aktiv: true,
    }),
    createItem({
      id: "k5",
      titel: "Barrierefrei zugänglich",
      kurzbeschreibung: "Rollstuhlgerechter Einstieg und barrierefreie Bereiche an Bord.",
      icon: "accessibility",
      hasBild: false,
      reihenfolge: 5,
      aktiv: true,
    }),
  ],
};

export const HIGHLIGHTS_KATAMARAN: HighlightsData = {
  items: DEFAULT_HIGHLIGHTS_DATA.items.map((item) => ({ ...item })),
};

export const HIGHLIGHTS_SCHWEBEBAHN: HighlightsData = {
  items: [
    createItem({
      id: "s1",
      titel: "Schwebe über Wupper und Stadt",
      kurzbeschreibung: "Einzigartige Fahrt in 12 Metern Höhe durch das Tal der Wupper.",
      icon: "view",
      hasBild: true,
      reihenfolge: 1,
      aktiv: true,
    }),
    createItem({
      id: "s2",
      titel: "Historische Strecke seit 1901",
      kurzbeschreibung: "Technikdenkmal und Alltagsverkehr zugleich – mitten in Wuppertal.",
      icon: "accessibility",
      hasBild: true,
      reihenfolge: 2,
      aktiv: true,
    }),
    createItem({
      id: "s3",
      titel: "Verkehrsmuseum am Startpunkt",
      kurzbeschreibung: "Geschichte der Schwebebahn und originalgetreue Wagen im Museum.",
      icon: "city",
      hasBild: false,
      reihenfolge: 3,
      aktiv: true,
    }),
    createItem({
      id: "s4",
      titel: "Café und Aussichtspunkte",
      kurzbeschreibung: "Haltestellen mit Blick ins Tal – ideal für Foto-Stops.",
      icon: "food",
      hasBild: false,
      reihenfolge: 4,
      aktiv: true,
    }),
    createItem({
      id: "s5",
      titel: "Perfekte ÖPNV-Anbindung",
      kurzbeschreibung: "Nahtlose Verknüpfung mit Bus, Bahn und dem restlichen WSW-Netz.",
      icon: "bike",
      hasBild: false,
      reihenfolge: 5,
      aktiv: false,
    }),
  ],
};

export const HIGHLIGHTS_GLACIER: HighlightsData = {
  items: [
    createItem({
      id: "g1",
      titel: "Panorama durch die Schweizer Alpen",
      kurzbeschreibung: "Spektakuläre Aussicht auf Gletscher, Täler und Bergdörfer.",
      icon: "view",
      hasBild: true,
      reihenfolge: 1,
      aktiv: true,
    }),
    createItem({
      id: "g2",
      titel: "Gourmet-Service an Bord",
      kurzbeschreibung: "Excellence Class und à-la-carte-Angebot während der Fahrt.",
      icon: "food",
      hasBild: true,
      reihenfolge: 2,
      aktiv: true,
    }),
    createItem({
      id: "g3",
      titel: "Zermatt – St. Moritz",
      kurzbeschreibung: "Die langsamste Expressfahrt der Welt verbindet zwei Alpen-Icons.",
      icon: "city",
      hasBild: false,
      reihenfolge: 3,
      aktiv: true,
    }),
  ],
};

export function createHighlightItem(reihenfolge: number): HighlightItem {
  return createItem({
    id: `h-${Date.now()}-${reihenfolge}`,
    titel: "",
    kurzbeschreibung: "",
    icon: "view",
    hasBild: false,
    reihenfolge,
    aktiv: true,
  });
}

export function getNextReihenfolge(items: HighlightItem[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map((item) => item.reihenfolge)) + 1;
}

export function swapHighlightOrder(
  items: HighlightItem[],
  id: string,
  direction: "up" | "down",
): HighlightItem[] {
  const sorted = sortHighlights(items);
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
