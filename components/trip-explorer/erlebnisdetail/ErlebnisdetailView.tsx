"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Bike,
  Building2,
  ChevronRight,
  Eye,
  Plus,
  UtensilsCrossed,
} from "lucide-react";
import type { Erlebnisdetail, ErlebnisdetailFeature } from "@/types/erlebnisdetail";
import { getHighlightBySlug } from "@/content/explorerHighlights";
import { useExplorerTrip } from "@/components/trip-explorer/workspace/ExplorerTripContext";

const FEATURE_ICONS: Record<ErlebnisdetailFeature["icon"], typeof Eye> = {
  view: Eye,
  city: Building2,
  food: UtensilsCrossed,
  bike: Bike,
  accessibility: Accessibility,
};

const TABS = [
  "Überblick",
  "Praktische Infos",
  "Fahrplan & Preise",
  "Bewertungen",
  "Medien",
  "Kombinieren",
  "Geschichte",
];

interface ErlebnisdetailStickyBarProps {
  detail: Erlebnisdetail;
}

export function ErlebnisdetailStickyBar({ detail }: ErlebnisdetailStickyBarProps) {
  const { addHighlight, isSelected } = useExplorerTrip();
  const highlight = getHighlightBySlug(detail.tripSlug, detail.slug);
  const selected = isSelected(detail.slug);
  const explorerHref = `/explore-trips/${detail.tripSlug}/explorer`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-3 lg:px-10">
        <Link
          href={explorerHref}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-4 py-2 text-[13px] font-medium text-[var(--mwg-ink-70)] hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
        >
          <ArrowLeft size={14} />
          Zurück zum Explorer
        </Link>

        {detail.addedCount != null && (
          <p className="hidden text-[13px] text-[var(--mwg-ink-70)] sm:block">
            Bereits {detail.addedCount} Mal zu einer Reise hinzugefügt
          </p>
        )}

        <button
          type="button"
          onClick={() => highlight && addHighlight(highlight)}
          disabled={selected || !highlight}
          className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-[14px] font-medium transition-all ${
            selected
              ? "cursor-default bg-[var(--mwg-paper)] text-[var(--mwg-ink-45)]"
              : "bg-[var(--mwg-ink)] text-white hover:-translate-y-0.5 hover:shadow-lg"
          }`}
        >
          {selected ? "Bereits in deiner Reise" : "Zu meiner Reise hinzufügen"}
          {!selected && <Plus size={16} />}
        </button>
      </div>
    </div>
  );
}

interface ErlebnisdetailViewProps {
  detail: Erlebnisdetail;
}

export function ErlebnisdetailView({ detail }: ErlebnisdetailViewProps) {
  const [activeTab, setActiveTab] = useState("Überblick");

  return (
    <>
      <nav className="sticky top-[76px] z-30 border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
        <div className="mx-auto flex max-w-[1240px] gap-1 overflow-x-auto px-6 lg:px-10 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-[13px] font-medium transition-colors ${
                activeTab === tab
                  ? "border-[var(--mwg-accent)] text-[var(--mwg-ink)]"
                  : "border-transparent text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-[1240px] px-6 py-10 pb-28 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr_0.9fr] lg:gap-8">
          {/* Left: Description */}
          <div>
            <h2 className="font-display text-[22px] font-medium">Das Erlebnis</h2>
            <p className="mt-4 text-[15px] leading-[1.75] text-[var(--mwg-ink-70)]">
              {detail.description}
            </p>
            <ul className="mt-6 space-y-3">
              {detail.features.map((feature) => {
                const Icon = FEATURE_ICONS[feature.icon];
                return (
                  <li key={feature.label} className="flex items-center gap-2.5 text-[14px]">
                    <Icon size={16} className="shrink-0 text-[var(--mwg-accent)]" strokeWidth={1.5} />
                    {feature.label}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Middle: Map */}
          <div>
            {detail.mapImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[var(--mwg-line)]">
                <Image
                  src={detail.mapImage}
                  alt={detail.mapImageAlt ?? "Karte"}
                  fill
                  className="object-contain bg-[var(--mwg-paper)] p-4"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
            )}
            {detail.mapInfo && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {detail.mapInfo.departureA && (
                  <div className="rounded-lg border border-[var(--mwg-line)] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                      Abfahrt
                    </p>
                    <p className="mt-1 text-[13px]">{detail.mapInfo.departureA}</p>
                  </div>
                )}
                {detail.mapInfo.departureB && (
                  <div className="rounded-lg border border-[var(--mwg-line)] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                      Abfahrt
                    </p>
                    <p className="mt-1 text-[13px]">{detail.mapInfo.departureB}</p>
                  </div>
                )}
                {detail.mapInfo.parking && (
                  <div className="rounded-lg border border-[var(--mwg-line)] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                      Parken / ÖPNV
                    </p>
                    <p className="mt-1 text-[13px]">{detail.mapInfo.parking}</p>
                  </div>
                )}
                {detail.mapInfo.coordinates && (
                  <div className="rounded-lg border border-[var(--mwg-line)] p-3">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                      GPS
                    </p>
                    <p className="mt-1 text-[13px]">{detail.mapInfo.coordinates}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right: Booking & practical info */}
          <div className="space-y-6">
            {detail.ticketImage && (
              <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
                <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-lg">
                  <Image
                    src={detail.ticketImage}
                    alt={detail.ticketImageAlt ?? detail.title}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
                <h3 className="font-display text-[17px] font-medium">Tickets & Buchung</h3>
                {detail.ticketBullets && (
                  <ul className="mt-3 space-y-1.5">
                    {detail.ticketBullets.map((bullet) => (
                      <li key={bullet} className="text-[13px] text-[var(--mwg-ink-70)]">
                        • {bullet}
                      </li>
                    ))}
                  </ul>
                )}
                {detail.ticketCtaHref && (
                  <a
                    href={detail.ticketCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-[var(--mwg-ink)] px-5 py-3 text-[14px] font-medium text-white transition-all hover:-translate-y-0.5"
                  >
                    {detail.ticketCtaLabel ?? "Tickets buchen"}
                  </a>
                )}
              </div>
            )}

            <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
              <h3 className="font-display text-[17px] font-medium">Praktische Informationen</h3>
              <dl className="mt-3 divide-y divide-[var(--mwg-line)]">
                {detail.practicalInfo.map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 py-2.5 text-[13px]">
                    <dt className="text-[var(--mwg-ink-70)]">{row.label}</dt>
                    <dd className="text-right font-medium">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {detail.operator && (
              <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
                <h3 className="font-display text-[17px] font-medium">Betreiber</h3>
                <p className="mt-2 text-[14px] font-medium">{detail.operator.name}</p>
                {detail.operator.phone && (
                  <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">{detail.operator.phone}</p>
                )}
                {detail.operator.email && (
                  <p className="text-[13px] text-[var(--mwg-ink-70)]">{detail.operator.email}</p>
                )}
                {detail.operator.website && (
                  <p className="text-[13px] text-[var(--mwg-accent)]">{detail.operator.website}</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        {detail.gallery.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-[22px] font-medium">Impressionen</h2>
            <div className="mt-5 flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {detail.gallery.map((img) => (
                <div
                  key={img.src}
                  className="relative h-[140px] w-[220px] shrink-0 overflow-hidden rounded-xl"
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="220px" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        {detail.reviews.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">Bewertungen im Überblick</h2>
            <div className="mt-5 flex flex-wrap gap-4">
              {detail.reviews.map((review) => (
                <div
                  key={review.source}
                  className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-6 py-4"
                >
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                    {review.source === "google" ? "Google" : "TripAdvisor"}
                  </p>
                  <p className="mt-1 font-display text-[24px] font-medium">
                    {review.rating.toFixed(1).replace(".", ",")} ★
                  </p>
                  {review.reviewCount && (
                    <p className="text-[12px] text-[var(--mwg-ink-70)]">
                      {review.reviewCount} Bewertungen
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommendations */}
        {detail.recommendations.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">Passt hervorragend dazu</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {detail.recommendations.map((rec) => (
                <Link
                  key={rec.slug}
                  href={`/explore-trips/${detail.tripSlug}/explorer/erlebnis/${rec.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-3 transition-colors hover:border-[var(--mwg-accent)]/40"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image src={rec.image} alt={rec.imageAlt} fill className="object-cover" sizes="56px" />
                  </div>
                  <span className="text-[14px] font-medium group-hover:text-[var(--mwg-accent)]">
                    {rec.title}
                  </span>
                  <ChevronRight size={16} className="ml-auto text-[var(--mwg-ink-45)]" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Combinations */}
        {detail.combinations.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">Kombinierbar mit</h2>
            <ul className="mt-4 space-y-2">
              {detail.combinations.map((combo) => (
                <li key={combo.slug}>
                  <Link
                    href={`/explore-trips/${detail.tripSlug}/explorer/erlebnis/${combo.slug}`}
                    className="flex items-center gap-2 text-[14px] text-[var(--mwg-ink-70)] hover:text-[var(--mwg-accent)]"
                  >
                    <ArrowRight size={14} />
                    {combo.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Included in trips */}
        {detail.includedInTrips.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">In diesen Explore Trips enthalten</h2>
            <div className="mt-5 flex flex-wrap gap-4">
              {detail.includedInTrips.map((trip) => (
                <Link
                  key={trip.slug}
                  href={`/explore-trips/${trip.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-3 transition-colors hover:border-[var(--mwg-accent)]/40"
                >
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={trip.image} alt={trip.imageAlt} fill className="object-cover" sizes="64px" />
                  </div>
                  <span className="text-[14px] font-medium">{trip.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <ErlebnisdetailStickyBar detail={detail} />
    </>
  );
}
