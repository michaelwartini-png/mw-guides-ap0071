"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import {
  Check,
  CloudSun,
  Download,
  Eye,
  Landmark,
  ListChecks,
  PiggyBank,
  Shield,
  Utensils,
} from "lucide-react";
import type { ExplorerReview } from "@/types/explorerReview";
import type { PremiumPreview, TripRideGuideProduct } from "@/types/reisebegleiter";
import {
  HANDOUT_FEATURES,
  HANDOUT_PRICE,
  MEINE_REISE_BENEFITS,
  PREMIUM_FEATURES,
  PREMIUM_GUIDE_PRICE,
  TRAVEL_COST_CATEGORIES,
  formatEuro,
} from "@/content/reisebegleiter";
import { ReviewRouteSketch } from "@/components/trip-explorer/review/ReviewRouteSketch";
import { PremiumPreviewDialog } from "@/components/trip-explorer/reisebegleiter/PremiumPreviewDialog";

interface ReisebegleiterWorkspaceProps {
  review: ExplorerReview;
  rideGuides: TripRideGuideProduct[];
  preview: PremiumPreview;
  heroImage: string;
  heroImageAlt: string;
}

const PREMIUM_FEATURE_ICONS = [Eye, Utensils, CloudSun, ListChecks, PiggyBank, Landmark];

/** AP-ET005.1 — Product selection polish. Presentation only. */
export function ReisebegleiterWorkspace({
  review,
  rideGuides,
  preview,
  heroImage,
  heroImageAlt,
}: ReisebegleiterWorkspaceProps) {
  const [premiumSelected, setPremiumSelected] = useState(true);
  const [selectedRideGuides, setSelectedRideGuides] = useState<string[]>(() => rideGuides.map((guide) => guide.slug));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const rideGuideTotal = useMemo(
    () =>
      rideGuides
        .filter((guide) => selectedRideGuides.includes(guide.slug))
        .reduce((sum, guide) => sum + guide.price, 0),
    [rideGuides, selectedRideGuides],
  );
  const mwGuidesTotal = (premiumSelected ? PREMIUM_GUIDE_PRICE : 0) + rideGuideTotal;
  const duration = `${review.days} Tage (${review.nights} ${review.nights === 1 ? "Nacht" : "Nächte"})`;
  const sampleHighlight = review.highlights[1] ?? review.highlights[0];

  function toggleRideGuide(slug: string) {
    setSelectedRideGuides((current) =>
      current.includes(slug) ? current.filter((id) => id !== slug) : [...current, slug],
    );
  }

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(280px,340px)] xl:items-start">
      <div className="flex min-w-0 flex-col gap-5">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--mwg-line)]">
          <div className="relative aspect-[21/7] min-h-[140px]">
            <Image src={heroImage} alt={heroImageAlt} fill priority className="object-cover" sizes="900px" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--mwg-ink)]/45 to-transparent" />
          </div>
        </div>

        <div>
          <h2 className="font-display text-[22px] font-medium">Wähle deine digitalen Reisebegleiter</h2>
          <p className="mt-1 max-w-[62ch] text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
            Das Handout ist immer kostenlos enthalten. Der Premium Guide ergänzt Insider-Wissen und den Zugang zu
            Meine Reise.
          </p>
        </div>

        <div className="grid items-stretch gap-4 md:grid-cols-2">
          <HandoutCard review={review} highlight={sampleHighlight} />
          <PremiumCard
            review={review}
            heroImage={heroImage}
            heroImageAlt={heroImageAlt}
            sampleImage={sampleHighlight?.image}
            sampleImageAlt={sampleHighlight?.imageAlt}
            onPreview={() => setPreviewOpen(true)}
          />
        </div>

        {rideGuides.length > 0 ? (
          <RideGuideCard
            rideGuides={rideGuides}
            selectedSlugs={selectedRideGuides}
            onToggle={toggleRideGuide}
          />
        ) : null}

        <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-5">
          <p className="flex items-start gap-2.5">
            <Shield size={18} className="mt-0.5 shrink-0 text-[var(--mwg-accent)]" strokeWidth={1.75} />
            <span>
              <span className="block text-[15px] font-medium">MW Guides verkauft keine Reisen.</span>
              <span className="mt-1.5 block text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
                Hotels, Tickets und Eintritte buchst du direkt bei den jeweiligen Anbietern. MW Guides liefert deine
                persönlichen digitalen Reisebegleiter sowie den Zugang zu Meine Reise.
              </span>
            </span>
          </p>
        </section>
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-[92px]">
        <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
          <h2 className="font-display text-[18px] font-medium">Dein persönliches Reisepaket</h2>
          <ul className="mt-4 space-y-2 text-[13px] text-[var(--mwg-ink-70)]">
            <li>
              {review.highlights.length} {review.highlights.length === 1 ? "Highlight" : "Highlights"}
            </li>
            <li>{duration}</li>
          </ul>
        </section>

        <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
          <h3 className="font-display text-[16px] font-medium">Geschätzte Reisekosten</h3>
          <p className="mt-3 font-display text-[22px] font-medium">ca. {review.budgetPerPerson} €</p>
          <p className="mt-1 text-[12px] text-[var(--mwg-ink-45)]">(nicht über MW Guides)</p>
          <p className="mt-3 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
            {TRAVEL_COST_CATEGORIES.join(" · ")}
          </p>
        </section>

        <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
          <h3 className="font-display text-[16px] font-medium">Digitale Produkte von MW Guides</h3>
          <ul className="mt-4 space-y-3">
            <ProductRow checked disabled label="Explore Trip Handout" price="kostenlos enthalten" />
            <ProductRow
              checked={premiumSelected}
              onChange={setPremiumSelected}
              label="Explore Trip Premium Guide"
              price={formatEuro(PREMIUM_GUIDE_PRICE)}
            />
            {rideGuides.map((guide) => (
              <ProductRow
                key={guide.slug}
                checked={selectedRideGuides.includes(guide.slug)}
                onChange={() => toggleRideGuide(guide.slug)}
                label={guide.title}
                price={formatEuro(guide.price)}
              />
            ))}
          </ul>
          <div className="mt-4 border-t border-[var(--mwg-line)] pt-3">
            <p className="text-[13px] text-[var(--mwg-ink-70)]">Heute bezahlen</p>
            <p className="mt-1 font-display text-[22px] font-medium">{formatEuro(mwGuidesTotal)}</p>
            <p className="mt-1 text-[12px] text-[var(--mwg-ink-45)]">inkl. MwSt. · digitale Inhalte</p>
          </div>
        </section>

        <div>
          <button
            type="button"
            onClick={() => setUnlocked(true)}
            className="flex w-full items-center justify-center rounded-full bg-[var(--mwg-accent)] px-5 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {unlocked ? "Premium Guide freigeschaltet" : "Premium Guide freischalten"}
          </button>
          <p className="mt-3 text-center text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
            Nach dem Freischalten stehen dir deine digitalen Reisebegleiter sofort zur Verfügung.
          </p>
        </div>
      </aside>

      <PremiumPreviewDialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        preview={preview}
        review={review}
        heroImage={heroImage}
        heroImageAlt={heroImageAlt}
      />
    </div>
  );
}

function HandoutCard({
  review,
  highlight,
}: {
  review: ExplorerReview;
  highlight?: ExplorerReview["highlights"][number];
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[var(--mwg-accent)]/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--mwg-accent)]">
          Immer kostenlos enthalten
        </span>
        <span className="text-right">
          <span className="block text-[15px] font-medium">{formatEuro(HANDOUT_PRICE)}</span>
          <span className="text-[11px] text-[var(--mwg-ink-45)]">kostenlos</span>
        </span>
      </div>
      <h3 className="mt-3 font-display text-[20px] font-medium">Explore Trip Handout</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
        Dein kompakter Reiseplan — Überblick, Highlights, Karte und Tagesplan zum Mitnehmen.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <PreviewTile label="Reiseplan">
          <DocumentMock lines={3} />
        </PreviewTile>
        <PreviewTile label="Highlights">
          {highlight ? (
            <Image src={highlight.image} alt={highlight.imageAlt} fill className="object-cover" sizes="180px" />
          ) : (
            <DocumentMock lines={2} />
          )}
        </PreviewTile>
        <PreviewTile label="Karte">
          <ReviewRouteSketch review={review} compact />
        </PreviewTile>
        <PreviewTile label="Tagesplan">
          <DocumentMock lines={4} timeline />
        </PreviewTile>
      </div>

      <ul className="mt-4 space-y-1.5">
        {HANDOUT_FEATURES.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-[13px] text-[var(--mwg-ink-70)]">
            <Check size={14} className="shrink-0 text-[var(--mwg-accent)]" strokeWidth={2.5} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-4">
          <p className="inline-flex items-center gap-1.5 text-[14px] font-medium">
            <Download size={15} strokeWidth={1.75} />
            Kostenlos herunterladen
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--mwg-ink-70)]">
            Beim kostenlosen Handout endet die kostenlose Nutzung. Kein Zugang zu Meine Reise, späterer Bearbeitung,
            Synchronisation, Reiseverwaltung und automatischen Updates.
          </p>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--mwg-ink-45)]">
          Ideal zum Kennenlernen von MW Guides. Für Bearbeitung, Synchronisation und Reiseverwaltung ist ein
          Premium-Produkt erforderlich.
        </p>
      </div>
    </article>
  );
}

function PremiumCard({
  review,
  heroImage,
  heroImageAlt,
  sampleImage,
  sampleImageAlt,
  onPreview,
}: {
  review: ExplorerReview;
  heroImage: string;
  heroImageAlt: string;
  sampleImage?: string;
  sampleImageAlt?: string;
  onPreview: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="rounded-full bg-[var(--mwg-ink)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
          Empfohlen
        </span>
        <span className="text-right">
          <span className="block text-[15px] font-medium">{formatEuro(PREMIUM_GUIDE_PRICE)}</span>
          <span className="text-[11px] text-[var(--mwg-ink-45)]">einmalig</span>
        </span>
      </div>
      <h3 className="mt-3 font-display text-[20px] font-medium">Explore Trip Premium Guide</h3>
      <p className="mt-1 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
        Dein ausführlicher Begleiter — mit allem aus dem Handout, plus Tiefe für unterwegs.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        <PreviewTile label="Titelblatt" onClick={onPreview}>
          <Image src={heroImage} alt={heroImageAlt} fill className="object-cover" sizes="140px" />
        </PreviewTile>
        <PreviewTile label="Inhaltsverzeichnis" onClick={onPreview}>
          <DocumentMock lines={5} numbered />
        </PreviewTile>
        <PreviewTile label="Beispielseite" onClick={onPreview}>
          {sampleImage ? (
            <Image src={sampleImage} alt={sampleImageAlt ?? ""} fill className="object-cover" sizes="140px" />
          ) : (
            <DocumentMock lines={3} />
          )}
        </PreviewTile>
        <PreviewTile label="Karten & Grafiken" onClick={onPreview}>
          <ReviewRouteSketch review={review} compact />
        </PreviewTile>
        <PreviewTile label="Insider-Tipp" onClick={onPreview} className="sm:col-span-2">
          <div className="flex h-full items-center bg-[var(--mwg-paper)] px-3">
            <p className="line-clamp-3 text-[10px] leading-snug text-[var(--mwg-ink-70)]">{review.tip}</p>
          </div>
        </PreviewTile>
      </div>
      <button
        type="button"
        onClick={onPreview}
        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--mwg-accent)] hover:underline"
      >
        <Eye size={14} strokeWidth={1.75} />
        Vorschau ansehen
      </button>

      <ul className="mt-4 space-y-1.5">
        {PREMIUM_FEATURES.map((feature, index) => {
          const Icon = PREMIUM_FEATURE_ICONS[index] ?? Check;
          return (
            <li key={feature} className="flex items-center gap-2 text-[13px] text-[var(--mwg-ink-70)]">
              <Icon size={14} className="shrink-0 text-[var(--mwg-accent)]" strokeWidth={1.75} />
              {feature}
            </li>
          );
        })}
      </ul>

      <div className="mt-auto pt-4">
        <div className="rounded-xl border border-[var(--mwg-accent)] bg-[var(--mwg-accent)]/10 p-4">
          <p className="font-display text-[16px] font-medium">Mit Premium zusätzlich enthalten</p>
          <ul className="mt-3 space-y-1.5">
            {MEINE_REISE_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-[13px] leading-snug">
                <Check size={14} className="mt-0.5 shrink-0 text-[var(--mwg-accent)]" strokeWidth={2.5} />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-[var(--mwg-ink-45)]">
          Der Zugang zu „Meine Reise“ wird erst nach Erwerb eines Premium-Produkts freigeschaltet.
        </p>
      </div>
    </article>
  );
}

function PreviewTile({
  label,
  onClick,
  children,
  className = "",
}: {
  label: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
}) {
  const body = (
    <>
      <span className="relative block aspect-[5/3] overflow-hidden bg-[var(--mwg-paper)]" aria-hidden="true">{children}</span>
      <span className="block px-2 py-1.5 text-center text-[11px] font-medium leading-snug">{label}</span>
    </>
  );
  const tileClass = `overflow-hidden rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] text-left ${className}`;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={label}
        className={`${tileClass} transition-colors hover:border-[var(--mwg-accent)]`}
      >
        {body}
      </button>
    );
  }

  return <div className={tileClass}>{body}</div>;
}

function DocumentMock({
  lines,
  numbered,
  timeline,
}: {
  lines: number;
  numbered?: boolean;
  timeline?: boolean;
}) {
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 bg-[var(--mwg-paper)] px-3 py-2">
      {Array.from({ length: lines }, (_, index) => (
        <span key={index} className="flex items-center gap-1.5">
          {numbered ? (
            <span className="font-mono text-[8px] text-[var(--mwg-ink-45)]">{String(index + 1).padStart(2, "0")}</span>
          ) : null}
          {timeline ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--mwg-accent)]" /> : null}
          <span
            className="block h-1.5 rounded-full bg-[var(--mwg-ink)]/12"
            style={{ width: `${88 - (index % 3) * 18}%` }}
          />
        </span>
      ))}
    </div>
  );
}

function RideGuideCard({
  rideGuides,
  selectedSlugs,
  onToggle,
}: {
  rideGuides: TripRideGuideProduct[];
  selectedSlugs: string[];
  onToggle: (slug: string) => void;
}) {
  return (
    <article className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
      <h3 className="font-display text-[20px] font-medium">Ride Guides</h3>
      <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">
        Audioguides für ausgewählte Fahrten dieser Reise — mit Geschichten und Insider-Tipps unterwegs.
      </p>
      <ul className="mt-4 divide-y divide-[var(--mwg-line)]">
        {rideGuides.map((guide) => (
          <li key={guide.slug} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
            <label className="flex min-w-0 cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={selectedSlugs.includes(guide.slug)}
                onChange={() => onToggle(guide.slug)}
                className="h-4 w-4 accent-[var(--mwg-accent)]"
              />
              <span>
                <span className="block text-[14px] font-medium">{guide.title}</span>
                <span className="text-[12px] text-[var(--mwg-ink-45)]">{guide.place}</span>
              </span>
            </label>
            <span className="shrink-0 text-[13px] font-medium">{formatEuro(guide.price)}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function ProductRow({
  checked,
  disabled,
  label,
  price,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  label: string;
  price: string;
  onChange?: (checked: boolean) => void;
}) {
  return (
    <li className="flex items-start justify-between gap-3 text-[13px]">
      <label className={`flex items-start gap-2 ${disabled ? "" : "cursor-pointer"}`}>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(event) => onChange?.(event.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[var(--mwg-accent)] disabled:opacity-70"
        />
        <span className={checked ? "font-medium" : "text-[var(--mwg-ink-70)]"}>{label}</span>
      </label>
      <span className="shrink-0 text-right tabular-nums">{price}</span>
    </li>
  );
}
