import type { ExploreTrip } from "@/types/exploreTrip";

/** AP-ET002 — shared Trip-Explorer explanation for landing "Das Konzept". */
export const TRIP_EXPLORER_EXPLAINER_HEADING = "Reise jenseits des Reiseführers.";
export const TRIP_EXPLORER_EXPLAINER =
  "Ein Trip Explorer zeigt dir außergewöhnliche Regionen und Erlebnisbausteine, die klassische Reiseführer oft übersehen. Statt stundenlang zu recherchieren, stellst du deine persönliche Reise flexibel selbst zusammen. MW Guides spart dir Zeit und hilft dir dabei, mehr zu erleben.";

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
    teaser: "Eine Stadt. Unzählige Möglichkeiten. Norditalien neu entdecken.",
    heroImage: "/images/explore-trips/mailand-hero.jpg",
    heroImageAlt: "Der Mailänder Dom vor blauem Himmel, Piazza del Duomo",
    layout: "landing",
    subtitle: "Eine Stadt. Unzählige Möglichkeiten.",
    landing: {
      languageHint: "Verfügbar in bis zu 20 Sprachen",
      heroPrimaryCta: { href: "#konzept", label: "Trip entdecken" },
      heroSecondaryCta: { href: "#erlebniswelten", label: "Reiseideen speichern" },
      uspBar: [
        {
          icon: "bed",
          title: "Ein Hotel",
          description: "höchstens ein Umzug.",
        },
        {
          icon: "transport",
          title: "Top angebunden",
          description: "Bahn, Bus & Flug.",
        },
        {
          icon: "star",
          title: "Viele Ziele",
          description: "rund um die Stadt.",
        },
        {
          icon: "sparkles",
          title: "Jeden Tag neu",
          description: "alles kann – nichts muss.",
        },
        {
          icon: "suitcase",
          title: "Kein Umzug",
          description: "entspannt genießen.",
        },
      ],
      conceptHeading: "Mailand ist dein Ausgangspunkt. Du bestimmst den Kurs.",
      conceptIntro:
        "Wer eine Woche durch Norditalien reist, packt gewöhnlich fünfmal den Koffer. Mailand Unlimited braucht genau einen. Die Stadt bleibt Basis, die Ziele wechseln — Alpen am Vormittag, Seeufer am Nachmittag, Mailand selbst am Abend.",
      conceptExplainerHeading: TRIP_EXPLORER_EXPLAINER_HEADING,
      conceptExplainer: TRIP_EXPLORER_EXPLAINER,
      conceptLink: { href: "#konzept", label: "Mehr über das Konzept" },
      conceptIllustration: {
        src: "/images/explore-trips/mailand-concept-illustration.png",
        alt: "Mailand Unlimited – Konzeptillustration",
      },
      erlebnisweltenEyebrow: "Erlebniswelten",
      erlebnisweltenHeading: "Wähle deine Erlebniswelten",
      erlebnisweltenViewAll: {
        href: "/explore-trips/mailand-unlimited/explorer",
        label: "Alle Welten anzeigen",
      },
      erlebnisweltenFromExplorer: [
        { slug: "staedte", title: "Städte & Kultur" },
        { slug: "natur", title: "Natur & Seen" },
        { slug: "mobilitaet", title: "Mobilität" },
        { slug: "kulinarik", title: "Genuss" },
        { slug: "besondere-erlebnisse", title: "Besondere Erlebnisse" },
        { slug: "familie", title: "Familie" },
        { slug: "aktiv", title: "Aktiv" },
        { slug: "ride-guides", title: "Ride Guides" },
      ],
      highlightsHeading: "Weitere Erlebnisbausteine entdecken",
      highlightsFromExplorer: [
        "strassenbahn-mailand",
        "metro-mailand",
        "como-faehren",
        "bergamo-seilbahn",
        "navigli",
      ],
      highlightsViewAll: {
        href: "/explore-trips/mailand-unlimited/explorer",
        label: "Alle Erlebnisbausteine anzeigen",
      },
      platformUsps: [
        {
          title: "Individuell reisen",
          description: "Keine Gruppen, kein festes Programm.",
          icon: "users",
        },
        {
          title: "Jederzeit starten",
          description: "Keine Buchungsfristen.",
          icon: "calendar",
        },
        {
          title: "Öffentlicher Verkehr",
          description: "Bahn statt Mietwagen.",
          icon: "train",
        },
        {
          title: "Flexibel kombinierbar",
          description: "Jeden Tag neu entscheiden.",
          icon: "layers",
        },
        {
          title: "Bis zu 20 Sprachen",
          description: "Inhalte in deiner Sprache.",
          icon: "languages",
        },
        {
          title: "Lokale Expertise",
          description: "Von Einheimischen kuratiert.",
          icon: "map-pin",
        },
      ],
      closingImage: "/images/explore-trips/mailand-closing.jpg",
      closingImageAlt: "Navigli-Kanäle in Mailand bei Abendstimmung",
      closingHeadline: "Bereit für dein Abenteuer in Mailand?",
      closingSubtitle:
        "Öffne den Trip Explorer und entdecke alle Erlebniswelten und Erlebnisbausteine rund um Mailand.",
      closingButtonSubtext: "Der nächste Schritt zu deinem perfekten Trip.",
    },
    sections: [],
  },
  {
    slug: "wien-bratislava",
    theme: "reiseregion",
    title: "Wien & Bratislava",
    teaser: "Zwei Hauptstädte. Ein Fluss. Unzählige Erlebnisse dazwischen.",
    heroImage: "/images/explore-trips/wien-donau.png",
    heroImageAlt: "Donau in Wien mit Brücke und Riesenrad im Abendlicht",
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
    teaser: "Drei Länder. Ein See. Unendliche Erlebnisse.",
    heroImage: "/images/explore-trips/bodensee-hero.jpg",
    heroImageAlt: "Panorama des Rheinfalls bei Schaffhausen mit Schloss Laufen",
    layout: "landing",
    subtitle: "Drei Länder. Ein See. Unendliche Erlebnisse.",
    landing: {
      languageHint: "Verfügbar in bis zu 20 Sprachen",
      heroPrimaryCta: { href: "#konzept", label: "Trip entdecken" },
      heroSecondaryCta: { href: "#erlebniswelten", label: "Erlebniswelten ansehen" },
      uspBar: [
        {
          icon: "bed",
          title: "Ein Hotel",
          description: "höchstens ein Umzug.",
        },
        {
          icon: "globe",
          title: "Drei Länder",
          description: "Deutschland, Österreich, Schweiz.",
        },
        {
          icon: "star",
          title: "Viele Ziele",
          description: "Schiff, Bahn, Zeppelin & mehr.",
        },
        {
          icon: "sparkles",
          title: "Jeden Tag neu",
          description: "alles kann – nichts muss.",
        },
        {
          icon: "suitcase",
          title: "Flexibel kombinierbar",
          description: "deine Reise, dein Tempo.",
        },
      ],
      conceptHeading: "Warum dieser Explore Trip?",
      conceptIntro:
        "Statt jeden Tag den Koffer zu packen, bleibt ein Zimmer am Bodensee die ganze Woche über reserviert. Von dort aus erkundest du Deutschland, Österreich und die Schweiz per Schiff, Bahn und Zeppelin – ohne jeden Morgen neu einzuchecken.",
      conceptExplainerHeading: TRIP_EXPLORER_EXPLAINER_HEADING,
      conceptExplainer: TRIP_EXPLORER_EXPLAINER,
      conceptLink: { href: "#konzept", label: "Mehr über das Konzept" },
      conceptIllustration: {
        src: "/images/explore-trips/bodensee-concept-illustration.png",
        alt: "Bodensee Unlimited – Konzeptillustration",
      },
      erlebnisweltenEyebrow: "Erlebniswelten",
      erlebnisweltenHeading: "Wähle deine Erlebniswelten",
      erlebnisweltenViewAll: {
        href: "/explore-trips/bodensee/explorer",
        label: "Alle Welten anzeigen",
      },
      erlebnisweltenFromExplorer: [
        { slug: "staedte", title: "Städte & Kultur" },
        { slug: "natur", title: "Natur & Seen" },
        { slug: "mobilitaet", title: "Mobilität" },
        { slug: "kulinarik", title: "Genuss" },
        { slug: "besondere-erlebnisse", title: "Besondere Erlebnisse" },
        { slug: "familie", title: "Familie" },
        { slug: "aktiv", title: "Aktiv" },
        { slug: "ride-guides", title: "Ride Guides" },
      ],
      highlightsHeading: "Noch mehr Highlights am Bodensee",
      highlightsFromExplorer: [
        "katamaran-konstanz-friedrichshafen",
        "strassenbahn-konstanz",
        "zeppelin-rundflug",
        "insel-mainau",
        "zeppelin-museum",
      ],
      highlightsViewAll: {
        href: "/explore-trips/bodensee/explorer",
        label: "Alle Erlebnisbausteine anzeigen",
      },
      platformUsps: [
        {
          title: "Individuell reisen",
          description: "Keine Gruppen, kein festes Programm.",
          icon: "users",
        },
        {
          title: "Jederzeit starten",
          description: "Keine Buchungsfristen.",
          icon: "calendar",
        },
        {
          title: "Öffentlicher Verkehr",
          description: "Schiff, Bahn und Bus statt Mietwagen.",
          icon: "train",
        },
        {
          title: "Flexibel kombinierbar",
          description: "Jeden Tag neu entscheiden.",
          icon: "layers",
        },
        {
          title: "Bis zu 20 Sprachen",
          description: "Inhalte in deiner Sprache.",
          icon: "languages",
        },
        {
          title: "Lokale Expertise",
          description: "Von Einheimischen kuratiert.",
          icon: "map-pin",
        },
      ],
      closingImage: "/images/explore-trips/bodensee-konstanz.jpg",
      closingImageAlt: "Hafen von Konstanz am Bodensee bei Sonnenuntergang",
      closingHeadline: "Bereit für dein Abenteuer am Bodensee?",
      closingSubtitle:
        "Öffne den Trip Explorer und entdecke alle Erlebniswelten und Erlebnisbausteine rund um den See.",
      closingButtonSubtext: "Der nächste Schritt zu deinem perfekten Trip.",
    },
    sections: [],
  },

  // ===================================================================
  // AP-PP000 — additional Europe-entry examples. Magazine layout only
  // (no Ride Guides, prices, or booking). Click targets from /explore-trips.
  // ===================================================================
  {
    slug: "belgische-kueste",
    theme: "reiseregion",
    title: "Belgische Küste",
    teaser:
      "Nordsee, Dünen und Hafenstädte — Europas längste Straßenbahnlinie als Reiseidee.",
    heroImage: "/images/explore-trips/belgische-kueste.png",
    heroImageAlt: "Gelbe Küstentram entlang der belgischen Nordsee",
    subtitle: "Eine Küste. Unzählige Haltestellen.",
    usp: "Entlang der belgischen Nordsee reiht sich ein Ort an den nächsten — ohne jemals den Koffer neu packen zu müssen. Die Küste bleibt die Linie, die Städte und Dünen wechseln. Ein Ausgangspunkt, viele Tage am Meer.",
    flexibility:
      "Heute die Promenade, morgen ein Hafen, übermorgen einfach weiterfahren. Die Reihenfolge bestimmst du unterwegs.",
    recommendedDuration: "4–6 Tage, höchstens ein Hotelwechsel",
    highlights: [
      { title: "Eine Linie als roter Faden", text: "Die Küste verbindet die Orte — nicht ein fester Tagesplan." },
      { title: "Nordsee vor der Tür", text: "Dünen, Deiche und weites Wasser, ohne zwischen den Etappen umzuziehen." },
      { title: "Hafenstädte in Reichweite", text: "Jeder Halt ein anderes Gesicht derselben Küste." },
      { title: "Öffentlich unterwegs", text: "Straßenbahn und Fußweg statt Mietwagen entlang des Meeres." },
    ],
    sections: [],
  },
  {
    slug: "amsterdam",
    theme: "reiseregion",
    title: "Amsterdam",
    teaser: "Wasser, Schienen und eine Stadt, die sich langsam erschließt.",
    heroImage: "/images/explore-trips/amsterdam-grachten.png",
    heroImageAlt: "Grachten in Amsterdam mit historischen Fassaden und einem Kanalboot",
    subtitle: "Eine Stadt. Ein Netz. Unzählige Richtungen.",
    usp: "Amsterdam bleibt der Ausgangspunkt. Grachten, Schienen und das Umland liegen in Reichweite — ohne jeden Tag neu einzuchecken. Die Stadt erschließt sich langsam, die Richtung bestimmst du selbst.",
    flexibility:
      "Heute die Gracht, morgen das Meer, übermorgen einfach sitzen bleiben. Nichts davon ist Pflicht.",
    recommendedDuration: "4–6 Tage, ein fester Ausgangspunkt",
    highlights: [
      { title: "Wasser als roter Faden", text: "Grachten und Küste verbinden die Tage, nicht ein fester Plan." },
      { title: "Öffentlich unterwegs", text: "Bahn, Tram und Rad statt Mietwagen." },
      { title: "Die Stadt als Basecamp", text: "Ein Ausgangspunkt, viele Richtungen." },
      { title: "Langsam reisen", text: "Die Stadt zeigt sich, wenn man ihr Zeit lässt." },
    ],
    sections: [],
  },
  {
    slug: "glacier-express",
    theme: "reiseregion",
    title: "Glacier Express",
    teaser:
      "Von den Gletschern Graubündens bis nach Zermatt — die Alpen im Panoramafenster.",
    heroImage: "/images/explore-trips/bodensee-bahn.jpg",
    heroImageAlt: "Zugfahrt durch eine alpine Landschaft",
    subtitle: "Die Alpen. Ein Fenster. Dein Tempo.",
    usp: "Der Glacier Express ist keine Durchreise, sondern der Ausgangspunkt. Täler, Passagen und Bergorte bleiben in Reichweite — ohne jeden Tag neu einzuchecken. Die Fahrt selbst ist das Erlebnis, der Rest entsteht daraus.",
    flexibility:
      "Heute das Tal, morgen der Pass, übermorgen einfach sitzen bleiben. Nichts davon ist Pflicht.",
    recommendedDuration: "4–6 Tage, ein fester Ausgangspunkt",
    highlights: [
      { title: "Panorama statt Transfer", text: "Die Strecke ist die Sehenswürdigkeit — nicht nur der Weg dazwischen." },
      { title: "Ein Tal als Basis", text: "Ankommen, bleiben, von dort aus entscheiden." },
      { title: "Alpen ohne Mietwagen", text: "Bahn und öffentlicher Verkehr bis in die Täler." },
      { title: "Gletscher und Dörfer", text: "Große Landschaft, kleine Orte, frei kombinierbar." },
    ],
    sections: [],
  },
];

export function getExploreTripBySlug(slug: string): ExploreTrip | undefined {
  return exploreTrips.find((trip) => trip.slug === slug);
}
