/**
 * AP-ET001 — Europe entry catalog for /explore-trips (ET-01).
 * Available, in-progress and coming-soon trips share one illustrated map.
 * Coming-soon destinations without a page are visible, not clickable.
 */

export type EuropeTripStatus = "available" | "in-progress" | "planned";

export const europeTripStatusLabel: Record<EuropeTripStatus, string> = {
  available: "Verfügbar",
  "in-progress": "In Bearbeitung",
  planned: "Coming Soon",
};

export type EuropeMapLabelSide = "right" | "left" | "bottom";

export interface EuropeEntryTrip {
  slug: string;
  /** Omit for planned trips that have no destination page yet. */
  href?: string;
  title: string;
  /** Short pin label on the illustrated map. */
  mapLabel: string;
  teaser: string;
  countries: string;
  heroImage?: string;
  heroImageAlt?: string;
  status: EuropeTripStatus;
  /** Show in the Explore-Trips card row under the map. */
  featured?: boolean;
  /**
   * Visual pin position on the illustrated Europe map (percent of the
   * image box). Not a geographic projection — the illustration is the source.
   */
  map: { left: number; top: number };
  labelSide?: EuropeMapLabelSide;
}

export const europeHero = {
  title: "Entdecke Europa.",
  subtitle: "Außergewöhnliche Reiseideen für neugierige Entdecker.",
  image: "/images/explore-trips/europe-hero.png",
  imageAlt:
    "Europäische Küstenstadt am Wasser vor nebligen Bergen im Abendlicht",
};

export const europeMapCopy = {
  eyebrow: "Europa entdecken",
  heading: "Wähle dein nächstes Abenteuer.",
  body: "Die illustrierte Karte zeigt besondere Reiseideen in Europa. Klicke auf eine Region, um den Explore Trip zu öffnen.",
};

export const europeTripsCopy = {
  eyebrow: "Unsere Explore Trips",
  heading: "Wohin zieht es dich?",
  allLink: "Alle Explore Trips ansehen",
};

export const europeNewsletterCopy = {
  text: "Neue Reiseideen zuerst erfahren? Trag dich ein und wir informieren dich, wenn neue Explore Trips verfügbar sind.",
  placeholder: "Deine E-Mail-Adresse",
  thanks: "Danke — wir melden uns, sobald neue Explore Trips bereitstehen.",
};

export const europeEntryTrips: EuropeEntryTrip[] = [
  {
    slug: "norwegen",
    title: "Norwegen",
    mapLabel: "Norwegen",
    teaser: "Fjorde, Bahnstrecken und ein Tempo, das der Landschaft folgt.",
    countries: "Norwegen",
    status: "planned",
    map: { left: 50, top: 11 },
    labelSide: "right",
  },
  {
    slug: "schweden",
    title: "Schweden",
    mapLabel: "Schweden",
    teaser: "Seen, Schären und eine Reise, die der Bahnlinie folgt.",
    countries: "Schweden",
    status: "planned",
    map: { left: 57, top: 18 },
    labelSide: "right",
  },
  {
    slug: "london",
    title: "London",
    mapLabel: "London",
    teaser: "Eine Stadt. Ein Netz. Unzählige Richtungen.",
    countries: "Vereinigtes Königreich",
    status: "in-progress",
    map: { left: 24, top: 34 },
    labelSide: "left",
  },
  {
    slug: "paris",
    title: "Paris",
    mapLabel: "Paris",
    teaser: "Die Stadt als Basecamp — und alles, was in Reichweite liegt.",
    countries: "Frankreich",
    status: "planned",
    map: { left: 31, top: 45 },
    labelSide: "left",
  },
  {
    slug: "amsterdam",
    href: "/explore-trips/amsterdam",
    title: "Amsterdam",
    mapLabel: "Amsterdam",
    teaser: "Wasser, Schienen und eine Stadt, die sich langsam erschließt.",
    countries: "Niederlande",
    heroImage: "/images/explore-trips/amsterdam-grachten.png",
    heroImageAlt: "Grachten in Amsterdam mit historischen Fassaden",
    status: "available",
    map: { left: 35, top: 32 },
    labelSide: "right",
  },
  {
    slug: "belgische-kueste",
    href: "/explore-trips/belgische-kueste",
    title: "Belgische Küste",
    mapLabel: "Belgische Küste",
    teaser:
      "Nordsee, Dünen und Hafenstädte — Europas längste Straßenbahnlinie als Reiseidee.",
    countries: "Belgien",
    heroImage: "/images/explore-trips/belgische-kueste.png",
    heroImageAlt: "Gelbe Küstentram entlang der belgischen Nordsee",
    status: "in-progress",
    featured: true,
    map: { left: 29, top: 37 },
    labelSide: "bottom",
  },
  {
    slug: "bodensee",
    href: "/explore-trips/bodensee",
    title: "Bodensee Unlimited",
    mapLabel: "Bodensee",
    teaser: "Drei Länder. Ein See. Unendliche Erlebnisse.",
    countries: "Deutschland · Österreich · Schweiz",
    heroImage: "/images/explore-trips/bodensee-zeppelin-card.png",
    heroImageAlt: "Zeppelin über dem Bodensee vor Bergkulisse",
    status: "available",
    featured: true,
    map: { left: 44, top: 49 },
    labelSide: "right",
  },
  {
    slug: "mailand-unlimited",
    href: "/explore-trips/mailand-unlimited",
    title: "Mailand Unlimited",
    mapLabel: "Mailand",
    teaser: "Eine Stadt. Unzählige Möglichkeiten. Norditalien neu entdecken.",
    countries: "Italien",
    heroImage: "/images/explore-trips/mailand-staedte.jpg",
    heroImageAlt: "Mailänder Dom auf der Piazza del Duomo",
    status: "available",
    featured: true,
    map: { left: 43, top: 60 },
    labelSide: "right",
  },
  {
    slug: "donau",
    href: "/explore-trips/wien-bratislava",
    title: "Wien - Bratislava - Donau",
    mapLabel: "Wien - Bratislava - Donau",
    teaser: "Zwei Hauptstädte. Ein Fluss. Unzählige Erlebnisse dazwischen.",
    countries: "Österreich · Slowakei",
    heroImage: "/images/explore-trips/wien-donau.png",
    heroImageAlt: "Donau in Wien mit Brücke und Riesenrad",
    status: "in-progress",
    featured: true,
    map: { left: 57, top: 46 },
    labelSide: "right",
  },
];

export const europeFeaturedTripSlugs = [
  "bodensee",
  "mailand-unlimited",
  "belgische-kueste",
  "donau",
] as const;

export const europeFeaturedTrips = europeFeaturedTripSlugs
  .map((slug) => europeEntryTrips.find((trip) => trip.slug === slug))
  .filter((trip): trip is EuropeEntryTrip => trip !== undefined);

export const europeWhyCards = [
  {
    title: "Außergewöhnliche Reiseideen",
    description:
      "Kuratierte Explore Trips für Individualreisende — keine Standardrouten, keine Gruppenreise.",
    icon: "compass" as const,
  },
  {
    title: "Nachhaltig unterwegs",
    description:
      "Bahn, Schiff und öffentlicher Verkehr statt Mietwagen. Bewusst reisen, ohne das Tempo vorzugeben.",
    icon: "train" as const,
  },
  {
    title: "Alles kann. Nichts muss.",
    description:
      "Kein festes Programm. Du entscheidest unterwegs, was du erlebst — und was du sein lässt.",
    icon: "heart" as const,
  },
  {
    title: "Weniger suchen. Mehr erleben.",
    description:
      "Inspiration statt Recherche. Ein Explore Trip sammelt die besonderen Möglichkeiten an einem Ort.",
    icon: "search" as const,
  },
];
