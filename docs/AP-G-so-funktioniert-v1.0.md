# So funktioniert MW Guides — Version 1.0

**Status:** 🟢 Eingefroren (Release Candidate / Baseline)  
**Datum:** 15.08.2026  
**Produktversion:** So funktioniert MW Guides 1.0  
**Plattform:** `0.9.0`  
**Route:** `/so-funktioniert`

---

## Freeze-Regel

Ab Version 1.0 gelten keine direkten Änderungen mehr an dieser Baseline.

Jede weitere Verbesserung erfolgt ausschließlich als:

- Version 1.1
- Version 1.2
- Version 2.0

mit eigenem Änderungsprotokoll in `CHANGELOG.md` und in dieser Dokumentation.

Nicht ändern: redaktionelle Texte der drei Kapitel, Seitenstruktur, Accordion-Verhalten, Produktnamen, Legende, Website-Einbindungen von A/B/C, archivierte Originalgrafiken.

---

## Auftrag

Erklärseite für das Produktprinzip von MW Guides: Explore Trips, Ride Guides und „Meine Reise“ im Zusammenhang, ohne Buchung und ohne Login.

---

## Seitenstruktur (eingefroren)

Es gibt **keinen Seiten-Hero**. Der Einstieg ist Kapitel 1 (AP-G08.2).

```
Header (Site-Navigation)
↓
Akkordeon (nur ein Kapitel offen, Kapitel 1 startet geöffnet)
  1. Verstehe das Prinzip von MW Guides
     → Intro + Legende Kostenlos · Premium · Optional
     → Mastergrafik A (Website-Einbindung)
  2. Plane deine persönliche Reise
     → Intro
     → Mastergrafik B (Website-Einbindung)
  3. Lass dich vor, während und nach der Reise begleiten
     → Intro
     → Mastergrafik C (Website-Einbindung)
↓
CTA: Explore Trips entdecken · Ride Guides entdecken
↓
Footer
```

---

## Redaktioneller Stand (eingefroren)

### Kapitel 1

- Plane deine Reise individuell und entdecke außergewöhnliche Erlebnisse.
- Erfahre, wie Explore Trips, Ride Guides und „Meine Reise“ zusammenspielen.
- „Meine Reise“ ist dein persönlicher Reisebereich. Hier laufen Planung, Unterlagen und Premium Guides zusammen.

Legende **nur hier:** Kostenlos · Premium · Optional  
(Grün `#0b4d3a` · Gold `#c9a24a` · Blau `#7a97b0`)

### Kapitel 2

Vom ersten Explore Trip bis zu deiner fertigen Reiseroute – Schritt für Schritt.

### Kapitel 3

„Meine Reise“ begleitet dich von der Vorbereitung über die Reise bis zu deinen Erinnerungen nach der Rückkehr.

### CTA

- Explore Trips entdecken → `/explore-trips`
- Ride Guides entdecken → `/touren`

### Produktnamen

| Richtig | Nicht verwenden |
|---|---|
| Explore Trip Handout | — |
| Explore Trip Premium Guide | — |
| Ride Guide / Ride Guide Handout / Ride Guide Premium Guide | Ride Guide Companion |
| Meine Reise (persönlicher Reisebereich) | Reisepaket |

---

## Grafiken

Originalgrafiken bleiben unverändert archiviert. Die Website zeigt bereinigte Einbindungen ohne doppelte Header und Footer.

### Mastergrafik A — So funktioniert MW Guides

| | |
|---|---|
| Status | Inhalt eingefroren |
| Original (nicht ändern) | `docs/ap-g01-mastergrafik/mastergrafik-a-v2.3.html` · `.png` · `public/mastergrafik-a/v2.3.html` |
| Website-Einbindung | `public/mastergrafik-a/v2.3-embed.html` |
| Komponente | `components/so-funktioniert/MastergrafikA.tsx` |
| Bereinigung | Grafik-Kopf entfernt, Grafik-Footer (CTA-Leiste) entfernt |
| Produktlabels in der Einbindung | Explore Trip Premium Guide, Ride Guide Premium Guide |

### Mastergrafik B — So funktioniert dein persönlicher Trip Explorer

| | |
|---|---|
| Status | Inhalt eingefroren |
| Original (nicht ändern) | `docs/ap-g03-mastergrafik-b/mastergrafik-b-v2.1.png` · `public/mastergrafik-b/v2.1.png` |
| Website-Einbindung | CSS-Crop in `MastergrafikB.tsx` (Kopf 168 px, Fuß 128 px bei 2×) |
| Bereinigung | Grafik-Kopf entfernt, Grafik-Fuß (Symbollegende / „Flexibel & individuell“) entfernt |

### Mastergrafik C — So begleitet dich „Meine Reise“

| | |
|---|---|
| Status | Inhalt eingefroren |
| Original (nicht ändern) | `docs/ap-g04-mastergrafik-c/mastergrafik-c-v1.html` · `.png` · `public/mastergrafik-c/v1.html` |
| Website-Einbindung | `public/mastergrafik-c/v1-embed.html` |
| Komponente | `components/so-funktioniert/MastergrafikC.tsx` |
| Bereinigung | Grafik-Kopf entfernt, Grafik-Footer (CTA-Leiste) entfernt |

---

## Code (eingefroren)

| Artefakt | Pfad |
|---|---|
| Public-Route | `app/so-funktioniert/page.tsx` |
| Akkordeon | `components/so-funktioniert/ChapterAccordion.tsx` |
| Grafik A | `components/so-funktioniert/MastergrafikA.tsx` |
| Grafik B | `components/so-funktioniert/MastergrafikB.tsx` |
| Grafik C | `components/so-funktioniert/MastergrafikC.tsx` |
| Navigation | `content/navigation.ts` (Eintrag „So funktioniert MW Guides“) |

---

## UX-Status

Getestet durch ChatGPT, Claude, Gemini und Perplexity.

Ergebnis: Erzählfluss, Informationsarchitektur und Produktverständnis bestätigt. Kleinere Textoptimierungen sind in dieser Baseline bereits enthalten.

---

## Bewusst so (nicht nachziehen)

- Kein Seiten-Hero — Kapitel 1 ist der Einstieg
- Nur ein Kapitel gleichzeitig geöffnet
- Legende nur einmal, in Kapitel 1
- Mastergrafik B nur auf `/so-funktioniert`, nicht auf anderen Seiten
- Kein Login, kein Checkout

---

*Referenzen: CHANGELOG 0.9.0, Production Handbook Kap. 8.9, Meine Reise V1 (`docs/AP-MR001-meine-reise.md`)*
