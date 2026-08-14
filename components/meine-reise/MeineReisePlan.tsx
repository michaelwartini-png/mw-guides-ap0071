"use client";

import { useState } from "react";
import { ArrowRight, Ticket } from "lucide-react";
import type { MeineReiseDashboard, MeineReisePlanDay } from "@/types/meineReise";

interface MeineReisePlanProps {
  dashboard: MeineReiseDashboard;
}

/** AP-MR001 — itinerary is the dashboard centrepiece: wider, more air, stronger timeline. */
export function MeineReisePlan({ dashboard }: MeineReisePlanProps) {
  const [selectedDay, setSelectedDay] = useState(dashboard.plan[0]?.day ?? 1);
  const [showAll, setShowAll] = useState(false);
  const days: MeineReisePlanDay[] = showAll
    ? dashboard.plan
    : dashboard.plan.filter((day) => day.day === selectedDay);

  return (
    <section
      id="reiseplan"
      className="scroll-mt-24 flex h-full flex-col rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-6 lg:p-7"
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-[20px] font-medium">Reiseplan</h2>
        <span className="text-[12px] text-[var(--mwg-ink-45)]">{dashboard.overview.days} Tage geplant</span>
      </div>

      <div className="mt-5 flex gap-2" role="tablist" aria-label="Reisetage">
        {dashboard.plan.map((day) => {
          const active = !showAll && day.day === selectedDay;
          return (
            <button
              key={day.day}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setShowAll(false);
                setSelectedDay(day.day);
              }}
              className={`rounded-full px-3.5 py-1.5 text-[12px] transition-colors ${
                active
                  ? "bg-[var(--mwg-accent)] text-white"
                  : "bg-[var(--mwg-paper)] text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]"
              }`}
            >
              {day.tabLabel}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-8">
        {days.map((day) => (
          <div key={day.day}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-accent)]">
              {day.title} · {day.dateLabel}
            </p>
            <ol className="relative mt-5 ml-2 border-l-2 border-[var(--mwg-accent)]/35 pl-7">
              {day.stops.map((stop) => (
                <li key={`${day.day}-${stop.time}-${stop.title}`} className="relative pb-7 last:pb-0">
                  <span
                    className="absolute -left-[35px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--mwg-accent)] bg-[var(--mwg-paper-raised)]"
                    aria-hidden="true"
                  />
                  <p className="text-[15px] leading-snug">
                    <span className="mr-2.5 font-mono text-[12px] text-[var(--mwg-ink-45)]">{stop.time}</span>
                    <span className="font-medium">{stop.title}</span>
                  </p>
                  {stop.meta ? <p className="mt-1 text-[13px] text-[var(--mwg-ink-45)]">{stop.meta}</p> : null}
                  {stop.ticketHref ? (
                    <a
                      href={stop.ticketHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-accent)]/30 px-3 py-1.5 text-[12px] font-medium text-[var(--mwg-accent)] transition-colors hover:border-[var(--mwg-accent)] hover:bg-[var(--mwg-accent)]/8"
                    >
                      <Ticket size={13} strokeWidth={1.75} />
                      {stop.ticketLabel ?? "Ticket öffnen"}
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setShowAll(true)}
        className="mt-5 inline-flex items-center gap-1 text-[13px] text-[var(--mwg-accent)] hover:underline"
      >
        Alle Tage anzeigen
        <ArrowRight size={13} />
      </button>
    </section>
  );
}
