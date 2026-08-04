import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ExploreTripLandingRideGuide } from "@/types/exploreTrip";

interface RideGuideCardProps {
  guide: ExploreTripLandingRideGuide;
}

/** AP-010.2 — Ride Guide product card: image, title, description, duration, price, status. */
export function RideGuideCard({ guide }: RideGuideCardProps) {
  const cardClass =
    "group flex w-[250px] flex-col overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] transition-all duration-300 hover:border-[var(--mwg-line)] hover:shadow-[0_20px_44px_-14px_rgba(26,26,24,0.18)] motion-safe:hover:-translate-y-0.5 sm:w-[270px]";

  const statusLabel =
    guide.status ?? (guide.available ? undefined : "Bald verfügbar");

  const inner = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={guide.image}
          alt={guide.imageAlt}
          fill
          sizes="270px"
          className={`object-cover transition-transform duration-700 ease-out ${
            guide.available
              ? "motion-safe:group-hover:scale-[1.05]"
              : "opacity-85 saturate-[0.92]"
          }`}
        />
        <span className="absolute left-3 top-3 rounded-md bg-[var(--mwg-accent)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-white">
          Ride Guide
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        <h3 className="font-display text-[18px] font-medium leading-snug">{guide.title}</h3>
        {guide.description && (
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
            {guide.description}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="text-[13px] leading-snug text-[var(--mwg-ink-70)]">
            {guide.duration && <p>{guide.duration}</p>}
            {guide.format && <p className="mt-0.5">{guide.format}</p>}
          </div>
          {guide.price ? (
            <p className="flex items-center gap-0.5 font-display text-[18px] font-medium text-[var(--mwg-accent)]">
              {guide.price}
              <ChevronRight size={16} className="opacity-70" />
            </p>
          ) : (
            statusLabel && (
              <p className="text-[12px] font-medium uppercase tracking-[0.06em] text-[var(--mwg-ink-70)]">
                {statusLabel}
              </p>
            )
          )}
        </div>
      </div>
    </>
  );

  if (guide.available && guide.tourSlug) {
    return (
      <Link href={`/touren/${guide.tourSlug}`} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}
