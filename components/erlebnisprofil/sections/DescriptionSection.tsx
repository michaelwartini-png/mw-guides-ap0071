import type { ReactNode } from "react";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";

interface DescriptionSectionProps {
  description: string;
  scoreBegruendung: string;
  headingMeta?: ReactNode;
}

export function DescriptionSection({
  description,
  scoreBegruendung,
  headingMeta,
}: DescriptionSectionProps) {
  if (!description) return null;

  return (
    <section className="max-w-[760px]">
      <ErlebnisprofilSectionHeading
        eyebrow="Das Erlebnis"
        title={scoreBegruendung ? "Warum es sich lohnt" : "Im Überblick"}
        meta={headingMeta}
      />
      <div className="mt-5 space-y-4 text-[16px] leading-[1.8] text-[var(--mwg-ink-70)]">
        {scoreBegruendung ? (
          <p className="text-[17px] leading-[1.75] text-[var(--mwg-ink)]">{scoreBegruendung}</p>
        ) : null}
        {description
          .split("\n\n")
          .filter((paragraph) => paragraph.trim() && paragraph.trim() !== scoreBegruendung.trim())
          .map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
      </div>
    </section>
  );
}
