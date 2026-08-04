"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { ExplorerProgressStepper } from "@/components/trip-explorer/workspace/ExplorerProgressStepper";

interface ExplorerPageHeaderProps {
  tripSlug: string;
  backHref?: string;
  backLabel?: string;
}

/** AP-011 — Page header with title, stepper and back navigation. */
export function ExplorerPageHeader({
  tripSlug,
  backHref,
  backLabel,
}: ExplorerPageHeaderProps) {
  const defaultBackHref = `/explore-trips/${tripSlug}`;
  const defaultBackLabel = "Zurück zu Explore Trip";

  return (
    <div className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <div className="mx-auto max-w-[1400px] px-6 py-6 lg:px-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={backHref ?? defaultBackHref}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-4 py-2 text-[13px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
              >
                <ArrowLeft size={14} />
                {backLabel ?? defaultBackLabel}
              </Link>
              <LanguageSwitch />
            </div>
            <div>
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Ebene 2</span>
              <h1 className="mwg-display-lg mt-2 max-w-[28ch]">
                Trip Explorer – Deine Reise gestalten
              </h1>
              <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                Wähle aus Erlebniswelten und füge Highlights zu deiner persönlichen Reise hinzu.
              </p>
            </div>
          </div>
          <ExplorerProgressStepper currentStep={2} />
        </div>
      </div>
    </div>
  );
}
