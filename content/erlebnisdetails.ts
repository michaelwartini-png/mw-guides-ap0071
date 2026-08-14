import type { Erlebnisdetail } from "@/types/erlebnisdetail";

/**
 * AP-011 — Erlebnisdetail registry. One entry per highlight with full page content.
 * Katamaran migrated to ErlebnisprofilRenderer (AP-0022C); generic fallbacks remain for other highlights.
 */
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
