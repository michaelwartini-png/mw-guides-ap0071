import Image from "next/image";
import Link from "next/link";
import { Headphones } from "lucide-react";
import type { ExplorerReview } from "@/types/explorerReview";

interface ReviewHighlightGridProps {
  review: ExplorerReview;
  tripSlug: string;
}

/** AP-ET004 — Selected highlights in the assembled trip. */
export function ReviewHighlightGrid({ review, tripSlug }: ReviewHighlightGridProps) {
  return (
    <section>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-[18px] font-medium">Deine Highlights ({review.highlights.length})</h2>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {review.highlights.map((highlight) => (
          <li key={highlight.slug}>
            <Link
              href={`/explore-trips/${tripSlug}/explorer/erlebnis/${highlight.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]"
            >
              <span className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={highlight.image}
                  alt={highlight.imageAlt}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </span>
              <span className="flex items-start justify-between gap-2 px-3 py-2.5">
                <span>
                  <span className="block text-[13px] font-medium leading-snug">{highlight.title}</span>
                  <span className="mt-0.5 block text-[11px] text-[var(--mwg-stone)]">{highlight.location}</span>
                </span>
                {highlight.rideGuide ? (
                  <Headphones
                    size={14}
                    className="mt-0.5 shrink-0 text-[var(--mwg-accent)]"
                    strokeWidth={1.75}
                    aria-label="Ride Guide"
                  />
                ) : null}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
