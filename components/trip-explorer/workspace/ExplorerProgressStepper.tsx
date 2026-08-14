"use client";

import Link from "next/link";
import { Check } from "lucide-react";

const STEPS: Array<{
  id: number;
  label: string;
  path?: (slug: string) => string;
}> = [
  { id: 1, label: "Entdecken", path: (slug: string) => `/explore-trips/${slug}` },
  { id: 2, label: "Auswählen", path: (slug: string) => `/explore-trips/${slug}/explorer` },
  { id: 3, label: "Plan erstellen" },
  { id: 4, label: "Überprüfen", path: (slug: string) => `/explore-trips/${slug}/explorer/ueberpruefen` },
  { id: 5, label: "Reisebegleiter", path: (slug: string) => `/explore-trips/${slug}/explorer/reisebegleiter` },
];

interface ExplorerProgressStepperProps {
  currentStep?: number;
  tripSlug?: string;
  className?: string;
}

/** AP-011 / AP-ET004 — Five-step progress indicator. */
export function ExplorerProgressStepper({
  currentStep = 2,
  tripSlug,
  className = "hidden xl:block",
}: ExplorerProgressStepperProps) {
  return (
    <nav aria-label="Fortschritt" className={className}>
      <ol className="flex items-center gap-2">
        {STEPS.map((step) => {
          const done = step.id < currentStep;
          const active = step.id === currentStep;
          const href =
            tripSlug && step.path && !active && (step.id < currentStep || step.id === 4)
              ? step.path(tripSlug)
              : undefined;

          return (
            <li key={step.id} className="flex items-center gap-2">
              <StepMark done={done} active={active} id={step.id} />
              {href && !active ? (
                <Link
                  href={href}
                  className="whitespace-nowrap text-[12px] text-[var(--mwg-ink-45)] transition-colors hover:text-[var(--mwg-ink)]"
                >
                  {step.label}
                </Link>
              ) : (
                <span
                  className={`whitespace-nowrap text-[12px] ${
                    active ? "font-medium text-[var(--mwg-ink)]" : "text-[var(--mwg-ink-45)]"
                  }`}
                  aria-current={active ? "step" : undefined}
                >
                  {step.label}
                </span>
              )}
              {step.id < STEPS.length && (
                <span className="mx-1 h-px w-4 bg-[var(--mwg-line)]" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepMark({ done, active, id }: { done: boolean; active: boolean; id: number }) {
  return (
    <span
      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-medium ${
        done
          ? "bg-[var(--mwg-accent)] text-white"
          : active
            ? "bg-[var(--mwg-ink)] text-white"
            : "border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] text-[var(--mwg-ink-45)]"
      }`}
    >
      {done ? <Check size={14} strokeWidth={2.5} /> : id}
    </span>
  );
}
