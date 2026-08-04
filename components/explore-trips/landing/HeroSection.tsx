import Image from "next/image";
import { Bookmark, ChevronRight, Globe } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { ExploreTrip, ExploreTripLandingCta } from "@/types/exploreTrip";

interface HeroSectionProps {
  trip: ExploreTrip;
  languageHint?: string;
  primaryCta?: ExploreTripLandingCta;
  secondaryCta?: ExploreTripLandingCta;
}

const DEFAULT_PRIMARY_CTA: ExploreTripLandingCta = {
  href: "#konzept",
  label: "Trip entdecken",
};

/** AP-010.2 — Section 1: Hero panorama, badge, title, CTAs. */
export function HeroSection({
  trip,
  languageHint,
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <div className="relative flex min-h-[92svh] items-end overflow-hidden lg:min-h-[88vh]">
      <Image
        src={trip.heroImage}
        alt={trip.heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 pb-28 pt-32 lg:px-10 lg:pb-36 lg:pt-40">
        <Reveal className="mr-auto max-w-[720px]">
          <span className="inline-flex items-center rounded-md bg-[var(--mwg-accent)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white">
            Explore Trip
          </span>

          <h1 className="mwg-display-hero mt-6 max-w-[14ch] text-white">{trip.title}</h1>

          {trip.subtitle && (
            <p className="mt-5 max-w-[44ch] text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-[1.45] text-white/90">
              {trip.subtitle}
            </p>
          )}

          {languageHint && (
            <p className="mt-5 flex items-center gap-2 text-[14px] text-white/70">
              <Globe size={15} strokeWidth={1.5} className="shrink-0 text-white/55" />
              {languageHint}
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button href={primaryCta.href} variant="accent" className="px-8 py-3.5 text-[15px]">
              {primaryCta.label}
              <ChevronRight size={17} className="ml-0.5" />
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="ghost-light"
                className="px-8 py-3.5 text-[15px]"
              >
                <Bookmark size={16} strokeWidth={1.75} />
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
