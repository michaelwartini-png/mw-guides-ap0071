import Image from "next/image";
import Link from "next/link";
import heroPhoto from "@/public/images/reiseideen/neue-generation-hero.jpg";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxMedia } from "@/components/landing/ParallaxMedia";
import { landingCopy, type LandingLocale } from "@/content/landing";

export function LandingHero({ locale }: { locale: LandingLocale }) {
  const copy = landingCopy[locale].hero;

  return (
    <section className="grid min-h-[calc(100svh-76px)] bg-[var(--mwg-paper)] lg:grid-cols-2">
      <div className="order-2 flex items-center px-6 py-16 sm:px-10 lg:order-1 lg:py-0 lg:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] lg:pr-16">
        <Reveal className="max-w-[42rem]">
          <h1 className="font-display text-[clamp(2.35rem,1.2rem+2.6vw,3.9rem)] font-medium leading-[1.1] tracking-[-0.02em] text-[var(--mwg-ink)]">
            {copy.headlineLines[0]}
            <br />
            {copy.headlineLines[1]}
          </h1>
          <p className="mt-7 max-w-[28em] text-[16.5px] leading-[1.7] text-[var(--mwg-ink-70)]">
            {copy.subline}
          </p>
          <div className="mt-10">
            <Link
              href="#idee"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--mwg-ink)] px-7 py-3 text-[14.5px] font-medium text-[var(--mwg-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--mwg-ink)] hover:text-[var(--mwg-paper)]"
            >
              {copy.cta}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="relative order-1 min-h-[48vh] overflow-hidden lg:order-2 lg:min-h-full">
        <ParallaxMedia className="absolute -inset-[8%]">
          <Image
            src={heroPhoto}
            alt={copy.imageAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-[center_40%]"
          />
        </ParallaxMedia>
      </div>
    </section>
  );
}
