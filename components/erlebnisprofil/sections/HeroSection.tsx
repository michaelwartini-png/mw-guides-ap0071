import type { ReactNode } from "react";
import { Play } from "lucide-react";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import { HeroStatsCard } from "@/components/erlebnisprofil/HeroStatsCard";
import { RideGuideCta, type RideGuideCtaConfig } from "@/components/erlebnisprofil/RideGuideCta";
import type { ErlebnisprofilRenderMode } from "@/components/erlebnisprofil/types";
import { isLiveRideGuide } from "@/content/rideGuideCopy";

interface HeroSectionProps {
  product: Pick<
    ErlebnisprofilProduct,
    | "heroImage"
    | "heroImageAlt"
    | "badge"
    | "kategorie"
    | "regionen"
    | "title"
    | "subtitle"
    | "heroStats"
    | "rideGuideAvailable"
  >;
  mode?: ErlebnisprofilRenderMode;
  rideGuide?: RideGuideCtaConfig;
  introVideoLabel?: string;
  lead?: ReactNode;
  aside?: ReactNode;
}

export function HeroSection({
  product,
  mode = "website",
  rideGuide,
  introVideoLabel,
  lead,
  aside,
}: HeroSectionProps) {
  const showWebsiteHero = mode === "website";
  const heroAside =
    aside ??
    (showWebsiteHero && product.heroStats.length > 0 ? (
      <HeroStatsCard stats={product.heroStats} />
    ) : null);

  const showRideGuideCta = showWebsiteHero && isLiveRideGuide(rideGuide);

  return (
    <section className="relative min-h-[420px] overflow-hidden lg:min-h-[480px]">
      {product.heroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.heroImage}
          alt={product.heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-[var(--mwg-paper)]" />
      )}
      <div
        className={
          showWebsiteHero
            ? "absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20"
            : "absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25"
        }
      />

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-12 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-16">
        <div className={showWebsiteHero ? "max-w-[640px]" : "max-w-[680px]"}>
          {lead}

          {showWebsiteHero ? (
            product.badge ? (
              <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mwg-ink)]">
                {product.badge}
              </span>
            ) : null
          ) : (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {product.badge ? (
                <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mwg-ink)]">
                  {product.badge}
                </span>
              ) : null}
              {product.kategorie ? (
                <span className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/85">
                  {product.kategorie}
                </span>
              ) : null}
              {product.regionen.map((region) => (
                <span
                  key={region}
                  className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/85"
                >
                  {region}
                </span>
              ))}
            </div>
          )}

          <h1 className={`mwg-display-lg text-white ${showWebsiteHero ? "mt-4" : "mt-5"}`}>
            {product.title}
          </h1>
          <p
            className={
              showWebsiteHero
                ? "mt-4 max-w-[52ch] text-[16px] leading-relaxed text-white/85"
                : "mt-4 max-w-[52ch] text-[17px] leading-relaxed text-white/88"
            }
          >
            {product.subtitle}
          </p>

          {showRideGuideCta && rideGuide ? <RideGuideCta config={rideGuide} variant="hero" /> : null}

          {showWebsiteHero && introVideoLabel ? (
            <button
              type="button"
              className={`${showRideGuideCta ? "mt-4" : "mt-5"} inline-flex items-center gap-2 text-[13px] font-medium text-white/75 transition-colors hover:text-white`}
            >
              <Play size={14} fill="currentColor" />
              {introVideoLabel}
            </button>
          ) : null}
        </div>

        {heroAside}
      </div>
    </section>
  );
}
