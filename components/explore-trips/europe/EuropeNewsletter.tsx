"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Send } from "lucide-react";
import { europeNewsletterCopy } from "@/content/europeEntry";

/** AP-ET001 — newsletter bar. Prototype capture only, no backend. */
export function EuropeNewsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <section className="border-t border-[var(--mwg-line)] bg-[color-mix(in_srgb,var(--mwg-paper)_72%,var(--mwg-ink)_6%)]">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-9">
        <p className="flex max-w-[54ch] items-start gap-3 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
          <Send
            size={18}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-[var(--mwg-accent)]"
            aria-hidden="true"
          />
          {sent ? europeNewsletterCopy.thanks : europeNewsletterCopy.text}
        </p>

        {!sent && (
          <form onSubmit={onSubmit} className="flex w-full max-w-[420px] gap-0 sm:w-auto">
            <label className="sr-only" htmlFor="europe-newsletter-email">
              E-Mail-Adresse
            </label>
            <input
              id="europe-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={europeNewsletterCopy.placeholder}
              className="h-11 min-w-0 flex-1 rounded-l-md border border-[var(--mwg-line)] bg-white px-4 text-[14px] text-[var(--mwg-ink)] outline-none placeholder:text-[var(--mwg-ink-45)]"
            />
            <button
              type="submit"
              aria-label="Eintragen"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-r-md bg-[var(--mwg-accent)] text-white transition-colors hover:bg-[color-mix(in_srgb,var(--mwg-accent)_88%,black)]"
            >
              <ArrowRight size={18} strokeWidth={1.75} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
