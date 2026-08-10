# Produktionsprojekt 004B — Wuppertaler Schwebebahn

**Erste vollständige Produktion nach Produktionsleitfaden V1.1**  
**Referenz:** [`PP-004A-produktionsleitfaden.md`](./PP-004A-produktionsleitfaden.md)  
**Status:** 🚧 In Produktion  
**Art:** Redaktioneller Produktionsauftrag — **kein Softwareprojekt**

---

## Ziel

Erstmals einen MW-Guides-Erlebnisbaustein **vollständig nach dem Produktionsleitfaden** aufbauen und den Prozess unter realen Bedingungen validieren.

Der Wuppertaler Schwebebahn-Erlebnisbaustein ist **Referenzfall** für alle zukünftigen Produktionen.

**Erfolg bedeutet:** Nicht nur ein fertiges Erlebnisprofil, sondern ein **bewiesener, dokumentierter Produktionsprozess**.

---

## Grundsatz

> Der Erlebnisbaustein wird niemals veröffentlicht.  
> Veröffentlicht werden ausschließlich daraus erzeugte Produkte.

Der Erlebnisbaustein bleibt dauerhaft **Single Source of Truth** (intern).

---

# Phase 0a — Produktstrategie ✅

**Erlebnis:** Wuppertaler Schwebebahn  
**Admin:** `/admin/erlebnis/wuppertaler-schwebebahn`  
**Slug:** `wuppertaler-schwebebahn`

## Produkte Version 1

| Produkt | Status in PP-004B | Anmerkung |
|---|---|---|
| **Erlebnisprofil** | ✅ Bestandteil | Wird in Phase 8 erzeugt und geprüft |
| **Ride Guide** | ✅ Zielprodukt | Master muss ride-guide-ready sein; **Produkt selbst = AP-0021** |
| **Website** | ✅ Abgeleitet | Automatisch aus Erlebnisprofil — **Kanal-Publish später** |
| Explore Trip | ❌ Nicht geplant | |
| PDF / Handout | ⏳ Spätere Ausbaustufe | |
| Social Media | ⏳ Spätere Ausbaustufe | |
| Newsletter | ⏳ Spätere Ausbaustufe | |

## Zielkanäle (nachgelagert — nicht in PP-004B)

| Kanal | PP-004B |
|---|---|
| MW Guides Website | ⏳ Publish später |
| Ride Guide (App/Store) | ⏳ AP-0021 |
| VoiceMap | ❌ Nicht in Scope |
| izi.TRAVEL | ❌ Nicht in Scope |

## Produktstrategie — Freigabe

| | |
|---|---|
| **Freigegeben von** | Michael (Product Lead) |
| **Datum** | August 2026 |
| **Scope** | Master vollständig + Erlebnisprofil fehlerfrei + Experience QA Go |

---

# Phase 0b — Produktionsauftrag ✅

| Feld | Wert |
|---|---|
| **Erlebnis-Name** | Wuppertaler Schwebebahn |
| **Slug** | `wuppertaler-schwebebahn` |
| **Kategorie** | Schwebebahn |
| **Erlebniswelt** | Technik |
| **Region** | Bergisches Land, Wuppertal, Deutschland |
| **Geplante Produkte** | Erlebnisprofil, Ride Guide (Master-Vorbereitung), Website (ableitbar) |
| **Nicht geplant** | Explore Trip, PDF, Social, Newsletter, VoiceMap, izi |
| **Ziel** | Erster vollständiger Durchlauf Produktionsleitfaden + Prozessvalidierung |
| **Priorität** | Referenzprojekt — höchste Priorität Phase 2 |
| **Redakteur** | _[Name]_ |
| **QA / Experience QA** | _[Name — idealerweise ≠ Redakteur]_ |
| **Asset Collector** | _[Name]_ |
| **Research** | _[Name]_ |

---

# Arbeitsweise (verbindlich)

Während der gesamten Produktion:

- ✅ Bestehende Funktionen im Admin nutzen
- ✅ Jede Auffälligkeit dokumentieren (Kategorie A/B/C)
- ❌ Keine neuen Features entwickeln
- ❌ Keine Architektur erweitern
- ❌ Keine spontanen Refactorings

**Entscheidung über neue Arbeitspakete erst nach Abschluss von PP-004B.**

---

# Produktionsreihenfolge

Bewusst abweichend vom generischen Leitfaden: **Bewertungen vor Galerie** — Fakten und Vertrauenssignale zuerst, dann visuelle Ausarbeitung.

| Schritt | Bereich | Gate / Deliverable | Status |
|---|---|---|---|
| 0a | Produktstrategie | Produktstrategie freigegeben | ✅ |
| 0b | Produktionsauftrag | Auftrag dokumentiert | ✅ |
| 1 | Research | Research Brief | ☐ |
| 2 | Asset Collection | Asset-Paket + Rechte-Tabelle (Gate A) | ☐ |
| 3 | Experience Agent | Experience Draft | ☐ |
| **4** | **Allgemein** | Identität final | ☐ |
| **5** | **Offizielle Informationen** | Fakten belegt | ☐ |
| **6** | **Bewertungen** | Score + echte Links | ☐ |
| **7** | **Galerie & Bildverwaltung** | ≥8 Bilder, Rechte OK | ☐ |
| **8** | **Highlights** | 4–5 aktiv, MW-Ton | ☐ |
| **9** | **MW Guides Tipps** | 3–5 aktiv | ☐ |
| **10** | **Hero** | Badge final, SSOT konsistent | ☐ |
| **11** | **Erlebnisprofil** | Generator ≥90 %, Vorschau OK (Gate D) | ☐ |
| **12** | **Klassische QA** | QA-Protokoll Stufen 1–5 (Gate C) | ☐ |
| **13** | **Experience QA** | Go / Rework / No-Go | ☐ |
| **14** | **Produktionsfreigabe** | Master freigegeben (Product Lead) | ☐ |

### Zeiterfassung (optional)

| Schritt | Start | Ende | Minuten | Notiz |
|---|---|---|---|---|
| Research | | | | |
| Assets | | | | |
| Allgemein | | | | |
| Offizielle Infos | | | | |
| Bewertungen | | | | |
| Galerie | | | | |
| Highlights | | | | |
| Tipps | | | | |
| Hero | | | | |
| Erlebnisprofil | | | | |
| QA + Experience QA | | | | |
| **Gesamt** | | | | |

---

# Phase 1 — Research Brief (Vorlage)

**Stand:** _[Datum]_ · **Quellenstand:** _[Datum]_

### Offizielle Quellen

| Quelle | URL | Abgerufen |
|---|---|---|
| Schwebebahn (offiziell) | https://www.schwebebahn.de | |
| WSW mobil | https://www.wsw-online.de | |
| Tickets | https://www.schwebebahn.de/tickets | |
| Verkehrsmuseum | _[URL]_ | |

### Streckenüberblick

| Feld | Wert | Quelle |
|---|---|---|
| Länge | 13,3 km | |
| Haltestellen | 20 | |
| Fahrzeit End-to-End | ca. 30 Min. | |
| Höhe über Wupper | ca. 12 m | |
| Inbetriebnahme | 1901 | |
| Endstationen | Oberbarmen ↔ Vohwinkel | |

### USP (quellenbasiert)

1. _[Einzigartigkeit — 1 Satz + Quelle]_
2. _[…]_
3. _[…]_

### Bewertungen (Live-Stand)

| Plattform | Rating | Anzahl | Listing-URL | Stand |
|---|---|---|---|---|
| Google Maps | | | | |
| Tripadvisor | | | | |

### Barrierefreiheit / Einschränkungen

_[Aus offizieller Quelle]_

---

# Phase 2 — Asset-Paket (Vorlage)

**Ordner:** `Rohmaterial/wuppertaler-schwebebahn/`  
**Rechte-Tabelle:** _[Datei/Link]_

| # | Dateiname | Typ | Motiv | Quelle | Lizenz | OK? | Galerie-ID |
|---|---|---|---|---|---|---|---|
| 1 | | Foto | Hero-Kandidat | | | ☐ | |
| 2 | | Foto | Galerie | | | ☐ | |
| … | | | | | | | |

**Gate A bestanden:** ☐ Ja · Datum: _[…]_ · Freigabe: _[Name]_

---

# Phase 3 — Experience Draft (Vorlage)

_Erzeugt durch Experience Agent oder manuell aus Research — kein Finaltext._

### Highlights (Vorschlag)

1. _[Titel]_ — _[1 Satz]_ — Quelle: _[Brief §]_
2. …

### Tipps (Vorschlag)

1. _[Thema]_ — _[Entwurf]_ — Priorität: _[hoch/mittel]_
2. …

### Lücken / Rückfragen

- [ ] _[…]_

---

# Experience QA (Phase 13)

**Leitfrage:**

> **„Würde ich dieses Erlebnis aufgrund dieses Profils selbst besuchen oder buchen?“**

**Prüfer:** _[Name, ≠ Redakteur]_ · **Datum:** _[…]_

| Kriterium | 1–5 | Anmerkung |
|---|---|---|
| Neugier | | |
| Klarheit (30-Sekunden-Test) | | |
| Vertrauen | | |
| Mehrwert (Tipps) | | |
| Einzigartigkeit | | |
| Vollständigkeit | | |
| Emotion (bleibender Moment) | | |

**Ergebnis:** ☐ Go · ☐ Rework · ☐ No-Go

**Kommentar:**

_[Freitext]_

---

# Abnahmekriterien

PP-004B ist erfolgreich abgeschlossen, wenn **alle** Punkte erfüllt sind:

- [ ] Alle Bereiche des Erlebnisbausteins vollständig gepflegt (Schritte 4–10)
- [ ] Jede Information ist einer eindeutigen Quelle zugeordnet (Research Brief ↔ Master)
- [ ] Erlebnisprofil wird automatisch und fehlerfrei erzeugt (Gate D)
- [ ] Keine Informationen doppelt gepflegt (SSOT eingehalten)
- [ ] Klassische QA Stufen 1–5 bestanden (Gate C)
- [ ] Experience QA: **Go**
- [ ] Produktionsfreigabe durch Product Lead
- [ ] Kompletter Produktionsprozess dokumentiert (Zeiten, Gates, Beobachtungen)
- [ ] Beobachtungslog ausgewertet — Entscheidung über Folge-APs dokumentiert

---

# Beobachtungslog

Jede Auffälligkeit während der Produktion hier eintragen. **Nicht sofort beheben**, wenn es Code/Architektur betrifft.

| ID | Datum | Schritt | Kategorie | Beobachtung | Schwere | Folge-AP? |
|---|---|---|---|---|---|---|
| B-001 | | | A / B / C | | niedrig/mittel/hoch | ☐ |
| B-002 | | | | | | ☐ |

### Kategorien

| Kat. | Bedeutung | Beispiel |
|---|---|---|
| **A — Plattform** | Fehlende Funktion oder technische Möglichkeit | Bulk-Upload, Broken-Image-Warnung |
| **B — Workflow** | Ablauf unklar, umständlich, ineffizient | Unklare Reihenfolge, Gate fehlt im UI |
| **C — Redaktion** | Fehlende Inhalte, Quellen, Informationen | WSW Pressekit nicht auffindbar |

### Bekannte Beobachtungen aus 004A (Vorab)

| ID | Kat. | Beobachtung | Schwere |
|---|---|---|---|
| B-pre-001 | A | Galerie-URLs im Seed zeigen auf fehlende Dateien in `public/` | hoch |
| B-pre-002 | A | Kein Broken-Image-Check im Galerie-Editor | mittel |
| B-pre-003 | B | Status „Veröffentlicht" im Seed ohne Gate C umgangen | mittel |
| B-pre-004 | B | `hero.score` vs. `bewertungen.mwgScore` Inkonsistenz | niedrig |
| B-pre-005 | A | Preset-Bibliothek Bodensee-lastig, für Schwebebahn nutzlos | niedrig |
| B-pre-006 | C | Asset-Paket / Rechte-Tabelle existiert noch nicht | hoch |

---

# Explizit nicht Bestandteil von PP-004B

- Explore Trips
- PDF- / Handout-Produkte
- Social-Media-Produkte
- Newsletter
- VoiceMap-Export
- izi.TRAVEL-Export
- KI-Agenten (Implementierung)
- Neue Editoren
- Neue Architektur
- **Ride Guide Produkt** (AP-0021 — folgt nach PP-004B-Freigabe)

---

# Abschluss & Übergabe

### Nach Produktionsfreigabe

| Ergebnis | Verwendung |
|---|---|
| Fertiger Erlebnisbaustein (Master) | Referenz für alle künftigen Bausteine |
| Erlebnisprofil (generiert) | Basis Website, später AP-0021 |
| Beobachtungslog | Backlog Phase 2.1 / Plattform-Priorisierung |
| Zeiterfassung | Produktionskalkulation |
| Experience QA Protokoll | Qualitätsstandard |

### Nächster Meilenstein nach PP-004B

**AP-0021 — Ride Guide Producer**  
Ausgangspunkt: *dieser* freigegebene Schwebebahn-Master — nicht abstrakt, nicht halbfertig.

---

## Projektstatus

| Meilenstein | Status |
|---|---|
| Phase 0a Produktstrategie | ✅ Freigegeben |
| Phase 0b Produktionsauftrag | ✅ Dokumentiert |
| Phase 1–14 Produktion | ☐ Ausstehend |
| PP-004B Abnahme | ☐ Ausstehend |

---

*Produktionsprojekt 004B · MW Guides · Referenz: PP-004A V1.1*
