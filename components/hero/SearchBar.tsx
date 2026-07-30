"use client";

import { useState } from "react";
import { Search } from "lucide-react";

/**
 * Placeholder search field. AP-001.1 scope: visual/UX polish only —
 * no search logic wired up yet (unchanged from AP-000.1).
 */
export function SearchBar() {
  const [focused, setFocused] = useState(false);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-9 flex max-w-[440px] items-center gap-2 rounded-full bg-[var(--mwg-paper-raised)] p-1.5 pl-5 shadow-[0_20px_45px_-15px_rgba(0,0,0,0.55)] ring-1 ring-black/5 transition-shadow duration-300"
      style={
        focused
          ? { boxShadow: "0 20px 45px -15px rgba(0,0,0,0.55), 0 0 0 2px var(--mwg-accent)" }
          : undefined
      }
    >
      <Search size={17} className="shrink-0 text-[var(--mwg-ink-45)]" />
      <input
        type="text"
        placeholder="Wohin geht deine nächste Tour?"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 bg-transparent py-2.5 text-[14px] outline-none placeholder:text-[var(--mwg-ink-45)]"
      />
      <button
        type="submit"
        className="shrink-0 rounded-full bg-[var(--mwg-ink)] px-5 py-2.5 text-[13.5px] font-medium text-[var(--mwg-paper)] transition-transform duration-200 hover:scale-[1.03]"
      >
        Suchen
      </button>
    </form>
  );
}
