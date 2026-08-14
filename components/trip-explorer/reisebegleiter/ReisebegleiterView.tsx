import Link from "next/link";
import type { ExplorerReview } from "@/types/explorerReview";
import type { PremiumPreview, TripRideGuideProduct } from "@/types/reisebegleiter";
import { ExplorerProgressStepper } from "@/components/trip-explorer/workspace/ExplorerProgressStepper";
import { ReviewSidebar } from "@/components/trip-explorer/review/ReviewSidebar";
import { ReisebegleiterWorkspace } from "@/components/trip-explorer/reisebegleiter/ReisebegleiterWorkspace";

interface ReisebegleiterViewProps {
  review: ExplorerReview;
  rideGuides: TripRideGuideProduct[];
  preview: PremiumPreview;
  heroImage: string;
  heroImageAlt: string;
}

/** AP-ET005 — Final Trip Explorer step: choose digital travel companions. */
export function ReisebegleiterView({
  review,
  rideGuides,
  preview,
  heroImage,
  heroImageAlt,
}: ReisebegleiterViewProps) {
  const tripSlug = review.tripSlug;

  return (
    <div className="mx-auto max-w-[1440px] px-6 py-6 lg:px-8 lg:py-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(220px,240px)_minmax(0,1fr)] lg:items-start xl:gap-8">
        <ReviewSidebar review={review} currentStep={5} />

        <div className="min-w-0">
          <header className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--mwg-line)] pb-5">
            <div>
              <ExplorerProgressStepper currentStep={5} tripSlug={tripSlug} className="block" />
              <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-accent)]">
                Schritt 5 von 5 · Reisebegleiter
              </p>
              <h1 className="mt-2 font-display text-[28px] font-medium leading-tight lg:text-[32px]">
                Dein persönliches Reisepaket ist fertig.
              </h1>
              <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                Deine Reise ist geplant. Jetzt entscheidest du, welche digitalen Reisebegleiter du nutzen möchtest.
              </p>
            </div>
            <Link
              href={`/explore-trips/${tripSlug}/explorer/ueberpruefen`}
              className="inline-flex items-center rounded-full border border-[var(--mwg-line)] px-4 py-2.5 text-[13px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
            >
              Zurück zur Überprüfung
            </Link>
          </header>

          <ReisebegleiterWorkspace
            review={review}
            rideGuides={rideGuides}
            preview={preview}
            heroImage={heroImage}
            heroImageAlt={heroImageAlt}
          />
        </div>
      </div>
    </div>
  );
}
