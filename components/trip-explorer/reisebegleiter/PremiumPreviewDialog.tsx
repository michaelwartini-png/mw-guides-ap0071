"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import type { ExplorerReview } from "@/types/explorerReview";
import type { PremiumPreview } from "@/types/reisebegleiter";
import { ReviewRouteSketch } from "@/components/trip-explorer/review/ReviewRouteSketch";

interface PremiumPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  preview: PremiumPreview;
  review: ExplorerReview;
  heroImage: string;
  heroImageAlt: string;
}

/** AP-ET005 — Teaser preview only, no full guide content. */
export function PremiumPreviewDialog({
  open,
  onClose,
  preview,
  review,
  heroImage,
  heroImageAlt,
}: PremiumPreviewDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--mwg-ink)]/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="premium-preview-title"
      onClick={onClose}
    >
      <div
        className="max-h-[min(90vh,840px)] w-full max-w-[720px] overflow-y-auto rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] shadow-[0_24px_60px_-24px_rgba(26,26,24,0.45)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-5 py-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-accent)]">Vorschau</p>
            <h2 id="premium-preview-title" className="mt-1 font-display text-[22px] font-medium">
              Ein Blick in den Premium Guide
            </h2>
            <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">Nur Ausschnitte — zum Appetit machen.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[var(--mwg-ink-45)] transition-colors hover:bg-[var(--mwg-paper)] hover:text-[var(--mwg-ink)]"
            aria-label="Vorschau schließen"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-5">
          <section className="overflow-hidden rounded-2xl border border-[var(--mwg-line)]">
            <div className="relative aspect-[16/8]">
              <Image src={heroImage} alt={heroImageAlt} fill className="object-cover" sizes="720px" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--mwg-ink)]/80 via-[var(--mwg-ink)]/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/70">Titelblatt</p>
                <p className="mt-1 font-display text-[24px] font-medium leading-tight">{preview.coverTitle}</p>
                <p className="mt-1 text-[13px] text-white/80">{preview.coverSubtitle}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-5">
            <h3 className="font-display text-[18px] font-medium">Inhaltsverzeichnis</h3>
            <ol className="mt-3 space-y-2">
              {preview.toc.map((entry, index) => (
                <li key={entry} className="flex items-baseline justify-between gap-4 text-[13px]">
                  <span>
                    <span className="mr-2 font-mono text-[11px] text-[var(--mwg-ink-45)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {entry}
                  </span>
                  <span className="text-[var(--mwg-ink-45)]">···</span>
                </li>
              ))}
            </ol>
          </section>

          {preview.samplePages.map((page) => (
            <section key={page.title} className="rounded-2xl border border-[var(--mwg-line)] p-5">
              <h3 className="font-display text-[18px] font-medium">{page.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">{page.excerpt}</p>
              <p className="mt-3 text-[12px] text-[var(--mwg-ink-45)]">
                Weitere Seiten und Details sind im Premium Guide enthalten.
              </p>
            </section>
          ))}

          <section className="overflow-hidden rounded-2xl border border-[var(--mwg-line)]">
            <div className="px-5 pt-5">
              <h3 className="font-display text-[18px] font-medium">Beispielkarte</h3>
              <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">Route im Überblick — als Grafik im Guide.</p>
            </div>
            <div className="px-2 pb-2 pt-1">
              <ReviewRouteSketch review={review} />
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-accent)]">
              {preview.insiderTip.title}
            </p>
            <p className="mt-2 text-[15px] leading-relaxed">{preview.insiderTip.body}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
