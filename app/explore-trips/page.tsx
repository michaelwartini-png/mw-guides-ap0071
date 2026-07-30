import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ExploreTripCard } from "@/components/explore-trips/ExploreTripCard";
import { UpcomingExploreTripCard } from "@/components/explore-trips/UpcomingExploreTripCard";
import { exploreTrips } from "@/content/exploreTrips";
import { upcomingExploreTrips } from "@/types/exploreTrip";

export const metadata: Metadata = {
  title: "Explore Trips",
  description:
    "Mehrtägige Reiseideen für außergewöhnliche Reisen entlang bemerkenswerter Verkehrswege.",
};

/**
 * Explore Trips — the second of exactly two MW Guides content worlds
 * (AP-002.2). No separate "Reiseideen"/"Magazin" layer exists; the three
 * real pieces below were migrated here unchanged.
 */
export default function ExploreTripsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1240px] px-6 pt-28 pb-16 lg:px-10 lg:pt-40">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Explore Trips</span>
          <h1 className="mwg-display-xl mt-5 max-w-[20ch]">
            The journey is the destination.
          </h1>
          <p className="mt-6 max-w-[60ch] text-[17px] leading-[1.7] text-[var(--mwg-ink-70)]">
            Mehrtägige Reiseideen für außergewöhnliche Reisen entlang
            bemerkenswerter Verkehrswege — komplette Reisekonzepte statt
            einzelner Strecken.
          </p>
        </section>

        <section className="mx-auto max-w-[1240px] px-6 pb-28 lg:px-10 lg:pb-40">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {exploreTrips.map((trip) => (
              <ExploreTripCard key={trip.slug} trip={trip} />
            ))}
            {upcomingExploreTrips.map((trip) => (
              <UpcomingExploreTripCard key={trip.title} trip={trip} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
