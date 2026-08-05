export type PlatformReview = {
  bewertung: string;
  anzahl: string;
  link: string;
};

export type BewertungenData = {
  mwgScore: string;
  kurzbegruendung: string;
  google: PlatformReview;
  tripadvisor: PlatformReview;
  weiterePlattformen: {
    holidayCheck: PlatformReview;
    trustpilot: PlatformReview;
    yelp: PlatformReview;
  };
};

export const DEFAULT_BEWERTUNGEN_DATA: BewertungenData = {
  mwgScore: "9.0",
  kurzbegruendung: "Einzigartige Verbindung über den Bodensee mit hoher Erlebnisqualität.",
  google: {
    bewertung: "4.6",
    anzahl: "1287",
    link: "https://maps.google.com/",
  },
  tripadvisor: {
    bewertung: "4.2",
    anzahl: "141",
    link: "https://www.tripadvisor.de/",
  },
  weiterePlattformen: {
    holidayCheck: { bewertung: "", anzahl: "", link: "" },
    trustpilot: { bewertung: "", anzahl: "", link: "" },
    yelp: { bewertung: "", anzahl: "", link: "" },
  },
};

export const BEWERTUNGEN_KATAMARAN: BewertungenData = {
  mwgScore: "9.0",
  kurzbegruendung: "Einzigartige Verbindung über den Bodensee mit hoher Erlebnisqualität.",
  google: { bewertung: "4.6", anzahl: "1287", link: "https://maps.google.com/" },
  tripadvisor: { bewertung: "4.2", anzahl: "141", link: "https://www.tripadvisor.de/" },
  weiterePlattformen: {
    holidayCheck: { bewertung: "", anzahl: "", link: "" },
    trustpilot: { bewertung: "", anzahl: "", link: "" },
    yelp: { bewertung: "", anzahl: "", link: "" },
  },
};

export const BEWERTUNGEN_SCHWEBEBAHN: BewertungenData = {
  mwgScore: "9.4",
  kurzbegruendung: "Technisches Weltkulturerbe mit hoher Alltagstauglichkeit und starkem Erlebnisfaktor.",
  google: { bewertung: "4.7", anzahl: "3421", link: "https://maps.google.com/" },
  tripadvisor: { bewertung: "4.5", anzahl: "892", link: "https://www.tripadvisor.de/" },
  weiterePlattformen: {
    holidayCheck: { bewertung: "4.3", anzahl: "56", link: "https://www.holidaycheck.de/" },
    trustpilot: { bewertung: "", anzahl: "", link: "" },
    yelp: { bewertung: "", anzahl: "", link: "" },
  },
};

export const BEWERTUNGEN_GLACIER: BewertungenData = {
  mwgScore: "8.8",
  kurzbegruendung: "Spektakuläre Alpenüberquerung mit hohem Komfort, aber premium Preisniveau.",
  google: { bewertung: "4.8", anzahl: "2156", link: "https://maps.google.com/" },
  tripadvisor: { bewertung: "4.0", anzahl: "1906", link: "https://www.tripadvisor.de/" },
  weiterePlattformen: {
    holidayCheck: { bewertung: "", anzahl: "", link: "" },
    trustpilot: { bewertung: "4.1", anzahl: "28", link: "https://www.trustpilot.com/" },
    yelp: { bewertung: "", anzahl: "", link: "" },
  },
};

export function getStarDisplay(rating: number): string {
  const filled = Math.min(5, Math.max(0, Math.round(rating)));
  return "★".repeat(filled) + "☆".repeat(5 - filled);
}
