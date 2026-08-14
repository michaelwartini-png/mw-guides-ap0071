import { ArrowRight, Check, Circle } from "lucide-react";
import type { ExplorerReview } from "@/types/explorerReview";

const SIDEBAR_STEPS = [
  { id: 1, label: "Entdecken" },
  { id: 2, label: "Erlebnisbausteine auswählen" },
  { id: 3, label: "Reise planen" },
  { id: 4, label: "Reise überprüfen" },
  { id: 5, label: "Reisebegleiter auswählen" },
] as const;

interface ReviewSidebarProps {
  review: ExplorerReview;
  currentStep?: 4 | 5;
}

/** AP-ET004.1 / AP-ET005 — Left sidebar in review and companion-selection mode. */
export function ReviewSidebar({ review, currentStep = 4 }: ReviewSidebarProps) {
  const duration = `${review.days} Tage · ${review.nights} ${review.nights === 1 ? "Nacht" : "Nächte"}`;
  const highlightCount = review.highlights.length;
  const transport = review.transport.join(" · ");
  const budget = `ca. ${review.budgetPerPerson} € pro Person`;
  const progressPercent = currentStep >= 5 ? 100 : review.progressPercent;

  return (
    <aside className="flex flex-col rounded-2xl bg-[var(--mwg-ink)] px-5 py-6 text-[var(--mwg-paper)] lg:sticky lg:top-[92px] lg:min-h-[calc(100vh-120px)]">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Explore Trip</p>
        <p className="mt-2 font-display text-[22px] font-medium leading-snug">{review.tripTitle}</p>
      </div>

      <section className="mt-8 border-t border-white/10 pt-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Fortschritt</h2>
        <ol className="mt-4 flex flex-col gap-2.5">
          {SIDEBAR_STEPS.map((step) => {
            const done = step.id < currentStep;
            const active = step.id === currentStep;
            return (
              <li
                key={step.id}
                className={`flex items-start gap-2.5 text-[13px] leading-snug ${
                  active ? "font-medium text-white" : done ? "text-white/70" : "text-white/35"
                }`}
                aria-current={active ? "step" : undefined}
              >
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                  {done ? (
                    <Check size={14} strokeWidth={2.5} className="text-[var(--mwg-accent)]" />
                  ) : active ? (
                    <ArrowRight size={14} strokeWidth={2.5} className="text-[var(--mwg-accent)]" />
                  ) : (
                    <Circle size={12} strokeWidth={1.75} />
                  )}
                </span>
                {step.label}
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8 border-t border-white/10 pt-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Deine Reise</h2>
        <ul className="mt-4 space-y-2.5 text-[13px] leading-snug text-white/80">
          <li>📅 {duration}</li>
          <li>
            📍 {highlightCount} {highlightCount === 1 ? "Highlight" : "Highlights"}
          </li>
          <li>🚆 {transport}</li>
          <li>💶 {budget}</li>
        </ul>
      </section>

      <section className="mt-auto border-t border-white/10 pt-6">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Status</h2>
        <div className="mt-4 flex items-center gap-4">
          <ProgressRing value={progressPercent} />
          <p className="text-[13px] font-medium text-white">
            {currentStep >= 5 ? "100 % geschafft" : `${progressPercent} % abgeschlossen`}
          </p>
        </div>
        {currentStep >= 5 ? (
          <>
            <p className="mt-4 text-[13px] leading-relaxed text-white/70">
              Dein persönliches Reisepaket ist fertig.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              Wähle jetzt deine digitalen Reisebegleiter.
            </p>
          </>
        ) : (
          <>
            <p className="mt-4 text-[13px] leading-relaxed text-white/70">
              Du überprüfst jetzt deine Reise.
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              Im nächsten Schritt stellst du deinen persönlichen digitalen Reisebegleiter zusammen.
            </p>
          </>
        )}
      </section>
    </aside>
  );
}

function ProgressRing({ value }: { value: number }) {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(100, Math.max(0, value)) / 100);

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true" className="shrink-0">
      <circle cx="24" cy="24" r={radius} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
      <circle
        cx="24"
        cy="24"
        r={radius}
        fill="none"
        stroke="var(--mwg-accent)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 24 24)"
      />
    </svg>
  );
}
