import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TourTile } from "@/components/tours/TourTile";
import { Reveal } from "@/components/ui/Reveal";
import { tours } from "@/content/tours";

/**
 * Homepage Ride Guides. AP-PP000.3: visually quieter than Explore Trips —
 * they are building blocks inside a trip, not a parallel main product.
 */
export function PopularTours() {
  const [featured, ...rest] = tours;

  return (
    <section id="touren" className="mx-auto max-w-[1240px] px-6 py-20 lg:px-10 lg:py-28">
      <Reveal className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
        <div>
          <span className="mwg-eyebrow text-[var(--mwg-ink-45)]">Innerhalb eines Explore Trips</span>
          <h2 className="mwg-display-lg mt-4 max-w-[16ch]">Ride Guides</h2>
          <p className="mt-4 max-w-[50ch] text-[16px] leading-[1.65] text-[var(--mwg-ink-70)]">
            GPS-geführte Audiotouren als Bausteine — nicht das eigentliche
            Reiseprodukt. Sie gehören zu einem Explore Trip, sobald du sie
            unterwegs brauchen kannst.
          </p>
        </div>
        <Link
          href="/touren"
          className="group flex shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-[var(--mwg-ink-45)] transition-colors hover:text-[var(--mwg-ink)]"
        >
          Alle Ride Guides
          <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>

      <div className="grid gap-3 lg:grid-cols-2">
        <Reveal>
          <TourTile tour={featured} large />
        </Reveal>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1 lg:h-full lg:grid-rows-3">
          {rest.map((tour, i) => (
            <Reveal key={tour.slug} delayMs={(i + 1) * 90} className="lg:h-full">
              <TourTile tour={tour} fill />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
