import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { RideGuideCard } from "@/components/explore-trips/landing/RideGuideCard";
import type {
  ExploreTripLandingCta,
  ExploreTripLandingRideGuide,
} from "@/types/exploreTrip";

interface RideGuideSectionProps {
  heading: string;
  rideGuides: ExploreTripLandingRideGuide[];
  viewAll?: ExploreTripLandingCta;
}

/** AP-010.2 — Section 5: horizontal Ride Guide cards with header link. */
export function RideGuideSection({ heading, rideGuides, viewAll }: RideGuideSectionProps) {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
      <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-[720px]">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Ride Guides</span>
          <h2 className="mwg-display-lg mt-4 max-w-[28ch]">{heading}</h2>
        </div>
        {viewAll && (
          <Link
            href={viewAll.href}
            className="group inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
          >
            {viewAll.label}
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        )}
      </Reveal>

      <div className="mt-12 flex gap-5 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden">
        {rideGuides.map((guide, i) => (
          <Reveal key={guide.slug} delayMs={i * 60} className="shrink-0">
            <RideGuideCard guide={guide} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
