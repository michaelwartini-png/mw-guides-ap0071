# MW Guides Production Handbook V1.0

**Projekt:** 005 — Konsolidierung der Produktionsdokumentation  
**Version:** 1.0  
**Status:** Freigegeben  
**Gültig ab:** August 2026  
**Meilenstein-Basis:** `v0.1-production-platform` ✅ · `v0.2-unified-renderer` ✅

---

## Versionshistorie

| Version | Datum | Änderung |
|---|---|---|
| 1.0 | Aug 2026 | Erstfreigabe — Konsolidierung aller Produktions- und Architekturdokumentation nach Abschluss der Meilensteine v0.1 und v0.2 |
| 1.0.1 | Aug 2026 | AP-MR001 Meine Reise V1 — öffentliche Route `/meine-reise` dokumentiert |
| 1.0.2 | 15.08.2026 | So funktioniert MW Guides V1.0 — Route `/so-funktioniert` eingefroren |

---

## Zweck dieses Handbooks

Dieses Handbook ist die **verbindliche Referenz** für den vollständigen MW-Guides-Produktionsprozess — von der ersten Produktidee bis zum veröffentlichten Produkt. Es richtet sich an Entwickler, Redakteure und zukünftige Produktionsprojekte.

**Was dieses Handbook ist:**

- Konsolidierte, aktualisierte Dokumentation des Ist-Stands der Plattform
- Prozess- und Architekturreferenz für alle Erlebnisbausteine ab PP-004B
- Grundlage für Folgearbeitspakete (AP-0022B, AP-0021, …)

**Was dieses Handbook nicht ist:**

- Kein Code-Arbeitspaket
- Keine Architekturänderung
- Kein Entwicklungs-Backlog (Roadmap-Kapitel verweist auf geplante APs)

---

# 1. Einführung

## 1.1 Was ist MW Guides?

MW Guides ist eine Marke für außergewöhnliche Reiseerlebnisse entlang bemerkenswerter öffentlicher Verkehrswege — keine Reiseagentur, kein Reiseblog, kein Buchungsportal. Die digitale Plattform besteht aus **zwei gleichwertigen Erlebniswelten**:

| Erlebniswelt | Route | Charakter |
|---|---|---|
| **Ride Guides** | `/touren` | Kurze, GPS-geführte Touren entlang einer Strecke |
| **Explore Trips** | `/explore-trips` | Mehrtägige Reisekonzepte mit mehreren Verkehrsmitteln |

Es gibt **keine dritte Content-Ebene** (AP-002.2). Ehemalige „Reiseideen"/Magazin-Inhalte wurden vollständig in Explore Trips überführt.

## 1.2 Zentrale Architekturprinzipien

### Erlebnisbaustein = Master (SSOT)

Der **Erlebnisbaustein** (`ErlebnisRecord`) ist die einzige Quelle für redaktionelle und faktische Erlebnisinformationen. Alle Produkte entstehen daraus.

### Der Erlebnisbaustein wird niemals veröffentlicht

> Veröffentlicht werden ausschließlich daraus erzeugte Produkte.

| Veröffentlichbar | Nicht veröffentlichbar |
|---|---|
| Erlebnisprofil | Erlebnisbaustein (Master) |
| Ride Guide | Admin-Workflow-Status allein |
| Explore Trip | Ungeprüfte Entwürfe |
| PDF / Handout | |
| Website | |
| Social Media | |
| Newsletter | |

Der Status „Veröffentlicht" im Admin bezeichnet die **Redaktions-Freigabe des Masters** (Gate C), nicht eine öffentliche Veröffentlichung des Bausteins selbst.

### Produkte = Ableitungen + produktspezifischer Layer

Der Master liefert Rohmaterial. Produktspezifische Daten (Route, Audio, SEO, Layout) leben im **Produktlayer** — nicht im Erlebnisbaustein. Beispiel: Ride-Guide-GPS-Daten (AP-0021) werden im Produktlayer gepflegt, nicht im Master.

### Ein Baustein → ein Generator → ein Renderer → viele Kanäle

> **Ein Erlebnisbaustein → ein Produktgenerator → ein Produktmodell → ein Renderer → beliebig viele Ausgabekanäle.**

Dieses Prinzip ist seit `v0.2-unified-renderer` technisch umgesetzt (Admin-Vorschau). Die öffentliche Website folgt seit AP-0022B ✅ (`v0.3-generator-public-profile`).

## 1.3 Meilensteine und Arbeitspakete (Überblick)

| Meilenstein / AP | Status | Inhalt |
|---|---|---|
| `v0.1-production-platform` | ✅ Abgeschlossen | Admin-Produktionsplattform, Galerie-SSOT, Produktgenerator, PP-004A/B |
| AP-0018 | ✅ | Galerie & Bildverwaltung |
| AP-0018.3 | ✅ | Galerie als zentrale Bildquelle (Referenzen statt Uploads) |
| AP-0018.4 | ✅ | Bildauflösung im Produktgenerator (keine Kopien) |
| AP-0020 | ✅ | Single Source of Truth, Redakteur Experience |
| AP-0020.4 | ✅ | Redakteur Experience Panel (Feld-zu-Produkt-Mapping) |
| AP-0020.4.1 | ✅ | Hero vereinfacht (Titel/Bild aus anderen Bereichen) |
| `v0.2-unified-renderer` | ✅ Abgeschlossen | Einheitlicher Erlebnisprofil-Renderer (AP-0022A) |
| AP-0022 Phase 1.1 | ✅ | Zielarchitektur dokumentiert und freigegeben |
| AP-0022A | ✅ | Renderer modularisiert, Admin-Chrome getrennt |
| PP-004A | ✅ | Produktionsleitfaden V1.1 freigegeben |
| PP-004B | 🚧 | Erste vollständige Produktion (Schwebebahn) |
| AP-0022B | ✅ | Erstes generatorbasiertes öffentliches Erlebnisprofil (`/erlebnisse/wuppertaler-schwebebahn`) |
| AP-0022B.1 | 🚧 | Renderer-Parität zur Katamaran-Referenzseite |
| AP-0022C | ⏳ | Migration bestehender Erlebnisseiten |
| AP-0021 | ⏳ | Ride Guide Producer |

## 1.4 Plattform-Stand heute (August 2026)

**Technisch produktionsreif (Admin):**

- Vollständiger Erlebnisbaustein-Editor mit 10 Workflow-Bereichen
- Galerie als zentrale Medien-SSOT
- Produktgenerator für Erlebnisprofil mit Vollständigkeits-Score
- Einheitlicher Renderer mit Admin-Chrome-Trennung

**Noch im Übergang (Public):**

- Öffentliche Erlebnisseiten nutzen noch das Legacy-Modell `Erlebnisdetail` (`content/erlebnisdetails.ts`)
- Katamaran existiert doppelt (Admin-Master + statischer Public-Eintrag)
- Schwebebahn hat vollständigen Master, aber noch keine generatorbasierte Public-Seite

**Prototyp-Einschränkungen (bewusst):**

- Admin-Daten in Browser-SessionStorage, kein Backend
- Videos- und FAQ-Bereiche sind Platzhalter
- Keine Datenbank, kein Login, kein CMS-Backend

---

# 2. Produktionspipeline

## 2.1 Vollständiger Workflow

```
PHASE 0a — Produktstrategie
    ↓
PHASE 0b — Produktionsauftrag
    ↓
PHASE 1 — Research
    ↓
PHASE 2 — Asset Collection (parallel ab Tag 2)
    ↓
═══ GATE A: Research Brief + Asset-Paket ═══
    ↓
PHASE 3 — Experience Agent
    ↓
PHASE 4 — Erlebnisbaustein anlegen
    ↓
PHASE 5 — Redaktion
    ↓
═══ GATE B: Master-Vollständigkeit ≥ 70 % ═══
    ↓
PHASE 6a — Qualitätssicherung (technisch/redaktionell)
    ↓
PHASE 6b — Experience QA (Besucherperspektive)
    ↓
═══ GATE C: Master freigegeben ═══
    ↓
PHASE 7 — Produktgenerator
    ↓
PHASE 8 — Produkt-QA & Veröffentlichung (Produkte, nicht Master)
    ↓
PHASE 9 — Lebensdauer (Update → Regenerieren → Republish)
```

## 2.2 Phase 0 — Initiation

### Phase 0a — Produktstrategie

**Verantwortlich:** Product Lead

**Pflichtfragen:**

1. Welche **Produkte** sollen aus diesem Erlebnis entstehen?
2. Welche Produkte sind **ausdrücklich nicht geplant**?
3. Welche **Zielkanäle** werden benötigt?

**Deliverable:** Produktstrategie (1 Seite)

Die Produktstrategie bestimmt Scope, Aufwand und welche Asset-Typen der Asset Collector priorisiert.

### Phase 0b — Produktionsauftrag

**Eingabe:** Produktstrategie  
**Deliverable:** Produktionsauftrag (1 Seite)

| Feld | Inhalt |
|---|---|
| Erlebnis-Name | |
| Slug-Vorschlag | |
| Kategorie / Erlebniswelt | |
| Geplante Produkte | aus Produktstrategie |
| Nicht geplante Produkte | aus Produktstrategie |
| Zielkanäle | aus Produktstrategie |
| Priorität | |
| Deadline | |
| Verantwortlicher Redakteur | |

## 2.3 Phase 1 — Research

| | |
|---|---|
| **Rolle** | Research (Mensch + Recherche-Tools) |
| **Eingaben** | Produktionsauftrag, Produktstrategie |
| **Ausgaben** | **Research Brief** |
| **Verantwortung** | Vollständige, belegbare Grundlage; keine Erfindungen |

**Research Brief — Mindestinhalt:**

- Offizielle Quellen (Betreiber-URL, Fahrplan, Preise)
- Streckenüberblick (Start/Ende, Dauer, Haltestellen)
- Besonderheiten / USP (1–3 Sätze, quellenbasiert)
- Bestehende Bewertungen (Google, Tripadvisor — URLs + Stand)
- Bekannte Einschränkungen (Saison, Barrierefreiheit)
- Vergleichbare MW-Guides-Inhalte

## 2.4 Phase 2 — Asset Collection

**Parallel zu Research ab Tag 2.**

| | |
|---|---|
| **Rolle** | Asset Collector |
| **Eingaben** | Research Brief, Produktstrategie |
| **Ausgaben** | **Asset-Paket** + **Rechte-Tabelle** |
| **Verantwortung** | Rechtssichere, dokumentierte, wiederauffindbare Medien |

Der Asset Collector ist **nicht nur Bildsammler** — er verwaltet sämtliche wiederverwendbaren Materialien und wird damit zur **Materialbibliothek** (siehe Kapitel 4).

**Asset-Prozess:**

```
1. Asset-Anforderungsliste aus Produktstrategie + Research Brief
2. Sammeln → Ordner „Rohmaterial/[slug]/"
3. Rechte-Check pro Datei → Rechte-Tabelle
4. Qualitäts-Check → Abgelehnte markieren
5. Metadaten-Rohdaten erfassen
6. Übergabe an Redakteur (Eintrag in Galerie-Editor)
7. QA: Rechte-Tabelle vs. eingepflegte Assets 1:1
```

**Gate A — Assets ready:**

- Research Brief vollständig
- Asset-Paket mit Rechte-Tabelle
- Mindestens: 1 Hero-Kandidat + ≥8 Galerie-Kandidaten (Foto)
- Weitere Typen gemäß Produktstrategie (z. B. GPS für Ride Guide)

## 2.5 Phase 3 — Experience Agent

| | |
|---|---|
| **Rolle** | Experience Agent (KI) |
| **Eingaben** | Research Brief, Asset-Paket |
| **Ausgaben** | **Experience Draft** |
| **Verantwortung** | Struktur, Lücken, Besucherperspektive — **keine** Finaltexte, **keine** erfundenen Fakten |

**Aufgaben:** Fehlende Highlights/Tipps erkennen, Blickpunkte identifizieren, Reihenfolge bewerten, Dramaturgie prüfen, Besucherperspektive, Widersprüche flaggen, Bild–Text-Matching vorschlagen.

**Nicht Aufgabe:** Finale Texte, MWG Score, Rechte, Veröffentlichungsfreigabe, Ride-Guide-Route.

## 2.6 Phase 4 — Erlebnisbaustein anlegen

**Deliverable:** Leerer Master in Admin (`/admin/neues-erlebnis`)  
**Gate:** Slug vergeben, Workflow sichtbar

## 2.7 Phase 5 — Redaktion

| | |
|---|---|
| **Rolle** | Redakteur |
| **Eingaben** | Research Brief, Asset-Paket, Experience Draft |
| **Ausgaben** | Vollständiger Erlebnisbaustein |
| **Verantwortung** | MW-Guides-Ton, Fakten, SSOT, finale Texte |

**Empfohlene Reihenfolge im Admin:**

```
□ Allgemein
□ Offizielle Informationen
□ Galerie
□ Highlights
□ MW Guides Tipps
□ Bewertungen
□ Hero (Badge, Ride-Guide-Flag)
□ Produkte (Erlebnisprofil-Vorschau)
```

**Bewusst manuell (immer):**

- Finale Highlight-Texte
- MW Guides Tipps / Empfehlungen
- MWG Score + Begründung
- Plattform-Reviews (Auswahl, Links)
- Badge-Auswahl
- Bild-Kuration
- Alt-Texte & Copyright
- Anreise-Hinweise
- Qualitätsfreigabe Gate C
- Veröffentlichungsentscheidung Produkte (Product Lead)

**Gate B:** Generator ≥70 % (Minimum), Ziel ≥90 % für Veröffentlichungsreife.

## 2.8 Phase 6 — Qualitätssicherung

Zwei **getrennte** QA-Sichten (Details in Kapitel 10).

**Gate C — Master freigegeben:**

- QA Stufen 1–5 bestanden
- Experience QA: Go
- Product Lead Freigabe
- Master-Status: „Veröffentlichungsbereit" oder intern „Master freigegeben"

→ Der Master ist redaktionell fertig. **Noch keine öffentliche Veröffentlichung.**

## 2.9 Phase 7 — Produktgenerator

| | |
|---|---|
| **Rolle** | System (+ Redakteur prüft Output) |
| **Eingaben** | Freigegebener Erlebnisbaustein |
| **Ausgaben** | Produktinstanzen gemäß Produktstrategie |

Heute: Erlebnisprofil. Künftig: Ride Guide, PDF, …

**Gate D:** Ergebnis entspricht Erwartung, SSOT korrekt abgebildet.

## 2.10 Phase 8 — Produkt-QA & Veröffentlichung

**Hier werden Produkte veröffentlicht — nicht der Erlebnisbaustein.**

| Produkt | Veröffentlichung bedeutet |
|---|---|
| Erlebnisprofil | Generiertes Profil freigegeben, ggf. intern nutzbar |
| Website | Öffentliche URL live |
| Ride Guide | Store-Listing / App (AP-0021+) |
| PDF / Handout | Datei exportiert / gedruckt |
| Social Media | Post veröffentlicht |

**Gate E — Live:** Product Lead gibt Produkt(e) gemäß Produktstrategie frei.

## 2.11 Phase 9 — Lebensdauer

Bei Master-Änderung:

1. Faktencheck (QA Stufe 1)
2. Betroffene Produkte regenerieren
3. Produkt-QA
4. Republish Kanäle

Change Log pflegen.

## 2.12 Gates — Übersicht

| Gate | Name | Kriterium | Freigabe |
|---|---|---|---|
| A | Assets ready | Research Brief + Asset-Paket + Rechte | Asset Collector / Lead |
| B | Master draft | 7 Sektionen, Generator ≥70 % | Redakteur |
| C | Master approved | QA 1–5 + Experience QA Go | QA + Product Lead |
| D | Product ready | Ergebnis Produktgenerator OK | Redakteur |
| E | Live | Produkt(e) veröffentlicht | Product Lead |

## 2.13 Produktionsrollen

| Rolle | Phase | Mensch/Agent |
|---|---|---|
| Product Lead | 0a, 0b, Gate C, Gate E | Mensch |
| Research | 1 | Mensch |
| Asset Collector | 2 | Mensch |
| Experience Agent | 3 | Agent |
| Redakteur | 4–5, 7–8 | Mensch |
| QA (klassisch) | 6a | Mensch |
| Experience QA | 6b | Mensch |
| Produktgenerator | 7 | System |

---

# 3. Der Erlebnisbaustein

## 3.1 Datenmodell

Der Erlebnisbaustein ist als `ErlebnisRecord` implementiert (`components/admin/erlebnisData.ts`):

```
ErlebnisRecord
├── slug, name, kategorie, erlebniswelt
├── profileStatus, progress, lastModified*
├── allgemein          — Identität, Region, Beschreibung
├── hero               — Badge, Ride-Guide-Flag (Titel/Bild aus anderen Bereichen)
├── bewertungen        — MWG Score, Plattform-Reviews
├── offizielleInformationen — Betreiber, Fahrplan, Preise, Standort
├── highlights         — 4–5 Erlebnis-Highlights
├── mwGuidesTipps      — 3–5 redaktionelle Tipps
├── galerie            — Materialbibliothek (SSOT für Medien)
└── workflowSections   — Fortschrittsanzeige
```

## 3.2 Workflow-Bereiche (10 Sektionen)

| ID | Label | Editor | Status |
|---|---|---|---|
| `allgemein` | Allgemein | `AllgemeinEditor` | ✅ produktionsreif |
| `hero` | Hero | `HeroEditor` | ✅ produktionsreif |
| `bewertungen` | Bewertungen | `BewertungenEditor` | ✅ produktionsreif |
| `offizielle-informationen` | Offizielle Informationen | `OffizielleInformationenEditor` | ✅ produktionsreif |
| `highlights` | Highlights | `HighlightsEditor` | ✅ produktionsreif |
| `mw-guides-tipps` | MW Guides Tipps | `MWGuidesTippsEditor` | ✅ produktionsreif |
| `galerie` | Galerie & Bildverwaltung | `GalerieEditor` | ✅ produktionsreif |
| `produkte` | Produkte | `ProduktStudio` | ✅ produktionsreif |
| `videos` | Videos | — | ⏳ Platzhalter |
| `faq` | FAQ | — | ⏳ Platzhalter |

## 3.3 Seed-Erlebnisse (Referenz)

| Slug | Status | Fortschritt | Rolle |
|---|---|---|---|
| `katamaran-konstanz-friedrichshafen` | Entwurf | 22 % | Erster Baustein, teilweise befüllt |
| `wuppertaler-schwebebahn` | Veröffentlicht | 100 % | **Referenzprojekt PP-004B** |
| `glacier-express` | Entwurf | 8 % | Leerer Baustein für Tests |

## 3.4 Abgrenzung: Erlebnisbaustein vs. Public Erlebnisbaustein

| Konzept | Typ | Zweck |
|---|---|---|
| **Erlebnisbaustein (Master)** | `ErlebnisRecord` | Produktions-SSOT im Admin — niemals veröffentlicht |
| **Erlebnisbaustein (Public)** | `Erlebnisbaustein` in `types/erlebnisbaustein.ts` | Leichtgewichtige Explore-Trip-Module für Reiseplaner |

Der Public-Typ ist **kein** Produktions-Master. Er dient der Komposition von Explore Trips (`content/erlebnisbausteine.ts`) und verweist optional auf Ride Guides via `rideGuideSlug`.

## 3.5 Redakteur Experience (AP-0020.4)

Jeder Editor-Bereich zeigt über `EditorRedakteurPanel` und `redakteurExperienceData.ts`:

- Welche **Produktfelder** aus diesem Bereich gespeist werden
- In welchen **Produkten** der Bereich genutzt wird (aktiv vs. Roadmap)
- Redaktionelle **Hinweise** zur korrekten Pflege

**Hero-Vereinfachung (AP-0020.4.1):** Titel, Untertitel, Hero-Bild und MWG Score kommen aus Allgemein, Galerie bzw. Bewertungen. Im Hero-Editor werden ausschließlich Badge und Ride-Guide-Flag konfiguriert.

## 3.6 Persistenz (Prototyp)

- **Session-Storage-Key:** `mwg-erlebnis-records-v4`
- **Gespeicherte Bereiche:** allgemein, hero, bewertungen, offizielleInformationen, highlights, mwGuidesTipps, galerie
- **Nicht persistiert:** Workflow-Fortschritt (kommt aus Seed-Daten)
- **Load-Reihenfolge:** Session überschreibt Seed

---

# 4. Materialbibliothek

## 4.1 Galerie als zentrale Medien-SSOT (AP-0018)

Die **Galerie** ist der einzige Upload-Punkt für Bilder im Erlebnisbaustein. Alle anderen Bereiche **referenzieren** Galerie-Bilder per ID — keine doppelten Uploads.

```
Galerie (Upload + Metadaten)
    │
    ├── Hero ──────────► Kategorie „Hero" → Produkt-Hero
    ├── Highlights ────► galerieBildId (AP-0018.3)
    ├── MW Guides Tipps ► galerieBildId (AP-0018.3)
    └── Produktgenerator ► resolveGalerieImageRef (AP-0018.4, keine Kopie)
```

## 4.2 Bild-Kategorien

| Kategorie | Typische Verwendung |
|---|---|
| `hero` | Produkt-Hero (exklusiv — nur ein Hero-Bild aktiv) |
| `galerie` | Impressionen-Sektion im Erlebnisprofil |
| `highlight` | Highlight-Karten |
| `mw-guides-tipp` | Tipp-Karten |
| `social-media` | Social-Media-Produkte (Roadmap) |
| `handout` | PDF/Handout (Roadmap) |
| `ride-guide` | Ride Guide (Roadmap, AP-0021) |
| `explore-trip` | Explore Trip (Roadmap) |

## 4.3 Bild-Typen

| Typ | Verwendung |
|---|---|
| Offizielles Pressefoto | Betreiber-Material |
| Eigenes Foto | MW-Guides-Aufnahmen |
| Wikimedia Commons | Open-Source-Bilder |
| Betreiberfoto | Mit Erlaubnis |
| KI-generiert (nur intern) | Entwürfe, nicht veröffentlichen ohne Freigabe |
| Screenshot | Fahrpläne, Karten |
| Historisches Foto | Archivmaterial |

## 4.4 Galerie-Bild Metadaten

Jedes `GalerieBild` enthält:

- **Identität:** id, bildUrl, titel, kurzbeschreibung
- **Rechte:** fotograf, quelle, lizenz, copyright, altText
- **Kategorisierung:** kategorien[], bildtyp, pflichtbild, aktiv
- **Standort/Zeit:** aufnahmeort, gps, aufnahmedatum, blickrichtung, jahreszeit
- **Qualität:** sternBewertung, mwGuidesBildscore
- **KI-Status:** kiQuelle, kiStatus (neu / geprüft / freigegeben / abgelehnt)

## 4.5 Verwendungsnachverfolgung (AP-0018.3)

`galerieUsage.ts` und `GalerieVerwendetIn.tsx` zeigen pro Bild:

- Verwendung als Hero, Highlight, Tipp
- Zielprodukte (Erlebnisprofil, Website, …)

## 4.6 Asset Collector → Galerie

Der Asset Collector (Phase 2) sammelt Rohmaterial extern. Der Redakteur trägt es in den **Galerie-Editor** ein — damit wird es Teil der Materialbibliothek.

**Materialtypen (über Bilder hinaus):**

| Typ | Beispiele | Typische Zielprodukte |
|---|---|---|
| Fotos | Hero, Galerie, Highlight | Erlebnisprofil, Website, PDF |
| Videos | Betreiber, Eigenaufnahmen | Website, Social |
| Logos | Betreiber, MW Guides | PDF, Handout |
| Karten / Skizzen | OSM, Streckenplan | Ride Guide, Website |
| Fahrpläne | PDF, Screenshot, URL | Offizielle Infos |
| GPS-Daten | Koordinaten, GPX | Ride Guide (Produktlayer) |
| POIs | Haltestellen | Ride Guide, Highlights |
| Open-Data | GTFS, OSM | Research, Karten |

Nicht-Bild-Material wird heute noch extern verwaltet; die Galerie ist die SSOT für **Bilder**.

## 4.7 Rechteprüfung

Rechte-Check ist **redaktionell** (nicht automatisierbar). Siehe auch `docs/AP-002.1-image-credits.md` für bestehende Klärungsbedarfe auf der Public-Website.

---

# 5. Produktgenerator

## 5.1 Architektur

Der Produktgenerator (`components/admin/products/erlebnisprofilProduct.ts`, AP-0020) transformiert einen `ErlebnisRecord` in ein `ErlebnisprofilProduct`.

```
ErlebnisRecord (Master)
        │
        ▼
generateErlebnisprofil()
        │
        ▼
ErlebnisprofilProduct (generiertes Produktmodell)
```

## 5.2 Produkt-Registry

| Produkt-ID | Label | Verfügbarkeit | AP |
|---|---|---|---|
| `erlebnisprofil` | Erlebnisprofil | ✅ available | AP-0020 |
| `ride-guide` | Ride Guide | roadmap | AP-0021 |
| `kostenloser-guide` | Kostenloser Guide | roadmap | AP-0022 |
| `premium-guide` | Premium Guide | roadmap | AP-0023 |
| `explore-trip` | Explore Trip | roadmap | AP-0024 |
| `social-media` | Social Media | roadmap | AP-0025 |

Nur **Erlebnisprofil** ist implementiert. Alle anderen Produkte sind in der Registry als Roadmap markiert.

## 5.3 Feld-Mapping (Master → Produkt)

| Produktfeld | Master-Quelle |
|---|---|
| title, subtitle, kategorie, laender, regionen, orte | Allgemein |
| heroImage, heroImageAlt | Galerie (Kategorie Hero, Fallback: erstes Galerie-Bild) |
| badge | Hero.badges[0] |
| description | Bewertungen.kurzbegruendung + aktive Highlight-Texte |
| mwgScore, scoreBegruendung | Bewertungen (Fallback: Hero.score) |
| stats | Allgemein + Offizielle Informationen + Hero |
| features | Highlights (+ aufgelöste Galerie-Bilder) |
| gallery | Galerie (Kategorie „galerie") |
| tipps | MW Guides Tipps (+ aufgelöste Galerie-Bilder) |
| reviews | Bewertungen (Google, Tripadvisor) |
| practicalInfo, operator, standort, officialLinks | Offizielle Informationen |

## 5.4 Vollständigkeits-Score

9 Prüfpunkte, automatisch berechnet:

| Prüfpunkt | Kriterium | Quelle |
|---|---|---|
| Titel & Untertitel | Beide ausgefüllt | Allgemein |
| Hero-Bild | Vorhanden | Galerie |
| Beschreibung | Kurzbegründung oder Highlights | Bewertungen / Highlights |
| Highlights | ≥3 aktiv | Highlights |
| MW Guides Tipps | ≥2 aktiv | MW Guides Tipps |
| Galerie | ≥3 aktive Bilder | Galerie |
| Bewertungen | MWG Score gesetzt | Bewertungen |
| Offizielle Informationen | Betreiber + Preise | Offizielle Informationen |
| Standort & Anreise | Adresse gesetzt | Offizielle Informationen |

**Schwellenwerte:**

- **≥70 %** — Generator aktiv, Gate B Minimum
- **≥90 %** — Veröffentlichungsreife (Ziel laut PP-004A)

## 5.5 ProduktStudio (UI)

Route: Admin → Erlebnis → Bereich **Produkte** (`ProduktStudio.tsx`)

Funktionen:

- Produkt-Auswahl aus Registry (verfügbar vs. Roadmap)
- Automatische Generierung bei Master-Änderung
- „Neu erzeugen"-Button für manuelle Aktualisierung
- Vorschau via `ErlebnisprofilProductView` (Renderer + Admin-Chrome)

---

# 6. Renderer

## 6.1 Architektur (seit v0.2-unified-renderer / AP-0022A)

```
ErlebnisprofilProduct
        │
        ▼
ErlebnisprofilRenderer          ← ein Renderer, kontextsensitive Ausgabe
        │
 ┌──────┼──────────────┬──────────────┐
 ▼      ▼              ▼              ▼
Admin  Website     Ride Guide     Explore Trip
Preview  (Kanal)   (Kanal)        (Kanal + Erweiterungen)
```

**Implementiert:** Admin-Vorschau  
**Live seit AP-0022B:** `/erlebnisse/wuppertaler-schwebebahn` (SSG aus Seed + Generator)

## 6.2 Renderer-Sektionen

| Sektion | Komponente | Produkt-Input |
|---|---|---|
| Hero | `HeroSection` | Vollständiges Produkt + optionale Slots |
| Stats | `StatsStripSection` | stats |
| Beschreibung | `DescriptionSection` | description, scoreBegruendung |
| Highlights | `HighlightsSection` | features |
| MW Guides Tipps | `MWGuidesTipsSection` | tipps |
| Galerie | `GallerySection` + Lightbox | gallery |
| Bewertungen | `ReviewsSection` | mwgScore, reviews |
| Praktische Infos | `PracticalInfoSection` | practicalInfo |
| Betreiber | `OperatorSection` | operator, standort |

**Dateien:** `components/erlebnisprofil/` (Renderer + Sektionen)

## 6.3 Trennung Produkt ↔ Admin-Chrome

| Schicht | Komponenten | Zweck |
|---|---|---|
| **Produkt-Renderer** | `ErlebnisprofilRenderer` + Sektionen | Kanalunabhängige Produktdarstellung |
| **Admin-Chrome** | `ErlebnisprofilAdminChrome` | Generator-Badge, Quellen-Labels, Status-Karte |
| **Admin-Slots** | `ErlebnisprofilRendererSlots` | Einschleusung von Admin-UI in Renderer-Slots |

Admin-Chrome-Elemente:

- `ErlebnisprofilHeroAdminLead` — „Automatisch erzeugtes Erlebnisprofil" + Quellen-Labels
- `ProductStatusCard` — Vollständigkeit %, Generierungszeitpunkt, Master-Version
- `ProductSourceLabel` — pro Sektion: welcher Master-Bereich liefert die Daten

**Prinzip:** Der Renderer kennt keine Admin-Logik. Admin-Chrome wird über Slots injiziert — Public-Kanäle erhalten keine Admin-Elemente.

## 6.4 Slot-System

`ErlebnisprofilRendererSlots` (`components/erlebnisprofil/types.ts`):

- `heroLead` — Inhalt über Hero-Badges (Admin-Badge)
- `heroAside` — Seitenleiste im Hero (Admin Status-Karte)
- `sectionHeadingMeta(section)` — Quellen-Label pro Sektion

## 6.5 Ist-Zustand vs. Ziel

| Aspekt | Heute (v0.2) | Ziel (AP-0022B/C) |
|---|---|---|
| Admin-Vorschau | ✅ `ErlebnisprofilRenderer` + Admin-Chrome | — |
| Public Erlebnisprofil | ❌ Legacy `ErlebnisdetailView` | ✅ Generator + Renderer |
| Katamaran | Doppeltes Modell (Master + statisch) | Migration in AP-0022C |
| Schwebebahn | Master 100 %, Public live ✅ | AP-0022B.1 Renderer-Parität |

---

# 7. Admin

## 7.1 Routen

| Route | Zweck |
|---|---|
| `/admin` | Dashboard — Erlebnisverwaltung |
| `/admin/neues-erlebnis` | Neues Erlebnis anlegen |
| `/admin/neues-erlebnis/analyse` | Leerer Analyse-Workspace |
| `/admin/erlebnis/[slug]` | Haupt-Editor für ein Erlebnis |

**Layout:** `app/admin/layout.tsx` — interner Prototyp-Header, `robots: noindex`.

## 7.2 Dashboard

`ErlebnisDashboard` bietet:

- Liste aller Erlebnisbausteine
- Filter und Sortierung
- Duplizieren und Löschen
- Fortschrittsanzeige pro Baustein

## 7.3 Editor-Workspace

`AnalyseWorkspace` ist die zentrale Shell:

- **Links:** Workflow-Navigation (`WorkflowNavigation`) mit Fortschritt
- **Rechts:** Aktiver Editor + Preview
- **Oben:** Bereichs-Header mit Speichern/Verwerfen
- **Unten:** Redakteur Experience Panel

**Editor-Pattern:**

- `useEditorRxState` — Dirty-State, Speichern, Verwerfen
- `UnsavedChangesDialog` — blockiert Bereichswechsel bei ungespeicherten Änderungen
- Jeder Bereich: Editor + Preview-Komponente

## 7.4 Workflow-Navigation

10 Bereiche (siehe Kapitel 3.2). Fortschritt wird pro Erlebnis im Seed definiert — im Prototyp nicht dynamisch berechnet.

## 7.5 Neues Erlebnis anlegen

`NeuesErlebnisForm` → `registerNewErlebnis()` → Redirect zum Dashboard.

**Hinweis:** Website- und Kategorie-Felder werden im Prototyp noch nicht vollständig genutzt.

## 7.6 Arbeitsregeln während Produktion (PP-004B)

Während laufender Produktionsprojekte:

- ✅ Bestehende Admin-Funktionen nutzen
- ✅ Auffälligkeiten dokumentieren (Kategorie A/B/C)
- ❌ Keine neuen Features entwickeln
- ❌ Keine Architektur erweitern
- ❌ Keine spontanen Refactorings

Entscheidungen über neue Arbeitspakete **erst nach Abschluss** des Produktionsprojekts.

---

# 8. Öffentliche Website

## 8.1 Erlebniswelten

| Welt | Route | Datenquelle | Status |
|---|---|---|---|
| Ride Guides | `/touren`, `/touren/[slug]` | `content/tours.ts` | Live (4 Touren + Roadmap) |
| Explore Trips | `/explore-trips`, `/explore-trips/[slug]` | `content/exploreTrips.ts` | Live (3 echte Trips + Roadmap) |
| Explore Trip Explorer | `/explore-trips/[slug]/explorer/...` | `content/erlebnisdetails.ts` + Explorer | Live (Bodensee) |
| Meine Reise | `/meine-reise` | `content/meineReise.ts` | Live V1 (Bodensee Unlimited, eingefroren) |
| So funktioniert MW Guides | `/so-funktioniert` | `app/so-funktioniert/page.tsx` | Live V1.0 (eingefroren 15.08.2026) |

## 8.2 Navigation (AP-002.2)

**Hauptnavigation:**

1. Explore Trips
2. Ride Guides
3. Meine Reise (`/meine-reise` — AP-MR001, V1 eingefroren)
4. So funktioniert MW Guides (`/so-funktioniert` — V1.0 eingefroren)
5. Über MW Guides

**Fußzeile:** Reiseziele, Fotospots, Blog (Platzhalter-Routen, vollständig erreichbar).

## 8.3 Homepage-Reihenfolge

1. Hero
2. Unsere Haltung
3. Unsere Arbeitsweise
4. **Ride Guides**
5. **Explore Trips**
6. Jede Stadt hat eine Geschichte
7. Reisen wie ein Einheimischer
8. So entsteht eine Tour

## 8.4 Public Erlebnis-Seiten (Legacy-Pfad)

**Route:** `/explore-trips/[slug]/explorer/erlebnis/[erlebnisSlug]`

**Stack:** `ErlebnisdetailBreadcrumbs` → `ErlebnisdetailHero` → `ErlebnisdetailScoreBar` → `ErlebnisdetailView`

**Daten:** `content/erlebnisdetails.ts` + `types/erlebnisdetail.ts`

**Auflösung:** `lib/resolveErlebnisdetail.ts` — eigener Detail-Eintrag oder Fallback aus Explorer-Highlights.

**Problem (dokumentiert in AP-0022):** Paralleles Produktmodell neben dem Generator-Pfad. Wird in AP-0022C abgelöst.

## 8.5 Public-Pfad Erlebnisprofil (AP-0022B ✅)

```
ErlebnisRecord (Schwebebahn, produktionsreif)
        → generateErlebnisprofil()
        → ErlebnisprofilProduct
        → ErlebnisprofilRenderer mode="website"
        → /erlebnisse/wuppertaler-schwebebahn
```

Public-Wrapper (nicht Teil des Produktmodells):

- Header, Footer, SEO-Metadata
- Explore-Trip: Breadcrumbs, Sticky Bar, „Zu meiner Reise"
- Ride Guide: CTA, später eigene Sektionen

## 8.6 Taxonomie

Gemeinsame Taxonomie in `types/taxonomy.ts`:

- Länder, Städte, Verkehrsmittel-Kategorien
- Feature-Flags (Audio, PDF, Offline, GPS, Sprache, Schwierigkeit)
- Referenziert von Ride Guides und Explore Trips

## 8.7 Deployment

- **Hosting:** Netlify (`netlify.toml`, `@netlify/plugin-nextjs`)
- **Build:** `npm run build` (statisches Prerendering)
- **Env:** `NEXT_PUBLIC_SITE_URL` (Standard: `https://mw-guides.de`)

## 8.8 Meine Reise V1 (AP-MR001) ✅

**Status:** Fachlich abgeschlossen und als Version 1.0 eingefroren (August 2026)  
**Meilenstein:** `v0.8.0`  
**Route:** `/meine-reise`  
**Dokumentation:** `docs/AP-MR001-meine-reise.md`

Persönlicher Reiseassistent nach Erwerb des Premium Guides. Referenzreise:
Bodensee Unlimited. Kein Login, kein Checkout, keine Persistenz.

- Sidebar nur Navigation; Bearbeitung nur in den Dashboard-Bereichen
- Genau ein Primary-CTA: Premium Guide öffnen
- Offline-Hinweis ausschließlich am Premium Guide in den Unterlagen
- „Nach der Reise“ vor Abreise reduziert sichtbar

## 8.9 So funktioniert MW Guides V1.0 ✅

**Status:** Fachlich abgeschlossen und als Version 1.0 eingefroren (15.08.2026)  
**Meilenstein:** `0.9.0`  
**Route:** `/so-funktioniert`  
**Dokumentation:** `docs/AP-G-so-funktioniert-v1.0.md`

Erklärseite zum Produktprinzip. Kein Seiten-Hero; Einstieg ist Kapitel 1
im Akkordeon. Drei Kapitel mit Mastergrafik A, B und C. Website-Einbindung
der Grafiken ohne Grafik-Kopf und Grafik-Fuß; Originale unverändert archiviert.

- Legende Kostenlos · Premium · Optional nur in Kapitel 1
- Kein Login, kein Checkout
- Nächste Änderungen nur als Version 1.1 / 1.2 / 2.0

---

# 9. Produktionsprojekte

## 9.1 PP-004A — Produktionsleitfaden ✅

**Status:** Abgeschlossen (V1.1, August 2026)

Definiert den vollständigen, reproduzierbaren Produktionsprozess für alle Erlebnisbausteine ab PP-004B. Kein Code, kein Feature — nur Prozess.

**Kernleistung:** Phasen 0–9, Gates A–E, Rollen, QA-Matrix, Automatisierungspotenzial.

**Lernpunkt aus Validierung Schwebebahn:** Status „Veröffentlicht" im Seed ohne Gate C ist prozesswidrig — kein öffentliches Produkt, aber irreführend intern.

## 9.2 PP-004B — Wuppertaler Schwebebahn 🚧

**Status:** In Produktion  
**Referenz:** Erster vollständiger Durchlauf nach Produktionsleitfaden  
**Admin:** `/admin/erlebnis/wuppertaler-schwebebahn`

### Produktstrategie (Phase 0a ✅)

| Produkt | PP-004B | Anmerkung |
|---|---|---|
| Erlebnisprofil | ✅ | Phase 8 |
| Ride Guide | ✅ Master-Vorbereitung | Produkt selbst = AP-0021 |
| Website | ✅ Live | `/erlebnisse/wuppertaler-schwebebahn` seit AP-0022B |
| Explore Trip | ❌ | |
| PDF / Handout | ⏳ | Spätere Ausbaustufe |
| Social Media | ⏳ | Spätere Ausbaustufe |

### Produktionsreihenfolge (PP-004B-spezifisch)

Bewusst abweichend vom generischen Leitfaden: **Bewertungen vor Galerie** — Fakten und Vertrauenssignale zuerst.

| Schritt | Bereich | Status |
|---|---|---|
| 0a | Produktstrategie | ✅ |
| 0b | Produktionsauftrag | ✅ |
| 1 | Research | ☐ |
| 2 | Asset Collection | ☐ |
| 3 | Experience Agent | ☐ |
| 4–10 | Redaktion (Allgemein → Hero) | ☐ |
| 11 | Erlebnisprofil (Gate D) | ☐ |
| 12 | Klassische QA (Gate C) | ☐ |
| 13 | Experience QA | ☐ |
| 14 | Produktionsfreigabe | ☐ |

### Beobachtungslog

Auffälligkeiten werden kategorisiert (A = Plattform, B = Workflow, C = Redaktion) und **nicht sofort behoben**, wenn Code/Architektur betroffen ist.

**Bekannte Vorab-Beobachtungen:**

| ID | Kat. | Beobachtung | Schwere |
|---|---|---|---|
| B-pre-001 | A | Galerie-URLs im Seed zeigen auf fehlende Dateien | hoch |
| B-pre-002 | A | Kein Broken-Image-Check im Galerie-Editor | mittel |
| B-pre-003 | B | Status „Veröffentlicht" ohne Gate C | mittel |
| B-pre-004 | B | hero.score vs. bewertungen.mwgScore Inkonsistenz | niedrig |
| B-pre-005 | A | Preset-Bibliothek Bodensee-lastig | niedrig |
| B-pre-006 | C | Asset-Paket / Rechte-Tabelle fehlt | hoch |

### Abnahmekriterien PP-004B

- [ ] Alle Bereiche vollständig gepflegt
- [ ] Jede Information quellengebunden
- [ ] Erlebnisprofil fehlerfrei generiert (Gate D)
- [ ] SSOT eingehalten (keine Doppelpflege)
- [ ] Klassische QA Stufen 1–5 bestanden
- [ ] Experience QA: Go
- [ ] Produktionsfreigabe Product Lead
- [ ] Prozess dokumentiert (Zeiten, Gates, Beobachtungen)

---

# 10. Qualitätssicherung

## 10.1 Klassische QA (6a — technisch / redaktionell)

| Stufe | Fokus |
|---|---|
| **1 — Faktencheck** | Betreiber, URLs, Fahrplan, Preise, Reviews |
| **2 — Rechteprüfung** | Asset-Paket vs. Galerie, Copyright, Lizenzen |
| **3 — Bildprüfung** | Hero, Vielfalt, Alt-Texte, Kategorien, Mindestanzahl |
| **4 — SSOT-Konsistenz** | Titel, Score, Hero-Bild-Quelle, Generator-Score |
| **5 — Produktprüfung (Draft)** | Erlebnisprofil-Vorschau ohne Brüche |

**Deliverable:** QA-Protokoll (bestanden / rework)

## 10.2 Experience QA (6b — Besucherperspektive)

| | |
|---|---|
| **Rolle** | Experience QA (idealerweise **nicht** derselbe Redakteur) |
| **Kernfrage** | *„Würde ich dieses Erlebnis aufgrund dieses Profils selbst besuchen oder buchen?"* |
| **Fokus** | Erlebnisqualität, nicht Technik |

**Prüfmatrix:**

| Kriterium | Frage |
|---|---|
| Neugier | Macht das Profil Lust auf die Fahrt/das Erlebnis? |
| Klarheit | Verstehe ich in 30 Sekunden, was mich erwartet? |
| Vertrauen | Wirken Score, Reviews und Fakten glaubwürdig? |
| Mehrwert | Sind Tipps konkret und nicht generisch? |
| Einzigartigkeit | Ist klar, warum dieses Erlebnis MW Guides würdig ist? |
| Vollständigkeit | Fehlt mir als Besucher offensichtlich etwas? |
| Emotion | Gibt es einen Moment, der im Kopf bleibt? |

**Ergebnis:** Go / Rework / No-Go

Experience QA ergänzt klassische QA; sie ersetzt sie nicht. Beide müssen bestanden sein für Gate C.

## 10.3 Automatisierte QA-Hilfen

| Hilfsmittel | Funktion |
|---|---|
| Vollständigkeits-Score | 9 automatische Prüfpunkte im Produktgenerator |
| Quellen-Labels | Admin-Renderer zeigt Master-Herkunft pro Sektion |
| Galerie-Verwendet-In | Referenz-Integrität für Bilder |
| Redakteur Experience Panel | Feld-zu-Produkt-Mapping-Hinweise |

## 10.4 Automatisierungspotenzial

| Schritt | Bewertung |
|---|---|
| Produktstrategie / Auftrag | 🔴 redaktionell |
| Research sammeln | 🟡 teilautomatisierbar |
| Asset Metadaten (EXIF) | 🟢 automatisierbar |
| Asset Rechte-Check | 🔴 redaktionell |
| Experience Agent Entwürfe | 🟡 teilautomatisierbar |
| Erlebnis anlegen | 🟢 automatisiert |
| Galerie Bulk-Upload | 🟡 teilautomatisierbar |
| Highlights/Tipps final | 🔴 redaktionell |
| Bewertungen / MWG Score | 🔴 redaktionell |
| Vollständigkeits-Score | 🟢 automatisiert |
| Erlebnisprofil generieren | 🟢 automatisiert |
| Experience QA | 🔴 redaktionell |
| Veröffentlichung Produkte | 🟡 teilautomatisierbar |

---

# 11. Zielarchitektur

## 11.1 Langfristige Architektur

```
ErlebnisRecord (Admin SSOT, niemals veröffentlicht)
        │
        ▼
Produktgenerator (generateErlebnisprofil, später: generateRideGuide, …)
        │
        ▼
ErlebnisprofilProduct          ← ein Pflege- und Generierungsmodell
        │
        ▼
ErlebnisprofilRenderer         ← ein Renderer, kontextsensitive Ausgabe
        │
 ┌──────┼──────────────┬──────────────┐
 ▼      ▼              ▼              ▼
Admin  Website     Ride Guide     Explore Trip
Preview  (Kanal)   (Kanal)        (Kanal + Erweiterungen)
```

## 11.2 Kanal-Kontexte (Wrapper)

Kanal-spezifische Elemente gehören **nicht** ins Produktmodell:

| Kontext | Aufgabe | Beispiele |
|---|---|---|
| **Admin** | Vorschau, QA, Quellen | ProductStatusCard, ProductSourceLabel |
| **Website** | SEO, Navigation, Layout | Header, Footer, Metadata |
| **Explore Trip** | Reiseplaner-Integration | Breadcrumbs, Sticky Bar, Cross-Links |
| **Ride Guide** | Produkt-Verknüpfung | Ride-Guide-CTA, eigene Sektionen |

**Kanal-Erweiterungen** (optional, am Renderer):

```
ErlebnisprofilRenderInput = {
  product: ErlebnisprofilProduct;      // aus Generator
  channel?: ExploreTripChannelData;    // nur wenn Explore-Kontext
}
```

## 11.3 Wegfall von Erlebnisdetail (Legacy)

| Artefakt | Rolle heute | Nach Migration |
|---|---|---|
| `types/erlebnisdetail.ts` | Paralleles Produktmodell | Ersetzt durch `ErlebnisprofilProduct` + Kanal-Typen |
| `content/erlebnisdetails.ts` | Statische Registry (Katamaran) | Entfällt — Inhalt aus `ErlebnisRecord` |
| `lib/resolveErlebnisdetail.ts` | Auflösung + Fallback | Generator-Auflösung |
| `ErlebnisdetailView/Hero/ScoreBar` | Public-Renderer | `ErlebnisprofilRenderer` + Sektionen |

**Fachliche Konsequenz:** Keine doppelte Pflege mehr. Katamaran-Divergenz wird aufgelöst. Neue Erlebnisse entstehen nur über Produktionsprozess (PP-004A), nicht über manuelle TS-Registry.

## 11.4 Vorteile der Zielarchitektur

| Vorteil | Beschreibung |
|---|---|
| Single Product Model | Ein Typ für alle Kanäle |
| Single Renderer | Sektions-Änderung einmal, überall konsistent |
| Produktionsprozess integriert | Master → Generator → Publish durchgängig |
| Neue Kanäle ohne Duplikat | Neuer RenderContext, gleiche Sektionen |
| Testbarkeit | Generator + Sektionen isoliert testbar |
| Skalierung | N Erlebnisse ohne N statische TS-Dateien |
| Referenz Schwebebahn | Ein Referenzfall für Editorial, Technik und Prozess |

## 11.5 Bewusst akzeptierte Nachteile

| Nachteil | Einordnung |
|---|---|
| Höherer initialer Aufwand (0022A–C) | Einmalig; amortisiert ab Erlebnis #3 |
| Generator muss „public-ready" werden | Notwendig für PP-004B Gate D |
| Katamaran kurzfristig „alt" vs. Schwebebahn „neu" | AP-0022C adressiert |
| Verlust manueller Override in TS-Registry | Gewollt — Overrides gehören in den Master |

## 11.6 Was nicht empfohlen wird

- **Big-Bang:** Modell + Public + Migration in einem Schritt
- **Erlebnisdetail beibehalten** als dauerhaftes Parallelmodell
- **Katamaran als Referenz** für AP-0022B (historischer Mockup-Pfad)

---

# 12. Roadmap

## 12.1 Abhängigkeitsdiagramm

```
v0.1-production-platform ✅
        │
        ├── PP-004B (Schwebebahn-Produktion)     ← 🚧 in Produktion
        │
        ├── AP-0022 Phase 1.1                    ✅
        │
        ├── AP-0022A (Renderer intern)           ✅ v0.2-unified-renderer
        │
        ├── AP-0022B (Schwebebahn Public)        ← ✅ abgeschlossen
        │
        ├── AP-0022B.1 (Renderer-Parität)      ← 🚧 in Umsetzung
        │
        ├── AP-0022C (Migration Katamaran & Co.) ← ⏳ nach 0022B
        │
        └── AP-0021 (Ride Guide Producer)        ← ⏳ nach PP-004B
```

## 12.2 AP-0022B — Erstes generatorbasiertes Erlebnisprofil ✅

**Status:** Abgeschlossen (August 2026)  
**Meilenstein:** `v0.3-generator-public-profile`  
**Referenz:** Wuppertaler Schwebebahn — `/erlebnisse/wuppertaler-schwebebahn`  
**Dokumentation:** `docs/AP-0022B-schwebebahn-public.md`

## 12.2.1 AP-0022B.1 — Renderer-Parität Katamaran 🚧

**Ziel:** Gemeinsamen Renderer funktional auf Niveau der Katamaran-Referenzseite bringen.  
**Dokumentation:** `docs/AP-0022B.1-renderer-paritaet.md`

## 12.3 AP-0022C — Migration bestehender Erlebnisseiten

**Reihenfolge:**

1. Katamaran
2. Weitere Bodensee-Highlights
3. Fallback-Highlights (nur solange Master fehlt)

**Abhängigkeiten:** AP-0022B erfolgreich validiert

## 12.4 AP-0021 — Ride Guide Producer

**Ziel:** Ride Guide als zweites Produkt aus freigegebenem Master.

**Abhängigkeiten:** PP-004B abgeschlossen (Schwebebahn-Master als Ausgangspunkt)

## 12.5 Weitere Produkte (Roadmap)

| AP | Produkt |
|---|---|
| AP-0023 | Premium Guide |
| AP-0024 | Explore Trip (Produktgenerator) |
| AP-0025 | Social Media |

## 12.6 Plattform-Erweiterungen (Public Website)

Priorisiert laut AP-002-Strategie:

1. Kategorie-Filter auf Ride Guides (ab ≥2–3 Touren pro Kategorie)
2. Globale Suche über alle Content-Typen
3. Mehrsprachigkeit
4. Bewertungen/Sammlungen (niedrige Priorität)

## 12.7 Top-3 Backlog nach PP-004B

1. Asset-Pipeline (Bulk-Upload, EXIF-Metadaten)
2. Experience Agent Entwürfe
3. Redaktionelle Vollständigkeitskriterien im UI

---

# Anhang

## A. Quellendokumente (konsolidiert in V1.0)

| Dokument | Inhalt | Konsolidiert in Kapitel |
|---|---|---|
| `docs/PP-004A-produktionsleitfaden.md` | Produktionsprozess, Gates, Rollen | 2, 9, 10 |
| `docs/PP-004B-schwebebahn-produktion.md` | Referenzproduktion Schwebebahn | 9 |
| `docs/AP-0022-zielarchitektur-produkt-renderer.md` | Zielarchitektur, Renderer-Roadmap | 6, 11, 12 |
| `docs/AP-002-platform-architecture-strategy.md` | Plattformstrategie, Taxonomie | 1, 8 |
| `docs/AP-002.2-ia-simplification.md` | IA-Entscheidungen | 1, 8 |
| `docs/AP-002.1-image-credits.md` | Bildrechte | 4, 10 |
| `docs/AP-002.0-content-wishlist.md` | Content-Wünsche | 8 |
| `docs/AP-001.1-hero-headlines.md` | Hero-Alternativen | — (historisch) |
| `README.md` | Technischer Setup, Projektstruktur | 7, 8 |
| `CHANGELOG.md` | Versionshistorie Public Website | 8 |
| `docs/AP-MR001-meine-reise.md` | Meine Reise V1 Dashboard | 8 |
| `docs/AP-G-so-funktioniert-v1.0.md` | So funktioniert MW Guides V1.0 | 8 |
| Git-Tags `v0.1-production-platform`, `v0.2-unified-renderer` | Meilenstein-Commits | 1, 5, 6 |

## B. Wichtige Dateipfade

| Bereich | Pfad |
|---|---|
| Erlebnis-Master | `components/admin/erlebnisData.ts` |
| Galerie / SSOT | `components/admin/galerieData.ts` |
| Produktgenerator | `components/admin/products/erlebnisprofilProduct.ts` |
| Produkt-Registry | `components/admin/products/productRegistry.ts` |
| Renderer | `components/erlebnisprofil/ErlebnisprofilRenderer.tsx` |
| Admin-Chrome | `components/admin/products/ErlebnisprofilAdminChrome.tsx` |
| Admin-Routen | `app/admin/` |
| Public Legacy | `content/erlebnisdetails.ts` |
| Public Explore Trips | `content/exploreTrips.ts` |
| Public Ride Guides | `content/tours.ts` |
| Meine Reise V1 | `app/meine-reise/page.tsx`, `content/meineReise.ts` |
| So funktioniert V1.0 | `app/so-funktioniert/page.tsx`, `components/so-funktioniert/` |

## C. Glossar

| Begriff | Bedeutung |
|---|---|
| **Erlebnisbaustein (Master)** | Interner SSOT-Datensatz im Admin — niemals veröffentlicht |
| **Erlebnisprofil** | Erstes generierbares Produkt aus dem Master |
| **Produktgenerator** | System, das Master → Produkt transformiert |
| **Renderer** | Kanalunabhängige Darstellung eines Produkts |
| **Admin-Chrome** | Admin-spezifische UI um den Renderer (Quellen, Status) |
| **Galerie / Materialbibliothek** | Zentrale Medien-SSOT im Erlebnisbaustein |
| **Gate** | Qualitäts-Checkpoint im Produktionsprozess |
| **SSOT** | Single Source of Truth |
| **Kanal** | Ausgabemedium (Website, Admin, Ride Guide, …) |
| **Produktlayer** | Produktspezifische Daten außerhalb des Masters |

---

*MW Guides Production Handbook V1.0 · Projekt 005 · August 2026*
