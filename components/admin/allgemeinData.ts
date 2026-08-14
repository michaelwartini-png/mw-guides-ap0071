export const BITTE_WAEHLEN = "Bitte wählen…";

export const KATEGORIEN = [
  "Schifffahrt",
  "Bahn",
  "Schwebebahn",
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
  "Dänemark",
  "Schweden",
  "Slowakei",
  "Belgien",
  "Niederlande",
] as const;

export const STATUS_OPTIONS = [
  "Entwurf",
  "In Prüfung",
  "Veröffentlicht",
  "Archiviert",
] as const;

export type AllgemeinData = {
  name: string;
  untertitel: string;
  kategorie: string;
  erlebniswelt: string;
  laender: string[];
  regionen: string[];
  orte: string[];
  status: string;
};

export const EMPTY_ALLGEMEIN_DATA: AllgemeinData = {
  name: "",
  untertitel: "",
  kategorie: BITTE_WAEHLEN,
  erlebniswelt: BITTE_WAEHLEN,
  laender: [],
  regionen: [],
  orte: [],
  status: "Entwurf",
};

export const DEFAULT_ALLGEMEIN_DATA: AllgemeinData = {
  name: "Katamaran Konstanz – Friedrichshafen",
  untertitel: "In 52 Minuten über den Bodensee",
  kategorie: "Schifffahrt",
  erlebniswelt: "Wasser",
  laender: ["Deutschland"],
  regionen: ["Bodensee"],
  orte: ["Konstanz"],
  status: "Entwurf",
};
