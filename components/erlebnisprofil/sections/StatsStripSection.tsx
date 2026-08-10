import type { ErlebnisprofilStat } from "@/components/admin/products/erlebnisprofilProduct";

interface StatsStripSectionProps {
  stats: ErlebnisprofilStat[];
}

export function StatsStripSection({ stats }: StatsStripSectionProps) {
  if (stats.length === 0) return null;

  return (
    <section className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-x-8 gap-y-4 px-6 py-5 lg:px-10">
        {stats.slice(0, 4).map((stat) => (
          <div key={`${stat.label}-${stat.value}`} className="min-w-[120px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--mwg-ink-45)]">
              {stat.label}
            </p>
            <p className="mt-1 text-[15px] font-medium text-[var(--mwg-ink)]">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
