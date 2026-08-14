"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { MeineReiseDashboard } from "@/types/meineReise";

interface MeineReiseAufgabenProps {
  dashboard: MeineReiseDashboard;
}

/** AP-MR001 — only tasks with preparation value. Weather watching is omitted. */
export function MeineReiseAufgaben({ dashboard }: MeineReiseAufgabenProps) {
  const [done, setDone] = useState<Record<string, boolean>>({});

  return (
    <section
      id="aufgaben"
      className="scroll-mt-24 flex h-full flex-col rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5"
    >
      <h2 className="font-display text-[18px] font-medium">Offene Aufgaben</h2>
      <ul className="mt-4 flex flex-1 flex-col divide-y divide-[var(--mwg-line)]">
        {dashboard.tasks.map((task) => {
          const checked = Boolean(done[task.id]);
          return (
            <li key={task.id} className="py-3 first:pt-0">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => setDone((current) => ({ ...current, [task.id]: !checked }))}
                  className="mt-1 h-4 w-4 shrink-0 accent-[var(--mwg-accent)]"
                />
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={`text-[14px] font-medium ${checked ? "text-[var(--mwg-ink-45)] line-through" : ""}`}>
                      {task.title}
                    </span>
                    {task.important ? (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-medium tracking-wide text-red-700 uppercase">
                        Wichtig
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-[12px] text-[var(--mwg-ink-45)]">{task.detail}</span>
                  {task.dueLabel ? (
                    <span className="mt-1 block text-[11px] text-[var(--mwg-ink-45)]">{task.dueLabel}</span>
                  ) : null}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
      <a
        href="#aufgaben"
        className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--mwg-accent)] hover:underline"
      >
        Alle Aufgaben anzeigen
        <ArrowRight size={13} />
      </a>
    </section>
  );
}
