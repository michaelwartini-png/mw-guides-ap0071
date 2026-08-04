"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ExplorerHighlight } from "@/types/explorerHighlight";
import { HighlightCard } from "@/components/trip-explorer/workspace/HighlightCard";
import { ExplorerHowItWorks } from "@/components/trip-explorer/workspace/ExplorerHowItWorks";

const INITIAL_VISIBLE = 6;

interface HighlightGridProps {
  highlights: ExplorerHighlight[];
  tripSlug: string;
  weltTitle: string;
}

/** AP-011 — Middle column: highlights grid for selected Erlebniswelt. */
export function HighlightGrid({ highlights, tripSlug, weltTitle }: HighlightGridProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const visible = highlights.slice(0, visibleCount);
  const hasMore = visibleCount < highlights.length;

  return (
    <section className="flex flex-col">
      <div className="mb-5">
        <span className="font-mono text-[11px] font-medium text-[var(--mwg-accent)]">2</span>
        <h2 className="mt-1 font-display text-[18px] font-medium">Highlights</h2>
        <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">
          Entdecke Highlights in der gewählten Erlebniswelt.
        </p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--mwg-ink-45)]">
          {weltTitle}
        </p>
      </div>

      {highlights.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--mwg-line)] px-6 py-16 text-center">
          <p className="text-[15px] text-[var(--mwg-ink-70)]">
            Für diese Erlebniswelt sind noch keine Highlights hinterlegt.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((highlight) => (
              <HighlightCard key={highlight.slug} highlight={highlight} tripSlug={tripSlug} />
            ))}
          </div>

          {hasMore && (
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] py-3.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink-45)] hover:text-[var(--mwg-ink)]"
            >
              Mehr Highlights anzeigen
              <ChevronDown size={16} />
            </button>
          )}
        </>
      )}

      <ExplorerHowItWorks />
    </section>
  );
}
