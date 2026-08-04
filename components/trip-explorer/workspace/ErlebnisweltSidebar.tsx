"use client";

import {
  Building2,
  Compass,
  Headphones,
  Leaf,
  Ship,
  Sparkles,
  TrainFront,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import type { TripExplorerErlebniswelt } from "@/types/tripExplorer";

const WELT_ICONS: Record<string, LucideIcon> = {
  staedte: Building2,
  natur: Leaf,
  mobilitaet: TrainFront,
  kulinarik: UtensilsCrossed,
  familie: Users,
  aktiv: Compass,
  "besondere-erlebnisse": Sparkles,
  "ride-guides": Headphones,
  schifffahrt: Ship,
};

interface ErlebnisweltSidebarProps {
  welten: TripExplorerErlebniswelt[];
  selectedSlug: string;
  onSelect: (slug: string) => void;
}

/** AP-011 — Left column: Erlebniswelten filter list. */
export function ErlebnisweltSidebar({ welten, selectedSlug, onSelect }: ErlebnisweltSidebarProps) {
  return (
    <aside className="flex flex-col">
      <div className="mb-4">
        <span className="font-mono text-[11px] font-medium text-[var(--mwg-accent)]">1</span>
        <h2 className="mt-1 font-display text-[18px] font-medium">Erlebniswelten</h2>
        <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">Wähle eine Erlebniswelt.</p>
      </div>

      <ul className="flex flex-col gap-2">
        {welten.map((welt) => {
          const Icon = WELT_ICONS[welt.slug] ?? Sparkles;
          const active = welt.slug === selectedSlug;
          const label = welt.explorerTitle ?? welt.title;

          return (
            <li key={welt.slug}>
              <button
                type="button"
                onClick={() => onSelect(welt.slug)}
                className={`group flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
                  active
                    ? "border-[var(--mwg-ink)] bg-[var(--mwg-ink)] text-white shadow-[0_8px_24px_-8px_rgba(26,26,24,0.35)]"
                    : "border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] hover:border-[var(--mwg-ink-45)]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-[var(--mwg-paper)] text-[var(--mwg-accent)]"
                  }`}
                >
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-medium leading-snug">{label}</span>
                  <span
                    className={`mt-0.5 block text-[12px] leading-relaxed ${
                      active ? "text-white/75" : "text-[var(--mwg-ink-70)]"
                    }`}
                  >
                    {welt.description.split("—")[0]?.trim() ?? welt.description}
                  </span>
                </span>
                <span
                  className={`mt-1 shrink-0 text-[var(--mwg-ink-45)] transition-transform group-hover:translate-x-0.5 ${
                    active ? "text-white/60" : ""
                  }`}
                  aria-hidden="true"
                >
                  ›
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
