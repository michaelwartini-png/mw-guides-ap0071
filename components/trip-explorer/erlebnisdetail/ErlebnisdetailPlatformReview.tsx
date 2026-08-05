import { Star } from "lucide-react";
import type { ErlebnisdetailReview } from "@/types/erlebnisdetail";

const PLACEHOLDER = "—";

function PlatformLogo({ source }: { source: ErlebnisdetailReview["source"] | "placeholder" }) {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-0.5 text-[13px] font-medium leading-none">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    );
  }

  if (source === "tripadvisor") {
    return (
      <span className="text-[13px] font-semibold leading-none text-[#00AF87]">Tripadvisor</span>
    );
  }

  return (
    <span className="text-[13px] font-medium leading-none text-[var(--mwg-ink-45)]">
      {PLACEHOLDER}
    </span>
  );
}

function FiveStarDisplay({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));

  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, clamped - i));
        return (
          <span key={i} className="relative inline-block h-[14px] w-[14px]">
            <Star size={14} className="text-[var(--mwg-line)]" strokeWidth={1.5} />
            {fill > 0 && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star size={14} className="fill-amber-400 text-amber-400" strokeWidth={0} />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

interface ErlebnisdetailPlatformReviewProps {
  source: ErlebnisdetailReview["source"];
  review?: ErlebnisdetailReview;
  prominent?: boolean;
}

export function ErlebnisdetailPlatformReview({
  source,
  review,
  prominent = false,
}: ErlebnisdetailPlatformReviewProps) {
  const ratingText = review
    ? review.rating.toFixed(1).replace(".", ",")
    : PLACEHOLDER;
  const reviewCountText = review?.reviewCount
    ? `${review.reviewCount.toLocaleString("de-DE")} Bewertungen`
    : PLACEHOLDER;

  return (
    <div
      className={`rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] ${
        prominent ? "min-w-[148px] px-4 py-3" : "px-6 py-4"
      }`}
    >
      <PlatformLogo source={review ? source : "placeholder"} />
      <div className={`mt-1.5 ${prominent ? "flex flex-col gap-1" : ""}`}>
        {review ? (
          <FiveStarDisplay rating={review.rating} />
        ) : (
          <p className="text-[12px] text-[var(--mwg-ink-45)]">{PLACEHOLDER}</p>
        )}
        <p
          className={`font-display font-medium leading-none ${
            prominent ? "text-[20px]" : "mt-1 text-[24px]"
          }`}
        >
          {ratingText}
          {review && <span className="text-[14px] text-[var(--mwg-ink-45)]"> / 5</span>}
        </p>
        <p className="text-[12px] text-[var(--mwg-ink-70)]">{reviewCountText}</p>
      </div>
    </div>
  );
}

export function ErlebnisdetailPlatformReviews({
  reviews,
  prominent = false,
}: {
  reviews: ErlebnisdetailReview[];
  prominent?: boolean;
}) {
  const google = reviews.find((r) => r.source === "google");
  const tripadvisor = reviews.find((r) => r.source === "tripadvisor");

  return (
    <div className={`flex flex-wrap ${prominent ? "gap-3" : "gap-4"}`}>
      <ErlebnisdetailPlatformReview source="google" review={google} prominent={prominent} />
      <ErlebnisdetailPlatformReview source="tripadvisor" review={tripadvisor} prominent={prominent} />
    </div>
  );
}
