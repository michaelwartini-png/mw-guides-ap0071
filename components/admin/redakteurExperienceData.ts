export type EditorRxSectionId =
  | "allgemein"
  | "hero"
  | "galerie"
  | "highlights"
  | "mw-guides-tipps"
  | "bewertungen"
  | "offizielle-informationen";

export type ProductUsageEntry = {
  id: string;
  label: string;
  status: "active" | "roadmap";
};

export type ProductFieldMapping = {
  field: string;
  source: string;
};

export type EditorRxConfig = {
  /** Felder im Erlebnisprofil und ihre Master-Quelle */
  productMappings?: ProductFieldMapping[];
  /** Produkte, die diesen Bereich nutzen (oder nutzen werden) */
  usedIn: ProductUsageEntry[];
  /** Redakteur-Hinweis */
  note?: string;
};

const ROADMAP_PRODUCTS: ProductUsageEntry[] = [
  { id: "ride-guide", label: "Ride Guide", status: "roadmap" },
  { id: "kostenloser-guide", label: "Kostenloser Guide", status: "roadmap" },
  { id: "premium-guide", label: "Premium Guide", status: "roadmap" },
  { id: "explore-trip", label: "Explore Trip", status: "roadmap" },
  { id: "pdf", label: "PDF", status: "roadmap" },
  { id: "social-media", label: "Social Media", status: "roadmap" },
  { id: "website", label: "Website", status: "roadmap" },
];

export const EDITOR_RX_CONFIG: Record<EditorRxSectionId, EditorRxConfig> = {
  allgemein: {
    productMappings: [
      { field: "Titel", source: "Allgemein" },
      { field: "Untertitel", source: "Allgemein" },
      { field: "Kategorie & Region", source: "Allgemein" },
    ],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      ...ROADMAP_PRODUCTS,
    ],
    note: "Name und Untertitel sind die zentrale Bezeichnung — sie erscheinen in allen Produkten.",
  },
  hero: {
    productMappings: [
      { field: "Titel", source: "Allgemein" },
      { field: "Untertitel", source: "Allgemein" },
      { field: "Hero-Bild", source: "Galerie" },
      { field: "MW Guides Score", source: "Bewertungen" },
      { field: "Badge", source: "Hero" },
    ],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      ...ROADMAP_PRODUCTS.filter((p) => p.id !== "social-media"),
    ],
    note:
      "Titel, Untertitel, Hero-Bild und Bewertung kommen aus anderen Bereichen. Hier konfigurieren Sie ausschließlich Badge und Hero-Darstellung.",
  },
  galerie: {
    productMappings: [
      { field: "Hero-Bild", source: "Galerie · Kategorie Hero" },
      { field: "Galerie & Impressionen", source: "Galerie · Kategorie Galerie" },
    ],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      ...ROADMAP_PRODUCTS,
    ],
    note:
      "Bilder mit Kategorie „Hero“ werden zum Produkt-Hero. Bilder mit „Galerie“ erscheinen in der Impressionen-Sektion.",
  },
  highlights: {
    productMappings: [
      { field: "Highlight-Karten", source: "Highlights" },
      { field: "Fließtext (Kurzbeschreibungen)", source: "Highlights" },
    ],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      { id: "ride-guide", label: "Ride Guide", status: "roadmap" },
      { id: "premium-guide", label: "Premium Guide", status: "roadmap" },
      { id: "explore-trip", label: "Explore Trip", status: "roadmap" },
      { id: "website", label: "Website", status: "roadmap" },
    ],
  },
  "mw-guides-tipps": {
    productMappings: [{ field: "MW Guides Tipps", source: "MW Guides Tipps" }],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      { id: "ride-guide", label: "Ride Guide", status: "roadmap" },
      { id: "premium-guide", label: "Premium Guide", status: "roadmap" },
      { id: "kostenloser-guide", label: "Kostenloser Guide", status: "roadmap" },
    ],
  },
  bewertungen: {
    productMappings: [
      { field: "MW Guides Score", source: "Bewertungen" },
      { field: "Score-Begründung", source: "Bewertungen" },
      { field: "Google & Tripadvisor", source: "Bewertungen" },
    ],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      { id: "website", label: "Website", status: "roadmap" },
      { id: "explore-trip", label: "Explore Trip", status: "roadmap" },
    ],
  },
  "offizielle-informationen": {
    productMappings: [
      { field: "Praktische Informationen", source: "Offizielle Informationen" },
      { field: "Betreiber & Standort", source: "Offizielle Informationen" },
    ],
    usedIn: [
      { id: "erlebnisprofil", label: "Erlebnisprofil", status: "active" },
      ...ROADMAP_PRODUCTS.filter((p) => p.id !== "social-media"),
    ],
  },
};

/** Herkunft je Sektion im Erlebnisprofil (Produktgenerator) */
export const PRODUCT_SECTION_SOURCES: { section: string; source: string }[] = [
  { section: "Titel & Untertitel", source: "Allgemein" },
  { section: "Hero-Bild", source: "Galerie" },
  { section: "Badge", source: "Hero" },
  { section: "Beschreibung", source: "Bewertungen & Highlights" },
  { section: "Highlights", source: "Highlights" },
  { section: "MW Guides Tipps", source: "MW Guides Tipps" },
  { section: "Galerie", source: "Galerie" },
  { section: "Bewertungen", source: "Bewertungen" },
  { section: "Praktische Infos", source: "Offizielle Informationen" },
  { section: "Betreiber & Standort", source: "Offizielle Informationen" },
];

export type EditorPersistActions = {
  save: () => void;
  discard: () => void;
};

export type EditorRxProps = {
  onDirtyChange?: (dirty: boolean) => void;
  registerActions?: (actions: EditorPersistActions | null) => void;
};
