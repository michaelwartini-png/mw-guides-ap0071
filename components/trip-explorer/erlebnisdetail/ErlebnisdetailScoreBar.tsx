import { ArrowRight, Headphones, Star } from "lucide-react";
import type { Erlebnisdetail } from "@/types/erlebnisdetail";

interface ErlebnisdetailScoreBarProps {
  detail: Erlebnisdetail;
}

export function ErlebnisdetailScoreBar({ detail }: ErlebnisdetailScoreBarProps) {
  return (
    <section className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-6 px-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--mwg-ink-45)]">
              MW Guides Score
            </p>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-display text-[32px] font-medium leading-none">
                {detail.score.toFixed(1).replace(".", ",")}
              </span>
              <span className="text-[14px] text-[var(--mwg-ink-45)]">/ 10</span>
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
            </div>
          </div>

          <div className="hidden h-10 w-px bg-[var(--mwg-line)] sm:block" />

          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {detail.scoreCategories.map((cat) => (
              <li key={cat.label} className="text-[13px]">
                <span className="text-[var(--mwg-ink-70)]">{cat.label}</span>{" "}
                <span className="font-medium">{cat.value.toFixed(1).replace(".", ",")}</span>
              </li>
            ))}
          </ul>

          {detail.rideGuide && (
            <div className="flex items-center gap-1.5 text-[13px] text-[var(--mwg-accent)]">
              <Headphones size={15} />
              Ride Guide verfügbar
            </div>
          )}
        </div>

        {detail.rideGuide && (
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--mwg-ink)] px-6 py-3 text-[14px] font-medium text-white opacity-80"
            title="Checkout folgt in Ebene 4"
          >
            {detail.rideGuide.title} | {detail.rideGuide.price}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </section>
  );
}
