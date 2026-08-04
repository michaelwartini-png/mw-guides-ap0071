import type { Erlebnisdetail } from "@/types/erlebnisdetail";

/**
 * AP-011 — Erlebnisdetail registry. One entry per highlight with full page content.
 * Katamaran Konstanz–Friedrichshafen is the reference detail page (mockup 2).
 */
const katamaranDetail: Erlebnisdetail = {
  slug: "katamaran-konstanz-friedrichshafen",
  tripSlug: "bodensee",
  erlebnisweltSlug: "mobilitaet",
  title: "Katamaran Konstanz–Friedrichshafen",
  subtitle:
    "Schnell, spektakulär und entspannt: In nur 52 Minuten über den Bodensee – mitten aus der Stadt in die Stadt.",
  badge: "BESTSELLER",
  heroImage: "/images/explore-trips/bodensee-schifffahrt.jpg",
  heroImageAlt: "Katamaran auf dem Bodensee mit Alpenpanorama",
  introVideoLabel: "Intro ansehen (1:12)",
  stats: [
    { icon: "clock", label: "Fahrzeit", value: "52 Min." },
    { icon: "calendar", label: "Saison", value: "Ganzjährig" },
    { icon: "euro", label: "Einfach", value: "ab 18,00 €" },
    { icon: "building", label: "Betreiber", value: "Bodensee-Schiffsbetriebe" },
    { icon: "route", label: "Verbindung", value: "Konstanz – Friedrichshafen" },
  ],
  score: 9.0,
  scoreCategories: [
    { label: "Komfort", value: 8.5 },
    { label: "Aussicht", value: 9.5 },
    { label: "Einzigartigkeit", value: 8.5 },
    { label: "Fotopotenzial", value: 9.5 },
  ],
  rideGuide: {
    title: "Ride Guide starten",
    price: "9,99 €",
  },
  description:
    "Der Katamaran ist die schnellste Verbindung zwischen Konstanz und Friedrichshafen. Auf dem offenen Deck oder in der Panoramalounge genießt du unverstellten Blick auf den See, die Schweizer Alpen und die Uferstädte. Kein Umsteigen, kein Stress – einfach einschiffen und 52 Minuten später in der Zeppelinstadt ankommen.",
  features: [
    { icon: "view", label: "Panoramablick auf See und Alpen" },
    { icon: "city", label: "Stadtzentrum zu Stadtzentrum" },
    { icon: "food", label: "Bistro an Bord" },
    { icon: "bike", label: "Fahrradmitnahme möglich" },
    { icon: "accessibility", label: "Barrierefrei zugänglich" },
  ],
  mapImage: "/images/explore-trips/bodensee-concept-illustration.png",
  mapImageAlt: "Karte der Katamaran-Strecke Konstanz–Friedrichshafen",
  mapInfo: {
    departureA: "Konstanz Hafen, Fährstraße",
    departureB: "Friedrichshafen Hafen, Uferpromenade",
    parking: "Parkhäuser in beiden Städten, 5 Min. zum Hafen",
    coordinates: "47.6597° N, 9.1750° E",
  },
  ticketImage: "/images/explore-trips/bodensee-schifffahrt.jpg",
  ticketImageAlt: "Katamaran am Hafen",
  ticketBullets: [
    "Einfach- und Hin- und Rückfahrten",
    "Fahrradmitnahme bis 30 Räder pro Fahrt",
    "Keine Reservierung erforderlich",
  ],
  ticketCtaLabel: "Tickets buchen",
  ticketCtaHref: "https://www.bsb-online.com",
  practicalInfo: [
    { label: "Dauer", value: "52 Minuten" },
    { label: "Frequenz", value: "Stündlich" },
    { label: "Saison", value: "Ganzjährig" },
    { label: "Wetter", value: "Bei fast jedem Wetter" },
    { label: "Reservierung", value: "Nicht erforderlich" },
    { label: "Fahrradmitnahme", value: "Bis 30 Fahrräder" },
    { label: "Barrierefreiheit", value: "Rollstuhlgerecht" },
    { label: "Hunde", value: "Erlaubt (Leine)" },
  ],
  operator: {
    name: "Der Katamaran / Bodensee-Schiffsbetriebe",
    phone: "+49 7531 3640-0",
    email: "info@katamaran-bodensee.de",
    website: "www.katamaran-bodensee.de",
  },
  gallery: [
    { src: "/images/explore-trips/bodensee-schifffahrt.jpg", alt: "Katamaran auf offener See" },
    { src: "/images/explore-trips/bodensee-konstanz.jpg", alt: "Innenbereich mit Panoramafenstern" },
    { src: "/images/explore-trips/bodensee-zeppelin.jpg", alt: "Sonnenuntergang vom Deck" },
    { src: "/images/explore-trips/bodensee-natur.jpg", alt: "Alpenpanorama vom Katamaran" },
    { src: "/images/explore-trips/bodensee-bahn.jpg", alt: "Ankunft in Friedrichshafen" },
  ],
  reviews: [
    { source: "google", rating: 4.2, reviewCount: 847 },
    { source: "tripadvisor", rating: 4.3, reviewCount: 312 },
  ],
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

function createGenericDetail(
  slug: string,
  tripSlug: string,
  erlebnisweltSlug: string,
  title: string,
  subtitle: string,
  heroImage: string,
  heroImageAlt: string,
): Erlebnisdetail {
  return {
    slug,
    tripSlug,
    erlebnisweltSlug,
    title,
    subtitle,
    heroImage,
    heroImageAlt,
    stats: [
      { icon: "calendar", label: "Saison", value: "Ganzjährig" },
      { icon: "route", label: "Region", value: "Bodensee" },
    ],
    score: 8.5,
    scoreCategories: [
      { label: "Komfort", value: 8.0 },
      { label: "Aussicht", value: 8.5 },
      { label: "Einzigartigkeit", value: 8.0 },
      { label: "Fotopotenzial", value: 8.5 },
    ],
    description: subtitle,
    features: [{ icon: "view", label: "Einzigartiges Erlebnis am Bodensee" }],
    practicalInfo: [
      { label: "Region", value: "Bodensee" },
      { label: "Saison", value: "Ganzjährig" },
    ],
    gallery: [{ src: heroImage, alt: heroImageAlt }],
    reviews: [{ source: "google", rating: 4.0 }],
    recommendations: [],
    combinations: [],
    includedInTrips: [
      {
        slug: "bodensee",
        title: "Bodensee Unlimited",
        image: "/images/explore-trips/bodensee-hero.jpg",
        imageAlt: "Bodensee Unlimited",
      },
    ],
  };
}

export const erlebnisdetails: Erlebnisdetail[] = [
  katamaranDetail,
  createGenericDetail(
    "bodensee-schifffahrt-meersburg",
    "bodensee",
    "mobilitaet",
    "Bodensee-Schifffahrt Meersburg",
    "Klassische Passagierschiffe verbinden alle Uferorte – drei Länder, ein Fahrschein.",
    "/images/explore-trips/bodensee-konstanz.jpg",
    "Passagierschiff bei Meersburg",
  ),
  createGenericDetail(
    "pfaenderbahn-bregenz",
    "bodensee",
    "mobilitaet",
    "Pfänderbahn Bregenz",
    "Seilbahn auf den Pfänder mit Panoramablick über den See und die Alpen.",
    "/images/explore-trips/bodensee-natur.jpg",
    "Pfänderbahn Bregenz",
  ),
  createGenericDetail(
    "strassenbahn-konstanz",
    "bodensee",
    "mobilitaet",
    "Historische Straßenbahn Konstanz",
    "Durch die Altstadt und entlang des Sees – Konstanz von der Schiene aus.",
    "/images/explore-trips/bodensee-konstanz.jpg",
    "Straßenbahn Konstanz",
  ),
  createGenericDetail(
    "rheinfall-schiff",
    "bodensee",
    "mobilitaet",
    "Rheinfall per Schiff",
    "Europas mächtigster Wasserfall vom Wasser aus – eine Stunde ab Schaffhausen.",
    "/images/explore-trips/bodensee-hero.jpg",
    "Schifffahrt zum Rheinfall",
  ),
  createGenericDetail(
    "zeppelin-rundflug",
    "bodensee",
    "mobilitaet",
    "Zeppelin-Rundflug Friedrichshafen",
    "Über Friedrichshafen und den See – Geschichte und Alltag aus der Luft.",
    "/images/explore-trips/bodensee-zeppelin.jpg",
    "Zeppelin über Friedrichshafen",
  ),
  createGenericDetail(
    "konstanz-altstadt",
    "bodensee",
    "staedte",
    "Konstanz Altstadt",
    "Konzilsgeschichte, Rheinbrücke und Seepromenade auf kurzen Wegen.",
    "/images/explore-trips/bodensee-konstanz.jpg",
    "Konstanz Altstadt",
  ),
  createGenericDetail(
    "insel-mainau",
    "bodensee",
    "natur",
    "Insel Mainau",
    "Blumeninsel im See – Parks, Palmenhaus und Schmetterlingshaus.",
    "/images/explore-trips/bodensee-natur.jpg",
    "Insel Mainau",
  ),
  createGenericDetail(
    "lindau-insel",
    "bodensee",
    "staedte",
    "Insel Lindau",
    "Leuchtturm, Löwenmauer und bayerische Altstadt auf einer Insel im See.",
    "/images/explore-trips/bodensee-konstanz.jpg",
    "Insel Lindau",
  ),
];

export function getErlebnisdetailBySlug(slug: string): Erlebnisdetail | undefined {
  return erlebnisdetails.find((e) => e.slug === slug);
}

export function getErlebnisdetailSlugs(): string[] {
  return erlebnisdetails.map((e) => e.slug);
}
