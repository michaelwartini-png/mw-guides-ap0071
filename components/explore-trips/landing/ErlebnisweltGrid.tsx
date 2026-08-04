import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ErlebnisweltCard } from "@/components/explore-trips/landing/ErlebnisweltCard";
import type { ExploreTripLandingCta } from "@/types/exploreTrip";
import type { TripExplorerErlebniswelt } from "@/types/tripExplorer";

interface ErlebnisweltGridProps {
  welten: TripExplorerErlebniswelt[];
  eyebrow?: string;
  heading: string;
  viewAll?: ExploreTripLandingCta;
  cardHref?: string;
}

/** AP-010.1B — Editorial Erlebniswelten grid: 4×2 desktop, horizontal scroll on mobile. */
export function ErlebnisweltGrid({
  welten,
  eyebrow = "Erlebniswelten",
  heading,
  viewAll,
  cardHref,
}: ErlebnisweltGridProps) {
  return (
    <section id="erlebniswelten" className="bg-[var(--mwg-paper)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="mwg-eyebrow text-[var(--mwg-accent)]">{eyebrow}</span>
            <h2 className="mwg-display-lg mt-4 max-w-[22ch]">{heading}</h2>
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

        <div className="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4 lg:gap-6 [&::-webkit-scrollbar]:hidden">
          {welten.map((welt, i) => (
            <Reveal key={welt.slug} delayMs={i * 50} className="sm:contents">
              <ErlebnisweltCard welt={welt} href={cardHref} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
