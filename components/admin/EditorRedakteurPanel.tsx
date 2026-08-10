"use client";

import {
  EDITOR_RX_CONFIG,
  PRODUCT_SECTION_SOURCES,
  type EditorRxSectionId,
} from "@/components/admin/redakteurExperienceData";
import { cn } from "@/lib/cn";

interface EditorRedakteurPanelProps {
  section: EditorRxSectionId;
  className?: string;
}

export function EditorRedakteurPanel({ section, className }: EditorRedakteurPanelProps) {
  const config = EDITOR_RX_CONFIG[section];
  const activeProducts = config.usedIn.filter((entry) => entry.status === "active");
  const roadmapProducts = config.usedIn.filter((entry) => entry.status === "roadmap");

  return (
    <div
      className={cn(
        "mb-6 space-y-4 rounded-xl border border-accent/20 bg-gradient-to-br from-accent/[0.06] to-transparent px-4 py-4 sm:px-5",
        className,
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
        Redakteur · Datenfluss
      </p>

      {config.productMappings && config.productMappings.length > 0 ? (
        <div>
          <p className="text-[13px] font-medium text-ink">Erlebnisprofil verwendet</p>
          <ul className="mt-2 space-y-1.5">
            {config.productMappings.map((mapping) => (
              <li
                key={`${mapping.field}-${mapping.source}`}
                className="flex flex-wrap items-baseline gap-x-2 text-[13px] text-[var(--mwg-ink-70)]"
              >
                <span className="text-ink">{mapping.field}</span>
                <span className="text-stone" aria-hidden="true">
                  →
                </span>
                <span className="font-medium text-accent">{mapping.source}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div>
        <p className="text-[13px] font-medium text-ink">Verwendet in</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {activeProducts.map((entry) => (
            <li
              key={entry.id}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 px-2.5 py-1 text-[12px] font-medium text-accent"
            >
              <span aria-hidden="true">✓</span>
              {entry.label}
            </li>
          ))}
          {roadmapProducts.map((entry) => (
            <li
              key={entry.id}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-2.5 py-1 text-[12px] text-stone"
            >
              <span aria-hidden="true">⏳</span>
              {entry.label}
            </li>
          ))}
        </ul>
      </div>

      {config.note ? (
        <p className="border-t border-accent/10 pt-3 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
          {config.note}
        </p>
      ) : null}
    </div>
  );
}

export function ProductSourceLabel({
  source,
  onDark = false,
}: {
  source: string;
  onDark?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em]",
        onDark ? "text-white/75" : "text-accent/90",
      )}
    >
      <span aria-hidden="true">←</span>
      {source}
    </span>
  );
}

export function ProductHerkunftOverview() {
  return (
    <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] px-4 py-4 sm:px-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mwg-ink-45)]">
        Herkunft · Erlebnisprofil
      </p>
      <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">
        Jede Sektion entsteht automatisch aus dem Erlebnisbaustein.
      </p>
      <dl className="mt-3 grid gap-2 sm:grid-cols-2">
        {PRODUCT_SECTION_SOURCES.map((entry) => (
          <div
            key={entry.section}
            className="flex items-baseline justify-between gap-3 border-b border-[var(--mwg-line)]/60 pb-2 text-[13px]"
          >
            <dt className="text-ink">{entry.section}</dt>
            <dd>
              <ProductSourceLabel source={entry.source} />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}