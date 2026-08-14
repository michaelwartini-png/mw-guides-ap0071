import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ExploreTripCard } from "@/components/explore-trips/ExploreTripCard";
import { exploreTrips } from "@/content/exploreTrips";
import type { ExploreTrip } from "@/types/exploreTrip";

const HOMEPAGE_TRIP_SLUGS = ["bodensee", "mailand-unlimited", "wien-bratislava"];

/**
 * Homepage Explore Trips gallery. AP-PP000.3: this is the start of the
 * journey — visually weighted above Ride Guides, with a primary CTA
 * into the Europe entry.
 */
export function ExploreTripsSection() {
  const featured = HOMEPAGE_TRIP_SLUGS.map((slug) =>
    exploreTrips.find((trip) => trip.slug === slug),
  ).filter((trip): trip is ExploreTrip => trip !== undefined);

  return (
    <section id="explore-trips" className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-40">
      <Reveal className="mb-14 flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end lg:mb-20">
        <div>
          <h2 className="mwg-display-xl max-w-[16ch]">Explore Trips</h2>
          <p className="mt-5 max-w-[28ch] font-display text-[24px] italic leading-snug text-[var(--mwg-ink)]">
            Hier beginnt deine Reise.
          </p>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--mwg-ink-70)]">
            Der Ausgangspunkt bleibt derselbe, die Ziele wechseln täglich —
            ganz ohne festen Tagesplan. Ein Explore Trip ist Inspiration,
            kein Programm: eine Sammlung außergewöhnlicher Möglichkeiten
            statt einer Reihenfolge, die eingehalten werden müsste.
            <span className="text-[var(--mwg-ink)]"> Alles kann — nichts muss.</span>
          </p>
        </div>
        <Button href="/explore-trips" variant="accent" className="shrink-0">
          Explore Trips entdecken
        </Button>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-3 sm:gap-6">
        {featured.map((trip, i) => (
          <Reveal key={trip.slug} delayMs={i * 90}>
            <ExploreTripCard trip={trip} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
