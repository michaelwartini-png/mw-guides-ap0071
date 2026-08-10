import type { ReactNode } from "react";
import type { ErlebnisprofilFeature } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";
import { cn } from "@/lib/cn";

interface HighlightsSectionProps {
  features: ErlebnisprofilFeature[];
  className?: string;
  headingMeta?: ReactNode;
}

export function HighlightsSection({ features, className, headingMeta }: HighlightsSectionProps) {
  if (features.length === 0) return null;

  return (
    <section className={cn(className)}>
      <ErlebnisprofilSectionHeading
        eyebrow="Highlights"
        title="Das macht dieses Erlebnis besonders"
        meta={headingMeta}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => (
          <article
            key={`${feature.label}-${index}`}
            className="group relative overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-gradient-to-br from-[var(--mwg-paper)] to-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(26,26,24,0.25)]"
          >
            {feature.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={feature.image.src}
                alt={feature.image.alt}
                className="aspect-[16/10] w-full object-cover"
              />
            ) : null}
            <div className="relative p-6">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/8 transition-transform group-hover:scale-110" />
              <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12 text-[28px]">
                {feature.icon}
              </div>
              <h3 className="relative mt-5 font-display text-[20px] font-medium leading-snug">
                {feature.label}
              </h3>
              {feature.description ? (
                <p className="relative mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
                  {feature.description}
                </p>
              ) : null}
              <p className="relative mt-2 text-[13px] text-[var(--mwg-ink-45)]">
                Highlight {index + 1}
                {feature.image ? <span className="ml-2 text-accent">· Galerie</span> : null}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
