import Image from "next/image";
import type { StaticImageData } from "next/image";
import explorePhoto from "@/public/images/explore-trips/bodensee-natur.jpg";
import ridePhoto from "@/public/images/hero/homepage-hero.jpg";
import companionPhoto from "@/public/images/explore-trips/bodensee-konstanz.jpg";
import languagePhoto from "@/public/images/explore-trips/mailand-hero.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { landingCopy, type LandingLocale } from "@/content/landing";

const CARD_IMAGES: StaticImageData[] = [
  explorePhoto,
  ridePhoto,
  companionPhoto,
  languagePhoto,
];

export function LandingEmerging({ locale }: { locale: LandingLocale }) {
  const copy = landingCopy[locale].emerging;

  return (
    <section id={copy.id} className="scroll-mt-24 bg-[var(--mwg-paper)]">
      <div className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36">
        <Reveal>
          <p className="mwg-eyebrow text-[var(--mwg-accent)]">{copy.eyebrow}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {copy.cards.map((card, index) => (
            <Reveal key={card.id} delayMs={index * 70}>
              <article
                id={card.id}
                className="group scroll-mt-28 overflow-hidden rounded-[4px] bg-[var(--mwg-paper-raised)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={CARD_IMAGES[index]}
                    alt={card.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="px-6 py-7 sm:px-8 sm:py-8">
                  <h3 className="font-display text-[26px] font-medium tracking-tight text-[var(--mwg-ink)]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-[28em] text-[15.5px] leading-[1.65] text-[var(--mwg-ink-70)]">
                    {card.sentence}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
