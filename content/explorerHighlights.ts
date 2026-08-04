import type { ExplorerHighlightsByTrip } from "@/types/explorerHighlight";

/**
 * AP-011 — Explorer highlights registry. Highlights are grouped by trip and
 * filtered by erlebnisweltSlug in the workspace UI.
 */
const bodenseeHighlights: ExplorerHighlightsByTrip = {
  tripSlug: "bodensee",
  highlights: [
    // Mobilität
    {
      slug: "katamaran-konstanz-friedrichshafen",
      erlebnisweltSlug: "mobilitaet",
      title: "Katamaran Rundfahrt",
      location: "Friedrichshafen",
      description:
        "Schnell, spektakulär und entspannt: In nur 52 Minuten über den Bodensee – mitten aus der Stadt in die Stadt.",
      image: "/images/explore-trips/bodensee-schifffahrt.jpg",
      imageAlt: "Katamaran auf dem Bodensee zwischen Konstanz und Friedrichshafen",
      addedCount: 124,
    },
    {
      slug: "bodensee-schifffahrt-meersburg",
      erlebnisweltSlug: "mobilitaet",
      title: "Bodensee-Schifffahrt",
      location: "Meersburg",
      description:
        "Klassische Passagierschiffe verbinden alle Uferorte – drei Länder, ein Fahrschein.",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Passagierschiff der Bodensee-Schifffahrt bei Meersburg",
      addedCount: 98,
    },
    {
      slug: "pfaenderbahn-bregenz",
      erlebnisweltSlug: "mobilitaet",
      title: "Pfänderbahn",
      location: "Bregenz",
      description:
        "Seilbahn auf den Pfänder mit Panoramablick über den See und die Alpen.",
      image: "/images/explore-trips/bodensee-natur.jpg",
      imageAlt: "Pfänderbahn mit Blick auf den Bodensee",
      addedCount: 87,
    },
    {
      slug: "strassenbahn-konstanz",
      erlebnisweltSlug: "mobilitaet",
      title: "Historische Straßenbahn",
      location: "Konstanz",
      description:
        "Durch die Altstadt und entlang des Sees – Konstanz von der Schiene aus.",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Historische Straßenbahn in Konstanz",
      addedCount: 56,
    },
    {
      slug: "rheinfall-schiff",
      erlebnisweltSlug: "mobilitaet",
      title: "Rheinfall per Schiff",
      location: "Schaffhausen",
      description:
        "Europas mächtigster Wasserfall vom Wasser aus – eine Stunde ab Schaffhausen.",
      image: "/images/explore-trips/bodensee-hero.jpg",
      imageAlt: "Schifffahrt zum Rheinfall bei Schaffhausen",
      addedCount: 72,
    },
    {
      slug: "zeppelin-rundflug",
      erlebnisweltSlug: "mobilitaet",
      title: "Zeppelin-Rundflug",
      location: "Friedrichshafen",
      description:
        "Über Friedrichshafen und den See – Geschichte und Alltag aus der Luft.",
      image: "/images/explore-trips/bodensee-zeppelin.jpg",
      imageAlt: "Zeppelin NT über Friedrichshafen",
      addedCount: 143,
    },
    // Städte
    {
      slug: "konstanz-altstadt",
      erlebnisweltSlug: "staedte",
      title: "Konstanz Altstadt",
      location: "Konstanz",
      description:
        "Konzilsgeschichte, Rheinbrücke und Seepromenade auf kurzen Wegen.",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Altstadt von Konstanz am Bodensee",
    },
    {
      slug: "lindau-insel",
      erlebnisweltSlug: "staedte",
      title: "Insel Lindau",
      location: "Lindau",
      description:
        "Leuchtturm, Löwenmauer und bayerische Altstadt auf einer Insel im See.",
      image: "/images/explore-trips/bodensee-konstanz.jpg",
      imageAlt: "Hafeneingang der Insel Lindau",
    },
    {
      slug: "bregenz-seepromenade",
      erlebnisweltSlug: "staedte",
      title: "Bregenz Seepromenade",
      location: "Bregenz",
      description:
        "Kunsthaus, Festspielhaus und Uferpromenade mit Alpenpanorama.",
      image: "/images/explore-trips/bodensee-museen.jpg",
      imageAlt: "Seepromenade in Bregenz",
    },
    // Natur
    {
      slug: "insel-mainau",
      erlebnisweltSlug: "natur",
      title: "Insel Mainau",
      location: "Konstanz",
      description:
        "Blumeninsel im See – Parks, Palmenhaus und Schmetterlingshaus.",
      image: "/images/explore-trips/bodensee-natur.jpg",
      imageAlt: "Blumen auf der Insel Mainau",
    },
    {
      slug: "pfander-gipfel",
      erlebnisweltSlug: "natur",
      title: "Pfänder-Gipfel",
      location: "Bregenz",
      description:
        "360-Grad-Panorama über See, Vorarlberg und die Schweizer Alpen.",
      image: "/images/explore-trips/bodensee-natur.jpg",
      imageAlt: "Aussicht vom Pfänder auf den Bodensee",
    },
    // Kulinarik
    {
      slug: "felchen-vom-see",
      erlebnisweltSlug: "kulinarik",
      title: "Felchen vom See",
      location: "Überlingen",
      description:
        "Der Bodensee-Felchen auf dem Teller – frisch gebraten in den Uferrestaurants.",
      image: "/images/explore-trips/bodensee-kulinarik.jpg",
      imageAlt: "Felchen-Gericht in einem Restaurant am See",
    },
    {
      slug: "weinberg-wanderung",
      erlebnisweltSlug: "kulinarik",
      title: "Weinberg-Wanderung",
      location: "Meersburg",
      description:
        "Steile Hänge, Bodensee-Weine und Verkostung direkt am Rebberg.",
      image: "/images/explore-trips/bodensee-kulinarik.jpg",
      imageAlt: "Weinberge über dem Bodensee",
    },
    // Familie
    {
      slug: "sea-life-konstanz",
      erlebnisweltSlug: "familie",
      title: "SEA LIFE Konstanz",
      location: "Konstanz",
      description:
        "Unterwasserwelt des Bodensees – ideal für Familien an regnerischen Tagen.",
      image: "/images/explore-trips/bodensee-familie.jpg",
      imageAlt: "Familie im SEA LIFE Konstanz",
    },
    // Aktiv
    {
      slug: "radweg-bodensee",
      erlebnisweltSlug: "aktiv",
      title: "Bodensee-Radweg",
      location: "Rund um den See",
      description:
        "260 km Uferweg – flach, gut ausgeschildert und durch drei Länder.",
      image: "/images/explore-trips/bodensee-aktiv.jpg",
      imageAlt: "Radfahrer am Bodenseeufer",
    },
    // Besondere Erlebnisse
    {
      slug: "zeppelin-museum",
      erlebnisweltSlug: "besondere-erlebnisse",
      title: "Zeppelin-Museum",
      location: "Friedrichshafen",
      description:
        "Luftschiff-Geschichte hautnah – originalgetreue Nachbildungen und Artefakte.",
      image: "/images/explore-trips/bodensee-zeppelin.jpg",
      imageAlt: "Zeppelin-Museum Friedrichshafen",
    },
    {
      slug: "bregenzer-festspiele",
      erlebnisweltSlug: "besondere-erlebnisse",
      title: "Bregenzer Festspiele",
      location: "Bregenz",
      description:
        "Open-Air-Bühne auf dem Wasser – Oper und Musical im Sommer.",
      image: "/images/explore-trips/bodensee-museen.jpg",
      imageAlt: "Festspielhaus Bregenz am See",
    },
    // Ride Guides
    {
      slug: "ride-guide-schifffahrt",
      erlebnisweltSlug: "ride-guides",
      title: "Schifffahrt Konstanz",
      location: "Konstanz",
      description:
        "Audiotour für die wichtigsten Strecken der Bodenseeschifffahrt.",
      image: "/images/explore-trips/bodensee-ride-guides.jpg",
      imageAlt: "Ride Guide Schifffahrt Konstanz",
    },
    {
      slug: "ride-guide-zug-am-see",
      erlebnisweltSlug: "ride-guides",
      title: "Zug am See",
      location: "Bodenseegürtelbahn",
      description:
        "Panoramafenster und Seeblick – die Gürtelbahn im Minutentakt erklärt.",
      image: "/images/explore-trips/bodensee-bahn.jpg",
      imageAlt: "Ride Guide Bodenseegürtelbahn",
    },
  ],
};

export const explorerHighlights: ExplorerHighlightsByTrip[] = [bodenseeHighlights];

export function getHighlightsByTripSlug(tripSlug: string) {
  return explorerHighlights.find((h) => h.tripSlug === tripSlug)?.highlights ?? [];
}

export function getHighlightBySlug(tripSlug: string, highlightSlug: string) {
  return getHighlightsByTripSlug(tripSlug).find((h) => h.slug === highlightSlug);
}

export function getHighlightsByErlebniswelt(tripSlug: string, erlebnisweltSlug: string) {
  return getHighlightsByTripSlug(tripSlug).filter((h) => h.erlebnisweltSlug === erlebnisweltSlug);
}

export function getErlebnisSlugsForTrip(tripSlug: string): string[] {
  return getHighlightsByTripSlug(tripSlug).map((h) => h.slug);
}
