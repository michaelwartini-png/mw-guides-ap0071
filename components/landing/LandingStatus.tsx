import Image from "next/image";
import shipPhoto from "@/public/images/explore-trips/bodensee-schifffahrt.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxMedia } from "@/components/landing/ParallaxMedia";
import { landingCopy, type LandingLocale } from "@/content/landing";

export function LandingStatus({ locale }: { locale: LandingLocale }) {
  const copy = landingCopy[locale].status;

  return (
    <section id={copy.id} className="relative scroll-mt-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <ParallaxMedia className="absolute -inset-[8%]">
          <Image
            src={shipPhoto}
            alt={copy.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </ParallaxMedia>
        <div className="absolute inset-0 z-[1] bg-[var(--mwg-ink)]/55" aria-hidden="true" />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-t from-[var(--mwg-ink)]/70 via-transparent to-[var(--mwg-ink)]/40"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-[2] mx-auto max-w-[760px] px-6 py-32 text-center lg:py-40">
        <Reveal>
          <h2 className="mwg-display-lg text-white [text-shadow:0_2px_28px_rgba(14,14,13,0.45)]">{copy.headline}</h2>
          <div className="mx-auto mt-8 flex max-w-[36em] flex-col gap-4">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[16.5px] leading-[1.7] text-white/90 [text-shadow:0_1px_16px_rgba(14,14,13,0.4)]">
                {paragraph}
              </p>
            ))}
          </div>
          <p className="mwg-eyebrow mt-14 text-white/80 [text-shadow:0_1px_16px_rgba(14,14,13,0.4)]">{copy.comingSoon}</p>
        </Reveal>
      </div>
    </section>
  );
}
