import Image from "next/image";
import { europeHero } from "@/content/europeEntry";

/**
 * AP-ET001 V1.1 — ET-01 hero. One photograph, quiet type, more left air.
 */
export function EuropeHero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
      <Image
        src={europeHero.image}
        alt={europeHero.imageAlt}
        fill
        priority
        sizes="100vw"
        className="mwg-hero-drift object-cover object-[center_45%]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/12 to-black/20"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1240px] px-8 pb-32 pt-32 lg:px-16 lg:pb-40 xl:px-20">
        <h1 className="mwg-display-hero max-w-[14ch] text-white">{europeHero.title}</h1>
        <p className="mt-7 max-w-[32ch] text-[clamp(1.05rem,0.95rem+0.45vw,1.35rem)] leading-snug text-white/90">
          {europeHero.subtitle}
        </p>
      </div>
    </section>
  );
}
