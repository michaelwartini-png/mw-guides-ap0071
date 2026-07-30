import type { UpcomingExploreTrip } from "@/types/exploreTrip";

interface UpcomingExploreTripCardProps {
  trip: UpcomingExploreTrip;
}

/**
 * Deliberately plain and clearly labeled — no image, no fabricated
 * teaser text — so a roadmap entry is never mistaken for a real,
 * published trip. See README "Offene Punkte".
 */
export function UpcomingExploreTripCard({ trip }: UpcomingExploreTripCardProps) {
  return (
    <div className="flex aspect-[4/3] flex-col justify-end rounded-sm border border-dashed border-[var(--mwg-line)] p-6 sm:p-7">
      <span className="mwg-eyebrow text-[var(--mwg-ink-45)]">In Konzeption</span>
      <h3 className="mt-2 font-display text-[19px] font-medium leading-snug text-[var(--mwg-ink-45)]">
        {trip.title}
      </h3>
    </div>
  );
}
