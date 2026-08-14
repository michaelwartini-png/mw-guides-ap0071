# AP-0022B — Erstes generatorbasiertes Public-Erlebnisprofil

**Status:** ✅ Abgeschlossen (August 2026)  
**Referenzprojekt:** Wuppertaler Schwebebahn  
**Meilenstein:** `v0.3-generator-public-profile` — Erster End-to-End-Durchlauf Master → Generator → Public Website

---

## Abnahme

| Kriterium | Status |
|---|---|
| Public-Seite vollständig aus Erlebnisbaustein generiert | ✅ |
| Admin und Website verwenden denselben `ErlebnisprofilRenderer` | ✅ |
| Keine doppelte Datenpflege | ✅ |
| Keine Redakteur-Informationen auf Public-Seite | ✅ |
| Design unverändert gegenüber MW-Guides-System | ✅ |
| Build erfolgreich | ✅ |

**Abgenommen von:** Michael (Product Lead), August 2026

---

## Ergebnis

```text
ErlebnisRecord (Seed: erlebnisData.ts)
        ↓
generateErlebnisprofilBundle()
        ↓
ErlebnisprofilProduct
        ↓
ErlebnisprofilRenderer mode="website"
        ↓
/erlebnisse/wuppertaler-schwebebahn
```

**Public-URL:** `/erlebnisse/wuppertaler-schwebebahn`  
**Admin-Vergleich:** `/admin/erlebnis/wuppertaler-schwebebahn` → Produkte → Erlebnisprofil-Vorschau (`mode="admin"`)

---

## Technische Lieferung

| Artefakt | Pfad |
|---|---|
| Public-Route | `app/erlebnisse/[slug]/page.tsx` |
| Publish-Resolver | `lib/resolveErlebnisprofil.ts` |
| Renderer-Modi | `components/erlebnisprofil/ErlebnisprofilRenderer.tsx` |
| Publish-Liste | `PUBLISHED_ERLEBNIS_SLUGS` (initial: Schwebebahn) |

---

## Ersetzte Seite

Es gab **keine** bestehende statische Erlebnisdetail-Seite für die Schwebebahn. Neu ist die dedizierte Route `/erlebnisse/wuppertaler-schwebebahn`. Unverändert bleiben `/touren/schwebebahn` (Ride Guide) und Editorial-Artikel unter `/explore-trips/...`.

---

## Nachfolger

**AP-0022B.1** — Renderer funktional auf Katamaran-Niveau bringen (Score-Bar, Hero-Stats, Karte, Offizielle Links).  
**AP-0022C** — Migration Katamaran und weiterer Legacy-Seiten.

---

*Referenzen: AP-0022 Zielarchitektur, PP-004B Schwebebahn, v0.2-unified-renderer*
