import type { ExploreTripChannelData } from "@/types/erlebnisprofilChannel";

/**
 * Explore-Trip channel enrichment keyed by trip + erlebnis slug.
 * Core Erlebnisprofil content comes from ErlebnisRecord → Generator.
 */
const KATAMARAN_BODENSEE: ExploreTripChannelData = {
  erlebnisSlug: "katamaran-konstanz-friedrichshafen",
  tripSlug: "bodensee",
  introVideoLabel: "Intro ansehen (1:12)",
  mapEnhancement: {
    preview: {
      src: "/images/explore-trips/bodensee-concept-illustration.png",
      alt: "Karte der Katamaran-Strecke Konstanz–Friedrichshafen",
    },
    departureA: "Konstanz Hafen, Fährstraße",
    departureB: "Friedrichshafen Hafen, Uferpromenade",
    parking: "Parkhäuser in beiden Städten, 5 Min. zum Hafen",
  },
  recommendations: [
    {
      slug: "insel-mainau",
      title: "Insel Mainau",
      image: "/images/explore-trips/bodensee-natur.jpg",
      imageAlt: "Insel Mainau",
    },
    {
      slug: "pfaenderbahn-bregenz",
      title: "Pfänderbahn",
      image: "/images/explore-trips/bodensee-natur.jpg",
      imageAlt: "Pfänderbahn Bregenz",
    },
    {
      slug: "lindau-insel",
      title: "Altstadt Lindau",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Insel Lindau",
    },
  ],
  combinations: [
    {
      slug: "zeppelin-museum",
      title: "Zeppelin-Museum Friedrichshafen",
      image: "/images/explore-trips/bodensee-zeppelin.jpg",
      imageAlt: "Zeppelin-Museum",
    },
    {
      slug: "konstanz-altstadt",
      title: "Konstanz Altstadt",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Konstanz Altstadt",
    },
    {
      slug: "bodensee-schifffahrt-meersburg",
      title: "Schifffahrt Meersburg",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Schifffahrt Meersburg",
    },
  ],
  includedInTrips: [
    {
      slug: "bodensee",
      title: "Bodensee Unlimited",
      image: "/images/explore-trips/bodensee-hero.jpg",
      imageAlt: "Bodensee Unlimited",
    },
  ],
  addedCount: 124,
};

const EXTENSIONS: ExploreTripChannelData[] = [KATAMARAN_BODENSEE];

export function getExploreTripChannelExtension(
  tripSlug: string,
  erlebnisSlug: string,
): ExploreTripChannelData | undefined {
  return EXTENSIONS.find(
    (entry) => entry.tripSlug === tripSlug && entry.erlebnisSlug === erlebnisSlug,
  );
}
