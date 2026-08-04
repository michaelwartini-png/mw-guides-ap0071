"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Info, Plus } from "lucide-react";
import type { ExplorerHighlight } from "@/types/explorerHighlight";
import { useExplorerTrip } from "@/components/trip-explorer/workspace/ExplorerTripContext";

interface HighlightCardProps {
  highlight: ExplorerHighlight;
  tripSlug: string;
}

/** AP-011 — Highlight card for the middle column grid. */
export function HighlightCard({ highlight, tripSlug }: HighlightCardProps) {
  const { addHighlight, isSelected, toggleFavorite } = useExplorerTrip();
  const selected = isSelected(highlight.slug);
  const detailHref = `/explore-trips/${tripSlug}/explorer/erlebnis/${highlight.slug}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <Link href={detailHref} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={highlight.image}
          alt={highlight.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!selected) addHighlight(highlight);
            toggleFavorite(highlight.slug);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[var(--mwg-ink-70)] shadow-sm transition-colors hover:text-[var(--mwg-accent)]"
          aria-label="Merken"
        >
          <Heart size={16} strokeWidth={1.75} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={detailHref} className="flex-1">
          <h3 className="font-display text-[17px] font-medium leading-snug">{highlight.title}</h3>
          <p className="mt-0.5 text-[13px] text-[var(--mwg-stone)]">{highlight.location}</p>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
            {highlight.description}
          </p>
        </Link>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => addHighlight(highlight)}
            disabled={selected}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
              selected
                ? "cursor-default bg-[var(--mwg-paper)] text-[var(--mwg-ink-45)]"
                : "bg-[var(--mwg-paper)] text-[var(--mwg-ink)] hover:bg-[var(--mwg-accent)] hover:text-white"
            }`}
          >
            {selected ? "Hinzugefügt" : "Hinzufügen"}
            {!selected && <Plus size={14} />}
          </button>
          <Link
            href={detailHref}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--mwg-line)] text-[var(--mwg-ink-45)] transition-colors hover:border-[var(--mwg-accent)] hover:text-[var(--mwg-accent)]"
            aria-label="Details ansehen"
          >
            <Info size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}
