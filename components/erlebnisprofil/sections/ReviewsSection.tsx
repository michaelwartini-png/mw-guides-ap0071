import type { ReactNode } from "react";
import { Star } from "lucide-react";
import type { ErlebnisprofilReview } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";
import { PlatformLogo } from "@/components/erlebnisprofil/PlatformLogo";
import { parseRating } from "@/components/erlebnisprofil/utils";

interface ReviewsSectionProps {
  mwgScore: string;
  reviews: ErlebnisprofilReview[];
  headingMeta?: ReactNode;
}

export function ReviewsSection({ mwgScore, reviews, headingMeta }: ReviewsSectionProps) {
  if (!mwgScore && reviews.length === 0) return null;

  return (
    <section className="mt-16">
      <ErlebnisprofilSectionHeading
        eyebrow="Bewertungen"
        title="Was Gäste und MW Guides sagen"
        meta={headingMeta}
      />
      <div className="mt-8 flex flex-wrap gap-4">
        {mwgScore ? (
          <div className="min-w-[180px] rounded-2xl border border-[var(--mwg-line)] bg-gradient-to-br from-accent/8 to-white px-6 py-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mwg-ink-45)]">
              MW Guides Score
            </p>
            <p className="mt-2 font-display text-[42px] font-medium leading-none text-accent">
              {mwgScore.replace(".", ",")}
            </p>
            <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">von 10</p>
          </div>
        ) : null}
        {reviews.map((review) => {
          const rating = parseRating(review.rating);
          return (
            <div
              key={review.source}
              className="min-w-[180px] rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-6 py-5"
            >
              <PlatformLogo source={review.source} />
              <p className="mt-3 font-display text-[36px] font-medium leading-none">
                {review.rating.replace(".", ",")}
                <span className="text-[16px] text-[var(--mwg-ink-45)]"> / 5</span>
              </p>
              {rating !== null ? (
                <div className="mt-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-[var(--mwg-line)]"
                      }
                      strokeWidth={i < Math.round(rating) ? 0 : 1.5}
                    />
                  ))}
                </div>
              ) : null}
              {review.count ? (
                <p className="mt-2 text-[13px] text-[var(--mwg-ink-70)]">{review.count} Bewertungen</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
