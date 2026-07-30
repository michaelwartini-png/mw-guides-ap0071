import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import aboutHeroPhoto from "@/public/images/about/about-hero.jpg";

/**
 * About page hero. Mirrors the homepage Hero's structure (full-bleed
 * photo + dark gradient + centered editorial type) so the two pages feel
 * like the same site, without introducing a new pattern.
 */
export function AboutHero() {
  return (
    <section className="relative flex h-[72vh] min-h-[480px] items-center overflow-hidden">
      <Image
        src={aboutHeroPhoto}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/75"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-6 lg:px-10">
        <Reveal>
          <span className="mwg-eyebrow text-white/50">Unsere Geschichte</span>
          <h1 className="mwg-display-xl mt-5 max-w-[16ch] text-white">
            Über MW Guides
          </h1>
        </Reveal>
      </div>
    </section>
  );
}
