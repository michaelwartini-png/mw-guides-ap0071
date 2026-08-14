import { getExplorerReviewByTripSlug } from "@/content/explorerReview";
import { ReviewRouteSketch } from "@/components/trip-explorer/review/ReviewRouteSketch";
import type { MeineReiseDashboard } from "@/types/meineReise";

interface MeineReiseUeberblickProps {
  dashboard: MeineReiseDashboard;
}

/** AP-MR001 — map view reused from ET-04. Stats only, no extra quick links. */
export function MeineReiseUeberblick({ dashboard }: MeineReiseUeberblickProps) {
  const review = getExplorerReviewByTripSlug(dashboard.tripSlug);
  const stats = [
    { label: `${dashboard.overview.days} Tage` },
    { label: `${dashboard.overview.highlights} Highlights` },
    { label: dashboard.overview.budgetLabel },
    { label: dashboard.overview.styleLabel },
  ];

  return (
    <section
      id="ueberblick"
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]"
    >
      <div className="px-5 pt-5">
        <h2 className="font-display text-[18px] font-medium">Deine Reise auf einen Blick</h2>
      </div>
      {review ? (
        <div className="px-2 pb-1 pt-1">
          <ReviewRouteSketch review={review} />
        </div>
      ) : null}
      <dl className="grid gap-px border-t border-[var(--mwg-line)] bg-[var(--mwg-line)] sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-[var(--mwg-paper-raised)] px-4 py-3">
            <dt className="sr-only">Kennzahl</dt>
            <dd className="text-[13px] font-medium">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
