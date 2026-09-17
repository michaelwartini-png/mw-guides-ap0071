export type LandingLocale = "de" | "en";

export const landingPaths = {
  de: {
    home: "/",
    about: "/ueber",
    contact: "/kontakt",
    imprint: "/impressum",
    privacy: "/datenschutz",
  },
  en: {
    home: "/en",
    about: "/en/about",
    contact: "/en/contact",
    imprint: "/en/imprint",
    privacy: "/en/privacy",
  },
} as const;

const PATH_TO_LOCALE: Record<string, { de: string; en: string }> = {
  "/": { de: "/", en: "/en" },
  "/en": { de: "/", en: "/en" },
  "/ueber": { de: "/ueber", en: "/en/about" },
  "/en/about": { de: "/ueber", en: "/en/about" },
  "/kontakt": { de: "/kontakt", en: "/en/contact" },
  "/en/contact": { de: "/kontakt", en: "/en/contact" },
  "/impressum": { de: "/impressum", en: "/en/imprint" },
  "/en/imprint": { de: "/impressum", en: "/en/imprint" },
  "/datenschutz": { de: "/datenschutz", en: "/en/privacy" },
  "/en/privacy": { de: "/datenschutz", en: "/en/privacy" },
};

export function counterpartPath(pathname: string, next: LandingLocale): string {
  const mapped = PATH_TO_LOCALE[pathname];
  if (mapped) return mapped[next];
  return landingPaths[next].home;
}

export const landingParty = {
  name: "Michael Wartini",
  company: "MW Guides",
  street: "Tannenstr. 118",
  zipCity: "42283 Wuppertal",
  countryDe: "Deutschland",
  countryEn: "Germany",
  phone: "+49 1578 0381250",
  phoneHref: "tel:+4915780381250",
  email: "info@mw-guides.com",
} as const;

export const landingCopy = {
  de: {
    nav: {
      exploreTrips: "Explore Trips",
      rideGuides: "Ride Guides",
      about: "About",
      menuOpen: "Menü öffnen",
      menuClose: "Menü schließen",
      homeAria: "MW Guides Startseite",
    },
    hero: {
      headline: "Reisen jenseits des Reiseführers.",
      headlineLines: ["Reisen jenseits", "des Reiseführers."],
      subline:
        "MW Guides entwickelt eine neue Generation digitaler Reiseerlebnisse für Menschen, die Regionen individuell entdecken möchten.",
      cta: "Mehr erfahren",
      imageAlt: "Wuppertaler Schwebebahn vor Himmel und Stahlträger",
    },
    idea: {
      id: "idee",
      headlineLines: ["Andere verkaufen Sehenswürdigkeiten.", "Wir entwickeln Reisen."],
      paragraphs: [
        "Die bemerkenswertesten Wege durch eine Region existieren oft schon — auf Schienen, auf dem Wasser, in den Straßen einer Stadt.",
        "MW Guides entsteht für Menschen, die selbst entdecken möchten. Individuell. Mit Haltung. Ohne vorgefertigte Programme.",
        "Was genau daraus wird, zeigen wir zum offiziellen Start.",
      ],
      imageAlt: "Gelbe Küstentram entlang der belgischen Nordsee",
    },
    emerging: {
      id: "entsteht",
      eyebrow: "Was entsteht",
      cards: [
        {
          id: "explore-trips",
          title: "Explore Trips",
          sentence: "Individuelle Reisekonzepte für Regionen, die mehr zu erzählen haben.",
          imageAlt: "Bergkette über einem Meer aus Wolken im Abendlicht",
        },
        {
          id: "ride-guides",
          title: "Ride Guides",
          sentence: "Außergewöhnliche Strecken — das Verkehrsmittel als Teil der Reise.",
          imageAlt: "Wuppertaler Schwebebahn über der Wupper",
        },
        {
          id: "travel-companion",
          title: "Travel Companion",
          sentence: "Ein stiller Begleiter für unterwegs, wenn es soweit ist.",
          imageAlt: "Schiff am Hafen von Konstanz",
        },
        {
          id: "multilingual",
          title: "Mehrsprachige Inhalte",
          sentence: "Geschichten, die in der Sprache der Reisenden ankommen.",
          imageAlt: "Mailänder Dom unter klarem Himmel",
        },
      ],
    },
    status: {
      id: "stand",
      headline: "Derzeit in Entwicklung",
      paragraphs: [
        "MW Guides befindet sich aktuell in der Entwicklungsphase.",
        "Die ersten Reisekonzepte, Ride Guides und internen Werkzeuge entstehen bereits.",
        "Weitere Informationen folgen zum offiziellen Projektstart.",
      ],
      comingSoon: "Coming Soon",
      imageAlt: "Fahrgastschiff auf einem Bergsee im Abendlicht",
    },
    about: {
      title: "About",
      headline: "Eine Idee nimmt Gestalt an.",
      paragraphs: [
        "MW Guides entsteht aus einer einfachen Beobachtung: Die schönsten Wege durch eine Region existieren oft schon. Auf Schienen. Auf dem Wasser. In den Straßen einer Stadt.",
        "Wir entwickeln digitale Reiseerlebnisse für Menschen, die selbst entdecken möchten — individuell, mit öffentlichen Verkehrsmitteln, ohne vorgefertigtes Programm.",
        "Das Projekt befindet sich in der Entwicklung. Mehr zum offiziellen Start.",
      ],
      imageAlt: "Berglandschaft über den Wolken",
    },
    contact: {
      title: "Kontakt",
      headline: "Schreiben Sie uns.",
      body: "MW Guides befindet sich in der Entwicklungsphase. Für Anfragen zum Projekt erreichen Sie uns unter den folgenden Angaben.",
      email: "info@mw-guides.com",
    },
    imprint: {
      title: "Impressum",
      headline: "Impressum",
      paragraphs: [
        "Angaben gemäß § 5 DDG",
        "Verantwortlich für den Inhalt dieser Website:",
      ],
    },
    privacy: {
      title: "Datenschutz",
      headline: "Datenschutz",
      paragraphs: [
        "Verantwortlich für die Datenverarbeitung auf dieser Website ist Michael Wartini, MW Guides, Tannenstr. 118, 42283 Wuppertal, Deutschland. Telefon: +49 1578 0381250. E-Mail: info@mw-guides.com.",
        "Diese Übergangsseite kommt ohne Registrierung, ohne Shop, ohne Newsletter und ohne Nutzerkonten aus.",
        "Es werden keine Tracking- oder Analysedienste eingesetzt. Insbesondere sind kein Google Analytics, kein Google Tag Manager, kein Meta Pixel, keine Google Maps, keine YouTube-Einbettungen und keine sonstigen Trackingdienste eingebunden. Schriften werden lokal bereitgestellt und nicht über Google Fonts geladen.",
        "Beim Aufruf der Seite kann der Hosting-Anbieter technisch notwendige Server-Logdaten verarbeiten (etwa IP-Adresse, Zeitpunkt, aufgerufene URL und Browsertyp), soweit das zur Auslieferung und Sicherheit der Website erforderlich ist. Eine Auswertung zu Werbe- oder Profilzwecken findet nicht statt.",
        "Es werden keine Tracking-Cookies gesetzt.",
        "Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Widerspruch sowie auf Beschwerde bei einer Datenschutzaufsichtsbehörde. Anfragen richten Sie bitte an info@mw-guides.com.",
      ],
    },
    footer: {
      copyright: "Alle Rechte vorbehalten.",
      contact: "Kontakt",
      imprint: "Impressum",
      privacy: "Datenschutz",
    },
  },
  en: {
    nav: {
      exploreTrips: "Explore Trips",
      rideGuides: "Ride Guides",
      about: "About",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      homeAria: "MW Guides home",
    },
    hero: {
      headline: "Travel beyond the guidebook.",
      headlineLines: ["Travel beyond", "the guidebook."],
      subline:
        "MW Guides is creating a new generation of digital travel experiences for curious independent travellers.",
      cta: "Learn more",
      imageAlt: "Wuppertal suspension railway against sky and steel beams",
    },
    idea: {
      id: "idee",
      headlineLines: ["Others sell attractions.", "We create journeys."],
      paragraphs: [
        "The most remarkable routes through a region often already exist — on rails, on water, along the streets of a city.",
        "MW Guides is being created for people who prefer to discover for themselves. Independently. With intent. Without a packaged itinerary.",
        "What exactly takes shape, we will share at the official launch.",
      ],
      imageAlt: "Yellow coastal tram along the Belgian North Sea",
    },
    emerging: {
      id: "entsteht",
      eyebrow: "What is taking shape",
      cards: [
        {
          id: "explore-trips",
          title: "Explore Trips",
          sentence: "Individual travel concepts for regions with more to tell.",
          imageAlt: "Mountain range above a sea of clouds at dusk",
        },
        {
          id: "ride-guides",
          title: "Ride Guides",
          sentence: "Extraordinary routes — the journey itself as part of the experience.",
          imageAlt: "Wuppertal suspension railway above the river",
        },
        {
          id: "travel-companion",
          title: "Travel Companion",
          sentence: "A quiet companion for the road, when the time comes.",
          imageAlt: "Passenger ship at the harbour in Constance",
        },
        {
          id: "multilingual",
          title: "Multilingual stories",
          sentence: "Stories that meet travellers in their own language.",
          imageAlt: "Milan Cathedral under a clear sky",
        },
      ],
    },
    status: {
      id: "stand",
      headline: "Currently in development",
      paragraphs: [
        "MW Guides is currently in its development phase.",
        "The first travel concepts, Ride Guides and internal tools are already taking shape.",
        "Further details will follow at the official launch.",
      ],
      comingSoon: "Coming Soon",
      imageAlt: "Passenger ship on a mountain lake at sunset",
    },
    about: {
      title: "About",
      headline: "An idea taking shape.",
      paragraphs: [
        "MW Guides begins with a simple observation: the most beautiful ways through a region often already exist. On rails. On water. Along the streets of a city.",
        "We are creating digital travel experiences for people who prefer to discover for themselves — independently, on public transport, without a packaged itinerary.",
        "The project is in development. More at the official launch.",
      ],
      imageAlt: "Mountain landscape above the clouds",
    },
    contact: {
      title: "Contact",
      headline: "Get in touch.",
      body: "MW Guides is in development. For project enquiries, please use the details below.",
      email: "info@mw-guides.com",
    },
    imprint: {
      title: "Legal notice",
      headline: "Legal notice",
      paragraphs: [
        "Information according to § 5 DDG (German Digital Services Act).",
        "Responsible for the content of this website:",
      ],
    },
    privacy: {
      title: "Privacy",
      headline: "Privacy",
      paragraphs: [
        "The person responsible for data processing on this website is Michael Wartini, MW Guides, Tannenstr. 118, 42283 Wuppertal, Germany. Phone: +49 1578 0381250. Email: info@mw-guides.com.",
        "This temporary site has no registration, no shop, no newsletter signup and no user accounts.",
        "No tracking or analytics services are used. In particular, this site does not include Google Analytics, Google Tag Manager, Meta Pixel, Google Maps, YouTube embeds or any other tracking services. Fonts are hosted locally and are not loaded from Google Fonts.",
        "When you visit the site, the hosting provider may process technically necessary server log data (such as IP address, time, requested URL and browser type) insofar as this is required to deliver and secure the website. The data is not evaluated for advertising or profiling.",
        "No tracking cookies are set.",
        "You have the right to access, rectification, erasure, restriction of processing and objection, as well as the right to lodge a complaint with a data protection supervisory authority. Please send requests to info@mw-guides.com.",
      ],
    },
    footer: {
      copyright: "All rights reserved.",
      contact: "Contact",
      imprint: "Legal notice",
      privacy: "Privacy",
    },
  },
} as const;

export type LandingCopy = (typeof landingCopy)[LandingLocale];
