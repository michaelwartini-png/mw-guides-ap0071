import Image from "next/image";
import type { TripExplorerHighlightCard } from "@/types/tripExplorer";

interface ExplorerImageCardProps {
  card: TripExplorerHighlightCard;
  /** Taller cards for the highlight ride guides row. */
  large?: boolean;
}

/**
 * Image-first card for Trip Explorer — title only, no details.
 * Used for Highlight Ride Guides and Besondere Erlebnisse.
 */
export function ExplorerImageCard({ card, large = false }: ExplorerImageCardProps) {
  return (
    <article
      className={`group relative block shrink-0 overflow-hidden rounded-sm ${
        large
          ? "aspect-[3/4] w-[72vw] sm:w-auto sm:aspect-[4/5]"
          : "aspect-[4/3]"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes={
            large
              ? "(min-width: 1024px) 20vw, 72vw"
              : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.06]"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
        <h3
          className={`font-display font-medium text-white ${
            large ? "text-[22px] sm:text-[26px]" : "text-[20px]"
          }`}
        >
          {card.title}
        </h3>
      </div>
    </article>
  );
}
