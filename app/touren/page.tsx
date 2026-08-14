import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { TourTile } from "@/components/tours/TourTile";
import { tours } from "@/content/tours";
import { rideGuideRoadmap } from "@/content/rideGuideRoadmap";
import {
  rideGuideCategoryLabels,
  futureRideGuideCategoryLabels,
  type RideGuideCategory,
} from "@/types/taxonomy";

export const metadata: Metadata = {
  title: "Ride Guides",
  description:
    "GPS-geführte Touren entlang außergewöhnlicher Verkehrswege — das Verkehrsmittel als roter Faden der Reise.",
};

const CATEGORY_ORDER: RideGuideCategory[] = [
  "schwebebahnen",
  "strassenbahnen",
  "panoramabahnstrecken",
  "faehren-waterbusse",
  "seilbahnen",
  "sonstige",
];

/**
 * Ride Guides hub (AP-002, Plattformarchitektur V2) — formerly the plain
 * /touren placeholder. Groups the real tours by transport category and
 * shows categories/lines with no real content yet as honest "geplant"
 * roadmap text, never as fabricated articles. See
 * docs/AP-002-platform-architecture-strategy.md.
 *
 * AP-007.1 (UX review): removed the SearchBar. At the current content
 * volume (4 real tours across 6 categories) a search field adds no real
 * orientation value — the category grouping below already does that job,
 * and the field itself was non-functional to begin with (see README,
 * "AP-002.0, Konflikt 'Hero: nur ein CTA'": it was moved here from the
 * Hero specifically because it had no working functionality). Removing
 * dead UI that promises a capability the page doesn't have is itself a
 * visible improvement, per this brief's "entferne es, falls es keinen
 * echten Nutzen bringt".
 */
export default function RideGuidesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1240px] px-6 pt-28 pb-16 lg:px-10 lg:pt-40">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Ride Guides</span>
          <h1 className="mwg-display-xl mt-5 max-w-[20ch]">
            Das Verkehrsmittel ist Teil der Reise.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-[var(--mwg-ink-70)]">
            GPS-geführte Touren entlang außergewöhnlicher Strecken — Bausteine
            innerhalb eines Explore Trips. Die Fahrt selbst ist die Attraktion,
            nicht nur das Ziel am Ende.
          </p>
        </section>

        {CATEGORY_ORDER.map((category) => {
          const categoryTours = tours.filter((t) => t.category === category);
          const roadmapLines = rideGuideRoadmap[category];

          if (categoryTours.length === 0 && roadmapLines.length === 0) {
            return null;
          }

          return (
            <section key={category} className="mx-auto max-w-[1240px] px-6 pb-20 lg:px-10">
              <Reveal className="mb-8">
                <h2 className="font-display text-[24px] font-medium">
                  {rideGuideCategoryLabels[category]}
                </h2>
              </Reveal>

              {categoryTours.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryTours.map((tour, i) => (
                    <Reveal key={tour.slug} delayMs={i * 80}>
                      <TourTile tour={tour} />
                    </Reveal>
                  ))}
                </div>
              )}

              {roadmapLines.length > 0 && (
                <Reveal
                  delayMs={categoryTours.length * 80}
                  className={categoryTours.length > 0 ? "mt-8" : undefined}
                >
                  <p className="mwg-eyebrow mb-3 text-[var(--mwg-ink-45)]">Geplant</p>
                  <ul className="flex flex-wrap gap-x-8 gap-y-2">
                    {roadmapLines.map((line) => (
                      <li key={line} className="text-[14.5px] text-[var(--mwg-ink-45)]">
                        {line}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </section>
          );
        })}

        <section className="mx-auto max-w-[1240px] px-6 pb-28 lg:px-10">
          <p className="mwg-eyebrow mb-3 text-[var(--mwg-ink-45)]">
            Weitere Kategorien in Vorbereitung
          </p>
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {futureRideGuideCategoryLabels.map((label) => (
              <li key={label} className="text-[14.5px] text-[var(--mwg-ink-45)]">
                {label}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
