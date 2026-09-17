import Image from "next/image";
import kustentramPhoto from "@/public/images/explore-trips/belgische-kueste.png";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxMedia } from "@/components/landing/ParallaxMedia";
import { landingCopy, type LandingLocale } from "@/content/landing";

export function LandingIdea({ locale }: { locale: LandingLocale }) {
  const copy = landingCopy[locale].idea;

  return (
    <section id={copy.id} className="scroll-mt-24">
      <div className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-36">
        <Reveal>
          <h2 className="mwg-display-xl max-w-[16ch]">
            {copy.headlineLines[0]}
          </h2>
          <p className="mwg-display-xl mt-2 max-w-[16ch] text-[var(--mwg-ink-45)]">
            {copy.headlineLines[1]}
          </p>
        </Reveal>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" />
          <Reveal delayMs={80} className="flex max-w-[38em] flex-col gap-6 lg:col-span-7">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </div>

      <div className="relative h-[52vh] min-h-[320px] overflow-hidden lg:h-[68vh]">
        <ParallaxMedia className="absolute -inset-[10%]">
          <Image
            src={kustentramPhoto}
            alt={copy.imageAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </ParallaxMedia>
      </div>
    </section>
  );
}
