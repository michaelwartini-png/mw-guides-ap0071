# MW Guides — Produktionsleitfaden

**Produktionsprojekt 004A**  
**Version:** 1.1  
**Status:** Freigegeben  
**Gültig ab:** August 2026  
**Nächster Meilenstein:** [`PP-004B-schwebebahn-produktion.md`](./PP-004B-schwebebahn-produktion.md) — 🚧 in Produktion

---

## Versionshistorie

| Version | Datum | Änderung |
|---|---|---|
| 1.0 | Aug 2026 | Erstfreigabe — vollständiger Produktionsprozess |
| 1.1 | Aug 2026 | Produktstrategie (Phase 0), Veröffentlichungs-Grundsatz, Asset Collector erweitert, Experience QA |

---

## Zweck

Dieser Leitfaden definiert den **vollständigen, reproduzierbaren Produktionsprozess** für MW Guides. Er gilt für alle neuen Erlebnisbausteine ab PP-004B.

**Kein Code. Keine Features.** Nur Prozess.

---

## Zentrale Architekturprinzipien

### 1. Erlebnisbaustein = Master (SSOT)

Der Erlebnisbaustein ist die **einzige Quelle** für redaktionelle und faktische Erlebnisinformationen. Alle Produkte entstehen daraus.

### 2. Der Erlebnisbaustein wird niemals veröffentlicht

**Veröffentlicht werden ausschließlich daraus erzeugte Produkte.**

| Veröffentlichbar | Nicht veröffentlichbar |
|---|---|
| Erlebnisprofil | Erlebnisbaustein (Master) |
| Ride Guide | Admin-Workflow-Status allein |
| Explore Trip | Ungeprüfte Entwürfe |
| PDF / Handout | |
| Website | |
| Social Media | |
| Newsletter | |

Der Erlebnisbaustein bleibt dauerhaft der **interne Master** — Single Source of Truth. Der Status „Veröffentlicht" im Admin bezeichnet die **Redaktions-Freigabe des Masters** (Gate C), nicht eine öffentliche Veröffentlichung des Bausteins selbst.

### 3. Produkte = Ableitungen + produktspezifischer Layer

Master liefert Rohmaterial. Produktspezifische Daten (Route, Audio, SEO, Layout) leben im **Produktlayer** — nicht im Erlebnisbaustein. Siehe PP-003.

### 4. Produktion = wiederholbarer Prozess

Jeder Erlebnisbaustein durchläuft dieselben Phasen, Rollen und QA-Stufen. Abweichungen werden dokumentiert.

---

## Vollständiger Produktionsworkflow

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
PHASE 6 — Qualitätssicherung (technisch/redaktionell)
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

---

## Phase 0 — Initiation

Phase 0 beginnt **nicht** mit dem Erlebnis, sondern mit der **Produktstrategie**.

### Phase 0a — Produktstrategie

**Verantwortlich:** Product Lead (Michael)

**Fragen (Pflicht):**

1. Welche **Produkte** sollen aus diesem Erlebnis entstehen?
2. Welche Produkte sind **ausdrücklich nicht geplant**?
3. Welche **Zielkanäle** werden benötigt?

**Deliverable:** Produktstrategie (1 Seite)

#### Beispiele

**Wuppertaler Schwebebahn**

| Geplant | Nicht geplant | Kanäle |
|---|---|---|
| Erlebnisprofil | Explore Trip (initial) | Website |
| Ride Guide | PDF (initial) | — |
| Website | Social Media (initial) | |

**Mailänder Straßenbahn**

| Geplant | Nicht geplant | Kanäle |
|---|---|---|
| Erlebnisprofil | Ride Guide (initial) | Website |
| Explore Trip | Handout | |
| Website | | |

**Kusttram Belgien**

| Geplant | Nicht geplant | Kanäle |
|---|---|---|
| Erlebnisprofil | Newsletter | Website |
| Ride Guide | | Handout (Druck) |
| Explore Trip | | |
| Handout | | |

Die Produktstrategie bestimmt Scope, Aufwand und welche Asset-Typen der Asset Collector priorisiert.

---

### Phase 0b — Produktionsauftrag

**Eingabe:** Produktstrategie (Phase 0a)

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

---

## Phase 1 — Research

| | |
|---|---|
| **Rolle** | Research (Mensch + Recherche-Tools) |
| **Eingaben** | Produktionsauftrag, Produktstrategie |
| **Ausgaben** | **Research Brief** |
| **Verantwortung** | Vollständige, belegbare Grundlage; keine Erfindungen |

### Research Brief — Mindestinhalt

- Offizielle Quellen (Betreiber-URL, Fahrplan, Preise)
- Streckenüberblick (Start/Ende, Dauer, Haltestellen)
- Besonderheiten / USP (1–3 Sätze, quellenbasiert)
- Bestehende Bewertungen (Google, Tripadvisor — URLs + Stand)
- Bekannte Einschränkungen (Saison, Barrierefreiheit)
- Vergleichbare MW-Guides-Inhalte

---

## Phase 2 — Asset Collection

**Parallel zu Research ab Tag 2.**

### Rolle: Asset Collector

Der Asset Collector ist **nicht nur Bildsammler**. Er verwaltet sämtliche **wiederverwendbaren Materialien** und wird damit zur **zentralen Materialbibliothek** von MW Guides.

| | |
|---|---|
| **Eingaben** | Research Brief, Produktstrategie (welche Asset-Typen nötig) |
| **Ausgaben** | **Asset-Paket** + **Rechte-Tabelle** |
| **Verantwortung** | Rechtssichere, dokumentierte, wiederauffindbare Medien und Quellen |

### Materialtypen (Materialbibliothek)

| Typ | Beispiele | Typische Zielprodukte |
|---|---|---|
| **Fotos** | Hero, Galerie, Highlight, Social | Erlebnisprofil, Website, PDF, Handout |
| **Videos** | Betreiber, Eigenaufnahmen | Website, Social |
| **Logos** | Betreiber, MW Guides | PDF, Handout, Website |
| **Karten / Skizzen** | OSM, Eigenzeichnung, Streckenplan | Ride Guide, Website, Handout |
| **Fahrpläne** | PDF, Screenshot, URL | Offizielle Infos, PDF |
| **PDFs** | Pressemappe, Tarif-PDF | Research, Handout |
| **GPS-Daten** | Koordinaten, Strecken-GPX | Ride Guide (Produktlayer) |
| **POIs** | Haltestellen, Sehenswürdigkeiten | Ride Guide, Highlights |
| **Presseinformationen** | WSW Pressemitteilungen | Research, Zitate |
| **Open-Data** | GTFS, OpenStreetMap | Research, Karten |
| **Social-Media-Links** | Offizielle Kanäle Betreiber | Research, Social |
| **Audioquellen** | Ambiente, Interviews (Roh) | Ride Guide (Produktlayer) |

### Asset-Prozess

```
1. Asset-Anforderungsliste aus Produktstrategie + Research Brief
2. Sammeln → Ordner „Rohmaterial/[slug]/"
3. Rechte-Check pro Datei → Rechte-Tabelle
4. Qualitäts-Check → Abgelehnte markieren
5. Metadaten-Rohdaten erfassen
6. Übergabe an Redakteur
7. QA: Rechte-Tabelle vs. eingepflegte Assets 1:1
```

### Gate A — Assets ready

- Research Brief vollständig
- Asset-Paket mit Rechte-Tabelle
- Mindestens: 1 Hero-Kandidat + ≥8 Galerie-Kandidaten (Foto)
- Weitere Typen gemäß Produktstrategie (z. B. GPS für Ride Guide)

---

## Phase 3 — Experience Agent

| | |
|---|---|
| **Rolle** | Experience Agent (KI) |
| **Eingaben** | Research Brief, Asset-Paket |
| **Ausgaben** | **Experience Draft** |
| **Verantwortung** | Struktur, Lücken, Besucherperspektive — **keine** Finaltexte, **keine** erfundenen Fakten |

### Aufgaben

- Fehlende Highlights erkennen
- Fehlende Tipps erkennen
- Blickpunkte identifizieren
- Reihenfolge bewerten (Besucherlogik)
- Dramaturgie prüfen (Einstieg → Höhepunkt → Praxis)
- Besucherperspektive (Erstbesuch vs. Kenner)
- Widersprüche flaggen
- Bild–Text-Matching vorschlagen
- Inhaltliche Vollständigkeit schätzen

### Nicht Aufgabe des Agent

- Finale MW-Guides-Texte
- Bewertungen / MWG Score festlegen
- Rechte klären
- Veröffentlichungsfreigabe
- Ride-Guide-Route (Produktlayer, AP-0021)

### Experience Draft — Format

```markdown
## Highlights (Vorschlag, 4–5)
## Tipps (Vorschlag, 3–5)
## Blickpunkte
## Lücken / Rückfragen an Research
## Dramaturgie-Notiz
```

---

## Phase 4 — Erlebnisbaustein anlegen

**Deliverable:** Leerer Master in Admin (`Neues Erlebnis`)  
**Gate:** Slug vergeben, Workflow sichtbar

---

## Phase 5 — Redaktion

| | |
|---|---|
| **Rolle** | Redakteur |
| **Eingaben** | Research Brief, Asset-Paket, Experience Draft |
| **Ausgaben** | Vollständiger Erlebnisbaustein (7 Sektionen) |
| **Verantwortung** | MW-Guides-Ton, Fakten, SSOT, finale Texte |

### Reihenfolge im Admin

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

### Bewusst manuell (immer)

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

---

## Phase 6 — Qualitätssicherung

Zwei **getrennte** QA-Sichten:

### 6a — Klassische QA (technisch / redaktionell)

| Stufe | Fokus |
|---|---|
| **1 — Faktencheck** | Betreiber, URLs, Fahrplan, Preise, Reviews |
| **2 — Rechteprüfung** | Asset-Paket vs. Galerie, Copyright, Lizenzen |
| **3 — Bildprüfung** | Hero, Vielfalt, Alt-Texte, Kategorien, Mindestanzahl |
| **4 — SSOT-Konsistenz** | Titel, Score, Hero-Bild-Quelle, Generator-Score |
| **5 — Produktprüfung (Draft)** | Erlebnisprofil-Vorschau ohne Brüche |

**Deliverable:** QA-Protokoll (bestanden / rework)

---

### 6b — Experience QA (Besucherperspektive)

| | |
|---|---|
| **Rolle** | Experience QA (idealerweise **nicht** derselbe Redakteur) |
| **Kernfrage** | *„Würde ich dieses Erlebnis aufgrund dieses Profils selbst besuchen oder buchen?"* |
| **Fokus** | Erlebnisqualität, nicht Technik |

**Prüfmatrix Experience QA:**

| Kriterium | Frage |
|---|---|
| **Neugier** | Macht das Profil Lust auf die Fahrt/das Erlebnis? |
| **Klarheit** | Verstehe ich in 30 Sekunden, was mich erwartet? |
| **Vertrauen** | Wirken Score, Reviews und Fakten glaubwürdig? |
| **Mehrwert** | Sind Tipps konkret und nicht generisch? |
| **Einzigartigkeit** | Ist klar, warum dieses Erlebnis MW Guides würdig ist? |
| **Vollständigkeit** | Fehlt mir als Besucher offensichtlich etwas? |
| **Emotion** | Gibt es einen Moment, der im Kopf bleibt? |

**Ergebnis:** Experience QA Protokoll — **Go / Rework / No-Go**

Experience QA ergänzt klassische QA; sie ersetzt sie nicht. Beide müssen bestanden sein für Gate C.

---

### Gate C — Master freigegeben

- QA Stufen 1–5 bestanden
- Experience QA: Go
- Product Lead Freigabe
- Master-Status: **„Veröffentlichungsbereit"** oder intern **„Master freigegeben"**

→ Der Master ist redaktionell fertig. **Noch keine öffentliche Veröffentlichung.**

---

## Phase 7 — Produktgenerator

| | |
|---|---|
| **Rolle** | System (+ Redakteur prüft Output) |
| **Eingaben** | Freigegebener Erlebnisbaustein |
| **Ausgaben** | Produktinstanzen gemäß Produktstrategie |

Heute: Erlebnisprofil. Künftig: Ride Guide, PDF, …

**Gate D:** Ergebnis entspricht Erwartung, SSOT korrekt abgebildet.

---

## Phase 8 — Produkt-QA & Veröffentlichung

**Hier werden Produkte veröffentlicht — nicht der Erlebnisbaustein.**

| Produkt | Veröffentlichung bedeutet |
|---|---|
| Erlebnisprofil | Generiertes Profil freigegeben, ggf. intern nutzbar |
| Website | Öffentliche URL live |
| Ride Guide | Store-Listing / App (AP-0021+) |
| PDF / Handout | Datei exportiert / gedruckt |
| Social Media | Post veröffentlicht |

**Gate E — Live:** Product Lead gibt Produkt(e) gemäß Produktstrategie frei.

---

## Phase 9 — Lebensdauer

Bei Master-Änderung:

1. Faktencheck (QA Stufe 1)
2. Betroffene Produkte regenerieren
3. Produkt-QA
4. Republish Kanäle

Change Log pflegen.

---

## Produktionsrollen — Übersicht

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

## Gates — Übersicht

| Gate | Name | Kriterium | Freigabe |
|---|---|---|---|
| A | Assets ready | Research Brief + Asset-Paket + Rechte | Asset Collector / Lead |
| B | Master draft | 7 Sektionen, Generator ≥70 % | Redakteur |
| C | Master approved | QA 1–5 + Experience QA Go | QA + Product Lead |
| D | Product ready | Ergebnis Produktgenerator OK | Redakteur |
| E | Live | Produkt(e) veröffentlicht | Product Lead |

---

## Automatisierungspotenzial (Referenz)

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

Top-3 Backlog nach PP-004B: Asset-Pipeline, Experience Agent Entwürfe, redaktionelle Vollständigkeitskriterien.

---

## Validierung Schwebebahn (004A — Prozess, keine Inhalte)

| Phase | Status heute | Für PP-004B |
|---|---|---|
| 0a Produktstrategie | Nicht formal | **Neu dokumentieren** |
| 0b Produktionsauftrag | Fehlt | **Anlegen** |
| 1 Research | Inhaltlich da, nicht als Brief | **Formalisiieren** |
| 2 Assets | Gate A nicht passiert | **Nachholen** |
| 3 Experience Agent | Nicht genutzt | **Draft erzeugen** |
| 4–5 Anlegen/Redaktion | Teilweise | **Nach Leitfaden** |
| 6a QA | Nicht formal | **Protokoll führen** |
| 6b Experience QA | Nicht durchgeführt | **Neu** |
| 7–8 Generator/Produkte | Technisch 100 %, Gate C umgangen | **Gates einhalten** |

**Lernpunkt:** Status „Veröffentlicht" im Seed ohne Gate C ist **prozesswidrig** — kein öffentliches Produkt, aber irreführend intern.

---

## Abschluss PP-004A

**Produktionsprojekt 004A ist abgeschlossen (V1.1).**

Es sind keine weiteren Architekturarbeiten erforderlich, bevor die Produktion beginnt.

> Wir wissen nicht nur, wie ein Erlebnisbaustein aussieht — wir wissen, wie er entsteht.

---

## Nächster Meilenstein — PP-004B

**Erste vollständige Produktion:** Wuppertaler Schwebebahn nach diesem Leitfaden.

**Ziel:** Gesamten Workflow praktisch anwenden, letzte Optimierungspotenziale identifizieren — **keine neuen Funktionen**.

**Start:** Phase 0a — Produktstrategie Schwebebahn dokumentieren.

---

*Referenzen: PP-002 (Architektur-Review), PP-003 (Produktmodell), AP-0020 (Erlebnisprofil-Generator)*
