import { Headphones, MapPin, Star } from "lucide-react";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import { PlatformReviewsStrip } from "@/components/erlebnisprofil/PlatformReviewsStrip";
import { RideGuideCta, type RideGuideCtaConfig } from "@/components/erlebnisprofil/RideGuideCta";
import { parseRating } from "@/components/erlebnisprofil/utils";
import {
  isLiveRideGuide,
  RIDE_GUIDE_EXPLAINER_BODY,
  RIDE_GUIDE_EXPLAINER_HEADING,
} from "@/content/rideGuideCopy";

interface ScoreBarSectionProps {
  mwgScore: string;
  scoreCategories: ErlebnisprofilProduct["scoreCategories"];
  reviews: ErlebnisprofilProduct["reviews"];
  mapInfo: ErlebnisprofilProduct["mapInfo"];
  rideGuide?: RideGuideCtaConfig;
}

export function ScoreBarSection({
  mwgScore,
  scoreCategories,
  reviews,
  mapInfo,
  rideGuide,
}: ScoreBarSectionProps) {
  const scoreValue = parseRating(mwgScore);
  const showMapButton = Boolean(mapInfo.kartenlink || mapInfo.adresse || mapInfo.gps);
  const showRideGuide = isLiveRideGuide(rideGuide);

  if (!mwgScore && reviews.length === 0 && scoreCategories.length === 0) {
    return null;
  }

  return (
    <section className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-6 lg:flex-row lg:items-start lg:justify-between lg:px-10">
        <div className="flex flex-wrap items-center gap-6">
          {mwgScore ? (
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--mwg-ink-45)]">
                MW Guides Score
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-[32px] font-medium leading-none">
                  {mwgScore.replace(".", ",")}
                </span>
                <span className="text-[14px] text-[var(--mwg-ink-45)]">/ 10</span>
                {scoreValue !== null ? (
                  <div className="ml-2 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
              <p className="mt-1.5 text-[12px] leading-snug text-[var(--mwg-ink-70)]">
                Redaktionelle Gesamtbewertung
              </p>
            </div>
          ) : null}

          {reviews.length > 0 ? (
            <>
              <div className="hidden h-10 w-px bg-[var(--mwg-line)] sm:block" />
              <PlatformReviewsStrip reviews={reviews} prominent />
            </>
          ) : null}

          {scoreCategories.length > 0 ? (
            <>
              <div className="hidden h-10 w-px bg-[var(--mwg-line)] lg:block" />
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {scoreCategories.map((category) => (
                  <li key={category.label} className="text-[13px]">
                    <span className="text-[var(--mwg-ink-70)]">{category.label}</span>{" "}
                    <span className="font-medium">{category.value.replace(".", ",")}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          {showRideGuide ? (
            <div className="flex items-center gap-1.5 text-[13px] text-[var(--mwg-accent)]">
              <Headphones size={15} />
              Ride Guide verfügbar
            </div>
          ) : null}

          {showMapButton ? (
            <a
              href="#erlebnis-karte"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-4 py-2 text-[13px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
            >
              <MapPin size={14} />
              Karte öffnen
            </a>
          ) : null}
        </div>

        {showRideGuide && rideGuide ? (
          <div className="max-w-[340px]">
            <p className="font-display text-[16px] font-medium leading-snug">
              {RIDE_GUIDE_EXPLAINER_HEADING}
            </p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
              {RIDE_GUIDE_EXPLAINER_BODY}
            </p>
            <div className="mt-3">
              <RideGuideCta config={rideGuide} variant="scoreBar" />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
