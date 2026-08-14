import { Building2, Calendar, Clock, Euro, Route } from "lucide-react";
import type {
  ErlebnisprofilHeroStat,
  ErlebnisprofilHeroStatIcon,
} from "@/components/admin/products/erlebnisprofilProduct";

const STAT_ICONS: Record<ErlebnisprofilHeroStatIcon, typeof Clock> = {
  clock: Clock,
  calendar: Calendar,
  euro: Euro,
  building: Building2,
  route: Route,
};

interface HeroStatsCardProps {
  stats: ErlebnisprofilHeroStat[];
}

export function HeroStatsCard({ stats }: HeroStatsCardProps) {
  if (stats.length === 0) return null;

  return (
    <div className="w-full min-w-[280px] rounded-xl border border-white/15 bg-[var(--mwg-ink)]/90 p-5 backdrop-blur-md lg:w-[320px]">
      <ul className="space-y-3">
        {stats.map((stat) => {
          const Icon = STAT_ICONS[stat.icon];
          return (
            <li key={`${stat.label}-${stat.value}`} className="flex items-start gap-3 text-white">
              <Icon size={16} className="mt-0.5 shrink-0 text-white/70" strokeWidth={1.5} />
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/55">{stat.label}</p>
                <p className="text-[14px] font-medium">{stat.value}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
