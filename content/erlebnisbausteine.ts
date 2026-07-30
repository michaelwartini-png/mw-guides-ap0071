import type { Erlebnisbaustein } from "@/types/erlebnisbaustein";

/**
 * AP-007 — central Erlebnisbaustein registry. Defined once, referenced by
 * slug from any Explore Trip (see content/exploreTrips.ts), so the same
 * module — e.g. a tram line — never has to be re-described per trip.
 *
 * `rideGuideSlug` is only set where a real Ride Guide already exists in
 * content/tours.ts (currently just Wien Linie D). Everything else is
 * real, named infrastructure (matches AP-007's own examples) without a
 * fabricated product attached — consistent with this project's existing
 * "no invented content" principle (see docs/AP-002-platform-architecture-strategy.md §3).
 */
export const erlebnisbausteine: Erlebnisbaustein[] = [
  {
    slug: "mailand-linie-1",
    type: "strassenbahn",
    title: "Mailand Linie 1",
    description: "Die älteste Straßenbahnlinie der Stadt, noch immer im Alltagsbetrieb — orangefarbene Waggons durch das historische Zentrum.",
    citySlug: "mailand",
  },
  {
    slug: "mailaender-metro",
    type: "zugstrecke",
    title: "Mailänder Metro",
    description: "Vier U-Bahn-Linien, die Design-Viertel, Universitäten und Wohnquartiere jenseits der Postkartenmotive verbinden.",
    citySlug: "mailand",
  },
  {
    slug: "como-faehren",
    type: "schifffahrt",
    title: "Como-Fähren",
    description: "Von Como nach Bellagio und Varenna — der Comer See als Nahverkehrsnetz, ganz ohne Auto.",
    citySlug: "mailand",
  },
  {
    slug: "bergamo-staedtseilbahn",
    type: "standseilbahn",
    title: "Bergamo Standseilbahn",
    description: "Wenige Minuten hinauf in die Città Alta, mit Blick über die Poebene.",
  },
  {
    slug: "navigli",
    type: "stadtviertel",
    title: "Navigli",
    description: "Mailands Kanalviertel — tagsüber ruhig, abends das lebendigste Ausgehviertel der Stadt.",
    citySlug: "mailand",
  },
  {
    slug: "tram-d-wien",
    type: "strassenbahn",
    title: "Tram D Wien",
    description: "Wiens schönste Straßenbahnfahrt entlang der Ringstraße, vom Nussdorf bis zum Hauptbahnhof.",
    citySlug: "wien",
    rideGuideSlug: "wien-linie-d",
  },
  {
    slug: "bratislava-strassenbahn",
    type: "strassenbahn",
    title: "Historische Straßenbahn Bratislava",
    description: "Rumpelnde Bahnen durch die kompakte Altstadt der zweiten Hauptstadt an der Donau.",
    citySlug: "bratislava",
  },
  {
    slug: "donauschifffahrt-wachau",
    type: "schifffahrt",
    title: "Donauschifffahrt Wachau",
    description: "Terrassenweinberge, Burgruinen und Stifte, erlebt vom Deck aus statt vom Straßenrand.",
  },
  {
    slug: "bratislava-altstadt",
    type: "stadtviertel",
    title: "Bratislava Altstadt",
    description: "Gassen, Burgblick und Grenzgeschichte auf engstem Raum — zu Fuß in einer guten Stunde erkundet.",
    citySlug: "bratislava",
  },
  {
    slug: "bodenseeschifffahrt",
    type: "schifffahrt",
    title: "Bodenseeschifffahrt",
    description: "Drei Länder, ein Fahrschein — der See als grenzüberschreitendes Verkehrsnetz zwischen Deutschland, Österreich und der Schweiz.",
  },
  {
    slug: "bodenseeguertelbahn",
    type: "zugstrecke",
    title: "Bodenseegürtelbahn",
    description: "Die Regionalbahn folgt dem Ufer fast lückenlos — Weinberge, Steilküsten und Seeblick im Minutentakt.",
  },
  {
    slug: "rheinfall",
    type: "aussichtspunkt",
    title: "Rheinfall",
    description: "Europas mächtigster Wasserfall, wenige Gehminuten vom Bahnhof Neuhausen entfernt.",
  },
  {
    slug: "zeppelin-friedrichshafen",
    type: "attraktion",
    title: "Zeppelin Friedrichshafen",
    description: "Friedrichshafen ist die Geburtsstadt des Zeppelins — ein Rundflug verbindet Luftfahrtgeschichte mit dem Blick auf drei Länder.",
    citySlug: "friedrichshafen",
  },
  {
    slug: "konstanz-altstadt",
    type: "stadtviertel",
    title: "Konstanz",
    description: "Die einzige deutsche Großstadt am Bodensee — Konzilsgeschichte, Rheinbrücke und Seepromenade auf kurzen Wegen.",
    citySlug: "konstanz",
  },
];

export function getErlebnisbausteinBySlug(slug: string): Erlebnisbaustein | undefined {
  return erlebnisbausteine.find((e) => e.slug === slug);
}
