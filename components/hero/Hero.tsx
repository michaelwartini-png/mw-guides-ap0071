import { Button } from "@/components/ui/Button";
import { RouteLine } from "@/components/hero/RouteLine";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { Reveal } from "@/components/ui/Reveal";

/**
 * AP-008.1: the CTA previously read "Touren entdecken" and linked to
 * `#touren` (the Ride Guides section) — a label from before the Ride
 * Guides rename, and a link that silently skipped past Explore Trips,
 * undermining AP-007's "Inspiration before product" homepage order. Now
 * points to Explore Trips (`#explore-trips`, added in ExploreTripsSection)
 * with wording that doesn't presuppose either content world.
 */
export function Hero() {
  return (
    <section className="relative flex h-[100svh] min-h-[640px] items-center overflow-hidden">
      {/* videoSrc intentionally omitted until real footage/cinemagraph is produced — see component doc comment */}
      <HeroBackground />
      <RouteLine />

      <div className="relative mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <Reveal className="max-w-[880px]">
          <h1 className="mwg-display-hero text-white">
            Reisen jenseits
            <br />
            des Reiseführers.
          </h1>
          <div className="mt-10">
            <Button href="#explore-trips" variant="accent">
              Reisen entdecken
            </Button>
          </div>
        </Reveal>
      </div>

      {/* Quiet scroll cue — the hero's only secondary element, purely orientational */}
      <div
        className="absolute bottom-9 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        aria-hidden="true"
      >
        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45">
          Scroll
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-white/45 to-transparent" />
      </div>
    </section>
  );
}
