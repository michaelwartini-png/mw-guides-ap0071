import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { ExplorerReview } from "@/types/explorerReview";
import { ExplorerProgressStepper } from "@/components/trip-explorer/workspace/ExplorerProgressStepper";
import { ReviewSidebar } from "@/components/trip-explorer/review/ReviewSidebar";
import { ReviewRouteMap } from "@/components/trip-explorer/review/ReviewRouteMap";
import { ReviewItinerary } from "@/components/trip-explorer/review/ReviewItinerary";
import { ReviewHighlightGrid } from "@/components/trip-explorer/review/ReviewHighlightGrid";
import { ReviewSummaryColumn } from "@/components/trip-explorer/review/ReviewSummaryColumn";
import { ReviewTrustStrip } from "@/components/trip-explorer/review/ReviewTrustStrip";
import { SavePlanButton } from "@/components/trip-explorer/review/SavePlanButton";

interface TripReviewViewProps {
  review: ExplorerReview;
}

/** AP-ET004 — Review step of the Trip Explorer. Architecture unchanged; polish only. */
export function TripReviewView({ review }: TripReviewViewProps) {
  const tripSlug = review.tripSlug;
  const explorerHref = `/explore-trips/${tripSlug}/explorer`;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6 lg:px-8 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(220px,240px)_minmax(0,1fr)] lg:items-start xl:gap-8">
        <ReviewSidebar review={review} />

        <div className="min-w-0">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--mwg-line)] pb-5">
            <div>
              <ExplorerProgressStepper currentStep={4} tripSlug={tripSlug} className="block" />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-accent)]">
                Schritt 4 von 5 · Überprüfung
              </p>
              <h1 className="mt-2 font-display text-[28px] font-medium leading-tight lg:text-[32px]">
                4 Überprüfen – Deine Reise im Überblick
              </h1>
              <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                Deine Reise ist zusammengestellt. Prüfe die Angaben und bestätige sie — es erfolgt
                keine Buchung.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={explorerHref}
                className="inline-flex items-center rounded-full border border-[var(--mwg-accent)] px-4 py-2.5 text-[13px] font-medium text-[var(--mwg-accent)] transition-colors hover:bg-[var(--mwg-accent)] hover:text-white"
              >
                Änderungen vornehmen
              </Link>
              <Link
                href={`/explore-trips/${tripSlug}/explorer/reisebegleiter`}
                className="inline-flex items-center rounded-full bg-[var(--mwg-accent)] px-4 py-2.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
              >
                Reise bestätigen
              </Link>
            </div>
          </header>

          <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)_minmax(260px,0.82fr)]">
            <div className="flex min-w-0 flex-col gap-5">
              <ReviewRouteMap review={review} />
              <ReviewHighlightGrid review={review} tripSlug={tripSlug} />
            </div>

            <ReviewItinerary review={review} tripSlug={tripSlug} />

            <ReviewSummaryColumn review={review} tripSlug={tripSlug} />
          </div>

          <footer className="mt-8 flex flex-col gap-4">
            <ReviewTrustStrip items={review.trustItems} />
            <div className="flex flex-wrap items-center gap-3">
              <SavePlanButton />
              <button
                type="button"
                disabled
                className="inline-flex items-center gap-1.5 px-2 py-2 text-[12px] text-[var(--mwg-ink-45)]"
                title="Folgt in einem späteren Schritt"
              >
                <Sparkles size={13} strokeWidth={1.5} />
                Route optimieren
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
