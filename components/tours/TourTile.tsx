import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Tour } from "@/types/tour";
import {
  WienTramIllustration,
  KuestentramIllustration,
  BrueggeIllustration,
} from "@/components/tours/illustrations";
import schwebebahnPhoto from "@/public/images/tours/schwebebahn-tile.jpg";

interface TourTileProps {
  tour: Tour;
  /** Large tile gets a taller aspect ratio and bigger type in the asymmetric grid. */
  large?: boolean;
  /** Fills the height of its grid row instead of using a fixed aspect ratio (used when stacked beside the large tile on larger screens). */
  fill?: boolean;
}

/**
 * Real photography, where available. AP-002.1: Schwebebahn is the first
 * tour with real photography — see README "Offene Punkte" for the other
 * three, which still use the bespoke illustration below.
 */
const PHOTOS: Partial<Record<string, typeof schwebebahnPhoto>> = {
  schwebebahn: schwebebahnPhoto,
};

/**
 * Illustration fallback for tours without real photography yet. Swap any
 * remaining entry for a photo once available — the surrounding tile
 * markup does not need to change (see PHOTOS above for the pattern).
 */
const ILLUSTRATIONS: Record<string, () => React.ReactNode> = {
  "wien-linie-d": () => <WienTramIllustration />,
  kuestentram: () => <KuestentramIllustration />,
  bruegge: () => <BrueggeIllustration />,
};

export function TourTile({ tour, large = false, fill = false }: TourTileProps) {
  const photo = PHOTOS[tour.slug];
  const Illustration = ILLUSTRATIONS[tour.slug];

  const aspectClasses = large
    ? "aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5]"
    : fill
      ? "aspect-[4/3] lg:aspect-auto lg:h-full"
      : "aspect-[4/3]";

  return (
    <Link
      href={`/touren/${tour.slug}`}
      className={`group relative block overflow-hidden rounded-sm ${aspectClasses}`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="h-full w-full transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.06]">
          {photo ? (
            <Image
              src={photo}
              alt=""
              fill
              sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
              className="object-cover"
            />
          ) : Illustration ? (
            <Illustration />
          ) : null}
        </div>
      </div>

      {/* Legibility gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <span className="mwg-eyebrow text-white/60">{tour.place}</span>
        <h3
          className={`mt-2 font-display font-medium text-white ${
            large ? "text-[28px] sm:text-[34px]" : "text-[22px]"
          }`}
        >
          {tour.title}
        </h3>
        <p className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-white/75">
          {tour.story}
        </p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Tour entdecken <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
