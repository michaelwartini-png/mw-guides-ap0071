import Link from "next/link";
import { ArrowUpRight, LayoutGrid } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TripExplorerHero } from "@/components/trip-explorer/TripExplorerHero";
import { ErlebnisweltCard } from "@/components/trip-explorer/ErlebnisweltCard";
import { ExplorerImageCard } from "@/components/trip-explorer/ExplorerImageCard";
import type { TripExplorer } from "@/types/tripExplorer";

interface TripExplorerViewProps {
  explorer: TripExplorer;
  tripTitle: string;
  /** When true, render the compact list variant. */
  compact?: boolean;
}

export function TripExplorerView({ explorer, tripTitle, compact = false }: TripExplorerViewProps) {
  if (compact) {
    return (
      <>
        <div className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-6 py-8 lg:px-10">
          <div className="mx-auto max-w-[1240px]">
            <span className="mwg-eyebrow text-[var(--mwg-accent)]">Trip Explorer Kompakt</span>
            <h1 className="mwg-display-lg mt-3">{explorer.heroTitle}</h1>
            <p className="mt-3 max-w-[50ch] text-[15px] text-[var(--mwg-ink-70)]">
              {explorer.heroSubtitle}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10">
          {explorer.erlebniswelten.map((welt, i) => (
            <Reveal key={welt.slug} delayMs={i * 40}>
              <div className="border-b border-[var(--mwg-line)] py-5 first:pt-0 last:border-b-0">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-[20px] font-medium">{welt.title}</h2>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--mwg-accent)]">
                    {welt.experienceCount}
                  </span>
                </div>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
                  {welt.description}
                </p>
              </div>
            </Reveal>
          ))}

          <Reveal className="mt-12 text-center">
            <Button href={`/explore-trips/${explorer.tripSlug}/explorer`} variant="accent">
              Vollständigen Trip Explorer öffnen
            </Button>
          </Reveal>
        </div>
      </>
    );
  }

  return (
    <>
      <TripExplorerHero
        title={explorer.heroTitle}
        subtitle={explorer.heroSubtitle}
        image={explorer.heroImage}
        imageAlt={explorer.heroImageAlt}
      />

      {/* Erlebniswelten */}
      <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Erlebniswelten</span>
          <h2 className="mwg-display-lg mt-4 max-w-[22ch]">
            Entdecke, was der Bodensee zu bieten hat.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {explorer.erlebniswelten.map((welt, i) => (
            <Reveal key={welt.slug} delayMs={i * 60}>
              <ErlebnisweltCard welt={welt} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Highlight Ride Guides */}
      <section className="border-y border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
          <Reveal>
            <span className="mwg-eyebrow text-[var(--mwg-accent)]">Highlight Ride Guides</span>
            <h2 className="mwg-display-lg mt-4 max-w-[24ch]">
              Die Klassiker — als Karten zum Entdecken.
            </h2>
          </Reveal>

          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="mt-10 flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0 lg:grid-cols-5 lg:gap-5 [&::-webkit-scrollbar]:hidden">
            {explorer.highlightRideGuides.map((card, i) => (
              <Reveal key={card.slug} delayMs={i * 70} className="sm:contents">
                <ExplorerImageCard card={card} large />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Besondere Erlebnisse */}
      <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
        <Reveal>
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Besondere Erlebnisse</span>
          <h2 className="mwg-display-lg mt-4 max-w-[20ch]">
            Momente, die bleiben.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {explorer.besondereErlebnisse.map((card, i) => (
            <Reveal key={card.slug} delayMs={i * 70}>
              <ExplorerImageCard card={card} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Kompakt CTA + back link */}
      <section className="border-t border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] py-20 lg:py-28">
        <div className="mx-auto max-w-[1240px] px-6 text-center lg:px-10">
          <Reveal>
            <LayoutGrid size={28} className="mx-auto text-[var(--mwg-accent)]" strokeWidth={1.5} />
            <h2 className="mwg-display-lg mx-auto mt-6 max-w-[20ch]">
              Alles auf einen Blick?
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
              Die kompakte Übersicht aller Erlebniswelten — ohne Bilder, zum schnellen Orientieren.
            </p>
            <div className="mt-8">
              <Button
                href={`/explore-trips/${explorer.tripSlug}/explorer/kompakt`}
                variant="accent"
              >
                Trip Explorer Kompakt öffnen
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-10">
        <Link
          href={`/explore-trips/${explorer.tripSlug}`}
          className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
        >
          Zurück zu {tripTitle}
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>
    </>
  );
}
