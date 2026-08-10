# AP-0022 — Zielarchitektur: Einheitlicher Produkt-Renderer

**Status:** Phase 1.1 — Architekturplanung (freigegeben)  
**Meilenstein-Basis:** `v0.1-production-platform`  
**Art:** Dokumentation & Roadmap — **keine Implementierung**  
**Referenz:** Architekturbericht AP-0022 Phase 1 (Analyse)

---

## Grundsatz

> **Ein Erlebnisbaustein → ein Produktgenerator → ein Produktmodell → ein Renderer → beliebig viele Ausgabekanäle.**

Der Erlebnisbaustein (`ErlebnisRecord`) wird **niemals** veröffentlicht.  
Veröffentlicht werden ausschließlich daraus erzeugte Produkte über kanalspezifische Kontexte.

---

## Ist-Zustand (v0.1)

```
ErlebnisRecord (Admin SSOT)
        │
        ├── Admin: generateErlebnisprofil() → ErlebnisprofilProduct → ErlebnisprofilProductView
        │
        └── Website: content/erlebnisdetails.ts → Erlebnisdetail → ErlebnisdetailHero + ScoreBar + View
                     (Fallback: Explorer-Highlight → createDetailFromHighlight)
```

**Problem:** Zwei parallele Produktmodelle und zwei Renderer-Familien für dasselbe fachliche Produkt „Erlebnisprofil“.  
Katamaran existiert doppelt (Seed/Master + statischer `Erlebnisdetail`-Eintrag). Schwebebahn hat Master, aber keine Public-Seite.

---

## Zielarchitektur (langfristig)

```
ErlebnisRecord
        │
        ▼
Produktgenerator (generateErlebnisprofil)
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

### Kanal-Kontexte (Wrapper, nicht Teil des Produktmodells)

| Kontext | Aufgabe | Beispiele |
|---------|---------|-----------|
| **Admin** | Vorschau, QA, Vollständigkeit, Quellen | `ProductStatusCard`, `ProductSourceLabel`, Generierungs-Meta |
| **Website** | SEO, Navigation, globales Layout | Header, Footer, Metadata |
| **Explore Trip** | Reiseplaner-Integration | Breadcrumbs, Sticky Bar, „Zu meiner Reise“, Cross-Links |
| **Ride Guide** | Produkt-Verknüpfung | Ride-Guide-CTA, später eigene Sektionen aus Master |

### Kanal-Erweiterungen (optional, am Renderer — nicht im Kernmodell)

Felder wie `tripSlug`, `combinations`, `recommendations`, `includedInTrips`, `addedCount` gehören **nicht** in `ErlebnisprofilProduct`, sondern in eine optionale Schicht:

```
ErlebnisprofilRenderInput = {
  product: ErlebnisprofilProduct;      // aus Generator
  channel?: ExploreTripChannelData;    // nur wenn Explore-Kontext
}
```

---

## Roadmap AP-0022 (Aufteilung)

### AP-0022A — Einheitlicher Produkt-Renderer (intern)

**Ziel:** Renderer modularisieren — ausschließlich Admin, noch keine Public-Nutzung.

| Sektion | Anmerkung |
|---------|-----------|
| `HeroSection` | Varianten vorbereiten (`admin` / `public`), initial nur Admin |
| `HighlightsSection` | Karten-Layout aus Produktstudio |
| `GalerieSection` | inkl. Lightbox |
| `BewertungenSection` | MW-Score + Plattform-Bewertungen |
| `PraktischeInformationenSection` | Grid-Layout |
| `BetreiberSection` | inkl. Standort |

**Scope:**

- Extraktion aus `ErlebnisprofilProductView` in wiederverwendbare Sektionen
- Einführung `RenderContext` (`showSources`, `showStatus`, `variant`)
- Admin-Verhalten **pixelgleich** — reines Refactoring ohne fachliche Änderung
- Dedupe: `PlatformReviews`, `PracticalIcon`-Logik zentralisieren

**Nicht in Scope:** Public-Routing, Generator-Erweiterung, Deprecation von `Erlebnisdetail`

**Abhängigkeiten:** Freigabe dieses Dokuments  
**Risiko:** Niedrig (nur Admin-intern)

---

### AP-0022B — Erstes vollständig generatorbasiertes Erlebnisprofil

**Referenzprojekt:** Wuppertaler Schwebebahn (nicht Katamaran)

**Begründung:** Schwebebahn ist das erste echte Produktionsprojekt (PP-004B) und soll Referenzfall für die gesamte Plattform werden — editorial, technisch und prozessual.

**Ziel:**

```
ErlebnisRecord (Schwebebahn, produktionsreif)
        → generateErlebnisprofil()
        → ErlebnisprofilProduct
        → ErlebnisprofilRenderer (PublicContext)
        → erste öffentliche Erlebnisprofil-Seite
```

**Scope:**

- Generator-Parität: fehlende Public-Felder ergänzen (Score-Kategorien, Karte, Tickets — soweit im Master vorhanden)
- Public-Route für Schwebebahn über Generator + Renderer (nicht `erlebnisdetails.ts`)
- Experience QA: Master → Generator → Public ohne Brüche
- Dokumentation als Referenz für alle folgenden Produktionen

**Abhängigkeiten:** AP-0022A abgeschlossen; PP-004B Gate D (Erlebnisprofil ≥90 %, Vorschau OK)  
**Risiko:** Mittel (erster End-to-End-Durchlauf)

---

### AP-0022C — Migration bestehender Erlebnisseiten

**Ziel:** Statische `Erlebnisdetail`-Seiten auf Generator + Renderer migrieren — **erst nach erfolgreicher Validierung in 0022B**.

**Reihenfolge:**

1. Katamaran (Referenz-Detailseite AP-011 → Generator-Pfad)
2. Weitere Bodensee-Highlights mit vollständigem `erlebnisdetails`-Eintrag
3. Fallback-Highlights (`createDetailFromHighlight`) — nur solange Master fehlt

**Scope:**

- `content/erlebnisdetails.ts` schrittweise deprecaten
- `Erlebnisdetail`-Typ durch `ErlebnisprofilProduct` + Kanal-Erweiterungen ersetzen
- Explore-Trip-Kontext (Sticky Bar, Breadcrumbs) bleibt Wrapper

**Abhängigkeiten:** AP-0022B erfolgreich validiert (Schwebebahn live, QA Go)  
**Risiko:** Hoch (bestehende Referenz-UX, SEO-URLs, Inhalts-Parität)

---

## Abhängigkeiten zur Gesamt-Roadmap

```
v0.1-production-platform ✅
        │
        ├── PP-004B (Schwebebahn-Produktion)     ← parallel / vor 0022B
        │
        ├── AP-0022 Phase 1.1 (dieses Dokument)  ✅
        │
        ├── AP-0022A (Renderer intern)
        │
        ├── AP-0022B (Schwebebahn Public)
        │
        ├── AP-0022C (Migration Katamaran & Co.)
        │
        └── AP-0021 (Ride Guide Producer)          ← nach PP-004B, unabhängig von 0022C
```

---

# Architekturbericht: Wegfall von `Erlebnisdetail`

## 1. Auswirkungen des Wegfalls von `Erlebnisdetail`

### Was entfällt

| Artefakt | Rolle heute | Nach Migration |
|----------|-------------|----------------|
| `types/erlebnisdetail.ts` | Paralleles Produktmodell (~15 Interfaces) | Ersetzt durch `ErlebnisprofilProduct` + Kanal-Typen |
| `content/erlebnisdetails.ts` | Statische Redaktions-Registry (Katamaran u.a.) | Entfällt — Inhalt kommt aus `ErlebnisRecord` |
| `lib/resolveErlebnisdetail.ts` | Auflösung + Highlight-Fallback | Ersetzt durch Generator-Auflösung + optionalen Fallback |
| `lib/erlebnisdetailHelpers.ts` | Hilfslogik (Icons, Official Info) | Logik wandert in shared Renderer-Utilities |
| `ErlebnisdetailView/Hero/ScoreBar` | Public-Renderer | Ersetzt durch `ErlebnisprofilRenderer` + Sektionen |

### Was bleibt betroffen, aber nicht entfernt

| Bereich | Auswirkung |
|---------|------------|
| Explore-Trip-Route | Bleibt; Page nutzt künftig Generator + Renderer statt `getErlebnisdetailBySlug` |
| `ExplorerTripContext` / Sticky Bar | Bleibt als Public-Wrapper |
| `ErlebnisdetailBreadcrumbs` | Bleibt; Typ-Import wechselt zu `ErlebnisprofilProduct` oder schlankem View-Model |
| SEO / `generateMetadata` | Felder aus `ErlebnisprofilProduct` (title, subtitle) |
| Highlight-Fallback | Übergangsphase: unvollständige Highlights ohne Master → Minimalprofil aus Generator-Defaults oder weiterhin schlanker Fallback |

### Fachliche Konsequenz

- **Keine doppelte Pflege** mehr (Master vs. statischer Detail-Eintrag)
- **Katamaran-Divergenz** wird aufgelöst — eine Wahrheit pro Erlebnis
- **Neue Erlebnisse** entstehen nur noch über Produktionsprozess (PP-004A), nicht über manuelle TS-Registry

---

## 2. Komponenten — Übernahme ohne / mit minimaler Anpassung

### Unverändert oder nahezu unverändert übernehmbar

| Komponente / Modul | Begründung |
|--------------------|------------|
| `ErlebnisdetailPlatformReview` | Reine Darstellung; Input nur `reviews[]` — Typ-Anpassung string→number trivial |
| `ErlebnisdetailBreadcrumbs` | Kanal-Wrapper; nur Prop-Typ ändern |
| `ErlebnisdetailStickyBar` | Explore-Trip-spezifisch; unabhängig vom Produktmodell |
| `erlebnisdetailHelpers` (`getPracticalIcon`, `resolveOfficialInfo`) | Logik übertragbar auf `ErlebnisprofilProduct.officialLinks` / `practicalInfo` |
| Page-Shell (`Header`, `Footer`, Metadata-Pattern) | Unverändert |

### Ersetzt durch neue Sektionen (0022A), Muster übernehmbar

| Heute | Zukünftig |
|-------|-----------|
| `ErlebnisdetailHero` | `HeroSection` (Public-Variante) |
| `ErlebnisdetailScoreBar` | `ScoreSection` (Public-Variante) |
| `ErlebnisdetailView` (Kerninhalt) | Zusammensetzung aus Sektionen im `ErlebnisprofilRenderer` |

### Nicht in den Kern-Renderer — getrennt halten

| Komponente | Grund |
|------------|-------|
| `ProductStatusCard`, `ProductSourceLabel` | Admin-only |
| Tab-Navigation in `ErlebnisdetailView` | Public UX; optional, derzeit ohne Anker-Logik |
| Section-Editor-Previews (`GaleriePreview`, …) | Editor-Workflow, nicht Produkt-Renderer |
| Ride-Guide-Tourseite (`app/touren/[slug]`) | Anderes Produkt (AP-0021) |

---

## 3. Risiken

| Risiko | Schwere | Mitigation |
|--------|---------|------------|
| Generator liefert weniger als statisches `Erlebnisdetail` | Hoch | PP-004B + 0022B als Paritäts-Gate; Generator schrittweise erweitern |
| Big-Bang-Migration Katamaran | Hoch | 0022C erst nach Schwebebahn-Validierung; Katamaran einzeln migrieren |
| Explore-Trip-Felder im Kernmodell | Mittel | Strikte Trennung: `ErlebnisprofilProduct` + `ExploreTripChannelData` |
| SEO / URL-Brüche | Mittel | Slugs aus Master; bestehende URLs beibehalten |
| Fallback-Highlights ohne Master | Mittel | Übergangs-Fallback bis Produktion; nicht dauerhaft |
| Refactoring bricht Admin-Previews | Mittel | 0022A als reines Extraktions-PR mit visueller Regression |
| Ride Guide / weitere Kanäle blockiert | Niedrig | Renderer-Architektur explizit kanaloffen designed |

---

## 4. Vorteile (Wartbarkeit & Erweiterbarkeit)

| Vorteil | Beschreibung |
|---------|--------------|
| **Single Product Model** | Ein Typ (`ErlebnisprofilProduct`) für alle Kanäle — keine Mapping-Matrix zwischen zwei Modellen |
| **Single Renderer** | Sektions-Änderung einmal, überall konsistent (Admin-Vorschau = Public-Wahrheit) |
| **Produktionsprozess integriert** | PP-004A/004B wird technisch durchgängig: Master → Generator → Publish |
| **Neue Kanäle ohne Duplikat** | Ride Guide, Newsletter, PDF: neuer `RenderContext`, gleiche Sektionen |
| **Testbarkeit** | Generator + Sektionen isoliert testbar; Completeness-Score als QA-Gate |
| **Skalierung** | N Erlebnisse ohne N statische TS-Dateien |
| **Referenz Schwebebahn** | Ein Referenzfall für Editorial, Technik und Prozess — nicht zwei (Katamaran alt + neu) |

---

## 5. Empfehlung

### ✅ Zielarchitektur empfohlen

Die Konsolidierung auf `ErlebnisprofilProduct` + `ErlebnisprofilRenderer` mit Kanal-Kontexten ist **strategisch richtig** und folgerichtig aus v0.1 und PP-004A/004B.

`Erlebnisdetail` war ein **redaktionelles Zwischenmodell** (AP-011 Mockup), bevor der Generator existierte. Es hat seine Rolle erfüllt, wird aber zur **technischen Schuld**, solange es parallel zum Generator gepflegt wird.

### Erkannte Nachteile (bewusst akzeptiert)

| Nachteil | Einordnung |
|----------|------------|
| Höherer initialer Aufwand (0022A–C) | Einmalig; amortisiert ab Erlebnis #3 |
| Generator muss „public-ready“ werden | Notwendig ohnehin für PP-004B Gate D |
| Explore-Trip-Enrichment bleibt separate Schicht | Korrekte Architektur, leicht mehr Komplexität am Renderer-Input |
| Katamaran-Seite kurzfristig „alt“ vs. Schwebebahn „neu“ | Akzeptabel; 0022C adressiert explizit |
| Verlust manueller Override-Möglichkeit in TS-Registry | Gewollt — Overrides gehören in den Master, nicht in parallele Dateien |

### Was nicht empfohlen wird

- **Big-Bang:** Modell + Public + Migration in einem Schritt
- **Erlebnisdetail beibehalten** als dauerhaftes Parallelmodell
- **Katamaran als Referenz** für 0022B (historischer Mockup-Pfad, nicht Produktionsprozess)

---

## Freigabe-Checkliste (vor AP-0022A)

- [x] Architekturbericht Phase 1 analysiert
- [x] Roadmap AP-0022A / B / C definiert
- [x] Zielarchitektur dokumentiert
- [x] Wegfall `Erlebnisdetail` bewertet
- [ ] Michael: Freigabe AP-0022A (Implementierung)

---

*Referenzen: PP-004A (Produktionsleitfaden), PP-004B (Schwebebahn), AP-0020 (Erlebnisprofil-Generator), v0.1-production-platform*
