import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getTourBySlug } from "@/content/tours";
import type { PremiumPreview, TripRideGuideProduct } from "@/types/reisebegleiter";

export const HANDOUT_PRICE = 0;
export const PREMIUM_GUIDE_PRICE = 4.99;

export const HANDOUT_FEATURES = [
  "Reiseüberblick",
  "Highlights",
  "Karte",
  "Tagesplan",
  "Basisinformationen",
] as const;

export const HANDOUT_EXCLUSIONS = [
  "Meine Reise",
  "spätere Bearbeitung",
  "Synchronisation",
  "Reiseverwaltung",
  "automatische Updates",
] as const;

export const PREMIUM_FEATURES = [
  "Insider-Tipps",
  "Restaurantempfehlungen",
  "Schlechtwetter-Alternativen",
  "Checklisten",
  "Spartipps",
  "Hintergrundinformationen",
] as const;

export const MEINE_REISE_BENEFITS = [
  "Zugang zu Meine Reise",
  "Reise später bearbeiten",
  "Offene Punkte verwalten",
  "Ticketlinks speichern",
  "automatische Aktualisierungen",
  "Reise synchronisieren",
  "neue Versionen erhalten",
] as const;

export const TRAVEL_COST_CATEGORIES = ["Hotels", "Tickets", "Eintritte", "Nahverkehr"] as const;

export function formatEuro(amount: number): string {
  return `${amount.toFixed(2).replace(".", ",")} €`;
}

export function parseEuroAmount(value: string): number {
  const match = value.replace(/\s/g, "").match(/(\d+)(?:,(\d{1,2}))?/);
  if (!match) return 0;
  const euros = Number(match[1]);
  const cents = match[2] ? Number(match[2].padEnd(2, "0")) : 0;
  return euros + cents / 100;
}

/** Real, purchasable Ride Guides for this trip — empty means the product is hidden. */
export function getTripRideGuideProducts(tripSlug: string): TripRideGuideProduct[] {
  const trip = getExploreTripBySlug(tripSlug);
  return (trip?.rideGuideSlugs ?? [])
    .map(getTourBySlug)
    .filter((tour) => tour !== undefined)
    .map((tour) => ({
      slug: tour.slug,
      title: tour.title,
      place: tour.place,
      priceFrom: tour.priceFrom,
      price: parseEuroAmount(tour.priceFrom),
    }));
}

export function getPremiumPreview(tripTitle: string, insiderTip: string): PremiumPreview {
  return {
    coverTitle: tripTitle,
    coverSubtitle: "Explore Trip Premium Guide",
    toc: [
      "Ankommen und orientieren",
      "Deine Route im Überblick",
      "Tag für Tag",
      "Highlights im Detail",
      "Insider-Tipps & Kulinarik",
      "Schlechtwetter-Alternativen",
      "Checklisten & Spartipps",
    ],
    samplePages: [
      {
        title: "Beispielseite · Ankommen",
        excerpt:
          "Der See liegt direkt vor der Tür — und trotzdem bleibt der Tag offen. Diese Seite zeigt dir, wie du die erste Stunde nutzt, ohne den Plan zu überladen.",
      },
      {
        title: "Beispielseite · Vor Ort",
        excerpt:
          "Welche Anleger lohnen den Umweg, wo lohnt Warten, und was kannst du streichen, wenn die Zeit knapp wird? Ein Ausschnitt aus dem Premium Guide.",
      },
    ],
    insiderTip: {
      title: "Insider-Tipp",
      body: insiderTip,
    },
  };
}
