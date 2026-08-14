"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ReviewBudgetLine } from "@/types/explorerReview";

interface ReviewPriceDetailsProps {
  explanation: string;
  lines: ReviewBudgetLine[];
}

/** AP-ET004.4 — Estimated on-site costs, clearly not a booking. */
export function ReviewPriceDetails({ explanation, lines }: ReviewPriceDetailsProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-3 border-t border-[var(--mwg-line)] pt-3">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-1 text-[13px] font-medium text-[var(--mwg-accent)] hover:underline"
        aria-expanded={open}
      >
        Preisdetails anzeigen
        <ChevronDown size={14} className={open ? "rotate-180" : ""} />
      </button>
      {open ? (
        <div className="mt-2 text-[12px] leading-relaxed text-[var(--mwg-ink-70)]">
          <p>{explanation}</p>
          {lines.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {lines.map((line) => (
                <li key={line.label} className="flex justify-between gap-3">
                  <span>{line.label}</span>
                  <span>ca. {line.amount} €</span>
                </li>
              ))}
            </ul>
          ) : null}
          <p className="mt-2 text-[var(--mwg-ink-45)]">Keine Buchung über MW Guides.</p>
        </div>
      ) : null}
    </div>
  );
}
