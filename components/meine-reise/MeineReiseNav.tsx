"use client";

import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  ClipboardList,
  CloudSun,
  LayoutDashboard,
  ListChecks,
  Map as MapIcon,
  Plus,
} from "lucide-react";
import type { MeineReiseDashboard, MeineReiseNavId } from "@/types/meineReise";

const NAV_ICONS: Record<MeineReiseNavId, typeof LayoutDashboard> = {
  uebersicht: LayoutDashboard,
  reiseplan: MapIcon,
  unterlagen: BookOpen,
  aufgaben: ListChecks,
  packliste: ClipboardList,
  kalender: CalendarDays,
  wetter: CloudSun,
};

interface MeineReiseNavProps {
  dashboard: MeineReiseDashboard;
  activeId: MeineReiseNavId;
}

/** AP-MR001 — sidebar is navigation only. No duplicated plan or document lists. */
export function MeineReiseNav({ dashboard, activeId }: MeineReiseNavProps) {
  return (
    <aside className="flex h-fit flex-col gap-8 lg:sticky lg:top-[92px] lg:w-[232px] lg:shrink-0">
      <nav aria-label="Reisebereiche">
        <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
          {dashboard.nav.map((item) => {
            const Icon = NAV_ICONS[item.id];
            const active = item.id === activeId;
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] whitespace-nowrap transition-colors ${
                    active
                      ? "bg-[var(--mwg-accent)]/12 font-medium text-[var(--mwg-accent)]"
                      : "text-[var(--mwg-ink-70)] hover:bg-[var(--mwg-paper)] hover:text-[var(--mwg-ink)]"
                  }`}
                >
                  <Icon size={16} strokeWidth={1.75} />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <section>
        <p className="px-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--mwg-ink-45)]">
          Meine Reisen
        </p>
        <ul className="mt-3 flex flex-col gap-1">
          {dashboard.trips.map((trip) => (
            <li key={trip.slug}>
              <Link
                href={trip.href}
                className={`flex items-center gap-3 rounded-xl px-2 py-2 transition-colors ${
                  trip.active
                    ? "bg-[var(--mwg-paper)] ring-1 ring-[var(--mwg-line)]"
                    : "hover:bg-[var(--mwg-paper)]"
                }`}
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                  <Image src={trip.image} alt={trip.imageAlt} fill className="object-cover" sizes="40px" />
                </span>
                <span className="min-w-0 truncate text-[13px] font-medium">{trip.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/explore-trips"
          className="mt-3 inline-flex items-center gap-1.5 px-3 text-[13px] text-[var(--mwg-accent)] transition-colors hover:text-[var(--mwg-ink)]"
        >
          <Plus size={14} />
          Neue Reise planen
        </Link>
      </section>

      <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-4 py-3.5">
        <p className="flex items-center gap-2 text-[13px] font-medium">
          <BookOpen size={15} className="text-[var(--mwg-accent)]" strokeWidth={1.75} />
          Premium Guide
        </p>
        <p className="mt-1 text-[12px] text-[var(--mwg-ink-70)]">Dein Zugang ist aktiv.</p>
      </div>
    </aside>
  );
}
