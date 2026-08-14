# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei
dokumentiert. Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

## [0.8.0] — Meine Reise V1

Persönlicher Reiseassistent nach dem freigegebenen Dashboard-Mockup.
Meine Reise gilt als Version 1.0 eingefroren. Kein Login, kein Checkout,
keine neuen Produktfunktionen.

- Route `/meine-reise` zeigt das Dashboard der Referenzreise Bodensee Unlimited.
- Premium im Hero ist bestätigt und ruhig: Status, Kurztext, Vorteile nur auf Abruf.
- Sidebar navigiert nur; Bearbeitung liegt in den Dashboard-Bereichen.
- Reiseplan ist das Herzstück (breiter, mehr Weißraum, stärkere Timeline, Tickets am Programmpunkt).
- „Nach der Reise“ bleibt vor Abreise sichtbar, aber reduziert.
- Aufgaben ohne Mehrwert (z. B. Wetter beobachten) entfallen.
- Offline-Hinweis nur am Premium Guide in den Unterlagen.
- Genau ein Primary-CTA: Premium Guide öffnen. Secondary: Reise bearbeiten.

Dokumentation: [`docs/AP-MR001-meine-reise.md`](./docs/AP-MR001-meine-reise.md)

## [0.7.0] — Trip Explorer ET-01 bis ET-05 abgeschlossen

Die Produktarchitektur des Trip Explorers ist vollständig (Referenzreise:
Bodensee Unlimited). MW Guides verkauft keine Reisen, sondern digitale
Reisebegleiter. ET-05 gilt als Version 1.1 eingefroren.

### ET-01 — Explore Trips Europa

Inspiration und Auswahl über Europakarte und Trip-Karten. Keine Buchung,
keine Tickets, keine Ride Guides auf dieser Ebene.

### ET-02 — Trip Explorer

Kein Redesign: Hero, Erlebniswelten und Konzeptillustration bleiben.
Die Seite erklärt, was ein Trip Explorer ist, und zeigt Erlebnisbausteine
statt Ride Guides.

- Kernbotschaft *Reise jenseits des Reiseführers* plus Nutzen „Zeit sparen“.
- Explore Trips bestehen aus Erlebnisbausteinen; Ride Guides sind optional
  erst am Baustein.

### ET-03 — Erlebnisprofil

Kein Redesign: Layout, Hero-Konzept, Score, Karte und Navigation bleiben.
Die Katamaran-Seite ist die Master-Vorlage für künftige Erlebnisbausteine.

- Ride Guide nur bei existierendem Guide, keine Platzhalter.
- Tickets immer über die offizielle Anbieterseite.
- Fehlende optionale Module werden vollständig ausgeblendet.

### ET-04 — Reise überprüfen

Überprüfung vor der Bestätigung: Sidebar im Review-Modus, klarer Übergang
zum Reisebegleiter, transparente Angaben zu Budget, Reisezeitraum und
Unterkunft. Keine Buchung.

### ET-05 — Reisebegleiter auswählen (V1.1)

Abschluss des Trip Explorers: der Nutzer wählt digitale Reisebegleiter.

- Explore Trip Handout immer kostenlos enthalten, ohne Zugang zu Meine Reise.
- Explore Trip Premium Guide 4,99 €, inkl. Meine Reise als Premium-Vorteil.
- Ride Guides nur, wenn für die Reise echte Guides existieren (Bodensee: keine).
- Reisekosten und MW-Guides-Produktpreis klar getrennt.
- Hinweis: MW Guides verkauft keine Reisen.
- Kein Zahlungsprozess, kein Login, keine Implementierung von Meine Reise.

## [0.6.0] — AP-002.2 — Informationsarchitektur der Startseite geschärft

Korrektur des größten UX-Problems aus AP-002: Ride Guides und Explore
Trips wurden in der Navigation genannt, aber auf der Homepage nirgends
erklärt. Kein Redesign — nur Struktur, Überschriften und Reihenfolge.

### Geändert (strukturell)

- **Keine dritte Content-Ebene mehr.** "Reiseideen"/"Magazin" wurde
  vollständig in Explore Trips überführt, wie explizit gefordert
  ("Explore Trips sind unsere Reiseideen"):
  - `types/travelIdea.ts` + die bisherige `ExploreTrip`-Roadmap-Definition
    in `types/exploreTrip.ts` zu einem Typ zusammengeführt.
  - `content/travelIdeas.ts` → `content/exploreTrips.ts`; die drei
    echten Artikel sind inhaltlich unverändert übernommen.
  - `/reiseideen` und `/reiseideen/[slug]` entfernt; alte URLs leiten
    per 308 auf `/explore-trips` bzw. `/explore-trips/[slug]` um
    (`next.config.ts`), kein Link bricht.
  - Explore-Trips-Roadmapliste auf die im Auftrag aktualisierten
    Beispiele umgestellt (u. a. neu: "Schwebebahnen der Welt",
    "Straßenbahnstädte Europas", "Bahnreisen"; "Bodensee" →
    "Bodensee ohne Auto").
  - Hauptnavigation von 4 auf 3 Punkte reduziert: Ride Guides, Explore
    Trips, Über MW Guides — "Magazin" entfernt.
- **Homepage neu geordnet und beschriftet**, exakt nach Vorgabe: Hero →
  Unsere Haltung → Unsere Arbeitsweise → **Ride Guides** (Überschrift
  jetzt wörtlich "Ride Guides" statt "Jede Tour erzählt eine
  Geschichte.") → **Explore Trips** (neue Sektion, zeigt die drei
  echten Trips) → Jede Stadt hat eine Geschichte → So entsteht eine
  Tour. "Reisen wie ein Einheimischer" war in der Vorgabe nicht
  erwähnt und wurde nicht entfernt, sondern an seiner bisherigen
  Position (vor "So entsteht eine Tour") belassen — siehe
  `docs/AP-002.2-ia-simplification.md` für die Begründung.

### Behoben

- Link im "So entsteht eine Tour"-Abschnitt zeigte auf die jetzt
  entfernte `/reiseideen`-Route — korrigiert auf `/explore-trips/...`.

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller 20 Routen bestätigt.
- Homepage-Überschriften in der geforderten Reihenfolge per
  HTML-Extraktion verifiziert: "Wir reisen zuerst." → "Ride Guides" →
  "Explore Trips" → "Jede Stadt hat eine Geschichte." → "Reisen wie ein
  Einheimischer." → "So entsteht eine Tour."
- Redirect `/reiseideen/125-jahre-schwebebahn` → `/explore-trips/125-jahre-schwebebahn`
  mit HTTP 308 verifiziert.
- Keine neuen Abhängigkeiten (Paketliste identisch zu 0.5.0).

## [0.5.0] — AP-002 — Plattformarchitektur V2

Weiterentwicklung von einer Website mit Einzeltouren zu einer
skalierbaren Erlebnisplattform mit zwei gleichwertigen Erlebniswelten.
Bestehendes Design, bestehende Komponenten und Inhalte vollständig
erhalten — keine neuen Abhängigkeiten. Enthält eine ausführliche
kritische Analyse der vorgeschlagenen Architektur, wie im Auftrag
gefordert.

### Hinzugefügt

- **`docs/AP-002-platform-architecture-strategy.md`:** Beantwortet alle
  im Auftrag gestellten strategischen Fragen (Struktur, fehlende
  Inhalte, Skalierungsprobleme, UX-Probleme, internationale Best
  Practices) und begründet jede wesentliche Abweichung vom
  Ursprungsvorschlag.
- **Gemeinsame Taxonomie** (`types/taxonomy.ts`): Ride-Guide-Kategorien,
  Länder, Städte, Schwierigkeitsgrad und Feature-Flags — einmal
  definiert, von Ride Guides und (künftig) Explore Trips referenziert.
- **„Ride Guides"-Hub** (`/touren`, komplett neu aufgebaut): bestehende
  vier Touren nach Kategorie gruppiert (Schwebebahnen, Straßenbahnen,
  Sonstige); die im Auftrag genannten, noch nicht existierenden Linien
  (Panoramabahnstrecken, Fähren, Seilbahnen, weitere
  Straßenbahn-Städte) erscheinen als ehrlich beschriftete
  „geplant"-Einträge (`content/rideGuideRoadmap.ts`), nicht als
  erfundene Artikel.
- **„Explore Trips"** (`/explore-trips`, neu): zweite Erlebniswelt für
  mehrtägige Reisekonzepte. Architektur vorbereitet
  (`types/exploreTrip.ts`), aber ausschließlich Roadmap-Titel ohne
  fabrizierte Inhalte, da keine echten Reisekonzepte vorliegen.
- Homepage-Teaser `ExploreTripsTeaser`, eingefügt direkt nach den
  Ride-Guides-Touren, damit beide Erlebniswelten wie gefordert auf der
  Startseite präsent sind.

### Geändert

- **Hauptnavigation von 6 auf 4 Punkte reduziert:** "Ride Guides",
  "Explore Trips", "Magazin", "Über MW Guides". "Touren" → "Ride
  Guides" und "Reiseideen" → "Magazin" sind reine Label-Änderungen
  (URLs, Komponenten, Inhalte unverändert). "Reiseziele", "Fotospots"
  und "Blog" wurden nicht entfernt, sondern in die Fußzeile verschoben
  (`content/navigation.ts`, neues `secondaryNav`).
- `Tour`-Typ um optionale Felder `category`, `citySlug`, `difficulty`
  erweitert (additiv, keine bestehende Verwendung geändert).
- Der „Alle Reiseziele"-Link auf der Startseite zeigte auf die leere
  `/reiseziele`-Platzhalterseite statt auf die eigentliche Tourenübersicht
  — korrigiert auf `/touren` („Alle Ride Guides").
- `sitemap.ts` um `/explore-trips` ergänzt.

### Nicht umgesetzt (bewusst, laut Auftrag "nur Architektur vorbereiten")

- Keine Datenbank, keine echte Suche, keine Filter-UI, keine
  Mehrsprachigkeit, keine Bewertungen/Sammlungen/Benutzerkonten. Die
  Datenstruktur (`types/taxonomy.ts`) ist so angelegt, dass diese
  Funktionen später ergänzt werden können, ohne bestehende Inhalte
  umzustrukturieren.

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller 21 Routen bestätigt (20 zuvor + neue
  `/explore-trips`).
- Keine neuen Abhängigkeiten (Paketliste identisch zu 0.4.0).

## [0.4.0] — AP-002 — Brand Identity & Editorial Experience

Neue redaktionelle Content-Ebene „Reiseideen" neben den bestehenden
Touren, plus sechs weitere echte Fotos. Bestehende Architektur,
Designsystem und Komponenten wie im Auftrag gefordert erhalten — keine
neuen Abhängigkeiten.

### Hinzugefügt

- **Neuer Content-Typ „Reiseideen"** (`types/travelIdea.ts`,
  `content/travelIdeas.ts`) mit `category`-Feld, das künftige
  Themenwelten (Straßenbahn, Bahnstrecken, Wasserwege, Fähren, Städte,
  Kreuzfahrtausflüge) vorbereitet, ohne die bestehende Struktur zu
  verändern.
- **Neue Routen `/reiseideen` und `/reiseideen/[slug]`** mit drei
  vollständigen redaktionellen Artikeln, gebaut auf echtem Bildmaterial:
  „125 Jahre Schwebebahn — ein Blick zurück", „Die neue Generation im
  Alltag", „Warum wir dieselbe Kurve immer wieder fahren". Vier weitere
  im Auftrag genannte Themen erscheinen als ehrlich beschriftete
  „In Vorbereitung"-Platzhalter statt erfundener Artikel.
- Neue Komponenten: `IdeaCard`, `UpcomingIdeaCard`,
  `ReiseideenTeaser` (Startseiten-Vorschau), sowie `EditorialBlock` an
  einen gemeinsamen Ort (`components/editorial/`) verschoben, damit
  Über-uns- und Reiseideen-Seiten dieselbe Bild+Text-Komponente
  wiederverwenden.
- „Reiseideen" als neuer Navigationspunkt (`content/navigation.ts`).
- Sechs weitere echte Fotos integriert (historische Werksfotografie,
  Postkarte, zwei Generation-15-Aufnahmen, zwei Aufnahmen derselben
  Fotositzung für die Prozess-Geschichte).

### Geändert

- **„So entsteht eine Tour"** direkt um die im Auftrag genannten
  Storytelling-Fragen erweitert (Streckenwiederholung,
  Sitzplatz/Blickrichtung, Recherche) und mit einem Link zur
  ausführlichen Reiseidee verknüpft.
- `sitemap.ts` um die neuen Reiseideen-Routen ergänzt.

### Nicht verwendet (dokumentiert)

- Drei der 20 neu gelieferten Fotos wurden aus Rechtegründen
  ausgeschlossen (sichtbares Fotografen-Wasserzeichen bzw. vermutlich
  lizenzpflichtige Flickr-Fotografie) — siehe
  `docs/AP-002.1-image-credits.md`.

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller 20 Routen bestätigt (16 zuvor + 4 neue:
  Reiseideen-Übersicht + drei Detailseiten).
- Keine neuen Abhängigkeiten (Paketliste identisch zu 0.3.0).

## [0.3.0] — AP-002.1 — Real Content Integration

Erste Integration echten Contents: zehn bereitgestellte Fotos und der
Originaltext für die Über-uns-Seite. Keine Änderungen an Architektur,
Routing, Komponentenstruktur, Designsystem, Typografie, Farben oder
Animationen — ausschließlich Content-Integration, wie im Auftrag
gefordert.

### Hinzugefügt

- **Neue Seite `/ueber`:** vollständige About-Seite mit dem echten
  Originaltext (nur in Absätze strukturiert, nicht gekürzt oder
  werblich umgeschrieben). Aufbau: Hero → Über MW Guides → Wie alles
  begann → Unsere Philosophie → Unsere Vision → CTA. Neue
  wiederverwendbare Bausteine dafür: `AboutHero`, `AboutIntro`,
  `EditorialBlock` (Bild + Text, alternierend), `AboutCta`.
- **Echte Fotografie** an neun Stellen integriert (next/image, statische
  Imports für automatische Maße und CLS-Vermeidung, `priority` nur auf
  den beiden Hero-Bildern):
  - Startseite: Hero, „Jede Stadt hat eine Geschichte" (Hintergrund),
    Schwebebahn-Tourenkachel, „Reisen wie ein Einheimischer",
    „So entsteht eine Tour".
  - Tour-Detailseite Schwebebahn: Hero.
  - Über-uns-Seite: Hero, „Wie alles begann", „Unsere Philosophie",
    „Unsere Vision".
- `docs/AP-002.1-image-credits.md`: Zuordnung aller zehn Bilder zu ihrer
  Verwendung sowie offene Bildrechte-Fragen (Mural, historische
  Aufnahmen, erkennbare Personen).

### Geändert

- `HeroBackground.tsx`: reales Foto statt der AP-002.0-Platzhalter-SVG;
  `videoSrc`-Prop und Architektur unverändert.
- `TourTile.tsx` / `app/touren/[slug]/page.tsx`: Schwebebahn nutzt jetzt
  echtes Bildmaterial; die übrigen drei Touren behalten unverändert ihre
  Illustration bzw. Farbverlauf, bis eigenes Bildmaterial vorliegt.
- Metadata/OG-Bezug unverändert (SEO laut Auftrag nicht Bestandteil
  dieses Pakets).

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller 16 Routen weiterhin bestätigt.
- Optimierte Bild-Auslieferung über `/_next/image` stichprobenartig mit
  Erfolgsstatus (200) und realer Dateigröße verifiziert.
- Keine neuen Abhängigkeiten (Paketliste identisch zu 0.2.1; kein
  `sharp` nötig, next/image nutzt den eingebauten Optimizer).

## [0.2.1] — AP-002.0 (v2.0) — Markenpositionierung geschärft

Verfeinerung des AP-002.0-Redesigns um die explizite Markenpositionierung
("wir verkaufen die Reise, nicht die Attraktion"). Keine Architektur-,
Routing- oder Abhängigkeitsänderungen.

### Hinzugefügt

- **„Die Idee" (`BrandIdea`):** neue, sehr kurze Sektion direkt nach dem
  Hero — "Andere verkaufen die Attraktion. Wir verkaufen die Reise
  selbst."
- **„So entsteht eine Tour" (`TravelerMoments`):** neue Abschlusssektion
  vor dem Footer als Antwort auf die gewünschte
  Community-/Traveler-Moments-Sektion — bewusst mit wahrheitsgemäßen
  Prozess-Statements statt erfundener Kundenzitate umgesetzt (siehe
  README „Offene Punkte").

### Geändert

- **„Warum MW Guides anders ist" (`WhyMWGuides`):** von einem einzelnen
  Statement zu einer ruhigen, nummerierten Liste der vier
  Alleinstellungsmerkmale (Außergewöhnliche Strecken, Persönlich
  erfahren, Reisen wie ein Einheimischer, Slow Travel) — weiterhin ohne
  Icons.
- Seitenreihenfolge angepasst: Hero → Die Idee → Warum anders →
  Ausgewählte Reisen → Editorial Story → How It Works → So entsteht eine
  Tour → Footer.
- Metadata/SEO-Texte (Title, Description, Open Graph) von
  "Audioguide"-Sprache auf die geschärfte Positionierung umgestellt.
- „Ausgewählte Touren" → „Ausgewählte Reisen" (Sprache konsequent auf
  „Reise" statt „Tour/Audioguide" ausgerichtet, wo es natürlich klingt).

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller 16 Routen weiterhin bestätigt.
- Keine neuen Abhängigkeiten (Paketliste identisch zu 0.2.0).

## [0.2.0] — AP-002.0 — Premium Brand Experience

Vollständige gestalterische und inhaltliche Neuausrichtung der Startseite
("Creative Director"-Auftrag). Architektur, Routing, Deployment und
Buildprozess unverändert; keine neuen Abhängigkeiten installiert.

### Geändert

- **Farbpalette reduziert** auf Weiß/Anthrazit/Schwarz/warme Grautöne plus
  eine Akzentfarbe. Gold- und Rust-Akzente aus AP-001.1 zurückgezogen
  (siehe README „Offene Punkte").
- **Typografie deutlich vergrößert**: neue fluide Editorial-Skala
  (`.mwg-display-hero`, `.mwg-display-xl`, `.mwg-display-lg`) mit spürbar
  mehr Weißraum.
- **Hero komplett neu gestaltet**: Vollbild (`100svh`), eine Hauptbotschaft
  ("Reisen jenseits des Reiseführers."), ein CTA, kein Suchfeld, keine
  Aufzählung. Suchfeld nach `/touren` verschoben (Funktion erhalten).
- **Tourenpräsentation neu gedacht**: von vier gleichförmigen Karten zu
  großen, asymmetrischen Editorial-Kacheln (`TourTile`, vormals
  `TourCard`) mit Story-Zeile statt Icon-Reihe. Preis, Offline-/GPS-Badges
  und Neu/Bestseller-Kennzeichnung sind nicht entfernt, sondern auf die
  Tour-Detailseite verschoben.
- **Illustrationen vereinheitlicht**: ein durchgängiger Anthrazit-zu-Schwarz-
  Rahmen mit je einem Akzent-Highlight statt vier verschiedenfarbiger
  Duotone-Illustrationen.
- Texte auf der Startseite komplett neu geschrieben — ruhiger, kürzer,
  ohne Marketing-Floskeln.

### Hinzugefügt

- Zwei neue großflächige Storytelling-Sektionen: „Jede Stadt hat eine
  Geschichte" (`EveryCityHasAStory`, neu) und inhaltlich weiterentwickelte
  Versionen von „Wir reisen zuerst" (vormals `WhyMWGuides`-Icon-Grid) und
  „Reisen wie ein Einheimischer" (vormals `HowItWorks`-Stufenanzeige) —
  jetzt als ruhige Editorial-Absätze statt Icon-/Kartenlayouts.
- `docs/AP-002.0-content-wishlist.md`: nicht-blockierende Vorschläge für
  künftige Fotos, Videos und Texte.

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller 16 Routen weiterhin bestätigt.
- Keine neuen Abhängigkeiten installiert (Auflage des Arbeitspakets).

## [0.1.1] — AP-001.1 — Brand Experience

Keine Änderungen an Routing, Projektstruktur, Deployment, Buildprozess,
TypeScript- oder Netlify-Konfiguration — ausschließlich Weiterentwicklung
bestehender Komponenten, wie im Arbeitspaket gefordert.

### Hinzugefügt

- **Premium Hero:** neuer `HeroBackground` (bespoke, inline-SVG-Illustration
  statt Farbverlauf), vorbereitet für spätere Video-/Cinemagraph-Quelle
  über einen optionalen `videoSrc`-Prop. Weicher Vignette-Overlay für
  Lesbarkeit. Fünf alternative Premium-Headlines dokumentiert (siehe
  `docs/AP-001.1-hero-headlines.md`), bestehende Headline unverändert aktiv.
- **Premium Tour Cards:** `TourCard` um Preis (Platzhalter), Offline- und
  GPS-Indikatoren sowie Highlight-Badges (Neu/Bestseller) erweitert;
  Bewertungsfeld im Datenmodell vorbereitet (noch ungerendert). Farbflächen
  durch vier bespoke Duotone-Illustrationen ersetzt (`components/tours/illustrations.tsx`),
  strukturiert für späteren 1:1-Austausch gegen echte Fotografie.
- **Placeholder Photography:** Hero und Tourenkarten nutzen jetzt
  handgezeichnete, markenkonforme SVG-Illustrationen statt Farbverläufe —
  siehe README „Offene Punkte" für die dokumentierte Konfliktlösung
  (kein Zugriff auf Stock-Foto-Dienste in dieser Umgebung).
- **Improved Navigation:** Hover-Unterstreichung und Active-State im
  Desktop-Menü (`usePathname`), sanftere Mobile-Menü-Einblendung mit
  gestaffelten Link-Animationen. Keine neuen Menüpunkte.
- **Enhanced Scroll Experience:** neuer `useInView`-Hook und `Reveal`-
  Wrapper (IntersectionObserver, keine neue Abhängigkeit) für dezente
  Fade-in/Slide-up-Effekte auf Tourenkarten, USP-Karten und den
  „So funktioniert's"-Schritten.
- **Micro Animations:** Button-Hover mit Shine-Sweep und Lift, Tourenkarten
  mit Hover-Lift und Bild-Zoom, `RouteLine` mit dezentem Idle-Dash-Drift,
  scroll-reaktivem Parallax-Offset und pulsierenden Wegpunkten. Footer mit
  Hover-Unterstreichung analog zur Header-Navigation.
- Alle neuen Animationen respektieren `prefers-reduced-motion`.

### Geändert

- Sekundärer Hero-CTA von „So funktioniert's"-Textlink zu vollwertigem
  Button „Demo erleben" (verlinkt vorerst weiter auf `#so-funktionierts`,
  siehe README „Offene Punkte").
- Suchfeld optisch überarbeitet (Fokus-Ring, Schatten); Funktionsumfang
  unverändert.
- Footer-Typografie und -Weißraum verfeinert (großzügigere Abstände,
  dünner Marken-Akzentstrich); keine neuen Inhalte.

### Geprüft

- `npm install`, `npm run build`, `npm run dev` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering aller Routen weiterhin bestätigt (inkl. der vier
  Tour-Detailseiten).
- Keine neuen Abhängigkeiten außer bereits vorhandenen (`lucide-react` war
  bereits Teil von AP-000.1).

## [0.1.0] — AP-000.1 — Projekt-Foundation

### Hinzugefügt

- Produktionsreifes Next.js-Projekt (App Router, TypeScript, Tailwind CSS,
  ESLint) auf Basis von `create-next-app`.
- Homepage aus AP-001 unverändert in die Projektstruktur überführt:
  Header, Hero, Beliebte Touren, Warum MW Guides, So funktioniert's, Footer
  — jede Komponente als eigene, wiederverwendbare Datei.
- Skalierbare Ordnerstruktur: `components/{layout,hero,tours,sections,ui,footer}`,
  `content/`, `hooks/`, `lib/`, `types/`, `public/{images,icons,logo}`.
- Routing-Gerüst mit Platzhalterinhalten: `/`, `/touren`, `/touren/[slug]`,
  `/reiseziele`, `/fotospots`, `/blog`, `/ueber`, `/kontakt`.
- Lokal gehostete Schriften (Fraunces, Public Sans, IBM Plex Mono) über
  `@fontsource` — keine Google-Fonts-CDN-Abhängigkeit.
- SEO-Grundausstattung: Metadata inkl. Title/Description/Open Graph,
  `app/robots.ts`, `app/sitemap.ts`.
- Netlify-Konfiguration (`netlify.toml`, `@netlify/plugin-nextjs`) für
  Zero-Config-Deployment.
- `README.md` mit Projektbeschreibung, Setup, Struktur, Workflow, Build
  und Deployment.

### Geprüft

- `npm install`, `npm run dev`, `npm run build` erfolgreich.
- `npx tsc --noEmit` ohne Fehler.
- `npm run lint` ohne Fehler.
- Statisches Prerendering für alle Routen bestätigt (Build-Output).

### Nicht enthalten (bewusst außerhalb des Arbeitspakets)

- Backend, Login/Benutzerverwaltung, Datenbank, Shop/Zahlungsfunktionen,
  CMS, API-Anbindungen, echte Mehrsprachigkeit.
