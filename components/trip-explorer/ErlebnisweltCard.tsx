import Image from "next/image";
import type { TripExplorerErlebniswelt } from "@/types/tripExplorer";

interface ErlebnisweltCardProps {
  welt: TripExplorerErlebniswelt;
}

/**
 * AP-010.1B — Editorial cover card for Trip Explorer Erlebniswelten.
 * Matches the landing-page treatment: image-first, title only.
 */
export function ErlebnisweltCard({ welt }: ErlebnisweltCardProps) {
  return (
    <article className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
      <Image
        src={welt.image}
        alt={welt.imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.04]"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/72 via-black/28 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-[clamp(1.125rem,1rem+0.35vw,1.5rem)] font-medium leading-[1.15] tracking-[-0.01em] text-white">
          {welt.title}
        </h3>
      </div>
    </article>
  );
}
