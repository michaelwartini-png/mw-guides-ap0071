import type { ReactNode } from "react";
import type { ErlebnisprofilPracticalRow } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";
import { PracticalIcon } from "@/components/erlebnisprofil/PracticalIcon";

interface PracticalInfoSectionProps {
  practicalInfo: ErlebnisprofilPracticalRow[];
  headingMeta?: ReactNode;
}

export function PracticalInfoSection({ practicalInfo, headingMeta }: PracticalInfoSectionProps) {
  if (practicalInfo.length === 0) return null;

  return (
    <section className="mt-16">
      <ErlebnisprofilSectionHeading
        eyebrow="Gut zu wissen"
        title="Praktische Informationen"
        meta={headingMeta}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {practicalInfo.map((row) => (
          <article
            key={`${row.label}-${row.value.slice(0, 32)}`}
            className="flex gap-4 rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-5"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <PracticalIcon label={row.label} />
            </div>
            <div className="min-w-0">
              <h3 className="text-[14px] font-medium text-[var(--mwg-ink)]">{row.label}</h3>
              <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
                {row.value}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
