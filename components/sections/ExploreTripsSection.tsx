import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ExploreTripCard } from "@/components/explore-trips/ExploreTripCard";
import { exploreTrips } from "@/content/exploreTrips";

/**
 * AP-002.2: the homepage's second experience world, placed directly
 * after Ride Guides so the two are read as parallel and equal — the
 * core structural fix requested in AP-002.2.
 *
 * AP-007: now placed *before* Ride Guides (see app/page.tsx) — Explore
 * Trips are the inspiration entry point per the updated brand strategy.
 *
 * AP-008.1/AP-008.2: added the section's first explanatory sentences.
 *
 * AP-007.1 (UX review): those sentences described the *relationship* to
 * Ride Guides but never explained what an Explore Trip actually *is* —
 * a first-time visitor still had to infer "ein Hotel, viele
 * Möglichkeiten, kein fester Tagesplan" from context. Rewritten to name
 * this directly. "Alles kann – nichts muss" now appears exactly once on
 * the entire platform, here — removed from all three individual Explore
 * Trip pages (see content/exploreTrips.ts), where it had become a
 * repeated stock phrase instead of a single, memorable maxim.
 */
export function ExploreTripsSection() {
  return (
    <section id="explore-trips" className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mb-20">
        <div>
          <h2 className="mwg-display-xl max-w-[16ch]">Explore Trips</h2>
          <p className="mt-5 max-w-[28ch] font-display text-[24px] italic leading-snug text-[var(--mwg-ink)]">
            Ein Hotel. Viele Möglichkeiten.
          </p>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--mwg-ink-70)]">
            Der Ausgangspunkt bleibt derselbe, die Ziele wechseln täglich —
            ganz ohne festen Tagesplan. Ein Explore Trip ist Inspiration,
            kein Programm: eine Sammlung außergewöhnlicher Möglichkeiten
            statt einer Reihenfolge, die eingehalten werden müsste.
            <span className="text-[var(--mwg-ink)]"> Alles kann — nichts muss.</span>
          </p>
        </div>
        <Link
          href="/explore-trips"
          className="group flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
        >
          Alle Explore Trips
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-3">
        {exploreTrips.map((trip, i) => (
          <Reveal key={trip.slug} delayMs={i * 90}>
            <ExploreTripCard trip={trip} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
