export type PlatformReview = {
  bewertung: string;
  anzahl: string;
  link: string;
};

export type ScoreCategory = {
  label: string;
  value: string;
};

export type BewertungenData = {
  mwgScore: string;
  kurzbegruendung: string;
  scoreCategories: ScoreCategory[];
  google: PlatformReview;
  tripadvisor: PlatformReview;
  weiterePlattformen: {
    holidayCheck: PlatformReview;
    trustpilot: PlatformReview;
    yelp: PlatformReview;
  };
};

export const EMPTY_BEWERTUNGEN_DATA: BewertungenData = {
  mwgScore: "",
  kurzbegruendung: "",
  scoreCategories: [],
  google: { bewertung: "", anzahl: "", link: "" },
  tripadvisor: { bewertung: "", anzahl: "", link: "" },
  weiterePlattformen: {
    holidayCheck: { bewertung: "", anzahl: "", link: "" },
    trustpilot: { bewertung: "", anzahl: "", link: "" },
    yelp: { bewertung: "", anzahl: "", link: "" },
  },
};

export const DEFAULT_BEWERTUNGEN_DATA: BewertungenData = {
  mwgScore: "9.0",
  kurzbegruendung: "Einzigartige Verbindung über den Bodensee mit hoher Erlebnisqualität.",
  scoreCategories: [
    { label: "Komfort", value: "8.5" },
    { label: "Aussicht", value: "9.5" },
    { label: "Einzigartigkeit", value: "8.5" },
    { label: "Fotopotenzial", value: "9.5" },
  ],
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
  scoreCategories: [
    { label: "Komfort", value: "8.5" },
    { label: "Aussicht", value: "9.5" },
    { label: "Einzigartigkeit", value: "8.5" },
    { label: "Fotopotenzial", value: "9.5" },
  ],
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
  scoreCategories: [
    { label: "Komfort", value: "9.0" },
    { label: "Aussicht", value: "9.5" },
    { label: "Einzigartigkeit", value: "9.8" },
    { label: "Fotopotenzial", value: "9.2" },
  ],
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
  scoreCategories: [
    { label: "Komfort", value: "9.5" },
    { label: "Aussicht", value: "9.8" },
    { label: "Einzigartigkeit", value: "8.5" },
    { label: "Fotopotenzial", value: "9.0" },
  ],
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

/** Backward-compatible merge for session overlays missing newer fields. */
export function normalizeBewertungenData(data: Partial<BewertungenData>): BewertungenData {
  return {
    ...EMPTY_BEWERTUNGEN_DATA,
    ...data,
    scoreCategories: data.scoreCategories ?? [],
    google: { ...EMPTY_BEWERTUNGEN_DATA.google, ...data.google },
    tripadvisor: { ...EMPTY_BEWERTUNGEN_DATA.tripadvisor, ...data.tripadvisor },
    weiterePlattformen: {
      ...EMPTY_BEWERTUNGEN_DATA.weiterePlattformen,
      ...data.weiterePlattformen,
      holidayCheck: {
        ...EMPTY_BEWERTUNGEN_DATA.weiterePlattformen.holidayCheck,
        ...data.weiterePlattformen?.holidayCheck,
      },
      trustpilot: {
        ...EMPTY_BEWERTUNGEN_DATA.weiterePlattformen.trustpilot,
        ...data.weiterePlattformen?.trustpilot,
      },
      yelp: {
        ...EMPTY_BEWERTUNGEN_DATA.weiterePlattformen.yelp,
        ...data.weiterePlattformen?.yelp,
      },
    },
  };
}
