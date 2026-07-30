import { Reveal } from "@/components/ui/Reveal";

/**
 * "Die große Idee" (AP-002.0 v2.0). Lands the core positioning within the
 * first screens: MW Guides doesn't sell audio guides or attractions —
 * it sells the journey itself. Deliberately just two short statements,
 * no bullet points, no feature talk.
 */
export function BrandIdea() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10 lg:py-40">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Die Idee</span>
        </Reveal>
        <Reveal delayMs={100} className="lg:col-span-7">
          <p className="mwg-display-xl max-w-[18ch]">
            Andere verkaufen die Attraktion.
          </p>
          <p className="mwg-display-xl mt-2 max-w-[18ch] text-[var(--mwg-ink-45)]">
            Wir verkaufen die Reise selbst.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
