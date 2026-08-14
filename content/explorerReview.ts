import type { ExplorerReview } from "@/types/explorerReview";

const bodenseeReview: ExplorerReview = {
  tripSlug: "bodensee",
  tripTitle: "Bodensee Unlimited",
  progressPercent: 80,
  days: 3,
  nights: 2,
  pace: "Entspannt",
  bestSeason: "Mai–Oktober",
  travelDates: { kind: "unset" },
  accommodationStatus: "pending",
  accommodationNote: "2 Nächte in Konstanz vorgesehen — Buchung erfolgt unabhängig.",
  transport: ["Zug", "Schiff", "Tram", "zu Fuß"],
  budgetPerPerson: 182,
  budgetExplanation:
    "Geschätzte Vor-Ort-Kosten (Eintritte, Nahverkehr und optionale Tickets).",
  budgetLines: [
    { label: "Eintritte", amount: 90 },
    { label: "Nahverkehr", amount: 52 },
    { label: "Optionale Tickets", amount: 40 },
  ],
  tip: "Katamaran online vorab buchen — an Wochenenden oft ausgebucht.",
  waypoints: [
    { id: "konstanz", number: 1, label: "Konstanz", x: 28, y: 54 },
    { id: "mainau", number: 2, label: "Insel Mainau", x: 34, y: 32 },
    { id: "meersburg", number: 3, label: "Meersburg", x: 46, y: 30 },
    { id: "friedrichshafen", number: 4, label: "Friedrichshafen", x: 62, y: 34 },
    { id: "bregenz", number: 5, label: "Bregenz", x: 84, y: 58 },
    { id: "schaffhausen", number: 6, label: "Schaffhausen", x: 12, y: 70 },
  ],
  itinerary: [
    {
      day: 1,
      title: "Tag 1 · Ankommen & Seeüberquerung",
      stops: [
        { time: "10:00", title: "Ankunft Konstanz", meta: "Zug", kind: "travel" },
        {
          time: "10:30",
          title: "Katamaran Konstanz–Friedrichshafen",
          meta: "52 Min.",
          kind: "highlight",
        },
        { time: "12:00", title: "Zeppelin-Museum / Rundflug", meta: "Friedrichshafen", kind: "highlight" },
        { time: "16:30", title: "Rückfahrt nach Konstanz", meta: "Schiff oder Bahn", kind: "travel" },
        { title: "Übernachtung in Konstanz", kind: "stay" },
      ],
    },
    {
      day: 2,
      title: "Tag 2 · Insel & Nordufer",
      stops: [
        { time: "09:30", title: "Insel Mainau", meta: "Parks & Gärten", kind: "highlight" },
        { time: "13:00", title: "Meersburg", meta: "Schiff", kind: "highlight" },
        { time: "15:30", title: "Altstadt & Weinlagen", meta: "Meersburg", kind: "highlight" },
        { title: "Übernachtung in Konstanz", kind: "stay" },
      ],
    },
    {
      day: 3,
      title: "Tag 3 · Pfänder & Rheinfall",
      stops: [
        { time: "09:00", title: "Bregenz · Pfänderbahn", meta: "Seilbahn", kind: "highlight" },
        { time: "13:30", title: "Schaffhausen · Rheinfall", meta: "Schiff", kind: "highlight" },
        { time: "17:00", title: "Rückreise", meta: "Zug", kind: "travel" },
      ],
    },
  ],
  highlights: [
    {
      slug: "katamaran-konstanz-friedrichshafen",
      title: "Katamaran",
      location: "Konstanz–Friedrichshafen",
      image: "/images/explore-trips/bodensee-schifffahrt.jpg",
      imageAlt: "Katamaran auf dem Bodensee zwischen Konstanz und Friedrichshafen",
      rideGuide: true,
    },
    {
      slug: "insel-mainau",
      title: "Insel Mainau",
      location: "Konstanz",
      image: "/images/explore-trips/bodensee-natur.jpg",
      imageAlt: "Blumen auf der Insel Mainau",
      rideGuide: true,
    },
    {
      slug: "bodensee-schifffahrt-meersburg",
      title: "Meersburg",
      location: "Meersburg",
      image: "/images/explore-trips/bodensee-kulinarik.jpg",
      imageAlt: "Weinberge und Ufer bei Meersburg",
      rideGuide: true,
    },
    {
      slug: "zeppelin-rundflug",
      title: "Zeppelin",
      location: "Friedrichshafen",
      image: "/images/explore-trips/bodensee-zeppelin-card.png",
      imageAlt: "Zeppelin NT über Friedrichshafen",
      rideGuide: true,
    },
    {
      slug: "pfaenderbahn-bregenz",
      title: "Pfänderbahn",
      location: "Bregenz",
      image: "/images/explore-trips/bodensee-mobilitaet.jpg",
      imageAlt: "Pfänderbahn mit Blick auf den Bodensee",
      rideGuide: true,
    },
    {
      slug: "rheinfall-schiff",
      title: "Rheinfall",
      location: "Schaffhausen",
      image: "/images/explore-trips/bodensee-aktiv.jpg",
      imageAlt: "Schifffahrt zum Rheinfall bei Schaffhausen",
      rideGuide: true,
    },
  ],
  checklist: ["Route & Reihenfolge", "Highlights", "Fahrtzeiten", "Unterkünfte", "Budget"],
  trustItems: [
    "Entspannt & gut geplant",
    "Ausgewogene Tagesplanung",
    "Echte Erlebnisse",
    "Flexibel bleiben",
  ],
};

const reviews: ExplorerReview[] = [bodenseeReview];

export function getExplorerReviewByTripSlug(tripSlug: string): ExplorerReview | undefined {
  return reviews.find((review) => review.tripSlug === tripSlug);
}

export const ACCOMMODATION_STATUS_LABEL: Record<ExplorerReview["accommodationStatus"], string> = {
  selected: "Unterkunft ausgewählt",
  pending: "Unterkunft noch auswählen",
  "not-included": "Unterkunft nicht Bestandteil dieses Reiseplans",
};
