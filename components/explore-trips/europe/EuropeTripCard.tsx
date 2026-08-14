import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { EuropeEntryTrip } from "@/content/europeEntry";
import { EuropeTripStatusBadge } from "@/components/explore-trips/europe/EuropeTripStatusBadge";

interface EuropeTripCardProps {
  trip: EuropeEntryTrip;
}

/** AP-ET001 V1.1 — photo card with forest-green body. */
export function EuropeTripCard({ trip }: EuropeTripCardProps) {
  const clickable = Boolean(trip.href) && trip.status !== "planned";

  const inner = (
    <>
      <span className="relative block aspect-[4/3] overflow-hidden">
        {trip.heroImage ? (
          <Image
            src={trip.heroImage}
            alt={trip.heroImageAlt ?? ""}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
            className={`object-cover ${
              clickable
                ? "transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.05]"
                : "opacity-80"
            }`}
          />
        ) : (
          <span className="absolute inset-0 bg-[color-mix(in_srgb,var(--mwg-paper)_70%,var(--mwg-ink)_8%)]" />
        )}
        <span className="absolute left-3.5 top-3.5">
          <EuropeTripStatusBadge status={trip.status} />
        </span>
      </span>
      <span className="flex flex-1 flex-col bg-[var(--mwg-accent)] px-6 py-6">
        <h3 className="font-display text-[24px] font-medium leading-snug tracking-[-0.015em] text-white">
          {trip.title}
        </h3>
        <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-white/80">{trip.teaser}</p>
        {clickable && (
          <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white">
            Explore Trip öffnen
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        )}
      </span>
    </>
  );

  const frame =
    "group relative flex h-full flex-col overflow-hidden rounded-xl bg-[var(--mwg-accent)] shadow-[0_18px_44px_-22px_rgba(26,26,24,0.45)] transition-shadow duration-500 hover:shadow-[0_22px_52px_-20px_rgba(26,26,24,0.5)]";

  if (clickable && trip.href) {
    return (
      <Link href={trip.href} className={frame}>
        {inner}
      </Link>
    );
  }

  return <div className={frame}>{inner}</div>;
}
