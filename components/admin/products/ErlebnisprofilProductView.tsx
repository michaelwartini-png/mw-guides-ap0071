"use client";

import { useState } from "react";
import {
  Accessibility,
  Building2,
  Calendar,
  Clock,
  Euro,
  ExternalLink,
  Lightbulb,
  Mail,
  MapPin,
  Phone,
  Route,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { ProductSourceLabel } from "@/components/admin/EditorRedakteurPanel";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import type { GeneratedProductBundle, ProductCompleteness } from "@/components/admin/products/productTypes";
import { cn } from "@/lib/cn";

interface ErlebnisprofilProductViewProps {
  bundle: GeneratedProductBundle<ErlebnisprofilProduct>;
}

function formatGeneratedAt(iso: string): string {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} · ${pad(date.getHours())}:${pad(date.getMinutes())} Uhr`;
}

function parseRating(value: string): number | null {
  const normalized = value.replace(",", ".").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function PlatformLogo({ source }: { source: "google" | "tripadvisor" }) {
  if (source === "google") {
    return (
      <span className="inline-flex items-center gap-0.5 text-[13px] font-medium leading-none">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>
    );
  }
  return <span className="text-[13px] font-semibold leading-none text-[#00AF87]">Tripadvisor</span>;
}

function PracticalIcon({ label }: { label: string }) {
  const normalized = label.toLowerCase();
  const className = "shrink-0 text-accent";
  const size = 20;
  const stroke = 1.5;

  if (normalized.includes("fahrplan") || normalized.includes("öffnung") || normalized.includes("betrieb")) {
    return <Clock size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("preis")) {
    return <Euro size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("barrierefrei")) {
    return <Accessibility size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("anreise") || normalized.includes("standort")) {
    return <MapPin size={size} className={className} strokeWidth={stroke} />;
  }
  if (normalized.includes("dauer")) {
    return <Calendar size={size} className={className} strokeWidth={stroke} />;
  }
  return <Route size={size} className={className} strokeWidth={stroke} />;
}

function SectionHeading({
  eyebrow,
  title,
  source,
  onDark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  source?: string;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p
          className={cn(
            "mwg-eyebrow",
            onDark ? "text-white/55" : "text-[var(--mwg-ink-45)]",
          )}
        >
          {eyebrow}
        </p>
        {source ? <ProductSourceLabel source={source} onDark={onDark} /> : null}
      </div>
      <h2
        className={cn(
          "mt-2 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-medium",
          onDark ? "text-white" : "text-[var(--mwg-ink)]",
        )}
      >
        {title}
      </h2>
    </div>
  );
}

function ProductStatusCard({
  completeness,
  generatedAt,
  masterVersionLabel,
}: {
  completeness: ProductCompleteness;
  generatedAt: string;
  masterVersionLabel: string;
}) {
  const ready = completeness.percent >= 70;

  return (
    <div className="w-full rounded-2xl border border-white/20 bg-[var(--mwg-ink)]/90 p-5 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md sm:min-w-[280px] sm:max-w-[320px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
        Automatisch erzeugt
      </p>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/50">Produktstatus</p>
          <p className="mt-0.5 text-[15px] font-medium">
            {ready ? "Bereit zur Veröffentlichung" : "Master unvollständig"}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/50">Generierbarkeit</p>
          <p className="mt-0.5 font-display text-[28px] font-medium leading-none">
            {completeness.percent}
            <span className="text-[16px] text-white/60">%</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/50">Masterdaten</p>
          <p className="mt-0.5 text-[14px]">
            {ready ? "Vollständig genug" : "Noch ergänzen"}
          </p>
        </div>
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] leading-relaxed text-white/45">
        {formatGeneratedAt(generatedAt)}
        <br />
        Master {masterVersionLabel}
      </p>
    </div>
  );
}

function GalleryLightbox({
  images,
  activeIndex,
  onClose,
}: {
  images: ErlebnisprofilProduct["gallery"];
  activeIndex: number;
  onClose: () => void;
}) {
  const image = images[activeIndex];
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie-Vorschau"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Schließen"
      >
        <X size={20} />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
        onClick={(event) => event.stopPropagation()}
        data-lightbox-index={activeIndex}
      />
    </div>
  );
}

export function ErlebnisprofilProductView({ bundle }: ErlebnisprofilProductViewProps) {
  const { product, meta, completeness } = bundle;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const mwgScoreValue = parseRating(product.mwgScore);

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] shadow-[0_40px_80px_-40px_rgba(26,26,24,0.18)]">
      {/* 1 Hero */}
      <section className="relative min-h-[460px] overflow-hidden lg:min-h-[520px]">
        {product.heroImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.heroImage}
            alt={product.heroImageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-[var(--mwg-paper)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25" />

        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-14">
          <div className="max-w-[680px]">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
              <Sparkles size={12} />
              Automatisch erzeugtes Erlebnisprofil
            </span>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              <ProductSourceLabel source="Allgemein" onDark />
              <ProductSourceLabel source="Galerie" onDark />
              <ProductSourceLabel source="Hero" onDark />
              <ProductSourceLabel source="Bewertungen" onDark />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {product.badge ? (
                <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mwg-ink)]">
                  {product.badge}
                </span>
              ) : null}
              {product.kategorie ? (
                <span className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/85">
                  {product.kategorie}
                </span>
              ) : null}
              {product.regionen.map((region) => (
                <span
                  key={region}
                  className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/85"
                >
                  {region}
                </span>
              ))}
            </div>

            <h1 className="mwg-display-lg mt-5 text-white">{product.title}</h1>
            <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-white/88">
              {product.subtitle}
            </p>

            {product.mwgScore ? (
              <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
                <span className="font-display text-[24px] font-medium leading-none text-white">
                  {product.mwgScore.replace(".", ",")}
                </span>
                <span className="text-[13px] text-white/70">MW Guides Score</span>
                {mwgScoreValue !== null ? (
                  <div className="ml-1 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className="fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>

          <ProductStatusCard
            completeness={completeness}
            generatedAt={meta.generatedAt}
            masterVersionLabel={meta.masterVersionLabel}
          />
        </div>
      </section>

      {/* Quick stats strip */}
      {product.stats.length > 0 ? (
        <section className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
          <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-8 gap-y-4 px-6 py-5 lg:px-10">
            {product.stats.slice(0, 4).map((stat) => (
              <div key={`${stat.label}-${stat.value}`} className="min-w-[120px]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mwg-ink-45)]">
                  {stat.label}
                </p>
                <p className="mt-1 text-[15px] font-medium text-[var(--mwg-ink)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-16">
        {/* 2 Kurzbeschreibung */}
        {product.description ? (
          <section className="max-w-[760px]">
            <SectionHeading
              eyebrow="Das Erlebnis"
              title={product.scoreBegruendung ? "Warum es sich lohnt" : "Im Überblick"}
              source="Bewertungen & Highlights"
            />
            <div className="mt-5 space-y-4 text-[16px] leading-[1.8] text-[var(--mwg-ink-70)]">
              {product.scoreBegruendung ? (
                <p className="text-[17px] leading-[1.75] text-[var(--mwg-ink)]">
                  {product.scoreBegruendung}
                </p>
              ) : null}
              {product.description
                .split("\n\n")
                .filter((paragraph) => paragraph.trim() && paragraph.trim() !== product.scoreBegruendung.trim())
                .map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
            </div>
          </section>
        ) : null}

        {/* 3 Highlights */}
        {product.features.length > 0 ? (
          <section className={cn(product.description ? "mt-16" : "")}>
            <SectionHeading
              eyebrow="Highlights"
              title="Das macht dieses Erlebnis besonders"
              source="Highlights"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {product.features.map((feature, index) => (
                <article
                  key={`${feature.label}-${index}`}
                  className="group relative overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-gradient-to-br from-[var(--mwg-paper)] to-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(26,26,24,0.25)]"
                >
                  {feature.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={feature.image.src}
                      alt={feature.image.alt}
                      className="aspect-[16/10] w-full object-cover"
                    />
                  ) : null}
                  <div className="relative p-6">
                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/8 transition-transform group-hover:scale-110" />
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/12 text-[28px]">
                      {feature.icon}
                    </div>
                    <h3 className="relative mt-5 font-display text-[20px] font-medium leading-snug">
                      {feature.label}
                    </h3>
                    {feature.description ? (
                      <p className="relative mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
                        {feature.description}
                      </p>
                    ) : null}
                    <p className="relative mt-2 text-[13px] text-[var(--mwg-ink-45)]">
                      Highlight {index + 1}
                      {feature.image ? (
                        <span className="ml-2 text-accent">· Galerie</span>
                      ) : null}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* 4 MW Guides Tipps */}
        {product.tipps.length > 0 ? (
          <section className="mt-16">
            <div className="flex items-end justify-between gap-4">
              <SectionHeading
                eyebrow="MW Guides Tipps"
                title="Unsere Empfehlungen"
                source="MW Guides Tipps"
              />
              <Lightbulb size={28} className="hidden text-accent/40 sm:block" strokeWidth={1.5} />
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {product.tipps.map((tipp, index) => (
                <article
                  key={`${tipp.ueberschrift}-${index}`}
                  className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] shadow-[0_12px_30px_-20px_rgba(26,26,24,0.15)]"
                >
                  {tipp.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tipp.image.src}
                      alt={tipp.image.alt}
                      className="aspect-[16/9] w-full object-cover"
                    />
                  ) : null}
                  <div className="flex items-start gap-3 p-6">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                      <Lightbulb size={18} strokeWidth={1.5} />
                    </span>
                    <div>
                      <h3 className="font-display text-[18px] font-medium">{tipp.ueberschrift}</h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                        {tipp.beschreibung}
                      </p>
                      {tipp.image ? (
                        <p className="mt-2 text-[12px] text-accent">Bild aus Galerie</p>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* 5 Galerie */}
        {product.gallery.length > 0 ? (
          <section className="mt-16">
            <SectionHeading
              eyebrow="Impressionen"
              title="Bilder vom Erlebnis"
              source="Galerie"
            />
            <div className="mt-6 flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {product.gallery.map((bild, index) => (
                <button
                  key={bild.src + bild.titel}
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  className="group relative h-[240px] w-[360px] shrink-0 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-[280px] sm:w-[420px]"
                  aria-label={`${bild.titel} vergrößern`}
                  data-lightbox-index={index}
                  data-lightbox-ready="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={bild.src}
                    alt={bild.alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-left text-[13px] font-medium text-white">
                    {bild.titel}
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {/* 6 Bewertungen */}
        {(product.mwgScore || product.reviews.length > 0) && (
          <section className="mt-16">
            <SectionHeading
              eyebrow="Bewertungen"
              title="Was Gäste und MW Guides sagen"
              source="Bewertungen"
            />
            <div className="mt-8 flex flex-wrap gap-4">
              {product.mwgScore ? (
                <div className="min-w-[180px] rounded-2xl border border-[var(--mwg-line)] bg-gradient-to-br from-accent/8 to-white px-6 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mwg-ink-45)]">
                    MW Guides Score
                  </p>
                  <p className="mt-2 font-display text-[42px] font-medium leading-none text-accent">
                    {product.mwgScore.replace(".", ",")}
                  </p>
                  <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">von 10</p>
                </div>
              ) : null}
              {product.reviews.map((review) => {
                const rating = parseRating(review.rating);
                return (
                  <div
                    key={review.source}
                    className="min-w-[180px] rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-6 py-5"
                  >
                    <PlatformLogo source={review.source} />
                    <p className="mt-3 font-display text-[36px] font-medium leading-none">
                      {review.rating.replace(".", ",")}
                      <span className="text-[16px] text-[var(--mwg-ink-45)]"> / 5</span>
                    </p>
                    {rating !== null ? (
                      <div className="mt-2 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.round(rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-[var(--mwg-line)]"
                            }
                            strokeWidth={i < Math.round(rating) ? 0 : 1.5}
                          />
                        ))}
                      </div>
                    ) : null}
                    {review.count ? (
                      <p className="mt-2 text-[13px] text-[var(--mwg-ink-70)]">{review.count} Bewertungen</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 7 Praktische Informationen */}
        {product.practicalInfo.length > 0 ? (
          <section className="mt-16">
            <SectionHeading
              eyebrow="Gut zu wissen"
              title="Praktische Informationen"
              source="Offizielle Informationen"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {product.practicalInfo.map((row) => (
                <article
                  key={`${row.label}-${row.value.slice(0, 32)}`}
                  className="flex gap-4 rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10">
                    <PracticalIcon label={row.label} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-medium text-[var(--mwg-ink)]">{row.label}</h3>
                    <p className="mt-1 whitespace-pre-line text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
                      {row.value}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {/* 8 Betreiber */}
        {(product.operator.name || product.standort.adresse) && (
          <section className="mt-16">
            <SectionHeading
              eyebrow="Anbieter"
              title="Betreiber & Standort"
              source="Offizielle Informationen"
            />
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
              <article className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-6">
                {product.operator.name ? (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Building2 size={20} strokeWidth={1.5} />
                      </div>
                      <h3 className="font-display text-[22px] font-medium">{product.operator.name}</h3>
                    </div>
                    <ul className="mt-6 space-y-3 text-[15px] text-[var(--mwg-ink-70)]">
                      {product.operator.phone ? (
                        <li className="flex items-center gap-3">
                          <Phone size={16} className="shrink-0 text-accent" strokeWidth={1.5} />
                          {product.operator.phone}
                        </li>
                      ) : null}
                      {product.operator.email ? (
                        <li className="flex items-center gap-3">
                          <Mail size={16} className="shrink-0 text-accent" strokeWidth={1.5} />
                          {product.operator.email}
                        </li>
                      ) : null}
                      {product.operator.website ? (
                        <li className="flex items-center gap-3">
                          <ExternalLink size={16} className="shrink-0 text-accent" strokeWidth={1.5} />
                          <span className="text-accent">{product.operator.website}</span>
                        </li>
                      ) : null}
                    </ul>
                  </>
                ) : null}
              </article>

              <article className="overflow-hidden rounded-2xl border border-[var(--mwg-line)]">
                <div className="relative min-h-[220px] bg-gradient-to-br from-accent/15 via-[var(--mwg-paper)] to-accent/5 p-6">
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.5} />
                    <div>
                      <h3 className="font-display text-[18px] font-medium">Standort</h3>
                      {product.standort.adresse ? (
                        <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                          {product.standort.adresse}
                        </p>
                      ) : null}
                      {product.standort.gps ? (
                        <p className="mt-2 font-mono text-[12px] text-[var(--mwg-ink-45)]">
                          {product.standort.gps}
                        </p>
                      ) : null}
                      {product.standort.kartenlink ? (
                        <p className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                          <ExternalLink size={14} />
                          Karte öffnen
                        </p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </section>
        )}
      </div>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={product.gallery}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </div>
  );
}
