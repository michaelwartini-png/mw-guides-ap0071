"use client";

import Image from "next/image";
import { Bookmark, Calendar, Building2, Clock, Euro, Heart, Play, Route, Share2 } from "lucide-react";
import type { Erlebnisdetail, ErlebnisdetailStat } from "@/types/erlebnisdetail";

const STAT_ICONS: Record<ErlebnisdetailStat["icon"], typeof Clock> = {
  clock: Clock,
  calendar: Calendar,
  euro: Euro,
  building: Building2,
  route: Route,
};

interface ErlebnisdetailHeroProps {
  detail: Erlebnisdetail;
}

export function ErlebnisdetailHero({ detail }: ErlebnisdetailHeroProps) {
  return (
    <section className="relative min-h-[420px] overflow-hidden lg:min-h-[480px]">
      <Image
        src={detail.heroImage}
        alt={detail.heroImageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-16">
        <div className="max-w-[640px]">
          {detail.badge && (
            <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mwg-ink)]">
              {detail.badge}
            </span>
          )}
          <h1 className="mwg-display-lg mt-4 text-white">{detail.title}</h1>
          <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/85">
            {detail.subtitle}
          </p>
          {detail.introVideoLabel && (
            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <Play size={14} fill="currentColor" />
              {detail.introVideoLabel}
            </button>
          )}
        </div>

        <div className="flex shrink-0 flex-col gap-4 lg:items-end">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
              aria-label="Favorit"
            >
              <Heart size={18} />
            </button>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm hover:bg-white/25"
              aria-label="Teilen"
            >
              <Share2 size={18} />
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-[13px] font-medium text-white backdrop-blur-sm hover:bg-white/20"
            >
              <Bookmark size={14} />
              Merken
            </button>
          </div>

          <div className="w-full min-w-[280px] rounded-xl border border-white/15 bg-[var(--mwg-ink)]/90 p-5 backdrop-blur-md lg:w-[320px]">
            <ul className="space-y-3">
              {detail.stats.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="flex items-start gap-3 text-white">
                    <Icon size={16} className="mt-0.5 shrink-0 text-white/70" strokeWidth={1.5} />
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-white/55">{stat.label}</p>
                      <p className="text-[14px] font-medium">{stat.value}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
