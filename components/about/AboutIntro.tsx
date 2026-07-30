import { Reveal } from "@/components/ui/Reveal";

interface AboutIntroProps {
  paragraphs: string[];
}

export function AboutIntro({ paragraphs }: AboutIntroProps) {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-24 lg:px-10 lg:py-36">
      <Reveal className="mx-auto max-w-[68ch]">
        <span className="mwg-eyebrow text-[var(--mwg-accent)]">Über MW Guides</span>
        <div className="mt-7 space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="max-w-[68ch] text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
