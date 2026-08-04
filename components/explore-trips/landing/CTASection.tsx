import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  image: string;
  imageAlt: string;
  headline: string;
  subtitle: string;
  explorerHref: string;
  buttonLabel?: string;
  buttonSubtext?: string;
}

/** AP-010.2 — Section 7: closing panorama banner with Trip Explorer CTA. */
export function CTASection({
  image,
  imageAlt,
  headline,
  subtitle,
  explorerHref,
  buttonLabel = "Trip Explorer öffnen",
  buttonSubtext,
}: CTASectionProps) {
  return (
    <section className="relative min-h-[520px] overflow-hidden lg:min-h-[560px]">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/30"
          aria-hidden="true"
        />
      </div>

      <div className="relative mx-auto flex min-h-[520px] max-w-[1240px] flex-col items-start justify-center gap-10 px-6 py-20 lg:min-h-[560px] lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-10 lg:py-24">
        <Reveal className="max-w-[480px]">
          <h2 className="mwg-display-xl text-white">{headline}</h2>
          <p className="mt-5 max-w-[42ch] text-[16px] leading-relaxed text-white/85">
            {subtitle}
          </p>
        </Reveal>

        <Reveal delayMs={80} className="flex flex-col items-start lg:items-end">
          <Button
            href={explorerHref}
            variant="accent"
            className="px-10 py-4 text-[16px] shadow-[0_8px_32px_-8px_rgba(47,111,111,0.55)]"
          >
            {buttonLabel}
            <ChevronRight size={18} className="ml-0.5" />
          </Button>
          {buttonSubtext && (
            <p className="mt-3 max-w-[28ch] text-[13px] leading-relaxed text-white/70 lg:text-right">
              {buttonSubtext}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
