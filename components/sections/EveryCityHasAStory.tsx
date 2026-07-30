import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { RouteLine } from "@/components/hero/RouteLine";
import muralPhoto from "@/public/images/sections/every-city-mural-wide.webp";

/**
 * "Every city has a story", sits directly after the hero so the brand
 * statement lands before any tour is shown — deliberately quiet, one idea
 * per screen.
 *
 * AP-002.1: the plain black backdrop is now the real mural photo
 * (Guido van Helten, Wesendonkstraße) — urban storytelling made literal.
 * Layout, typography and the RouteLine motif are unchanged.
 */
export function EveryCityHasAStory() {
  return (
    <section className="relative overflow-hidden py-32 lg:py-44">
      <Image
        src={muralPhoto}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--mwg-black)]/70" aria-hidden="true" />
      <RouteLine />
      <div className="relative mx-auto max-w-[1240px] px-6 text-center lg:px-10">
        <Reveal className="mx-auto max-w-[16ch]">
          <span className="mwg-eyebrow text-white/40">Unsere Haltung</span>
          <h2 className="mwg-display-xl mt-5 text-white">
            Jede Stadt hat eine Geschichte.
          </h2>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="mx-auto mt-8 max-w-[46ch] text-[17px] leading-[1.7] text-white/60">
            Nicht nur Sehenswürdigkeiten. Architektur, Menschen, kleine
            Überraschungen abseits des Reiseführers — erzählt an der
            Stelle, an der sie tatsächlich passiert sind.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
