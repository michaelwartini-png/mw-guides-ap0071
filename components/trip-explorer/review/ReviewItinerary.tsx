import Link from "next/link";
import { BedDouble, Plus } from "lucide-react";
import type { ExplorerReview, ReviewItineraryStop } from "@/types/explorerReview";

interface ReviewItineraryProps {
  review: ExplorerReview;
  tripSlug: string;
}

/** AP-ET004 — Day-by-day review of the assembled plan. */
export function ReviewItinerary({ review, tripSlug }: ReviewItineraryProps) {
  return (
    <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
      <h2 className="font-display text-[18px] font-medium">Dein Reiseverlauf</h2>
      <div className="mt-5 flex flex-col gap-6">
        {review.itinerary.map((day) => (
          <div key={day.day}>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--mwg-accent)]">
              {day.title}
            </p>
            <ol className="relative mt-3 border-l border-[var(--mwg-line)] pl-4">
              {day.stops.map((stop, index) => (
                <li key={`${day.day}-${index}`} className="relative pb-3 last:pb-0">
                  <span
                    className={`absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full ${
                      stop.kind === "stay" ? "bg-[var(--mwg-ink-45)]" : "bg-[var(--mwg-accent)]"
                    }`}
                    aria-hidden="true"
                  />
                  <StopRow stop={stop} />
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <Link
        href={`/explore-trips/${tripSlug}/explorer`}
        className="mt-4 inline-flex items-center gap-1 text-[13px] text-[var(--mwg-ink-45)] transition-colors hover:text-[var(--mwg-ink)]"
      >
        <Plus size={14} />
        Weitere Tage oder Highlights hinzufügen
      </Link>
    </section>
  );
}

function StopRow({ stop }: { stop: ReviewItineraryStop }) {
  if (stop.kind === "stay") {
    return (
      <p className="flex items-center gap-1.5 text-[13px] text-[var(--mwg-ink-70)]">
        <BedDouble size={14} strokeWidth={1.75} />
        {stop.title}
      </p>
    );
  }

  return (
    <div>
      <p className="text-[13px] font-medium leading-snug">
        {stop.time ? <span className="mr-2 font-mono text-[12px] text-[var(--mwg-ink-45)]">{stop.time}</span> : null}
        {stop.title}
      </p>
      {stop.meta ? <p className="mt-0.5 text-[12px] text-[var(--mwg-ink-45)]">{stop.meta}</p> : null}
    </div>
  );
}
