"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface InfoDisclosureProps {
  title: string;
  defaultOpen: boolean;
  collapsible: boolean;
  children: ReactNode;
}

/** AP-ET003 — collapsible info card. Practical info starts open; official starts closed. */
export function InfoDisclosure({
  title,
  defaultOpen,
  collapsible,
  children,
}: InfoDisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (!collapsible) {
    return (
      <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
        <h3 className="font-display text-[17px] font-medium">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    );
  }

  return (
    <details
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      className="group rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display text-[17px] font-medium [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown
          size={18}
          className={`shrink-0 text-[var(--mwg-ink-45)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}
