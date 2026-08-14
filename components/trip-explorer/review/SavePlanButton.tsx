"use client";

import { useState } from "react";
import { Bookmark, Check } from "lucide-react";

/** AP-ET004.6 — Secondary action: persist the assembled plan in this session. */
export function SavePlanButton() {
  const [saved, setSaved] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setSaved(true)}
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-4 py-2 text-[13px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
    >
      {saved ? <Check size={14} /> : <Bookmark size={14} />}
      {saved ? "Plan gespeichert" : "Plan speichern"}
    </button>
  );
}
