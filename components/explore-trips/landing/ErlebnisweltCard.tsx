import Image from "next/image";
import Link from "next/link";
import type { TripExplorerErlebniswelt } from "@/types/tripExplorer";

interface ErlebnisweltCardProps {
  welt: TripExplorerErlebniswelt;
  href?: string;
}

/**
 * AP-010.1B — Editorial cover card: image-first, title only,
 * bottom-weighted gradient. No icons, no catalog copy.
 */
export function ErlebnisweltCard({ welt, href }: ErlebnisweltCardProps) {
  const cardClass =
    "group relative aspect-[3/4] w-[78vw] shrink-0 overflow-hidden rounded-2xl sm:w-auto sm:aspect-[4/5]";

  const inner = (
    <>
      <Image
        src={welt.image}
        alt={welt.imageAlt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 78vw"
        className="object-cover transition-transform duration-[1200ms] ease-out motion-safe:group-hover:scale-[1.04]"
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black/70 via-black/22 to-transparent"
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="font-display text-[clamp(1.25rem,1.1rem+0.45vw,1.625rem)] font-medium leading-[1.12] tracking-[-0.015em] text-white">
          {welt.title}
        </h3>
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cardClass}>
        {inner}
      </Link>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}
