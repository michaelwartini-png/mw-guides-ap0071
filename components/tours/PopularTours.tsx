import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TourTile } from "@/components/tours/TourTile";
import { Reveal } from "@/components/ui/Reveal";
import { tours } from "@/content/tours";

/**
 * AP-002.2: heading changed from an editorial title to the literal
 * "Ride Guides" (with the exact explanatory line from the brief), so
 * the navigation term and this homepage section match 1:1 — the core
 * fix requested in AP-002.2.
 *
 * AP-008.1: added a second sentence naming the relationship to Explore
 * Trips explicitly (mirrors the sentence added to ExploreTripsSection),
 * so the two product worlds are defined in terms of each other rather
 * than left for the visitor to infer.
 */
export function PopularTours() {
  const [featured, ...rest] = tours;

  return (
    <section id="touren" className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mb-20">
        <div>
          <h2 className="mwg-display-xl max-w-[16ch]">Ride Guides</h2>
          <p className="mt-4 max-w-[50ch] text-[17px] leading-[1.6] text-[var(--mwg-ink-70)]">
            GPS-geführte Audiotouren entlang außergewöhnlicher Strecken. Jeder
            Ride Guide funktioniert einzeln für sich — oder als Teil eines
            Explore Trips.
          </p>
        </div>
        <Link
          href="/touren"
          className="group flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
        >
          Alle Ride Guides
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>

      <div className="grid gap-3 lg:grid-cols-2">
        <Reveal>
          <TourTile tour={featured} large />
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:h-full lg:grid-rows-3">
          {rest.map((tour, i) => (
            <Reveal key={tour.slug} delayMs={(i + 1) * 90} className="lg:h-full">
              <TourTile tour={tour} fill />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
