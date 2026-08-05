export type BarrierefreiheitFlags = {
  rollstuhlgerecht: boolean;
  kinderwagen: boolean;
  fahrradmitnahme: boolean;
  hunde: boolean;
  wc: boolean;
};

export type OffizielleInformationenData = {
  betreiber: string;
  betreiberWebseite: string;
  offizielleWebseite: string;
  fahrplan: string;
  preise: string;
  ticketshop: string;
  adresse: string;
  gpsBreitengrad: string;
  gpsLaengengrad: string;
  kartenlink: string;
  telefon: string;
  email: string;
  kontaktseite: string;
  barrierefreiheit: BarrierefreiheitFlags;
};

export const BARRIEREFreiheit_OPTIONS: {
  key: keyof BarrierefreiheitFlags;
  label: string;
}[] = [
  { key: "rollstuhlgerecht", label: "Rollstuhlgerecht" },
  { key: "kinderwagen", label: "Kinderwagen geeignet" },
  { key: "fahrradmitnahme", label: "Fahrradmitnahme" },
  { key: "hunde", label: "Hunde erlaubt" },
  { key: "wc", label: "WC vorhanden" },
];

export function normalizeExternalUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function formatGps(data: OffizielleInformationenData): string | null {
  const lat = data.gpsBreitengrad.trim();
  const lng = data.gpsLaengengrad.trim();
  if (!lat && !lng) return null;
  if (lat && lng) return `${lat}° N, ${lng}° E`;
  return lat || lng;
}

export function getActiveBarrierefreiheitLabels(data: OffizielleInformationenData): string[] {
  return BARRIEREFreiheit_OPTIONS.filter(({ key }) => data.barrierefreiheit[key]).map(
    ({ label }) => label,
  );
}

export const DEFAULT_OFFIZIELLE_INFORMATIONEN: OffizielleInformationenData = {
  betreiber: "Katamaran-Reederei Bodensee GmbH & Co. KG",
  betreiberWebseite: "https://www.der-katamaran.de",
  offizielleWebseite: "https://www.katamaran-bodensee.de",
  fahrplan: `Ganzjähriger Linienverkehr.

Abfahrten je nach Saison
im 30- bis 60-Minuten-Takt.`,
  preise: `Erwachsene: ab 18,00 €
Kinder: ab 9,00 €
Familien: ab 45,00 €
Fahrradmitnahme: 3,00 €`,
  ticketshop: "https://www.bsb-online.com",
  adresse: "Fährstraße 2, 78462 Konstanz",
  gpsBreitengrad: "47.6597",
  gpsLaengengrad: "9.1750",
  kartenlink: "https://maps.google.com/?q=47.6597,9.1750",
  telefon: "+49 7531 3640-0",
  email: "info@katamaran-bodensee.de",
  kontaktseite: "https://www.katamaran-bodensee.de/kontakt",
  barrierefreiheit: {
    rollstuhlgerecht: true,
    kinderwagen: true,
    fahrradmitnahme: true,
    hunde: true,
    wc: true,
  },
};

export const OFFIZIELLE_KATAMARAN: OffizielleInformationenData = {
  ...DEFAULT_OFFIZIELLE_INFORMATIONEN,
};

export const OFFIZIELLE_SCHWEBEBAHN: OffizielleInformationenData = {
  betreiber: "WSW mobil GmbH",
  betreiberWebseite: "https://www.wsw-online.de",
  offizielleWebseite: "https://www.schwebebahn.de",
  fahrplan: `Mo–So durchgehend.

In der Hauptverkehrszeit
ca. alle 3–5 Minuten.`,
  preise: `Erwachsene: ab 3,50 € (Tarifzone A)
Kinder: ermäßigt
Familien: Tageskarten verfügbar
Monatskarte: ab 78,00 €`,
  ticketshop: "https://www.schwebebahn.de/tickets",
  adresse: "Verkehrsmuseum Wuppertal, Kasinostr. 23, 42103 Wuppertal",
  gpsBreitengrad: "51.2565",
  gpsLaengengrad: "7.1508",
  kartenlink: "https://maps.google.com/?q=51.2565,7.1508",
  telefon: "+49 202 563-0",
  email: "info@wsw-online.de",
  kontaktseite: "https://www.wsw-online.de/kontakt",
  barrierefreiheit: {
    rollstuhlgerecht: true,
    kinderwagen: true,
    fahrradmitnahme: false,
    hunde: true,
    wc: true,
  },
};

export const OFFIZIELLE_GLACIER: OffizielleInformationenData = {
  betreiber: "Glacier Express AG",
  betreiberWebseite: "https://www.glacierexpress.ch",
  offizielleWebseite: "https://www.glacierexpress.ch",
  fahrplan: `Täglicher Verkehr in der Sommersaison.

Winterfahrplan mit
reduzierten Verbindungen.`,
  preise: `Erwachsene: ab 159 CHF (2. Klasse)
Kinder: ermäßigt
Excellence Class: ab 470 CHF
Sitzplatzreservierung empfohlen`,
  ticketshop: "https://www.glacierexpress.ch/buchen",
  adresse: "Bahnhofplatz, 3920 Zermatt",
  gpsBreitengrad: "46.0207",
  gpsLaengengrad: "7.7491",
  kartenlink: "https://maps.google.com/?q=46.0207,7.7491",
  telefon: "+41 81 288 65 65",
  email: "info@glacierexpress.ch",
  kontaktseite: "https://www.glacierexpress.ch/kontakt",
  barrierefreiheit: {
    rollstuhlgerecht: true,
    kinderwagen: false,
    fahrradmitnahme: false,
    hunde: false,
    wc: true,
  },
};
