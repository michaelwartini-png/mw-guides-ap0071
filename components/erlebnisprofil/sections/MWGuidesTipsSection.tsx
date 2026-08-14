import type { ReactNode } from "react";
import { Lightbulb } from "lucide-react";
import type { ErlebnisprofilTipp } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";

interface MWGuidesTipsSectionProps {
  tipps: ErlebnisprofilTipp[];
  headingMeta?: ReactNode;
}

export function MWGuidesTipsSection({ tipps, headingMeta }: MWGuidesTipsSectionProps) {
  if (tipps.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <ErlebnisprofilSectionHeading
          eyebrow="MW Guides Tipps"
          title="MW-Guides-Empfehlungen"
          meta={headingMeta}
        />
        <Lightbulb size={28} className="hidden text-accent/40 sm:block" strokeWidth={1.5} />
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {tipps.map((tipp, index) => (
          <article
            key={`${tipp.ueberschrift}-${index}`}
            className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] shadow-[0_12px_30px_-20px_rgba(26,26,24,0.15)]"
          >
            {tipp.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tipp.image.src}
                alt={tipp.image.alt}
                className="aspect-[16/9] w-full object-cover"
              />
            ) : null}
            <div className="flex items-start gap-3 p-6">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                <Lightbulb size={18} strokeWidth={1.5} />
              </span>
              <div>
                <h3 className="font-display text-[18px] font-medium">{tipp.ueberschrift}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                  {tipp.beschreibung}
                </p>
                {tipp.image ? (
                  <p className="mt-2 text-[12px] text-accent">Bild aus Galerie</p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
