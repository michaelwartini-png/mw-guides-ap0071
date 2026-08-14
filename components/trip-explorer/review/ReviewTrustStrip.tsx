import { Compass, Leaf, Route, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICONS: LucideIcon[] = [Route, Compass, Leaf, Sparkles];

interface ReviewTrustStripProps {
  items: string[];
}

/** AP-ET004.7 — Compact trust row, same copy, less visual noise. */
export function ReviewTrustStrip({ items }: ReviewTrustStripProps) {
  return (
    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--mwg-line)] pt-4 text-[12px] text-[var(--mwg-ink-45)]">
      {items.map((item, index) => {
        const Icon = ICONS[index] ?? Sparkles;
        return (
          <li key={item} className="inline-flex items-center gap-1.5">
            <Icon size={13} strokeWidth={1.75} className="text-[var(--mwg-accent)]" />
            {item}
          </li>
        );
      })}
    </ul>
  );
}
