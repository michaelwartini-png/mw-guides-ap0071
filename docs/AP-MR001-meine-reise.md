# AP-MR001 — Meine Reise V1

**Status:** ✅ Fachlich abgeschlossen (August 2026)  
**Produktversion:** Meine Reise 1.0 (eingefroren)  
**Plattform:** `0.8.0` · Tag `v0.8.0`  
**Referenzreise:** Bodensee Unlimited  
**Route:** `/meine-reise`

---

## Auftrag

Umsetzung des fachlich freigegebenen Dashboards „Meine Reise“ als Version 1.  
Das Mockup ist die verbindliche Referenz. Keine neuen Funktionen, keine
IA-Änderung, kein Redesign.

Acht Feinschliffe vor dem Freeze:

1. Hero-Premium vereinfachen (kein Feature-Listing, solange Premium aktiv ist)
2. Sidebar nur Navigation, Dashboard nur Bearbeitung
3. Reiseplan als Herzstück (breiter, mehr Weißraum, stärkere Timeline)
4. „Nach der Reise“ vor Abreise reduziert
5. Aufgaben auf echten Vorbereitungswert beschränken
6. Offline-Hinweis nur am Premium Guide
7. Genau ein Primary-CTA
8. Unterlagen-Reihenfolge: Premium Guide, Handout, Tickets, weitere PDFs

---

## Abnahme

| Kriterium | Status |
|---|---|
| Ruhigeres Dashboard, Premium weniger aufdringlich | ✅ |
| Keine doppelten Inhalte zwischen Sidebar und Widgets | ✅ |
| Reiseplan klar als Herzstück | ✅ |
| Genau ein Primary-CTA („Premium Guide öffnen“) | ✅ |
| Fokus auf Vorbereitung und Durchführung | ✅ |
| Keine neuen Funktionen, kein Redesign | ✅ |
| Übereinstimmung mit dem freigegebenen Mockup plus Feinschliff | ✅ |

---

## Technische Lieferung

| Artefakt | Pfad |
|---|---|
| Public-Route | `app/meine-reise/page.tsx` |
| Dashboard-Shell | `components/meine-reise/MeineReiseDashboard.tsx` |
| Inhalte (statisch) | `content/meineReise.ts` |
| Typen | `types/meineReise.ts` |
| Karte | bestehende `ReviewRouteSketch` (ET-04) |
| Premium-Vorschau | bestehender `PremiumPreviewDialog` (ET-05) |

Kein Login, kein Checkout, keine Persistenz, keine Wetter-API.  
Tickets öffnen weiterhin die offizielle Anbieterseite.

---

## Bewusst unverändert

Hero-Bildkonzept, Countdown, Produktlogik, Premium-Modell, Kartenansicht,
Reiseplan-Konzept, Ticket-Konzept, Wettermodul, Grundlayout, Designstil,
Farbwelt, Typografie.

---

*Referenzen: ET-05 Reisebegleiter, CHANGELOG 0.8.0, Production Handbook Kap. 8*
