import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ErlebnisprofilSectionHeadingProps {
  eyebrow: string;
  title: string;
  meta?: ReactNode;
  onDark?: boolean;
  className?: string;
}

export function ErlebnisprofilSectionHeading({
  eyebrow,
  title,
  meta,
  onDark = false,
  className,
}: ErlebnisprofilSectionHeadingProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p
          className={cn(
            "mwg-eyebrow",
            onDark ? "text-white/55" : "text-[var(--mwg-ink-45)]",
          )}
        >
          {eyebrow}
        </p>
        {meta}
      </div>
      <h2
        className={cn(
          "mt-2 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium",
          onDark ? "text-white" : "text-[var(--mwg-ink)]",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
