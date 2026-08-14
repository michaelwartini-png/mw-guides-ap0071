# AP-0022C — Katamaran auf gemeinsamen ErlebnisprofilRenderer

**Status:** Implementiert  
**Datum:** 2026-08-11

## Ziel

Katamaran vollständig auf den kanalneutralen `ErlebnisprofilRenderer` migrieren. Explore-Trip-spezifische Bereiche als optionale Channel Extensions. Keine Doppelpflege mehr für Katamaran.

## Architektur

```
ErlebnisRecord (katamaran-konstanz-friedrichshafen)
        │
        ▼
generateErlebnisprofilBundle()
        │
        ▼
ErlebnisprofilRenderer (kanalneutral)
        │
        ├── Hero, Score, Beschreibung, Highlights, Tipps, Galerie, Bewertungen, Karte, Offiziell, Praktisch, Betreiber
        │
        └── ExploreTripChannelExtensions (optional)
                ├── Passt hervorragend dazu
                ├── Kombinierbar mit
                ├── In diesen Explore Trips enthalten
                └── Sticky Bar „Zu meiner Reise“
```

## Datenquellen

| Bereich | Quelle |
|--------|--------|
| Kern-Erlebnisprofil | `ErlebnisRecord` → Generator |
| Recommendations, Combinations, IncludedInTrips, addedCount | `content/exploreTripChannelExtensions.ts` |
| Intro-Video-Label, Karten-Preview, Abfahrts-Häfen | Channel Extension → `ErlebnisprofilWebsiteOptions` |
| Explorer-Breadcrumbs | Page-Wrapper (`ErlebnisdetailBreadcrumbs`) |

## Geänderte / neue Dateien

| Datei | Änderung |
|-------|----------|
| `lib/resolveErlebnisprofil.ts` | `resolveErlebnisprofilBySlug()`, `usesErlebnisprofilGenerator()` |
| `types/erlebnisprofilChannel.ts` | Channel-Extension-Typen |
| `content/exploreTripChannelExtensions.ts` | Katamaran Channel-Daten |
| `components/erlebnisprofil/channels/ExploreTripChannelExtensions.tsx` | Explore-Trip-Sektionen |
| `components/erlebnisprofil/channels/ExploreTripStickyBar.tsx` | Sticky Bar |
| `app/explore-trips/.../erlebnis/[erlebnisSlug]/page.tsx` | Generator-Pfad + Legacy-Fallback |
| `components/erlebnisprofil/types.ts` | `introVideoLabel`, `mapEnhancement`, `rideGuide.disabled` |
| `components/erlebnisprofil/sections/HeroSection.tsx` | Intro-Video-Button |
| `components/erlebnisprofil/sections/OverviewSection.tsx` | Karten-Preview + Abfahrts-Karten |
| `content/erlebnisdetails.ts` | Katamaran-Eintrag entfernt |

## Abnahmekriterien

- [x] Katamaran nutzt `ErlebnisprofilRenderer`
- [x] Schwebebahn und Katamaran teilen denselben Renderer
- [x] Explore-Trip-Bereiche nur über Channel Extensions
- [x] Keine Änderungen am Erlebnisbaustein-Datenmodell
- [x] Keine Doppelpflege (`katamaranDetail` aus `erlebnisdetails.ts` entfernt)
- [x] Legacy-Stack bleibt für übrige Bodensee-Highlights (Fallback)

## Test-URLs

| Erlebnis | URL |
|----------|-----|
| Katamaran (Generator) | `/explore-trips/bodensee/explorer/erlebnis/katamaran-konstanz-friedrichshafen` |
| Schwebebahn (Generator) | `/erlebnisse/wuppertaler-schwebebahn` |
| Legacy-Fallback | z. B. `/explore-trips/bodensee/explorer/erlebnis/bodensee-schifffahrt-meersburg` |

## Bewusst ausgelassen (Parität)

- Merken / Teilen / Heart-Buttons im Hero (nicht im Renderer-Scope)
- Sticky Tab-Navigation
- Katamaran-Untertitel kürzer als Legacy (Seed-Daten; kein Generator-Eingriff)

## Nächste Schritte

- Verbleibende Bodensee-Highlights auf Generator migrieren
- Weitere Explore-Trip-Kanäle als Channel Extensions ergänzen
