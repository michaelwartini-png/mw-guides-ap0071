import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import wupperKidsPhoto from "@/public/images/sections/traveler-moments-wupper-kids.jpg";

const notes = [
  "Dieselbe Strecke fahren wir mehrfach — Licht, Jahreszeit und Zugtakt verändern sich jedes Mal.",
  "Sitzplatz und Blickrichtung entscheiden, ob ein Moment im Fenster ankommt oder verpasst wird.",
  "Jede Geschichte wird vor Ort recherchiert, nicht aus zweiter Hand übernommen.",
  "Nach jeder Fahrt überarbeitet, nie nur einmal aufgenommen.",
];

/**
 * Closing section before the footer. The brief asks for a "Community /
 * Traveler Moments" block with a social-proof feel — implemented here as
 * honest process notes rather than fabricated customer testimonials or
 * quotes, since no real traveler content exists yet. Real
 * testimonials/UGC belong here once available — see
 * docs/AP-002.0-content-wishlist.md.
 *
 * AP-002.1: paired the heading with the real, candid Wupper photo — an
 * authentic moment rather than a posed/stock shot, per the brief.
 * AP-002: notes now directly answer the brief's storytelling questions
 * (route repetition, seat/viewing direction, research) and link through
 * to the in-depth Reiseidee that unpacks the first point with real photos.
 */
export function TravelerMoments() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-7">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Wie wir arbeiten</span>
          <h2 className="mwg-display-xl mt-5 max-w-[18ch]">So entsteht eine Tour.</h2>
        </Reveal>
        <Reveal delayMs={100} className="lg:col-span-4 lg:col-start-9">
          <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-sm">
            <Image
              src={wupperKidsPhoto}
              alt=""
              fill
              sizes="280px"
              className="object-cover"
            />
          </div>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-10">
        {notes.map((note, i) => (
          <Reveal key={note} delayMs={i * 100} className="border-t border-[var(--mwg-line)] pt-6">
            <p className="text-[15.5px] leading-relaxed text-[var(--mwg-ink-70)]">
              {note}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delayMs={400} className="mt-12">
        <Link
          href="/explore-trips/warum-wir-dieselbe-kurve-immer-wieder-fahren"
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
        >
          Mehr über unsere Arbeitsweise
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}
