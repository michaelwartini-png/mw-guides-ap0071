import { Compass, Map, MousePointerClick, Route, Sparkles } from "lucide-react";

const STEPS = [
  { icon: Compass, label: "Entdecken" },
  { icon: MousePointerClick, label: "Auswählen" },
  { icon: Map, label: "Planen" },
  { icon: Route, label: "Reisen" },
  { icon: Sparkles, label: "Erleben" },
];

/** AP-011 — "So funktioniert's" mini flow from mockup 1. */
export function ExplorerHowItWorks() {
  return (
    <div className="mt-10 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] px-5 py-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--mwg-ink-45)]">
        So funktioniert&apos;s
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--mwg-accent)]/30 text-[var(--mwg-accent)]">
                  <Icon size={18} strokeWidth={1.5} />
                </span>
                <span className="text-[11px] text-[var(--mwg-ink-70)]">{step.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="hidden text-[var(--mwg-ink-45)] sm:inline" aria-hidden="true">
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
