import type { HeroBadge } from "@/components/admin/heroData";

export type HeroPreviewContent = {
  titel: string;
  untertitel: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  mwgScore: string;
  badges: HeroBadge[];
};

interface HeroPreviewProps {
  content: HeroPreviewContent;
}

export function HeroPreview({ content }: HeroPreviewProps) {
  const { titel, untertitel, heroImageUrl, heroImageAlt, mwgScore, badges } = content;

  return (
    <div className="sticky top-6 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">Hero-Vorschau</p>
      <p className="text-[12px] leading-relaxed text-stone">
        Vorschau aus dem Erlebnisbaustein — Badge und Darstellung konfigurieren Sie links.
      </p>

      <div className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-ink)] shadow-[0_20px_40px_-24px_rgba(26,26,24,0.45)]">
        <div className="relative aspect-[4/3] overflow-hidden">
          {heroImageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageUrl}
                alt={heroImageAlt || titel || "Hero-Bild"}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--mwg-line)]">
              <p className="text-center text-[13px] text-stone">
                Kein Hero-Bild
                <br />
                <span className="text-[11px]">Galerie · Kategorie Hero</span>
              </p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-5">
            {badges.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-1.5">
                {badges.map((badge) => (
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
            <h2 className="font-display text-xl font-medium leading-tight text-white">
              {titel || "Titel aus Allgemein"}
            </h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-white/80">
              {untertitel || "Untertitel aus Allgemein"}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-[11px] uppercase tracking-wider text-white/50">MW Guides Score</p>
          <p className="mt-1 font-display text-2xl font-medium text-white">
            {mwgScore || "—"}
            <span className="text-base font-normal text-white/50"> / 10</span>
          </p>
          <p className="mt-1 text-[11px] text-white/40">Quelle: Bewertungen</p>
        </div>
      </div>
    </div>
  );
}
