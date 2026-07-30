import type { ExploreTrip } from "@/types/exploreTrip";

/**
 * The three real Explore Trips. Content migrated unchanged from the
 * former /reiseideen layer (AP-002.2) — only `category` → `theme` was
 * renamed to match the merged type; no text was altered.
 *
 * AP-007 added three further Explore Trips below (Mailand Unlimited,
 * Wien & Bratislava, Bodensee) using the premium-landing-page fields
 * introduced in types/exploreTrip.ts. Content is carried over unchanged
 * from this project's earlier Explore Trip work — no new copy was
 * invented for this integration.
 */
export const exploreTrips: ExploreTrip[] = [
  {
    slug: "125-jahre-schwebebahn",
    theme: "schwebebahn",
    title: "125 Jahre Schwebebahn — ein Blick zurück",
    teaser:
      "Von der Baustelle über der Straße bis zur gläsernen Station von heute.",
    heroImage: "/images/reiseideen/125-jahre-historisch.jpg",
    heroImageAlt:
      "Historische Werksfotografie der Schwebebahn im Bau, Bögen über einer Straße in Wuppertal",
    sections: [
      {
        heading: "Eine Bahn, die es so nur einmal gibt",
        paragraphs: [
          "Als die ersten Bögen über die Straßen von Elberfeld und Barmen gespannt wurden, gab es weltweit kein vergleichbares System. Eine Bahn, die nicht auf Schienen fährt, sondern an ihnen hängt — über Straßen, über Häusern, über der Wupper.",
          "Die frühen Werksfotografien zeigen eine Baustelle, die aus heutiger Sicht fast unwirklich wirkt: gusseiserne Bögen, handwerklich montiert, mitten im Alltag einer Stadt, die weiterhin ihren Straßen folgte, während darüber etwas völlig Neues entstand.",
        ],
      },
      {
        heading: "Die Stationen als eigene kleine Bauwerke",
        image: "/images/reiseideen/125-jahre-postkarte.jpg",
        imageAlt: "Historische Postkarte der Schwebebahnstation Schillerbrücke in Wupperfeld",
        imagePosition: "left",
        paragraphs: [
          "Viele Stationen wurden nicht als reine Zweckbauten geplant, sondern als kleine Bahnhofsarchitekturen mit eigenem Charakter — Türmchen, Erker, aufwendige Treppenhäuser. Die Schillerbrücke in Wupperfeld war eine davon.",
          "Auf alten Postkarten wird sichtbar, wie selbstverständlich die Schwebebahn schon kurz nach ihrer Eröffnung Teil des Stadtbilds geworden war — nicht als Attraktion für Besucher, sondern als tägliches Verkehrsmittel für die Menschen, die unter ihr lebten.",
        ],
      },
      {
        heading: "Was bleibt, wenn sich alles andere verändert",
        paragraphs: [
          "Die Strecke ist im Kern bis heute dieselbe geblieben: derselbe Verlauf entlang der Wupper, dieselben Kurven, viele derselben Stützen. Was sich verändert hat, sind die Fahrzeuge, die Stationen — und die Stadt selbst um sie herum.",
          "Genau dieser Kontrast macht die Strecke für uns bis heute interessant: eine über 120 Jahre alte Streckenführung, befahren von den modernsten Fahrzeugen, die es je gab.",
        ],
      },
    ],
  },
  {
    slug: "die-neue-generation",
    theme: "schwebebahn",
    title: "Die neue Generation im Alltag",
    teaser:
      "Leiser, heller, moderner — und trotzdem an derselben Strecke wie vor über hundert Jahren.",
    heroImage: "/images/reiseideen/neue-generation-hero.jpg",
    heroImageAlt: "Moderner Schwebebahn-Wagen der neuen Generation auf der Strecke Richtung Vohwinkel",
    sections: [
      {
        heading: "Neue Fahrzeuge, dieselbe Strecke",
        paragraphs: [
          "Die neue Fahrzeuggeneration hat das Erscheinungsbild der Schwebebahn spürbar verändert: großzügigere Fensterflächen, ein ruhigerer Lauf, ein völlig neues Design der Fahrzeugfront. Wer die Strecke aus den älteren Fahrzeugen kennt, bemerkt den Unterschied sofort.",
          "Für uns als Tourenentwickler bedeutet das vor allem eines: neue Blickwinkel. Größere Scheiben verändern, was man während der Fahrt sieht — und damit auch, welche Momente sich für eine Audiotour eignen.",
        ],
      },
      {
        heading: "Alltag statt Vorführfahrt",
        image: "/images/reiseideen/neue-generation-2020.jpg",
        imageAlt: "Wagen 23 der Wuppertaler Schwebebahn im regulären Fahrgastbetrieb",
        imagePosition: "right",
        paragraphs: [
          "Die neuen Fahrzeuge sind längst kein Sonderereignis mehr, sondern fester Teil des Alltagsbetriebs — mit Pendlern, Schulkindern, Einkaufstaschen. Genau das macht sie für uns interessant: Wir wollen zeigen, wie sich die Schwebebahn tatsächlich anfühlt, nicht wie sie bei einer Pressefahrt inszeniert wird.",
          "Deshalb entstehen unsere Aufnahmen bewusst im regulären Betrieb, zu normalen Tageszeiten, mit echten Fahrgästen an Bord.",
        ],
      },
    ],
  },
  {
    slug: "warum-wir-dieselbe-kurve-immer-wieder-fahren",
    theme: "schwebebahn",
    title: "Warum wir dieselbe Kurve immer wieder fahren",
    teaser:
      "Ein Blick hinter die Kulissen: derselbe Streckenabschnitt, an zwei verschiedenen Tagen fotografiert.",
    heroImage: "/images/reiseideen/dieselbe-kurve-01.jpg",
    heroImageAlt: "Die Schwebebahn in der charakteristischen Kurve über der Wupper, Blick von unten",
    sections: [
      {
        heading: "Die gleiche Stelle, aber nie derselbe Moment",
        image: "/images/reiseideen/dieselbe-kurve-02.jpg",
        imageAlt: "Derselbe Streckenabschnitt der Schwebebahn, fotografiert aus einem anderen Blickwinkel",
        imagePosition: "left",
        paragraphs: [
          "Diese Kurve über der Wupper haben wir mehrfach besucht — nicht, weil ein Bild nicht gereicht hätte, sondern weil sich Licht, Jahreszeit und Zugtakt jedes Mal anders zeigen.",
          "An einem bewölkten Herbsttag wirkt dieselbe Stelle völlig anders als an einem klaren Frühlingsmorgen. Manchmal fährt der Wagen genau im richtigen Moment durchs Bild, manchmal muss man auf die nächste Fahrt warten.",
        ],
      },
      {
        heading: "Warum das für eine Audiotour wichtig ist",
        paragraphs: [
          "Bei einer selbstgeführten Tour sitzen Sie nicht dort, wo wir standen, um zu fotografieren — Sie sitzen im Wagen selbst. Damit die Beschreibung eines Moments trifft, muss sie zu dem passen, was man tatsächlich aus dem Fenster sieht.",
          "Deshalb testen wir Strecken mehrfach: unterschiedliche Sitzplätze, unterschiedliche Tageszeiten, unterschiedliche Blickrichtungen. Erst wenn ein Abschnitt bei mehreren Fahrten funktioniert, wird er Teil einer Tour.",
        ],
      },
    ],
  },

  // ===================================================================
  // AP-007 — premium Explore Trips (Mailand Unlimited, Wien & Bratislava,
  // Bodensee). Content carried over unchanged from this project's earlier
  // Explore Trip development; only adapted to this codebase's field
  // names and terminology (e.g. "Reiseidee" → "Erlebnisbaustein").
  // ===================================================================
  {
    slug: "mailand-unlimited",
    theme: "reiseregion",
    title: "Mailand Unlimited",
    teaser: "Ein Hotel. Unzählige Möglichkeiten. Norditalien neu entdecken.",
    heroImage: "/images/explore-trips/mailand-hero.jpg",
    heroImageAlt: "Der Mailänder Dom vor blauem Himmel, Piazza del Duomo",
    subtitle: "Ein Hotel. Unzählige Möglichkeiten.",
    usp:
      "Wer eine Woche durch Norditalien reist, packt gewöhnlich fünfmal den Koffer. Mailand Unlimited braucht genau einen. Die Stadt bleibt Basis, die Ziele wechseln — Alpen am Vormittag, Seeufer am Nachmittag, Mailand selbst am Abend.",
    flexibility:
      "Berge oder See, Stadt oder ein Tag ganz ohne Programm — das entscheidet der Morgen, nicht der Kalender.",
    recommendedDuration: "5–7 Tage, frei wählbar",
    highlights: [
      { title: "Ein Hotel — viele Erlebnisse", text: "Eine feste Basis für die ganze Reise, kein Kofferpacken zwischen den Tagen." },
      { title: "Bahn statt Mietwagen", text: "Norditaliens dichtestes Schienennetz macht das Auto überflüssig." },
      { title: "Weltstadt, Seen und Berge", text: "Mailand, Alpenpanorama und Seenlandschaft liegen eine Zugstunde auseinander." },
      { title: "Jeden Tag ein neues Ziel", text: "Kein fester Plan — Laune und Wetter entscheiden am Morgen." },
      { title: "Nachhaltig unterwegs", text: "Öffentlicher Verkehr statt Autobahn, von Anfang bis Ende der Reise." },
      { title: "Maximale Flexibilität", text: "Die Reise passt sich dem Tag an, nicht umgekehrt." },
    ],
    erlebnisbausteineSlugs: ["mailand-linie-1", "mailaender-metro", "como-faehren", "bergamo-staedtseilbahn", "navigli"],
    rideGuideSlugs: [],
    gallery: [
      { image: "/images/explore-trips/mailand-bergamo.jpg", alt: "Sonnenaufgang über Bergamos Città Alta" },
      { image: "/images/explore-trips/mailand-como.jpg", alt: "Panoramablick über den Comer See in der Abenddämmerung" },
      { image: "/images/explore-trips/mailand-centrale.jpg", alt: "Zug unter dem historischen Glasdach von Milano Centrale" },
    ],
    sections: [],
  },
  {
    slug: "wien-bratislava",
    theme: "reiseregion",
    title: "Wien & Bratislava",
    teaser: "Zwei Hauptstädte. Ein Fluss. Unzählige Erlebnisse dazwischen.",
    heroImage: "/images/explore-trips/wien-bratislava-hero.jpg",
    heroImageAlt: "Panorama von Bratislava mit Burg und Donau, von der Neuen Brücke aus gesehen",
    subtitle: "Zwei Hauptstädte. Ein Fluss.",
    usp:
      "Zwei Hauptstädte, ein Gepäckstück. Statt zweimal einzuchecken, bleibt ein Zimmer die ganze Woche über reserviert — die Donau übernimmt den Rest der Fahrt. Sie verbindet Wien und Bratislava nicht nur geografisch, sondern macht die Strecke selbst zum Erlebnis.",
    flexibility:
      "Heute die Donau, morgen die Altstadt, übermorgen beides an einem einzigen Tag — die Reihenfolge bestimmst du unterwegs.",
    recommendedDuration: "4–6 Tage, höchstens ein Hotelwechsel",
    highlights: [
      { title: "Zwei Hauptstädte", text: "Wien und Bratislava, durch die Donau vereint statt getrennt." },
      { title: "Ein Fluss als roter Faden", text: "Die Donau verbindet jede Etappe dieser Reise." },
      { title: "Historische Straßenbahnen", text: "Tradition auf Schienen — in beiden Städten lebendig." },
      { title: "Wachau & Weinberge", text: "Terrassenlandschaft direkt am Wasser." },
      { title: "Donauschifffahrt", text: "Ankommen und Reisen werden zu ein und demselben Moment." },
      { title: "Zwei Länder, eine Reise", text: "Österreich und die Slowakei, ganz ohne Umweg." },
    ],
    erlebnisbausteineSlugs: ["tram-d-wien", "bratislava-strassenbahn", "donauschifffahrt-wachau", "bratislava-altstadt"],
    rideGuideSlugs: ["wien-linie-d"],
    gallery: [
      { image: "/images/explore-trips/wien-tram-d.jpg", alt: "Historische Straßenbahn der Linie D in Wien" },
      { image: "/images/explore-trips/bratislava-tram.jpg", alt: "Straßenbahn in Bratislava vor historischer Fassade" },
      { image: "/images/explore-trips/wachau.jpg", alt: "Weinberge und Kirche in der Wachau im Herbstlicht" },
    ],
    sections: [],
  },
  {
    slug: "bodensee",
    theme: "reiseregion",
    title: "Bodensee Unlimited",
    teaser: "Drei Länder. Ein See. Unzählige Erlebnisse.",
    heroImage: "/images/explore-trips/bodensee-hero.jpg",
    heroImageAlt: "Panorama des Rheinfalls bei Schaffhausen mit Schloss Laufen",
    subtitle: "Drei Länder. Ein See.",
    usp:
      "Drei Länder liegen um denselben See, und keines davon braucht einen eigenen Hotelaufenthalt. Ein Zimmer am Ufer genügt — Schiff, Bahn und Zeppelin übernehmen den Grenzübertritt, oft mehrfach am selben Tag.",
    flexibility:
      "Schiff, Bahn oder Zeppelin, diesseits oder jenseits der Grenze — jeder Tag stellt die Frage neu.",
    recommendedDuration: "4–6 Tage, höchstens ein Hotelwechsel",
    highlights: [
      { title: "Drei Länder", text: "Deutschland, Österreich und die Schweiz an einem einzigen See." },
      { title: "Schifffahrt", text: "Der See selbst wird zum Verkehrsmittel." },
      { title: "Panorama-Bahn", text: "Die Bodenseegürtelbahn mit Blick aufs Wasser." },
      { title: "Zeppelin", text: "Fliegen, wie es nur hier seinen Ursprung hat." },
      { title: "Rheinfall", text: "Einer der eindrucksvollsten Wasserfälle Europas." },
      { title: "Historische Städte", text: "Konstanz und mehr, alle direkt am Ufer." },
    ],
    erlebnisbausteineSlugs: ["bodenseeschifffahrt", "bodenseeguertelbahn", "rheinfall", "zeppelin-friedrichshafen", "konstanz-altstadt"],
    rideGuideSlugs: [],
    gallery: [
      { image: "/images/explore-trips/bodensee-konstanz.jpg", alt: "Hafen von Konstanz am Bodensee mit Kursschiff" },
      { image: "/images/explore-trips/bodensee-bahn.jpg", alt: "Regionalbahn der Bodenseegürtelbahn bei Überlingen im Herbstlicht" },
      { image: "/images/explore-trips/bodensee-zeppelin.jpg", alt: "Zeppelin NT im Flug über Friedrichshafen, Nahaufnahme der Gondel" },
    ],
    sections: [],
  },
];

export function getExploreTripBySlug(slug: string): ExploreTrip | undefined {
  return exploreTrips.find((trip) => trip.slug === slug);
}
