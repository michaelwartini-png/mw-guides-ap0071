import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IllustrationMap } from "@/components/explore-trips/landing/IllustrationMap";
import type {
  ExploreTripConceptIllustration,
  ExploreTripLandingCta,
} from "@/types/exploreTrip";

interface ConceptSectionProps {
  heading: string;
  intro: string;
  explainerHeading?: string;
  explainer?: string;
  conceptLink?: ExploreTripLandingCta;
  conceptIllustration: ExploreTripConceptIllustration;
}

/** AP-010.2 / AP-ET002 — Section 3: concept copy (left) + illustration map (right). */
export function ConceptSection({
  heading,
  intro,
  explainerHeading,
  explainer,
  conceptLink,
  conceptIllustration,
}: ConceptSectionProps) {
  return (
    <section id="konzept" className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <Reveal>
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Das Konzept</span>
          <h2 className="mwg-display-lg mt-4 max-w-[20ch]">{heading}</h2>
          <p className="mt-6 max-w-[54ch] text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
            {intro}
          </p>
          {explainerHeading && explainer && (
            <div className="mt-8 max-w-[54ch]">
              <h3 className="font-display text-[22px] font-medium leading-snug tracking-[-0.015em] text-[var(--mwg-ink)]">
                {explainerHeading}
              </h3>
              <p className="mt-3 text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
                {explainer}
              </p>
            </div>
          )}
          {conceptLink && (
            <Button href={conceptLink.href} variant="ghost-dark" className="mt-8 px-7 py-3.5">
              {conceptLink.label}
              <ChevronRight size={17} className="ml-0.5" />
            </Button>
          )}
        </Reveal>
        <IllustrationMap {...conceptIllustration} />
      </div>
    </section>
  );
}
