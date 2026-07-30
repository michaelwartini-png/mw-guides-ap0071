import type { RideGuideCategory, Difficulty } from "@/types/taxonomy";

export type TourBadge = "Neu" | "Bestseller";

export interface Tour {
  slug: string;
  place: string;
  title: string;
  /**
   * Short editorial one-liner used on the large homepage tiles
   * (AP-002.0), e.g. "Die einzige Schwebebahn der Welt."
   */
  story: string;
  description: string;
  duration: string;
  language: string;
  /** Placeholder price — final pricing model to be confirmed by project lead (see MW Guides pricing strategy). */
  priceFrom: string;
  offline: boolean;
  gpsGuided: boolean;
  badge?: TourBadge;
  /**
   * Placeholder for a future review/rating feature (prep only —
   * no rating UI is rendered yet since there is no real review data).
   */
  rating?: { value: number; count: number };
  /** Tailwind gradient classes used as the illustration's monochrome + accent base. */
  tint: string;

  /**
   * AP-002 (Plattformarchitektur V2): Ride Guides taxonomy. Optional so
   * existing consumers of Tour keep working untouched; `/touren` reads
   * this to group tours by category. See
   * docs/AP-002-platform-architecture-strategy.md §2 for why "bruegge"
   * is filed under "sonstige" rather than a vehicle category.
   */
  category?: RideGuideCategory;
  /** References types/taxonomy.ts `cities` — optional link, not a duplicate city concept. */
  citySlug?: string;
  difficulty?: Difficulty;
}
