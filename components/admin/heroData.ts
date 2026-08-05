export const HERO_BADGES = [
  "Ganzjährig",
  "Familienfreundlich",
  "Barrierefrei",
  "Fahrradmitnahme",
  "Hunde erlaubt",
  "Panoramablick",
  "Bestseller",
] as const;

export type HeroBadge = (typeof HERO_BADGES)[number];

export type HeroData = {
  titel: string;
  untertitel: string;
  hasHeroImage: boolean;
  galerieCount: number;
  badges: HeroBadge[];
  score: string;
  rideGuideAvailable: boolean;
};

export const DEFAULT_HERO_DATA: HeroData = {
  titel: "Katamaran Konstanz – Friedrichshafen",
  untertitel: "In 52 Minuten über den Bodensee.",
  hasHeroImage: true,
  galerieCount: 4,
  badges: ["Bestseller", "Ganzjährig", "Panoramablick"],
  score: "9.0",
  rideGuideAvailable: true,
};

export const MIN_GALERIE_COUNT = 1;
export const MAX_GALERIE_COUNT = 8;
