import { Compass, Heart, Search, Train, type LucideIcon } from "lucide-react";
import { europeWhyCards } from "@/content/europeEntry";

const ICONS: Record<(typeof europeWhyCards)[number]["icon"], LucideIcon> = {
  compass: Compass,
  train: Train,
  heart: Heart,
  search: Search,
};

/** AP-ET001 — four value lines, no section heading, matching the mockup. */
export function EuropeWhy() {
  return (
    <section className="border-t border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:px-10">
        {europeWhyCards.map((card) => {
          const Icon = ICONS[card.icon];
          return (
            <div key={card.title} className="max-w-[36ch]">
              <Icon
                size={26}
                strokeWidth={1.35}
                className="text-[var(--mwg-accent)]"
                aria-hidden="true"
              />
              <h3 className="mt-4 font-display text-[18px] font-medium leading-snug">
                {card.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[var(--mwg-ink-70)]">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
