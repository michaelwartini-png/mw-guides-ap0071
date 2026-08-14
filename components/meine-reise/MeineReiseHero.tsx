"use client";

import Image from "next/image";
import Link from "next/link";
import { BookOpen, Check, ChevronDown, Pencil } from "lucide-react";
import type { MeineReiseDashboard } from "@/types/meineReise";

interface MeineReiseHeroProps {
  dashboard: MeineReiseDashboard;
  benefitsOpen: boolean;
  onToggleBenefits: () => void;
  onOpenGuide: () => void;
}

/** AP-MR001 — premium is confirmed, not sold. Feature list stays behind disclosure. */
export function MeineReiseHero({
  dashboard,
  benefitsOpen,
  onToggleBenefits,
  onOpenGuide,
}: MeineReiseHeroProps) {
  return (
    <section id="uebersicht" className="scroll-mt-24 overflow-hidden rounded-2xl">
      <div className="relative min-h-[320px] lg:min-h-[360px]">
        <Image
          src={dashboard.heroImage}
          alt={dashboard.heroImageAlt}
          fill
          priority
          className="object-cover"
          sizes="1200px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--mwg-ink)]/78 via-[var(--mwg-ink)]/45 to-[var(--mwg-ink)]/20" />

        <div className="relative flex min-h-[320px] flex-col justify-between gap-8 p-6 lg:min-h-[360px] lg:flex-row lg:items-end lg:p-8">
          <div className="max-w-[34rem] text-white">
            <p className="text-[14px] text-white/80">Willkommen zurück, {dashboard.travelerFirstName}!</p>
            <h1 className="mt-2 font-display text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] font-medium leading-[1.08] tracking-tight uppercase">
              {dashboard.tripTitle}
            </h1>
            <p className="mt-3 text-[14px] text-white/85">
              {dashboard.dateRangeLabel} · {dashboard.countdownLabel}
            </p>

            <div className="mt-5 max-w-[280px]">
              <div className="flex items-baseline justify-between gap-3 text-[12px] text-white/80">
                <span>{dashboard.progressLabel}</span>
                <span className="font-mono">{dashboard.progressPercent}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/25">
                <div
                  className="h-full rounded-full bg-[var(--mwg-accent)]"
                  style={{ width: `${dashboard.progressPercent}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenGuide}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--mwg-accent)] px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
              >
                <BookOpen size={16} strokeWidth={1.75} />
                Premium Guide öffnen
              </button>
              <Link
                href={dashboard.editHref}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:border-white hover:bg-white/10"
              >
                <Pencil size={15} strokeWidth={1.75} />
                Reise bearbeiten
              </Link>
            </div>
          </div>

          <div className="w-full max-w-[280px] rounded-2xl border border-white/15 bg-[var(--mwg-ink)]/55 p-5 text-white backdrop-blur-sm">
            <p className="flex items-center gap-2 text-[14px] font-medium">
              Premium aktiv
              <Check size={16} strokeWidth={2.25} className="text-[var(--mwg-accent)]" />
            </p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/80">
              Alle Premium-Funktionen stehen für diese Reise zur Verfügung.
            </p>
            <button
              type="button"
              onClick={onToggleBenefits}
              aria-expanded={benefitsOpen}
              className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-white/90 underline-offset-4 hover:underline"
            >
              Premium-Vorteile anzeigen
              <ChevronDown
                size={14}
                className={`transition-transform ${benefitsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {benefitsOpen ? (
              <ul className="mt-3 space-y-1.5 border-t border-white/15 pt-3">
                {dashboard.premiumBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-[12.5px] text-white/80">
                    <Check size={13} className="mt-0.5 shrink-0 text-[var(--mwg-accent)]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
