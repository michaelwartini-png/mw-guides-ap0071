import {
  Calendar,
  Headphones,
  Languages,
  Layers,
  MapPin,
  Train,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { ExploreTripPlatformUsp } from "@/types/exploreTrip";

const ICON_MAP: Record<ExploreTripPlatformUsp["icon"], LucideIcon> = {
  users: Users,
  calendar: Calendar,
  train: Train,
  layers: Layers,
  languages: Languages,
  "map-pin": MapPin,
  headphones: Headphones,
};

interface BenefitsSectionProps {
  items: ExploreTripPlatformUsp[];
}

/** AP-010.2 — Section 6: "Warum MW Guides?" — six equal benefit columns. */
export function BenefitsSection({ items }: BenefitsSectionProps) {
  return (
    <section className="border-y border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="text-center">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Warum MW Guides?</span>
          <h2 className="mwg-display-lg mx-auto mt-4 max-w-[24ch]">
            Warum mit MW Guides reisen?
          </h2>
        </Reveal>

        <div className="mt-14 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-8 sm:min-w-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-6 xl:gap-6">
            {items.map((item, i) => {
              const Icon = ICON_MAP[item.icon];
              return (
                <Reveal
                  key={item.title}
                  delayMs={i * 50}
                  className="flex w-[200px] shrink-0 flex-col items-center px-2 text-center sm:w-auto"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--mwg-accent)]/25 text-[var(--mwg-accent)]">
                    <Icon size={22} strokeWidth={1.35} />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-medium leading-snug lg:text-[18px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
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
