import {
  BedDouble,
  Globe2,
  Luggage,
  Network,
  Sparkles,
  Star,
  TrainFront,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type {
  ExploreTripLandingUsp,
  ExploreTripLandingUspIcon,
} from "@/types/exploreTrip";

interface USPBarProps {
  items: ExploreTripLandingUsp[];
  /** When true, skip the hero overlap offset (e.g. Trip Explorer footer). */
  embedded?: boolean;
}

const USP_ICON_MAP: Record<ExploreTripLandingUspIcon, LucideIcon> = {
  bed: BedDouble,
  globe: Globe2,
  transport: TrainFront,
  star: Star,
  nodes: Network,
  suitcase: Luggage,
  sparkles: Sparkles,
};

/** AP-010.2 — Section 2: five USP columns, fixed height and typography. */
export function USPBar({ items, embedded = false }: USPBarProps) {
  return (
    <section
      className={`relative z-10 pb-4 lg:pb-6 ${embedded ? "pt-4" : "-mt-14 pb-4 lg:-mt-16 lg:pb-6"}`}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <div className="overflow-x-auto rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] shadow-[0_12px_48px_-16px_rgba(26,26,24,0.18)] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max divide-x divide-[var(--mwg-line)] sm:min-w-0 sm:grid sm:grid-cols-5">
            {items.map((item, i) => {
              const Icon = USP_ICON_MAP[item.icon];
              return (
                <Reveal
                  key={`${item.title}-${i}`}
                  delayMs={i * 50}
                  className="flex w-[220px] shrink-0 flex-col items-center px-5 py-8 text-center sm:w-auto sm:px-4 sm:py-9 lg:px-6"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--mwg-accent)]/25 text-[var(--mwg-accent)]">
                    <Icon size={24} strokeWidth={1.35} />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-medium leading-snug lg:text-[18px]">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
                    {item.description}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
