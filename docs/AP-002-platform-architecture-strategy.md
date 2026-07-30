# MW Guides — Plattformarchitektur V2: Kritische Analyse & Empfehlung

Diese Analyse beantwortet die im Auftrag AP-002 gestellten strategischen
Fragen, bevor Code entsteht. Die Empfehlungen am Ende sind das, was
tatsächlich umgesetzt wurde — mit Begründung für jede wesentliche
Abweichung vom ursprünglichen Vorschlag.

## 1. Ist die vorgeschlagene Struktur logisch aufgebaut?

Größtenteils ja — die Trennung zwischen "Explore Trips" (mehrtägige,
emotionale Reisekonzepte) und "Ride Guides" (kurze, GPS-geführte Touren
entlang einer Strecke) trifft einen echten Unterschied im Nutzerbedürfnis:
Die eine Person plant eine Woche Bodensee, die andere sitzt gerade in der
Schwebebahn und will in diesem Moment eine Geschichte hören. Zwei
verschiedene Absichten, zwei verschiedene Produkte — die Trennung ist
richtig.

**Aber:** Der Auftrag berücksichtigt nicht, dass mit AP-002.1 und dem
vorherigen AP-002 bereits zwei Content-Ebenen existieren — "Touren"
(genau das, was jetzt "Ride Guides" heißen soll) und "Reiseideen"
(kurze redaktionelle Einzelstücke, kein Magazincharakter für mehrtägige
Reisen). Eine dritte Ebene ("Explore Trips") einzuführen, ohne die
Beziehung zu "Reiseideen" zu klären, hätte zu drei sich überschneidenden
Content-Typen geführt. Das wurde aufgelöst — siehe Abschnitt 7.

## 2. Gibt es bessere Strukturen?

Eine Sache im Vorschlag verdient Widerspruch: **Brügge passt nicht in die
Ride-Guides-Taxonomie.** Alle anderen drei bestehenden Touren sind an ein
Verkehrsmittel gebunden (Schwebebahn, Straßenbahn Linie D, Küstentram) —
Brügge ist ein Fußgänger-Stadtspaziergang ohne Fahrzeug als roten Faden.
Wenn "das Verkehrsmittel ist Teil des Erlebnisses" die Kernthese der
Plattform ist, gehört eine reine Fußgängertour strukturell nicht in
"Ride Guides". Zwei Optionen: (a) Brügge wird zu einem "Explore Trip"
umklassifiziert, sobald diese Kategorie Inhalte hat, oder (b) eine
eigene Kategorie "Spaziergänge" wird ergänzt. Empfehlung: (a), da eine
Einzeltour keine eigene Kategorie rechtfertigt. Für dieses Arbeitspaket
bleibt Brügge unverändert unter Ride Guides einsortiert (Kategorie
`sonstige`) und wird dokumentiert als offener Punkt — siehe README.

## 3. Welche Inhalte fehlen?

Für praktisch alle in der Beispielliste genannten Reisen und Strecken
(Mailand Unlimited, Bodensee, Essen Kulturlinie 107, Semmeringbahn, …)
existiert aktuell **kein echtes Material** — weder Text noch Fotos. Diese
wurden deshalb nicht als Inhalte erfunden, sondern als das behandelt, was
sie sind: eine Roadmap. Sie erscheinen auf den neuen Übersichtsseiten als
klar beschriftete, unverlinkte Titel ("in Konzeption" / "geplant"), nicht
als anklickbare Artikel mit Fantasieinhalt. Das ist eine bewusste
Abweichung vom naheliegenden Weg (KI-generierte Kurzbeschreibungen für
jede Destination), weil erfundene Reiseinhalte für eine reale,
kommerzielle Marke das größere Risiko sind als eine ehrlich leere Seite.

## 4. Welche Funktionen werden später wichtig?

In Prioritätsreihenfolge, basierend auf dem, was die Datenstruktur bereits
erzwingt (siehe Abschnitt 8):

1. **Kategorie-Filter auf `/ride-guides`** — sobald mehr als 2–3 Touren
   pro Kategorie existieren, wird eine flache Liste unbrauchbar.
2. **Globale Suche** — sobald Explore Trips und Ride Guides beide
   wachsen, wird die Zwei-Welten-Trennung selbst zum Problem für Nutzer,
   die einfach nur "Wien" suchen, ohne zu wissen, ob es dazu einen Ride
   Guide, einen Explore Trip oder einen Magazin-Artikel gibt.
   Konsequenz: Suche muss von Anfang an über alle drei Content-Typen
   hinweg funktionieren, nicht pro Bereich getrennt.
3. **Mehrsprachigkeit** — MW Guides' eigentliches Alleinstellungsmerkmal
   (Strecken statt Sehenswürdigkeiten) funktioniert international nur,
   wenn Inhalte nicht nur für DE-Besucher lesbar sind.
4. **Bewertungen/Sammlungen** — bewusst niedrige Priorität. Ohne
   nennenswerten Traffic sind leere Bewertungsfunktionen ein
   Vertrauensverlust, kein Vertrauensgewinn (siehe auch die bereits
   getroffene Entscheidung gegen erfundene Testimonials in AP-002).

## 5. Welche Skalierungsprobleme könnten entstehen?

- **Kategorie-Explosion:** Fünf Ride-Guide-Kategorien plus "weitere
  Kategorien vorbereiten" (Bus, Metro, historische Bahnen, Zahnradbahnen,
  Museumsbahnen) ergeben potenziell zehn oder mehr Kategorien mit oft nur
  einem Eintrag. Eine Kategorie mit einer einzigen Tour ist keine
  Kategorie, sondern ein Etikett. Empfehlung: Kategorien erst auf der
  Übersichtsseite anzeigen, sobald sie ≥ 2 echte Einträge haben; einzelne
  Einträge vorher unter "Weitere Strecken" sammeln statt eine leere
  Kategorie-Sektion zu zeigen.
- **Zwei URL-Räume für dieselbe Stadt:** Wien taucht sowohl als
  Ride-Guide-Beispiel (Linie D) als auch als Explore-Trip-Beispiel (Wien)
  auf. Ohne eine Stadt-Ebene, die beide referenziert, entstehen doppelte,
  unverknüpfte Wien-Seiten. Die Datenstruktur unten löst das über ein
  gemeinsames, optionales `city`-Feld statt zweier getrennter
  Taxonomien.
- **Reiseideen vs. Explore Trips vs. Ride-Guide-Editorial:** Ohne klare
  Redaktionsregel (siehe Abschnitt 7) würde jeder neue Autor entscheiden
  müssen, wo ein neuer Text hingehört — das führt erfahrungsgemäß zu
  Duplikaten.

## 6. Welche UX-Probleme erkennst du?

- **"Explore Trips" und "Ride Guides" sind englische Fachbegriffe auf
  einer sonst durchgehend deutschsprachigen Seite.** Das ist an sich
  vertretbar (viele Premium-Reisemarken nutzen englische Sektionsnamen
  bewusst als Markenbegriff), sollte aber eine bewusste Entscheidung
  sein, nicht ein Nebeneffekt der Auftragssprache. Empfehlung: als
  Markenbegriffe beibehalten (wirkt international, editorial), aber
  jede Landingpage bekommt eine deutsche Unterzeile, die den Begriff
  sofort erklärt — umgesetzt.
- **Sieben-Punkte-Hauptnavigation** wäre entstanden, hätte man einfach
  zwei neue Punkte zur bestehenden Navigation hinzugefügt (Touren,
  Reiseideen, Reiseziele, Fotospots, Blog, Über MW Guides + 2 neue = 8).
  Das widerspricht der eigenen Designphilosophie des Auftrags
  ("keine Informationsüberladung"). Umgesetzt: Hauptnavigation auf vier
  Punkte reduziert (Ride Guides, Explore Trips, Magazin, Über MW Guides);
  Reiseziele/Fotospots/Blog bleiben vollständig erhalten, wandern aber in
  die Fußzeile — keine Inhalte entfernt, nur die Prioritätsebene
  angepasst.

## 7. Verhältnis der vier Content-Typen (zentrale Entscheidung)

| Typ | Charakter | Beispiel | Status |
|---|---|---|---|
| **Ride Guides** | Kurz, GPS-geführt, an ein Verkehrsmittel gebunden | Wuppertaler Schwebebahn | Bisherige "Touren" — umbenannt, Daten erweitert, URLs unverändert |
| **Explore Trips** | Mehrtägig, mehrere Verkehrsmittel, komplettes Reisekonzept | Bodensee, Donau | Neu, aktuell nur Architektur + Roadmap-Titel, keine echten Inhalte |
| **Magazin** (vormals "Reiseideen") | Kurze redaktionelle Einzelstücke, kein vollständiges Reisekonzept | "Warum wir dieselbe Kurve immer wieder fahren" | Bisherige "Reiseideen" — Label geändert, Inhalte unverändert |
| **Städte** (`city`-Feld) | Keine eigene Content-Ebene, sondern ein gemeinsames Metadatenfeld | "Wien" verknüpft Ride Guide + künftigen Explore Trip | Vorbereitet, noch keine eigene Stadtseite |

## 8. Datengetriebene Architektur (ohne Datenbank)

Zentrale Entwurfsentscheidung: **ein gemeinsames `types/taxonomy.ts`**
definiert Länder, Städte, Verkehrsmittel-Kategorien und Feature-Flags
(Audio/PDF/Offline/GPS/Sprache/Schwierigkeitsgrad) einmal, referenziert
von Ride Guides, Explore Trips und künftig auch vom Magazin. Neue Inhalte
jeder Art lassen sich damit ergänzen, ohne bestehende Typen zu ändern —
siehe `types/taxonomy.ts`, `types/rideGuide.ts`, `types/exploreTrip.ts`.

## 9. Internationale Best Practices, die berücksichtigt wurden

- **Progressive Disclosure statt Mega-Menü:** Vier Hauptpunkte, Kategorien
  erst auf der jeweiligen Landingpage sichtbar (wie bei Patagonia/Muji:
  Struktur entsteht beim Klicken, nicht im Header).
  Kategorien-Landingpages statt einer flachen Liste mit Filtern von Tag 1
  an (kein Nutzer filtert nach `difficulty` bei drei Touren) — Filter
  kommen erst, wenn genug Inhalte für sinnvolle Ergebnisse existieren.
- **Ein Datenmodell, viele Oberflächen:** Reisemagazine wie Monocle oder
  Cereal trennen redaktionelle von Produkt-Inhalten strikt in der
  Navigation, verlinken sie aber im Fließtext kreuzweise — genau das
  leistet die `relatedRideGuideSlugs`-Verknüpfung im Magazin-Artikel.

## Zusammenfassung der wesentlichen Abweichungen vom Ursprungsvorschlag

1. Brügge bleibt vorerst unter Ride Guides, mit dokumentiertem
   Kategorisierungskonflikt statt stillschweigender Einordnung.
2. Explore Trips und Ride Guides erhalten **keine** erfundenen
   Kurzbeschreibungen für die genannten Beispieldestinationen — nur
   ehrliche Roadmap-Titel.
3. Hauptnavigation auf vier Punkte reduziert; drei bestehende
   Platzhalter-Seiten wandern unverändert in die Fußzeile.
4. "Reiseideen" wird zu "Magazin" umbenannt (nur Label, keine
   Struktur- oder Inhaltsänderung), um die Drei-Ebenen-Logik nach außen
   klar zu machen.
5. Eine gemeinsame Taxonomie (`types/taxonomy.ts`) statt getrennter
   Kategoriesysteme pro Content-Typ, um die im Auftrag geforderte
   künftige Stadt-Verknüpfung zwischen Ride Guides und Explore Trips zu
   ermöglichen.
