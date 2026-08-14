import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

interface AboutCtaProps {
  paragraphs: string[];
}

export function AboutCta({ paragraphs }: AboutCtaProps) {
  return (
    <section className="bg-[var(--mwg-black)] py-28 text-center lg:py-40">
      <Reveal className="mx-auto max-w-[52ch] px-6 lg:px-10">
        {paragraphs.map((p, i) => (
          <p
            key={i}
            className={`text-[17px] leading-[1.75] text-white/70 ${i > 0 ? "mt-4" : ""}`}
          >
            {p}
          </p>
        ))}
        <div className="mt-10">
          <Button href="/explore-trips" variant="accent">
            Explore Trips entdecken
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
