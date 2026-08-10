import {
  getGalerieBildUsage,
  type GalerieUsageContext,
} from "@/components/admin/galerieUsage";
import type { GalerieBild } from "@/components/admin/galerieData";

interface GalerieVerwendetInProps {
  bild: GalerieBild;
  galerieItems: GalerieBild[];
  context: GalerieUsageContext;
  compact?: boolean;
}

/** AP-0018.3 — Zeigt, wo ein Galerie-Bild referenziert wird. */
export function GalerieVerwendetIn({
  bild,
  galerieItems,
  context,
  compact = false,
}: GalerieVerwendetInProps) {
  const usage = getGalerieBildUsage(bild, galerieItems, context);

  if (usage.length === 0) {
    return compact ? null : (
      <p className="text-[11px] text-stone">Noch nicht verwendet.</p>
    );
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-0.5">
        {usage.slice(0, 4).map((entry) => (
          <span
            key={entry.id}
            className="rounded bg-accent/10 px-1.5 py-0.5 text-[9px] font-medium text-accent"
          >
            ✓ {entry.label}
          </span>
        ))}
        {usage.length > 4 && (
          <span className="rounded bg-[var(--mwg-line)]/45 px-1.5 py-0.5 text-[9px] text-stone">
            +{usage.length - 4}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <p className="text-[12px] font-medium text-ink">Verwendet in</p>
      <ul className="space-y-1">
        {usage.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center gap-1.5 text-[12px] text-[var(--mwg-ink-70)]"
          >
            <span className="text-accent" aria-hidden="true">
              ✓
            </span>
            {entry.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
