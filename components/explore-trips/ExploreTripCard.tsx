import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { ExploreTrip } from "@/types/exploreTrip";

interface ExploreTripCardProps {
  trip: ExploreTrip;
}

/**
 * Explore Trip card — visually related to TourTile (same rounded
 * corners, hover zoom, ArrowUpRight cue) but without price/duration/
 * badges, since these are inspiration pieces, not bookable products.
 * Migrated from the former Reiseideen IdeaCard (AP-002.2) — visuals
 * unchanged.
 *
 * AP-008.2: the card previously always showed `teaser` — a neutral,
 * descriptive line ("Zwei Hauptstädte, ein Fluss…"). Per the brief, the
 * card itself should already signal *why the concept is special*, not
 * just what the destination is. Trips with a `subtitle` (the short
 * principle claim, e.g. "Ein Hotel. Unzählige Möglichkeiten.") now show
 * that instead, set in the display typeface so it reads as a statement
 * rather than a caption. Trips without one (the three original
 * Schwebebahn articles) fall back to `teaser` exactly as before — no
 * visual change for them.
 */
export function ExploreTripCard({ trip }: ExploreTripCardProps) {
  const conceptLine = trip.subtitle;

  return (
    <Link
      href={`/explore-trips/${trip.slug}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-sm"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={trip.heroImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.06]"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
        <h3 className="font-display text-[20px] font-medium leading-snug text-white">
          {trip.title}
        </h3>
        {conceptLine ? (
          <p className="mt-2 max-w-[30ch] font-display text-[15px] italic leading-relaxed text-white/85">
            {conceptLine}
          </p>
        ) : (
          <p className="mt-2 max-w-[34ch] text-[13.5px] leading-relaxed text-white/75">
            {trip.teaser}
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Entdecken <ArrowUpRight size={14} />
        </span>
      </div>
    </Link>
  );
}
