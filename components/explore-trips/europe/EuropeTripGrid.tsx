"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EuropeTripCard } from "@/components/explore-trips/europe/EuropeTripCard";
import { europeFeaturedTrips, europeTripsCopy } from "@/content/europeEntry";

const DOTS = 3;

/** AP-ET001 V1.1 — featured Explore Trips as a horizontal row / carousel. */
export function EuropeTripGrid() {
  const scroller = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    if (max <= 4) {
      setPage(0);
      return;
    }
    setPage(Math.min(DOTS - 1, Math.round((el.scrollLeft / max) * (DOTS - 1))));
  }

  return (
    <section
      id="explore-trips"
      className="scroll-mt-[76px] bg-[var(--mwg-paper)] py-24 lg:py-36"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="mwg-eyebrow text-[var(--mwg-accent)]">
              {europeTripsCopy.eyebrow}
            </span>
            <h2 className="mwg-display-lg mt-3">{europeTripsCopy.heading}</h2>
          </div>
          <Link
            href="#explore-trips"
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
          >
            {europeTripsCopy.allLink}
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div
          ref={scroller}
          onScroll={onScroll}
          className="mt-12 flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory lg:mt-16 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {europeFeaturedTrips.map((trip) => (
            <div
              key={trip.slug}
              className="w-[min(82vw,340px)] shrink-0 snap-start lg:w-auto"
            >
              <EuropeTripCard trip={trip} />
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-2" aria-hidden="true">
          {Array.from({ length: DOTS }, (_, i) => (
            <span
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === page ? "w-8 bg-[var(--mwg-accent)]" : "w-5 bg-[var(--mwg-line)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
