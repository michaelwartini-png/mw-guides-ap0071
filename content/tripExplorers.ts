import type { TripExplorer } from "@/types/tripExplorer";



/**

 * AP-010.2 — Trip Explorer registry. Bodensee + Mailand Unlimited.

 * Erlebniswelten images are swappable per trip; card layout is fixed in the template.

 */

const bodenseeExplorer: TripExplorer = {

  tripSlug: "bodensee",

  layout: "workspace",

  heroTitle: "Bodensee",

  heroSubtitle: "In 7 Tagen den gesamten Bodensee entdecken.",

  heroImage: "/images/explore-trips/bodensee-hero.jpg",

  heroImageAlt: "Panorama des Bodensees mit Blick auf die Schweizer Alpen",

  erlebniswelten: [

    {

      slug: "staedte",

      title: "Städte",

      explorerTitle: "Städte & Kultur",

      description:

        "Konstanz, Friedrichshafen, Lindau und Bregenz — historische Altstädte direkt am Wasser.",

      image: "/images/explore-trips/bodensee-konstanz.jpg",

      imageAlt: "Hafen von Konstanz am Bodensee",

      experienceCount: 8,

    },

    {

      slug: "natur",

      title: "Natur",

      explorerTitle: "Natur & Seen",

      description:

        "Waldwege, Weinberge und Uferpromenaden zwischen Alpen und Vorarlberg.",

      image: "/images/explore-trips/bodensee-natur.jpg",

      imageAlt: "Alpengipfel über dem Nebelmeer bei Sonnenaufgang",

      experienceCount: 12,

    },

    {

      slug: "mobilitaet",

      title: "Mobilität",

      explorerTitle: "Mit besonderen Verkehrsmitteln unterwegs",

      description:

        "Schiff, Bahn, Seilbahn, Zeppelin & mehr — der See verbindet drei Länder ohne Umsteige-Stress.",

      image: "/images/explore-trips/bodensee-mobilitaet.jpg",

      imageAlt: "Ruderboot auf türkisfarbenem Bergsee mit Alpenpanorama",

      experienceCount: 11,

    },

    {

      slug: "kulinarik",

      title: "Kulinarik",

      explorerTitle: "Genuss & Kulinarik",

      description:

        "Felchen vom See, Most aus dem Vorarlberg, Bodensee-Weine von steilen Hängen.",

      image: "/images/explore-trips/bodensee-kulinarik.jpg",

      imageAlt: "Weinstube mit Blick auf den Bodensee",

      experienceCount: 9,

    },

    {

      slug: "besondere-erlebnisse",

      title: "Besondere Erlebnisse",

      description:

        "Zeppelin-Rundflug, Thermalbäder, Insel Mainau — Momente, die es nur hier gibt.",

      image: "/images/explore-trips/bodensee-zeppelin.jpg",

      imageAlt: "Zeppelin im Flug über Friedrichshafen",

      experienceCount: 4,

    },

    {

      slug: "familie",

      title: "Familie",

      description:

        "Insel Mainau, Strandbäder und Tierparks — der Bodensee hält für jedes Alter etwas bereit.",

      image: "/images/explore-trips/bodensee-familie.jpg",

      imageAlt: "Familie am Bodenseeufer",

      experienceCount: 8,

    },

    {

      slug: "aktiv",

      title: "Aktiv",

      explorerTitle: "Aktiv unterwegs",

      description:

        "Radwege, Wanderungen und Wassersport — der See als Bühne für Bewegung.",

      image: "/images/explore-trips/bodensee-aktiv.jpg",

      imageAlt: "Radfahrer am Bodenseeufer",

      experienceCount: 10,

    },

    {

      slug: "ride-guides",

      title: "Ride Guides",

      description:

        "Audiotouren für Schiff, Bahn und Stadt — optional, aber unvergesslich.",

      image: "/images/explore-trips/bodensee-ride-guides.jpg",

      imageAlt: "Panoramablick aus dem Zug auf See und herbstliche Uferlandschaft",

      experienceCount: 5,

    },

    {

      slug: "schifffahrt",

      title: "Schifffahrt",

      description:

        "Drei Länder, ein Fahrschein. Der See wird zum Verkehrsnetz.",

      image: "/images/explore-trips/bodensee-schifffahrt.jpg",

      imageAlt: "Passagierschiff auf ruhigem Alpensee in der Abendsonne",

      experienceCount: 6,

    },

    {

      slug: "zugstrecken",

      title: "Zugstrecken",

      description:

        "Die Bodenseegürtelbahn folgt dem Ufer fast lückenlos mit Panoramafenstern.",

      image: "/images/explore-trips/bodensee-bahn.jpg",

      imageAlt: "Regionalbahn der Bodenseegürtelbahn am Seeufer",

      experienceCount: 5,

    },

    {

      slug: "museen",

      title: "Museen",

      description:

        "Zeppelin-Museum, Kunsthaus Bregenz, Rosgarten-Museum an einem Ort.",

      image: "/images/explore-trips/bodensee-museen.jpg",

      imageAlt: "Modernes Museum am Seeufer in der Abenddämmerung",

      experienceCount: 7,

    },

  ],

  highlightRideGuides: [

    {

      slug: "schifffahrt-konstanz",

      title: "Schifffahrt Konstanz",

      image: "/images/explore-trips/bodensee-konstanz.jpg",

      imageAlt: "Schifffahrt ab Konstanz",

    },

    {

      slug: "zug-am-see",

      title: "Zug am See",

      image: "/images/explore-trips/bodensee-bahn.jpg",

      imageAlt: "Zugstrecke entlang des Bodensees",

    },

    {

      slug: "zeppelin",

      title: "Zeppelin",

      image: "/images/explore-trips/bodensee-zeppelin.jpg",

      imageAlt: "Zeppelin-Rundflug über den Bodensee",

    },

    {

      slug: "rheinfall",

      title: "Rheinfall",

      image: "/images/explore-trips/bodensee-hero.jpg",

      imageAlt: "Rheinfall bei Schaffhausen",

    },

    {

      slug: "pfaenderbahn",

      title: "Pfänderbahn",

      image: "/images/explore-trips/bodensee-hero.jpg",

      imageAlt: "Pfänderbahn mit Alpenpanorama",

    },

  ],

  besondereErlebnisse: [

    {

      slug: "zeppelin-rundflug",

      title: "Zeppelin-Rundflug",

      image: "/images/explore-trips/bodensee-zeppelin.jpg",

      imageAlt: "Zeppelin NT über Friedrichshafen",

    },

    {

      slug: "insel-mainau",

      title: "Insel Mainau",

      image: "/images/explore-trips/bodensee-konstanz.jpg",

      imageAlt: "Blumeninsel Mainau im Bodensee",

    },

    {

      slug: "rheinfall-schiff",

      title: "Rheinfall per Schiff",

      image: "/images/explore-trips/bodensee-hero.jpg",

      imageAlt: "Schifffahrt zum Rheinfall",

    },

    {

      slug: "thermalbad-friedrichshafen",

      title: "Thermalbad Friedrichshafen",

      image: "/images/explore-trips/bodensee-zeppelin.jpg",

      imageAlt: "Thermalbad mit Seeblick",

    },

    {

      slug: "weinberg-wanderung",

      title: "Weinberg-Wanderung",

      image: "/images/explore-trips/bodensee-bahn.jpg",

      imageAlt: "Weinberge über dem Bodensee",

    },

    {

      slug: "bregenzer-festspiele",

      title: "Bregenzer Festspiele",

      image: "/images/explore-trips/bodensee-konstanz.jpg",

      imageAlt: "Festspielhaus Bregenz am See",

    },

  ],

};



const mailandExplorer: TripExplorer = {

  tripSlug: "mailand-unlimited",

  heroTitle: "Mailand",

  heroSubtitle: "Norditalien von einer Basis aus entdecken.",

  heroImage: "/images/explore-trips/mailand-hero.jpg",

  heroImageAlt: "Der Mailänder Dom und die Piazza del Duomo",

  erlebniswelten: [

    {

      slug: "staedte",

      title: "Städte",

      description:

        "Mailand, Bergamo, Verona und Turin — Weltstädte und mittelalterliche Altstädte per Bahn.",

      image: "/images/explore-trips/mailand-staedte.jpg",

      imageAlt: "Mailänder Dom und Piazza del Duomo",

      experienceCount: 10,

    },

    {

      slug: "natur",

      title: "Natur",

      description:

        "Comer See, Alpenpanorama und Lombardei — Natur eine Zugstunde von Mailand entfernt.",

      image: "/images/explore-trips/mailand-natur.jpg",

      imageAlt: "Panoramablick über den Comer See",

      experienceCount: 8,

    },

    {

      slug: "mobilitaet",

      title: "Mobilität",

      description:

        "Bahn, Metro, Straßenbahn und Fähre — Norditaliens dichtestes Netz von Mailand aus.",

      image: "/images/explore-trips/mailand-mobilitaet.jpg",

      imageAlt: "Frecciarossa am Bahnhof Milano Centrale",

      experienceCount: 9,

    },

    {

      slug: "kulinarik",

      title: "Kulinarik",

      description:

        "Risotto, Ossobuco, Navigli-Aperitivo und regionale Weine — die Lombardei auf dem Teller.",

      image: "/images/explore-trips/mailand-kulinarik.jpg",

      imageAlt: "Navigli-Viertel bei Aperitivo",

      experienceCount: 11,

    },

    {

      slug: "besondere-erlebnisse",

      title: "Besondere Erlebnisse",

      description:

        "Duomo-Dach, La Scala, Comer See per Fähre — Momente, die Norditalien unverwechselbar machen.",

      image: "/images/explore-trips/mailand-besondere-erlebnisse.jpg",

      imageAlt: "Ballonfahrt über die Alpen bei Mailand",

      experienceCount: 6,

    },

    {

      slug: "familie",

      title: "Familie",

      description:

        "Comer See, Science Museum und Parks — für jedes Alter etwas in und um Mailand.",

      image: "/images/explore-trips/mailand-familie.jpg",

      imageAlt: "Familienfreundlicher Tag am Comer See",

      experienceCount: 7,

    },

    {

      slug: "aktiv",

      title: "Aktiv",

      description:

        "Wanderungen in den Alpen, Radwege am See und Stadttouren zu Fuß.",

      image: "/images/explore-trips/mailand-aktiv.jpg",

      imageAlt: "Wanderweg in den Alpen bei Bergamo",

      experienceCount: 8,

    },

    {

      slug: "ride-guides",

      title: "Ride Guides",

      description:

        "Audiotouren für Straßenbahn, Metro und Stadt — optional, aber unvergesslich.",

      image: "/images/explore-trips/mailand-ride-guides.jpg",

      imageAlt: "Historische Straßenbahn in Mailand",

      experienceCount: 5,

    },

  ],

  highlightRideGuides: [

    {

      slug: "strassenbahn-mailand",

      title: "Historische Straßenbahn Mailand",

      image: "/images/explore-trips/mailand-ride-guides.jpg",

      imageAlt: "Historische Straßenbahn in Mailand",

    },

    {

      slug: "metro-mailand",

      title: "Metro Mailand",

      image: "/images/explore-trips/mailand-mobilitaet.jpg",

      imageAlt: "Metro Mailand",

    },

    {

      slug: "como-faehren",

      title: "Como-Fähren",

      image: "/images/explore-trips/mailand-natur.jpg",

      imageAlt: "Fähre auf dem Comer See",

    },

    {

      slug: "bergamo-seilbahn",

      title: "Bergamo Seilbahn",

      image: "/images/explore-trips/mailand-besondere-erlebnisse.jpg",

      imageAlt: "Seilbahn nach Bergamo Città Alta",

    },

  ],

  besondereErlebnisse: [

    {

      slug: "duomo-dach",

      title: "Duomo-Dach",

      image: "/images/explore-trips/mailand-staedte.jpg",

      imageAlt: "Blick vom Dach des Mailänder Doms",

    },

    {

      slug: "comer-see",

      title: "Comer See",

      image: "/images/explore-trips/mailand-natur.jpg",

      imageAlt: "Comer See in der Abenddämmerung",

    },

    {

      slug: "bergamo-alta",

      title: "Bergamo Città Alta",

      image: "/images/explore-trips/mailand-besondere-erlebnisse.jpg",

      imageAlt: "Bergamo Città Alta bei Sonnenaufgang",

    },

    {

      slug: "navigli",

      title: "Navigli-Viertel",

      image: "/images/explore-trips/mailand-kulinarik.jpg",

      imageAlt: "Navigli-Kanäle in Mailand am Abend",

    },

  ],

};



export const tripExplorers: TripExplorer[] = [bodenseeExplorer, mailandExplorer];



export function getTripExplorerByTripSlug(slug: string): TripExplorer | undefined {

  return tripExplorers.find((e) => e.tripSlug === slug);

}



export function getTripExplorerSlugs(): string[] {

  return tripExplorers.map((e) => e.tripSlug);

}

