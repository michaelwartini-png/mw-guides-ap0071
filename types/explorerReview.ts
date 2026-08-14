/**
 * AP-ET004 — Review step (ET-04) data for a assembled Explore Trip.
 */

export type AccommodationStatus = "selected" | "pending" | "not-included";

export type ReviewTravelDates =
  | { kind: "set"; fromLabel: string; toLabel: string }
  | { kind: "unset" };

export interface ReviewWaypoint {
  id: string;
  number: number;
  label: string;
  /** Position on the schematic map, 0–100. */
  x: number;
  y: number;
}

export interface ReviewItineraryStop {
  time?: string;
  title: string;
  meta?: string;
  kind?: "travel" | "stay" | "highlight";
}

export interface ReviewItineraryDay {
  day: number;
  title: string;
  stops: ReviewItineraryStop[];
}

export interface ReviewHighlight {
  slug: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  rideGuide: boolean;
}

export interface ReviewBudgetLine {
  label: string;
  amount: number;
}

export interface ExplorerReview {
  tripSlug: string;
  tripTitle: string;
  progressPercent: number;
  days: number;
  nights: number;
  pace: string;
  bestSeason: string;
  travelDates: ReviewTravelDates;
  accommodationStatus: AccommodationStatus;
  accommodationNote?: string;
  transport: string[];
  budgetPerPerson: number;
  budgetExplanation: string;
  budgetLines: ReviewBudgetLine[];
  tip: string;
  waypoints: ReviewWaypoint[];
  itinerary: ReviewItineraryDay[];
  highlights: ReviewHighlight[];
  checklist: string[];
  trustItems: string[];
}
