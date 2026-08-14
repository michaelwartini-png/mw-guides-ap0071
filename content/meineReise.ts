import { MEINE_REISE_BENEFITS } from "@/content/reisebegleiter";
import type { MeineReiseDashboard } from "@/types/meineReise";

/**
 * AP-MR001 — static V1 dashboard for the Bodensee Unlimited reference trip.
 * Copy follows the approved mockup plus the eight polish points.
 * No live weather, downloads, or account state.
 */
export const meineReiseDashboard: MeineReiseDashboard = {
  travelerFirstName: "Michael",
  tripSlug: "bodensee",
  tripTitle: "Bodensee Unlimited",
  dateRangeLabel: "12.–14. Juni 2027",
  countdownLabel: "Noch 42 Tage",
  progressPercent: 35,
  progressLabel: "Vorbereitung läuft",
  heroImage: "/images/explore-trips/bodensee-schifffahrt.jpg",
  heroImageAlt: "Katamaran auf dem Bodensee vor Stadt- und Bergkulisse",
  editHref: "/explore-trips/bodensee/explorer",
  nav: [
    { id: "uebersicht", label: "Übersicht", href: "#uebersicht" },
    { id: "reiseplan", label: "Reiseplan", href: "#reiseplan" },
    { id: "unterlagen", label: "Unterlagen", href: "#unterlagen" },
    { id: "aufgaben", label: "Aufgaben", href: "#aufgaben" },
    { id: "packliste", label: "Packliste", href: "#packliste" },
    { id: "kalender", label: "Kalender", href: "#kalender" },
    { id: "wetter", label: "Wetter", href: "#wetter" },
  ],
  trips: [
    {
      slug: "bodensee",
      title: "Bodensee Unlimited",
      image: "/images/explore-trips/bodensee-schifffahrt.jpg",
      imageAlt: "Bodensee Unlimited",
      href: "/meine-reise",
      active: true,
    },
    {
      slug: "wien-bratislava",
      title: "Wien – Bratislava",
      image: "/images/explore-trips/wien-donau.png",
      imageAlt: "Wien – Bratislava – Donau",
      href: "/explore-trips/wien-bratislava",
    },
    {
      slug: "mailand-unlimited",
      title: "Mailand Unlimited",
      image: "/images/explore-trips/mailand-staedte.jpg",
      imageAlt: "Mailand Unlimited",
      href: "/explore-trips/mailand-unlimited",
    },
  ],
  premiumBenefits: MEINE_REISE_BENEFITS,
  tasks: [
    {
      id: "hotel",
      title: "Hotel buchen",
      detail: "Konstanz oder Friedrichshafen",
      important: true,
    },
    {
      id: "tickets",
      title: "Tickets herunterladen",
      detail: "Katamaran Konstanz ↔ Friedrichshafen",
      dueLabel: "31. Mai",
    },
    {
      id: "checkin",
      title: "Online-Check-in",
      detail: "Sobald die Unterkunft bestätigt ist",
      dueLabel: "5. Juni",
    },
    {
      id: "guide",
      title: "Premium Guide herunterladen",
      detail: "Für die Tage vor Ort bereithalten",
      dueLabel: "8. Juni",
    },
    {
      id: "sync",
      title: "Offline-Daten synchronisieren",
      detail: "Guide, Karten und Tickets auf das Gerät",
      dueLabel: "10. Juni",
    },
  ],
  plan: [
    {
      day: 1,
      tabLabel: "Tag 1",
      title: "Tag 1",
      dateLabel: "Fr, 12. Juni",
      stops: [
        {
          time: "08:30",
          title: "Anreise nach Konstanz",
          ticketHref: "https://www.bahn.de",
          ticketLabel: "Ticket öffnen",
        },
        {
          time: "11:30",
          title: "Katamaran nach Friedrichshafen",
          meta: "Konstanz ↔ Friedrichshafen",
          ticketHref: "https://www.katamaran-bodensee.de",
          ticketLabel: "Ticket öffnen",
        },
        {
          time: "14:00",
          title: "Altstadt Konstanz",
          meta: "Spaziergang & Sehenswürdigkeiten",
        },
        {
          time: "19:00",
          title: "Abendessen am See",
          meta: "Restaurant-Tipp",
        },
      ],
    },
    {
      day: 2,
      tabLabel: "Tag 2",
      title: "Tag 2",
      dateLabel: "Sa, 13. Juni",
      stops: [
        {
          time: "09:30",
          title: "Insel Mainau",
          meta: "Parks & Gärten",
        },
        {
          time: "13:00",
          title: "Meersburg",
          meta: "Schiff",
        },
        {
          time: "15:30",
          title: "Altstadt & Weinlagen",
          meta: "Meersburg",
        },
      ],
    },
    {
      day: 3,
      tabLabel: "Tag 3",
      title: "Tag 3",
      dateLabel: "So, 14. Juni",
      stops: [
        {
          time: "09:00",
          title: "Bregenz · Pfänderbahn",
          meta: "Seilbahn",
        },
        {
          time: "13:30",
          title: "Schaffhausen · Rheinfall",
          meta: "Schiff",
        },
        {
          time: "17:00",
          title: "Rückreise",
          meta: "Zug",
        },
      ],
    },
  ],
  weather: {
    location: "Konstanz",
    temperature: 22,
    condition: "Sonnig",
    feelsLike: 23,
    forecast: [
      { label: "Fr", condition: "Sonnig", high: 22, low: 14 },
      { label: "Sa", condition: "Heiter", high: 21, low: 13 },
      { label: "So", condition: "Leicht bewölkt", high: 20, low: 13 },
    ],
    attribution: "Wettervorhersage von wetter.com",
  },
  overview: {
    days: 3,
    highlights: 6,
    budgetLabel: "≈ 182 € Vor-Ort-Kosten",
    styleLabel: "Leichter Entdecker Reisestil",
  },
  documents: [
    {
      id: "premium-guide",
      title: "Premium Guide",
      meta: "PDF · 18 MB",
      kind: "guide",
      offlineAvailable: true,
    },
    {
      id: "handout",
      title: "Handout",
      meta: "PDF · 3,2 MB",
      kind: "handout",
      href: "/explore-trips/bodensee",
    },
    {
      id: "tickets",
      title: "Tickets",
      meta: "Wallet & PDF",
      kind: "tickets",
      href: "https://www.katamaran-bodensee.de",
      external: true,
    },
    {
      id: "maps",
      title: "Karten",
      meta: "PDF · 4,6 MB",
      kind: "pdf",
      href: "#ueberblick",
    },
  ],
};
