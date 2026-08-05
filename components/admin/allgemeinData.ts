export const KATEGORIEN = [
  "Schifffahrt",
  "Bahn",
  "Straßenbahn",
  "Seilbahn",
  "Museum",
  "Natur",
  "Aussichtspunkt",
  "Stadtführung",
  "Sonstiges",
] as const;

export const ERLEBNISWELTEN = [
  "Wasser",
  "Bahn",
  "Stadt",
  "Kultur",
  "Natur",
  "Technik",
  "Geschichte",
  "Familie",
] as const;

export const LAENDER = [
  "Deutschland",
  "Österreich",
  "Schweiz",
  "Italien",
  "Frankreich",
  "Slowakei",
  "Belgien",
  "Niederlande",
] as const;

export const STATUS_OPTIONS = [
  "Entwurf",
  "In Bearbeitung",
  "Veröffentlichungsbereit",
  "Veröffentlicht",
] as const;

export type AllgemeinData = {
  name: string;
  untertitel: string;
  kategorie: string;
  erlebniswelt: string;
  land: string;
  region: string;
  orte: string[];
  status: string;
};

export const DEFAULT_ALLGEMEIN_DATA: AllgemeinData = {
  name: "Katamaran Konstanz – Friedrichshafen",
  untertitel: "In 52 Minuten über den Bodensee",
  kategorie: "Schifffahrt",
  erlebniswelt: "Wasser",
  land: "Deutschland",
  region: "Bodensee",
  orte: ["Konstanz"],
  status: "Entwurf",
};
