import { ArrowRight, Sun } from "lucide-react";
import type { MeineReiseDashboard } from "@/types/meineReise";

interface MeineReiseWetterProps {
  dashboard: MeineReiseDashboard;
}

/** AP-MR001 — weather module unchanged; static prototype values from the mockup. */
export function MeineReiseWetter({ dashboard }: MeineReiseWetterProps) {
  const { weather } = dashboard;

  return (
    <section
      id="wetter"
      className="scroll-mt-24 flex h-full flex-col rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5"
    >
      <h2 className="font-display text-[18px] font-medium">Wetter in {weather.location}</h2>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-display text-[40px] leading-none font-medium">{weather.temperature}°</p>
          <p className="mt-2 text-[14px] text-[var(--mwg-ink-70)]">{weather.condition}</p>
          <p className="mt-1 text-[12px] text-[var(--mwg-ink-45)]">Gefühlt {weather.feelsLike}°C</p>
        </div>
        <Sun size={48} strokeWidth={1.25} className="text-[var(--mwg-accent)]" />
      </div>
      <ul className="mt-5 grid grid-cols-3 gap-2 border-t border-[var(--mwg-line)] pt-4">
        {weather.forecast.map((day) => (
          <li key={day.label} className="text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--mwg-ink-45)]">{day.label}</p>
            <p className="mt-1 text-[13px] font-medium">
              {day.high}° <span className="text-[var(--mwg-ink-45)]">/{day.low}°</span>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] text-[var(--mwg-ink-45)]">{weather.attribution}</p>
      <a
        href="#wetter"
        className="mt-auto inline-flex items-center gap-1 pt-3 text-[13px] text-[var(--mwg-accent)] hover:underline"
      >
        Mehr anzeigen
        <ArrowRight size={13} />
      </a>
    </section>
  );
}
