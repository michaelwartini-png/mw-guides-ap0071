# MW Guides — Digital Platform

Selbstgeführte Audio-, Sightseeing-, Tram-, Bahn- und Kreuzfahrttouren als
digitale Plattform. Diese Repository enthält das produktionsreife
Next.js-Frontend der MW Guides Website.

## Projektbeschreibung

MW Guides ist keine Reiseagentur, kein Reiseblog und kein Buchungsportal,
sondern eine Marke für außergewöhnliche Reiseerlebnisse entlang
bemerkenswerter öffentlicher Verkehrswege. Die Plattform besteht aus
genau **zwei gleichwertigen Erlebniswelten** — **Ride Guides**
(GPS-geführte Touren entlang einer Strecke, `/touren`) und
**Explore Trips** (mehrtägige Reisekonzepte, `/explore-trips`) — ohne
weitere Content-Ebene. Die strategische Begründung sowie die
IA-Korrektur in AP-002.2 stehen in
[`docs/AP-002-platform-architecture-strategy.md`](./docs/AP-002-platform-architecture-strategy.md)
und
[`docs/AP-002.2-ia-simplification.md`](./docs/AP-002.2-ia-simplification.md).

## Projektdokumentation

- **Band 0 — Projektüberblick:** dieser README (Setup, Struktur, Design-System)
- **Band 1 — Production Handbook:** [`docs/MW-Guides-Production-Handbook-V1.0.md`](./docs/MW-Guides-Production-Handbook-V1.0.md)

Aktuelles Arbeitspaket: [`docs/AP-MR001-meine-reise.md`](./docs/AP-MR001-meine-reise.md) (Meine Reise V1, eingefroren).

## Voraussetzungen

- Node.js 20 oder neuer
- npm 10 oder neuer

## Installation

```bash
npm install
```

## Entwicklungsworkflow

```bash
npm run dev
```

Startet den lokalen Entwicklungsserver unter `http://localhost:3000`.

```bash
npm run lint
```

Prüft den Code mit ESLint (`eslint-config-next`, Core Web Vitals + TypeScript
Regelsatz).

```bash
npx tsc --noEmit
```

Prüft das Projekt auf TypeScript-Fehler, ohne Dateien zu erzeugen.

## Build

```bash
npm run build
```

Erstellt den produktionsreifen Build. Alle Routen werden, wo möglich,
statisch vorgerendert (siehe Build-Output für Details je Route).

```bash
npm run start
```

Startet den produktionsreifen Build lokal.

## Projektstruktur

```
mw-guides/
├── app/                    # Next.js App Router: Seiten, Layout, Metadaten-Routen
│   ├── layout.tsx          # Root-Layout inkl. SEO-Metadata
│   ├── page.tsx            # Startseite
│   ├── globals.css         # Tailwind-Import, lokale Fonts, Design-Tokens
│   ├── robots.ts           # robots.txt (generiert)
│   ├── sitemap.ts          # sitemap.xml (generiert, Grundstruktur)
│   ├── not-found.tsx       # 404-Seite
│   ├── touren/             # "Ride Guides"-Hub (nach Kategorie gruppiert) + /touren/[slug] Detailseite
│   ├── explore-trips/       # "Explore Trips"-Übersicht + /explore-trips/[slug] Detailseite (inkl. der drei migrierten Ex-"Reiseideen"-Artikel)
│   ├── meine-reise/         # Persönlicher Reiseassistent (AP-MR001, V1 eingefroren)
│   ├── reiseziele/         # Platzhalter-Route
│   ├── fotospots/          # Platzhalter-Route
│   ├── blog/                # Platzhalter-Route
│   ├── ueber/               # Platzhalter-Route
│   └── kontakt/             # Platzhalter-Route
├── components/
│   ├── layout/              # Header
│   ├── hero/                 # Hero, HeroBackground (real photo), RouteLine, SearchBar
│   ├── tours/                 # TourTile (real photo + illustration fallback), PopularTours, illustrations
│   ├── explore-trips/          # ExploreTripCard, UpcomingExploreTripCard
│   ├── sections/              # BrandIdea, WhyMWGuides, EveryCityHasAStory, HowItWorks, TravelerMoments, ExploreTripsSection
│   ├── about/                  # AboutHero, AboutIntro, AboutCta (Über-uns-Seite)
│   ├── editorial/               # EditorialBlock (Bild+Text, geteilt zwischen Über-uns- und Explore-Trips-Seiten)
│   ├── meine-reise/            # Meine-Reise-Dashboard (AP-MR001)
│   ├── ui/                     # Logo, Button, LanguageSwitch, Reveal (generische Bausteine)
│   └── footer/                  # Footer
├── content/                # Statische Inhalte (Touren, Explore Trips, Ride-Guide-Roadmap, Navigation)
├── docs/                   # Arbeitspaket-Dokumentation, inkl. Plattformarchitektur-Strategie
├── hooks/                  # Wiederverwendbare React-Hooks (useScrolled, useInView)
├── lib/                    # Hilfsfunktionen (z. B. cn)
├── types/                  # Geteilte TypeScript-Typen (inkl. taxonomy.ts, exploreTrip.ts)
├── public/
│   ├── images/              # Bild-Assets (aktuell Platzhalter-Verzeichnis)
│   ├── icons/                # Icon-Assets
│   └── logo/                  # Logo-Dateien
├── netlify.toml            # Netlify Build-Konfiguration
└── CHANGELOG.md
```

## Design-System

Die Design-Tokens (Farben, Schriften) sind zentral in `app/globals.css`
definiert und über Tailwinds `@theme inline` als Utility-Klassen verfügbar
(`bg-ink`, `text-accent`, `font-display`, `font-mono`, …). Seit AP-002.0 ist
die Palette auf Weiß/Anthrazit/Schwarz/warme Grautöne plus **eine**
Akzentfarbe (`--mwg-accent`) reduziert. Zusätzlich gibt es eine große,
editoriale Typo-Skala als Utility-Klassen (`.mwg-display-hero`,
`.mwg-display-xl`, `.mwg-display-lg`, `.mwg-eyebrow`) für die
Storytelling-Sektionen. Schriften werden lokal über `@fontsource`
eingebunden (Fraunces, Public Sans, IBM Plex Mono) — keine Abhängigkeit von
Google Fonts CDN.

## Deployment (Netlify)

Das Projekt ist für Netlify vorbereitet (`netlify.toml` +
`@netlify/plugin-nextjs`). Nach dem Verbinden des Repositories mit Netlify
ist keine weitere Konfiguration nötig:

1. Repository in Netlify verbinden.
2. Build-Command (`npm run build`) und Publish-Verzeichnis (`.next`) werden
   automatisch aus `netlify.toml` übernommen.
3. Netlify erkennt Next.js automatisch über das offizielle
   `@netlify/plugin-nextjs`.

### Umgebungsvariablen

| Variable | Zweck | Standardwert |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Basis-URL für Metadata, Open Graph, Sitemap | `https://mw-guides.de` |

## Nicht Bestandteil dieses Arbeitspakets

Backend, Login/Benutzerverwaltung, Datenbank, Shop/Zahlungsfunktionen, CMS,
API-Anbindungen und echte Mehrsprachigkeit sind bewusst nicht enthalten.
Die Ordnerstruktur (`content/`, `lib/`, `types/`) ist so vorbereitet, dass
diese Bereiche in späteren Arbeitspaketen ergänzt werden können, ohne die
bestehende Struktur umzubauen.

## Offene Punkte / Annahmen

- `NEXT_PUBLIC_SITE_URL` ist als Platzhalter auf `https://mw-guides.de`
  gesetzt und sollte vor dem Live-Gang bestätigt werden.
- Favicon ist aktuell das Next.js-Standard-Icon; ein MW-Guides-Favicon
  sollte unter `app/favicon.ico` ersetzt werden, sobald ein finales Logo
  vorliegt.
- `public/images`, `public/icons`, `public/logo` enthalten aktuell nur
  `.gitkeep`-Dateien, damit die Struktur in Git erhalten bleibt.
- **AP-001.1, Konflikt "hochwertige Platzhalterbilder":** Diese Umgebung
  hat keinen Zugriff auf Stock-Foto-Dienste, und echte Fotos bekannter Orte
  ohne Lizenz zu verwenden wäre rechtlich riskant. Gelöst durch eigens
  erstellte, markenkonforme Duotone-Illustrationen (SVG, inline, keine
  externen Requests) für Hero und Tourenkarten — siehe
  `components/hero/HeroBackground.tsx` und `components/tours/illustrations.tsx`.
  Beide sind so strukturiert, dass echte Fotografie später ohne
  Markup-Änderungen eingesetzt werden kann (Poster-/Bild-Slot bleibt
  gleich groß und gleich positioniert).
- **AP-001.1, Sekundärer Hero-Button "Demo erleben":** verlinkt aktuell auf
  den Abschnitt „So funktioniert's" (`#so-funktionierts`), da noch keine
  eigene Demo-Seite/-Video existiert. Zur Bestätigung durch die
  Projektleitung.
- Fünf alternative Premium-Headlines wurden dokumentiert, aber nicht
  aktiviert — siehe [`docs/AP-001.1-hero-headlines.md`](./docs/AP-001.1-hero-headlines.md).
- Rating-Feld (`Tour.rating`) ist im Datenmodell vorbereitet, aber noch
  nirgends gerendert, da keine echten Bewertungsdaten existieren.
- **AP-002.0, Konflikt "Farbpalette reduzieren":** Die AP-001.1-Akzente
  Gold (`#c9a227`) und Rust (`#a8503a`) wurden aus der aktiven Palette
  entfernt, da der Auftrag ausdrücklich "nur eine Akzentfarbe" fordert.
  Gewählt wurde der bestehende Teal-Ton als alleiniger Akzent
  (`--mwg-accent`), da er sich bereits als Marken-/Routenfarbe etabliert
  hatte. Badges (Neu/Bestseller) auf der Tour-Detailseite nutzen daher
  jetzt Grauton + Akzent statt eigener Farben.
- **AP-002.0, Konflikt "Hero: nur ein CTA":** Das (weiterhin
  funktionslose) Suchfeld wurde aus dem Hero entfernt, um "nur eine
  Hauptbotschaft, nur ein CTA" einzuhalten, und ist jetzt auf `/touren`
  zu finden (`components/hero/SearchBar.tsx`, unverändert wiederverwendet).
  Keine bestehende Funktion wurde entfernt, nur die Platzierung geändert.
- **AP-002.0, Konflikt "Icon-Wüsten vermeiden" vs. AP-001.1-Kartendaten:**
  Preis, Offline- und GPS-Kennzeichnung sowie Neu/Bestseller-Badges wurden
  von den Homepage-Kacheln entfernt (jetzt nur Ort, Titel, Story-Zeile)
  und auf die Tour-Detailseite verschoben, wo sie weiterhin vollständig
  angezeigt werden. Die Daten selbst (`Tour.priceFrom`, `.offline`,
  `.gpsGuided`, `.badge`) blieben im Datenmodell unverändert erhalten.
- **AP-002.0, "hochwertige Bildsprache":** Wie schon in AP-001.1 dokumentiert,
  hat diese Umgebung keinen Zugriff auf Stock-Foto-Dienste. Der Hero und
  die Tourenkacheln nutzen weiterhin bespoke, markenkonforme
  SVG-Illustrationen (jetzt einheitlich anthrazit/schwarz mit einem
  Akzent-Highlight statt bunter Duotone-Verläufe). Konkrete
  Foto-/Video-Empfehlungen für einen späteren Austausch stehen in
  [`docs/AP-002.0-content-wishlist.md`](./docs/AP-002.0-content-wishlist.md).
- **AP-002.0 (v2.0), Konflikt "Community / Traveler Moments":** Der
  verfeinerte Auftrag wünscht eine Social-Proof-Sektion. Da keine echten
  Kundenzitate oder -fotos vorliegen, wurde bewusst **keine** erfundenen
  Testimonials verwendet — das wäre irreführend. Stattdessen zeigt
  `TravelerMoments.tsx` wahrheitsgemäße Prozess-Statements zum
  Testing-Vorgang. Austausch gegen echten Social Proof empfohlen, sobald
  verfügbar (siehe Content-Wunschliste).
- **AP-002.1, echte Bilder integriert:** Hero (Startseite + Über uns),
  die Schwebebahn-Tourenkachel, der Schwebebahn-Detail-Hero und vier
  Bilder auf der neuen Über-uns-Seite nutzen jetzt echtes Bildmaterial
  statt Illustration/Farbverlauf. Die übrigen drei Touren
  (Wien, Küstentram, Brügge) behalten ihre Illustration, bis eigenes
  Bildmaterial vorliegt — siehe `TourTile.tsx` und
  `app/touren/[slug]/page.tsx` für den jeweiligen Austauschpunkt.
- **AP-002.1, Bildrechte:** Für drei der zehn Fotos besteht ungeklärter
  Klärungsbedarf, bevor die Seite live geht — Details und konkrete
  Empfehlungen in
  [`docs/AP-002.1-image-credits.md`](./docs/AP-002.1-image-credits.md):
  (1) das Guido-van-Helten-Mural als öffentliches Kunstwerk, (2) Herkunft/Alter
  der historischen Aufnahmen und der Postkarte, (3) erkennbare Personen im
  Wupper-Foto (Recht am eigenen Bild).
- **AP-002.1, „Originaltext" zunächst nicht mitgeliefert:** Der Auftrag
  verwies auf einen bereitgestellten Originaltext für die Über-uns-Seite,
  der in der ursprünglichen Nachricht fehlte. Es wurde bewusst keine
  Gründungsgeschichte erfunden; der Text wurde in einer Folgenachricht
  nachgereicht und dann unverändert (nur in Absätze strukturiert)
  übernommen.
- **AP-002.2 (aktuell gültig) — Reiseideen/Magazin entfernt:** Der
  darunterstehende AP-002-Punkt zur Content-Ebene „Reiseideen" ist
  **historisch** und wurde in AP-002.2 explizit zurückgenommen: MW
  Guides hat genau zwei Content-Ebenen, keine dritte. Details, inkl.
  Begründung und exakter neuer Homepage-Reihenfolge, in
  [`docs/AP-002.2-ia-simplification.md`](./docs/AP-002.2-ia-simplification.md).
  Alte `/reiseideen`-Links werden per 308 auf `/explore-trips`
  umgeleitet (`next.config.ts`).
- **AP-002, neue Content-Ebene „Reiseideen" (historisch, siehe oben):**
  Der Auftrag verlangt eine
  redaktionelle Ebene abseits fertiger Touren sowie eine Architektur, die
  künftige Themenwelten (Städte, Bahnstrecken, Straßenbahnen,
  Schwebebahnen, Wasserwege, Fähren, Kreuzfahrtausflüge) aufnehmen kann.
  Umgesetzt als eigener Content-Typ (`types/travelIdea.ts`) mit
  `category`-Feld, eigener Route `/reiseideen` (+ `[slug]`) und
  Navigationspunkt. Von den in der Beispielliste genannten Themen hatten
  wir nur für „Die schönsten Schwebebahnen der Welt" echtes Bildmaterial
  — daraus wurden drei vollständige Artikel. Die übrigen Beispielthemen
  (Straßenbahn, Wasserwege, Bahnstrecken, Kreuzfahrtausflüge) erscheinen
  auf `/reiseideen` als ehrlich beschriftete „In Vorbereitung"-Karten statt
  erfundener Artikel — siehe `content/travelIdeas.ts`,
  `upcomingTravelIdeas`.
- **AP-002, „So entsteht eine Tour" erweitert:** Die im Auftrag genannten
  Storytelling-Fragen (warum dieselbe Strecke mehrfach gefahren wird,
  warum Sitzplatz/Blickrichtung wichtig sind, wie recherchiert wird)
  wurden als kurze, allgemein gehaltene Prozess-Aussagen beantwortet —
  bewusst ohne erfundene konkrete Zahlen (z. B. Entwicklungsdauer), da
  diese nicht verifizierbar waren. Ein Link führt zur ausführlichen
  Reiseidee „Warum wir dieselbe Kurve immer wieder fahren", die dasselbe
  Thema mit echten Fotos vertieft.
- **AP-002, Plattformarchitektur V2:** Vollständige Begründung in
  [`docs/AP-002-platform-architecture-strategy.md`](./docs/AP-002-platform-architecture-strategy.md).
  Kernpunkte:
  - "Touren" → "Ride Guides" und "Reiseideen" → "Magazin" sind reine
    Label-Änderungen in der Hauptnavigation; URLs, Komponenten und
    Inhalte sind unverändert.
  - **Brügge passt nicht sauber in die neue Ride-Guides-Taxonomie**
    (kein Verkehrsmittel als roter Faden, sondern ein Spaziergang) und
    wurde daher unter der Kategorie „Sonstige" statt einer
    Fahrzeug-Kategorie einsortiert. Empfehlung: sobald „Explore Trips"
    echte Inhalte hat, Brügge dorthin verschieben.
  - `/explore-trips` und die „geplant"-Einträge auf `/touren` zeigen
    ausschließlich die im Auftrag genannten Titel/Linien als Roadmap —
    keine erfundenen Kurzbeschreibungen oder Bilder.
  - Hauptnavigation von 6 auf 4 Punkte reduziert; „Reiseziele",
    „Fotospots" und „Blog" sind weiterhin vollständig erreichbar, jetzt
    über die Fußzeile statt den Header (`content/navigation.ts`,
    `secondaryNav`).
- **AP-002, Bildauswahl:** Von 20 neu bereitgestellten Fotos wurden
  bewusst nur 6 verwendet („wenige, sehr große Bilder"), drei davon aus
  Rechtegründen ausgeschlossen (sichtbares Wasserzeichen bzw. vermutlich
  lizenzpflichtige Flickr-Fotografie). Details, Zuordnung und die
  ungenutzten, aber verfügbaren Motive stehen in
  [`docs/AP-002.1-image-credits.md`](./docs/AP-002.1-image-credits.md).
