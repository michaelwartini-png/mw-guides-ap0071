"use client";

import { Check } from "lucide-react";

const STEPS = [
  { id: 1, label: "Entdecken" },
  { id: 2, label: "Auswählen" },
  { id: 3, label: "Plan erstellen" },
  { id: 4, label: "Überprüfen" },
  { id: 5, label: "Fertig" },
];

interface ExplorerProgressStepperProps {
  currentStep?: number;
}

/** AP-011 — Five-step progress indicator from mockup 1. */
export function ExplorerProgressStepper({ currentStep = 2 }: ExplorerProgressStepperProps) {
  return (
    <nav aria-label="Fortschritt" className="hidden xl:block">
      <ol className="flex items-center gap-2">
        {STEPS.map((step) => {
          const done = step.id < currentStep;
          const active = step.id === currentStep;

          return (
            <li key={step.id} className="flex items-center gap-2">
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-medium ${
                  done
                    ? "bg-[var(--mwg-accent)] text-white"
                    : active
                      ? "bg-[var(--mwg-ink)] text-white"
                      : "border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] text-[var(--mwg-ink-45)]"
                }`}
              >
                {done ? <Check size={14} strokeWidth={2.5} /> : step.id}
              </span>
              <span
                className={`whitespace-nowrap text-[12px] ${
                  active ? "font-medium text-[var(--mwg-ink)]" : "text-[var(--mwg-ink-45)]"
                }`}
              >
                {step.label}
              </span>
              {step.id < STEPS.length && (
                <span
                  className="mx-1 h-px w-4 bg-[var(--mwg-line)] last:hidden"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
