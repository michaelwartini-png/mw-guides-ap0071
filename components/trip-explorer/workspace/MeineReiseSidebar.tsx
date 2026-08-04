"use client";

import Image from "next/image";
import { ArrowDownUp, ArrowRight, Bookmark, GripVertical, Heart, Signpost, X } from "lucide-react";
import { useExplorerTrip } from "@/components/trip-explorer/workspace/ExplorerTripContext";

interface MeineReiseSidebarProps {
  totalHighlights: number;
}

/** AP-011 — Right column: selected highlights and progress. */
export function MeineReiseSidebar({ totalHighlights }: MeineReiseSidebarProps) {
  const { items, removeHighlight, toggleFavorite, reorderItems } = useExplorerTrip();
  const count = items.length;
  const progress = totalHighlights > 0 ? Math.min(100, Math.round((count / totalHighlights) * 100)) : 0;

  return (
    <aside className="flex flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <span className="font-mono text-[11px] font-medium text-[var(--mwg-accent)]">3</span>
          <h2 className="mt-1 font-display text-[18px] font-medium">Meine Reise</h2>
          <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">
            Deine ausgewählten Highlights.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[var(--mwg-ink)] px-3 py-1 text-[12px] font-medium text-white">
          {count} {count === 1 ? "Highlight" : "Highlights"}
        </span>
      </div>

      <div className="flex flex-1 flex-col rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 text-center">
            <Signpost size={28} className="text-[var(--mwg-ink-45)]" strokeWidth={1.25} />
            <p className="mt-4 text-[14px] text-[var(--mwg-ink-70)]">
              Noch keine Highlights ausgewählt. Entdecke Erlebnisse und füge sie hinzu.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--mwg-line)]">
            {items.map((item, index) => (
              <li key={item.slug} className="flex items-center gap-2 px-3 py-3">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => index > 0 && reorderItems(index, index - 1)}
                    disabled={index === 0}
                    className="text-[var(--mwg-ink-45)] hover:text-[var(--mwg-ink)] disabled:opacity-30"
                    aria-label="Nach oben"
                  >
                    <GripVertical size={14} />
                  </button>
                </div>
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                  <Image src={item.image} alt={item.imageAlt} fill className="object-cover" sizes="48px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{item.title}</p>
                  <p className="truncate text-[12px] text-[var(--mwg-stone)]">{item.location}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleFavorite(item.slug)}
                  className={`shrink-0 p-1 ${item.favorited ? "text-red-500" : "text-[var(--mwg-ink-45)]"}`}
                  aria-label="Favorit"
                >
                  <Heart size={14} fill={item.favorited ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={() => removeHighlight(item.slug)}
                  className="shrink-0 p-1 text-[var(--mwg-ink-45)] hover:text-[var(--mwg-ink)]"
                  aria-label="Entfernen"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {items.length > 1 && (
          <div className="border-t border-[var(--mwg-line)] px-4 py-3">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[13px] text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]"
            >
              <ArrowDownUp size={14} />
              Reihenfolge anpassen
            </button>
          </div>
        )}

        <div className="border-t border-[var(--mwg-line)] px-4 py-4">
          <p className="text-[12px] text-[var(--mwg-ink-70)]">
            Dein Fortschritt: {count} von vielen Möglichkeiten entdeckt.
          </p>
          <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-[var(--mwg-paper)]">
            <div
              className="h-full rounded-full bg-[var(--mwg-accent)] transition-all duration-500"
              style={{ width: `${Math.max(progress, count > 0 ? 8 : 0)}%` }}
            />
            <Signpost
              size={12}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--mwg-accent)]"
            />
          </div>
        </div>

        <div className="border-t border-[var(--mwg-line)] p-4">
          <button
            type="button"
            disabled
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--mwg-ink)] px-5 py-3.5 text-[14px] font-medium text-white opacity-60"
            title="Reiseplan folgt in Ebene 3"
          >
            Weiter: Reiseplan erstellen
            <ArrowRight size={16} />
          </button>
          <button
            type="button"
            disabled
            className="mt-3 flex w-full items-center justify-center gap-1.5 text-[12px] text-[var(--mwg-ink-45)]"
            title="Speichern folgt in einem späteren Arbeitspaket"
          >
            <Bookmark size={12} />
            oder später fortfahren und speichern
          </button>
        </div>
      </div>
    </aside>
  );
}
