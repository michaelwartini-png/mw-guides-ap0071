import { Reveal } from "@/components/ui/Reveal";

interface Pillar {
  index: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    index: "01",
    title: "Außergewöhnliche Strecken",
    description:
      "Keine beliebigen Stadtführungen. Strecken, die selbst zur Sehenswürdigkeit werden.",
  },
  {
    index: "02",
    title: "Persönlich erfahren",
    description:
      "Jede Tour wird selbst gefahren, recherchiert und mehrfach getestet — nie von einer KI geschrieben.",
  },
  {
    index: "03",
    title: "Reisen wie ein Einheimischer",
    description:
      "Kein Reisebus, kein Hop-on-Hop-off. Echter öffentlicher Nahverkehr.",
  },
  {
    index: "04",
    title: "Slow Travel",
    description:
      "Weniger Orte. Mehr Geschichten, mehr Atmosphäre, mehr Erinnerung.",
  },
];

/**
 * "Warum MW Guides anders ist" (AP-002.0 v2.0). Carries the brief's four
 * differentiators (Extraordinary Journeys, Personally Experienced, Move
 * Like a Local, Slow Travel) as a quiet numbered list — deliberately
 * typographic rather than an icon grid, per "keine Icon-Wüsten".
 */
export function WhyMWGuides() {
  return (
    <section className="bg-[var(--mwg-black)] py-28 lg:py-40">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10">
        <Reveal className="max-w-[20ch]">
          <span className="mwg-eyebrow text-white/40">Warum anders</span>
          <h2 className="mwg-display-xl mt-5 text-white">
            Wir reisen zuerst.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-white/10 lg:mt-20">
          {pillars.map((pillar, i) => (
            <Reveal
              key={pillar.index}
              delayMs={i * 90}
              className="grid grid-cols-1 gap-2 border-b border-white/10 py-8 sm:grid-cols-12 sm:items-baseline sm:gap-6 lg:py-10"
            >
              <span className="font-mono text-[13px] text-white/35 sm:col-span-1">
                {pillar.index}
              </span>
              <h3 className="font-display text-[22px] font-medium text-white sm:col-span-4">
                {pillar.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-white/55 sm:col-span-6 sm:col-start-7">
                {pillar.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
