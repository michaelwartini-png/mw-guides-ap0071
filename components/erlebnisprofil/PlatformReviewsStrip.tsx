import { Star } from "lucide-react";
import type { ErlebnisprofilReview } from "@/components/admin/products/erlebnisprofilProduct";
import { PlatformLogo } from "@/components/erlebnisprofil/PlatformLogo";
import { parseRating } from "@/components/erlebnisprofil/utils";

interface PlatformReviewCardProps {
  source: ErlebnisprofilReview["source"];
  review?: ErlebnisprofilReview;
  prominent?: boolean;
}

function PlatformReviewCard({ source, review, prominent = false }: PlatformReviewCardProps) {
  const rating = review ? parseRating(review.rating) : null;
  const ratingText = review ? review.rating.replace(".", ",") : "—";
  const reviewCountText = review?.count
    ? `${review.count} Bewertungen`
    : "—";

  return (
    <div
      className={`rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] ${
        prominent ? "min-w-[148px] px-4 py-3" : "min-w-[180px] px-6 py-5"
      }`}
    >
      <PlatformLogo source={source} />
      <div className={`mt-1.5 ${prominent ? "flex flex-col gap-1" : ""}`}>
        {rating !== null ? (
          <div className="flex gap-0.5" aria-hidden>
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
        ) : (
          <p className="text-[12px] text-[var(--mwg-ink-45)]">—</p>
        )}
        <p
          className={`font-display font-medium leading-none ${
            prominent ? "text-[20px]" : "mt-1 text-[24px]"
          }`}
        >
          {ratingText}
          {review ? <span className="text-[14px] text-[var(--mwg-ink-45)]"> / 5</span> : null}
        </p>
        <p className="text-[12px] text-[var(--mwg-ink-70)]">{reviewCountText}</p>
      </div>
    </div>
  );
}

interface PlatformReviewsStripProps {
  reviews: ErlebnisprofilReview[];
  prominent?: boolean;
}

export function PlatformReviewsStrip({ reviews, prominent = false }: PlatformReviewsStripProps) {
  const google = reviews.find((review) => review.source === "google");
  const tripadvisor = reviews.find((review) => review.source === "tripadvisor");

  return (
    <div className={`flex flex-wrap ${prominent ? "gap-3" : "gap-4"}`}>
      <PlatformReviewCard source="google" review={google} prominent={prominent} />
      <PlatformReviewCard source="tripadvisor" review={tripadvisor} prominent={prominent} />
    </div>
  );
}
