"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export interface ChapterItem {
  id: string;
  title: string;
  intro: string | readonly string[];
  legend?: boolean;
  graphic: ReactNode;
}

function ProductLegend() {
  return (
    <p
      className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] font-medium text-[var(--mwg-ink-70)]"
      aria-label="Kennzeichnung: Kostenlos, Premium, Optional"
    >
      <span className="inline-flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#0b4d3a]" aria-hidden="true" />
        Kostenlos
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span className="text-[#c9a24a]" aria-hidden="true">
          ★
        </span>
        Premium
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#7a97b0] text-[9px] leading-none text-white"
          aria-hidden="true"
        >
          +
        </span>
        Optional
      </span>
    </p>
  );
}

const ANIMATION_MS = 280;

/**
 * So funktioniert MW Guides V1.0 (eingefroren, 15.08.2026).
 * Exklusives Akkordeon: ein Kapitel offen, Kapitel 1 startet geöffnet.
 * Siehe docs/AP-G-so-funktioniert-v1.0.md — Änderungen nur als 1.1+.
 */
export function ChapterAccordion({ items }: { items: ChapterItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  function remasure() {
    window.dispatchEvent(new Event("resize"));
  }

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
    requestAnimationFrame(remasure);
    window.setTimeout(remasure, ANIMATION_MS);
  }

  return (
    <div className="flex flex-col gap-16 pt-12">
      {items.map((item) => {
        const open = openId === item.id;
        const panelId = `${item.id}-panel`;

        return (
          <section key={item.id} aria-labelledby={item.id}>
            <Reveal className="mx-auto max-w-[1240px] px-6 lg:px-10">
              <button
                type="button"
                className="group flex w-full items-start justify-between gap-8 text-left"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
              >
                <span className="min-w-0">
                  <h2 id={item.id} className="mwg-display-lg max-w-[22ch]">
                    {item.title}
                  </h2>
                  {(Array.isArray(item.intro) ? item.intro : [item.intro]).map((text) => (
                    <p
                      key={text}
                      className="mt-3 max-w-[54ch] text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]"
                    >
                      {text}
                    </p>
                  ))}
                  {item.legend ? <ProductLegend /> : null}
                </span>
                <ChevronRight
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className={`mt-2 shrink-0 text-[var(--mwg-ink-45)] transition-transform duration-300 ease-out group-hover:text-[var(--mwg-ink)] ${
                    open ? "rotate-90" : ""
                  }`}
                />
              </button>
            </Reveal>

            <div
              id={panelId}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{
                gridTemplateRows: open ? "1fr" : "0fr",
                transitionDuration: `${ANIMATION_MS}ms`,
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="mx-auto mt-6 max-w-[1440px] px-0 sm:px-6 lg:px-10">
                  {item.graphic}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
