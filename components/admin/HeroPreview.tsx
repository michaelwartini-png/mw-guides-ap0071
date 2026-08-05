import type { HeroData } from "@/components/admin/heroData";

interface HeroPreviewProps {
  data: HeroData;
}

export function HeroPreview({ data }: HeroPreviewProps) {
  return (
    <div className="sticky top-6 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">Hero-Vorschau</p>

      <div className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-ink)] shadow-[0_20px_40px_-24px_rgba(26,26,24,0.45)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          {data.hasHeroImage ? (
            <div className="absolute inset-0 bg-gradient-to-br from-[#2f6f6f] via-[#1a4a4a] to-[var(--mwg-ink)]">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-mono text-[11px] uppercase tracking-wider text-white/40">
                  Hero-Bild
                </p>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--mwg-line)]">
              <p className="text-[13px] text-stone">Kein Hero-Bild</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            {data.badges.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {data.badges.map((badge) => (
                  <span
                    key={badge}
                    className={
                      badge === "Bestseller"
                        ? "rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--mwg-ink)]"
                        : "rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm"
                    }
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
            <h2 className="font-display text-xl font-medium leading-tight text-white">{data.titel}</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/80">{data.untertitel}</p>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[11px] uppercase tracking-wider text-white/50">MW Guides Score</p>
          <p className="mt-1 font-display text-2xl font-medium text-white">
            {data.score || "—"}
            <span className="text-base font-normal text-white/50"> / 10</span>
          </p>
        </div>
      </div>
    </div>
  );
}
