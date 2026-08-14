import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  isLiveRideGuide,
  RIDE_GUIDE_CTA_LABEL,
  RIDE_GUIDE_HERO_HINT,
  type LiveRideGuide,
} from "@/content/rideGuideCopy";

export type RideGuideCtaConfig = {
  label: string;
  price: string;
  href?: string;
  disabled?: boolean;
};

interface RideGuideCtaProps {
  config: RideGuideCtaConfig;
  variant?: "hero" | "scoreBar";
}

function scoreLabel(config: LiveRideGuide) {
  return `${RIDE_GUIDE_CTA_LABEL} | ${config.price}`;
}

/** Renders nothing unless a live Ride Guide exists — no placeholders. */
export function RideGuideCta({ config, variant = "scoreBar" }: RideGuideCtaProps) {
  if (!isLiveRideGuide(config)) return null;

  if (variant === "hero") {
    return (
      <div className="mt-5 max-w-[46ch]">
        <Link
          href={config.href}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink)] transition-opacity hover:opacity-90"
        >
          {RIDE_GUIDE_CTA_LABEL}
          <ArrowRight size={14} />
        </Link>
        <p className="mt-3 text-[13px] leading-relaxed text-white/80">{RIDE_GUIDE_HERO_HINT}</p>
      </div>
    );
  }

  return (
    <Link
      href={config.href}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--mwg-ink)] px-6 py-3 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
    >
      {scoreLabel(config)}
      <ArrowRight size={16} />
    </Link>
  );
}
