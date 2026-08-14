import type { ExplorerReview } from "@/types/explorerReview";
import { ReviewRouteSketch } from "@/components/trip-explorer/review/ReviewRouteSketch";

interface ReviewRouteMapProps {
  review: ExplorerReview;
}

/** AP-ET004 — Schematic route overview for the assembled trip. */
export function ReviewRouteMap({ review }: ReviewRouteMapProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <div className="flex items-baseline justify-between gap-3 px-5 pt-5">
        <h2 className="font-display text-[18px] font-medium">Deine Route im Überblick</h2>
        <span className="text-[12px] text-[var(--mwg-ink-45)]">{review.waypoints.length} Stationen</span>
      </div>
      <div className="relative px-2 pb-2 pt-1">
        <ReviewRouteSketch review={review} />
      </div>
    </section>
  );
}
