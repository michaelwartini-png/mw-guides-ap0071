import Image from "next/image";
import type { ExploreTripConceptIllustration } from "@/types/exploreTrip";

interface IllustrationMapProps extends ExploreTripConceptIllustration {}

const MAP_FRAME =
  "relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--mwg-line)] bg-[#fdf8f0] shadow-[0_16px_52px_-18px_rgba(26,26,24,0.16),0_4px_16px_-6px_rgba(26,26,24,0.08)]";

/** Designprinzip 01 — narrative concept illustration (the visual signature of an Explore Trip). */
export function IllustrationMap({ src, alt }: IllustrationMapProps) {
  return (
    <figure className="w-full">
      <div className={MAP_FRAME}>
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-contain object-center"
        />
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
