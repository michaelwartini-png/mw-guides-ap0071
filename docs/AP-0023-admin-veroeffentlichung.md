# AP-0023 — Admin → Generator → Veröffentlichung (End-to-End)

**Status:** Implementiert  
**Datum:** 2026-08-11

## Ziel

Der Admin ist die Single Source of Truth. Redakteure können Erlebnisse anlegen, pflegen, veröffentlichen — ohne Codeänderungen erscheint die öffentliche Seite.

## Architektur

```
Admin (Browser)
    │  PUT /api/erlebnisse/[slug]
    │  POST /api/erlebnisse/[slug]/status
    ▼
data/erlebnisse/{slug}.json   ← persistenter Store
    │
    ▼
resolveErlebnisprofil (Server)
    │  status === "Veröffentlicht" + canGenerate
    ▼
generateErlebnisprofilBundle()
    ▼
ErlebnisprofilRenderer (+ Channel Extensions)
    ▼
/erlebnisse/[slug]  ·  /explore-trips/.../erlebnis/[slug]
```

## AP-0023.1 Veröffentlichungsworkflow

Status (Allgemein + `profileStatus`):

| Status | Bedeutung |
|--------|-----------|
| Entwurf | Nicht öffentlich |
| In Prüfung | Nicht öffentlich |
| Veröffentlicht | Öffentlich (wenn Generator ≥ 70 %) |
| Archiviert | Nicht öffentlich |

Veröffentlichen: **Produkte → Veröffentlichen** (min. 70 % Vollständigkeit).

## AP-0023.2 Dynamische Auflösung

- `PUBLISHED_ERLEBNIS_SLUGS` entfernt
- `getPublishedErlebnisSlugs()` liest aus Store
- `generateStaticParams()` dynamisch + `dynamicParams = true`

## AP-0023.3 Einheitliches Routing

Beide Routen nutzen `resolveErlebnisprofilBySlug()` → denselben Datensatz.  
Explore-Trip-Unterschied nur über `ExploreTripChannelExtensions`.

## AP-0023.4 Generator

Beim Veröffentlichen: kein manueller JSON-Eingriff — Generator läuft zur Render-Zeit aus dem persistierten `ErlebnisRecord`.

## AP-0023.5 End-to-End-Test

1. `/admin/neues-erlebnis` → Erlebnis anlegen
2. Sektionen pflegen (Allgemein, Hero, Bewertungen, …)
3. **Produkte** → **Veröffentlichen**
4. Öffentliche URL: `/erlebnisse/{slug}`

## Neue / geänderte Dateien

| Bereich | Dateien |
|---------|---------|
| Persistenz | `lib/erlebnisStore.ts`, `data/erlebnisse/` |
| Status | `lib/erlebnisPublication.ts` |
| API | `app/api/erlebnisse/**` |
| Client | `lib/erlebnisApiClient.ts` |
| Resolver | `lib/resolveErlebnisprofil.ts` |
| Admin | `PublishPanel`, Dashboard, Editor, Neues Erlebnis |
| Public | `app/erlebnisse/[slug]/page.tsx` |

## Bootstrap

Beim ersten Zugriff werden Legacy-Seeds aus `erlebnisData.ts` nach `data/erlebnisse/` migriert.  
Schwebebahn + Katamaran starten als **Veröffentlicht**.

## Abnahmekriterien

- [x] Admin = einzige Quelle (persistenter JSON-Store)
- [x] Keine manuelle Veröffentlichungsliste
- [x] Neue Erlebnisse ohne Codeänderung veröffentlichbar
- [x] Einheitlicher Datensatz für beide Routen
- [x] Generator erzeugt öffentliche Daten automatisch
- [ ] E2E-Test durch Redaktion (manuell im Admin)

## Hinweise

- Seeds in `erlebnisData.ts` dienen nur noch als Bootstrap-Fallback
- `sessionStorage` wird nicht mehr für Persistenz genutzt
- Netlify/Production: `data/erlebnisse/` muss schreibbar sein (oder später DB)
