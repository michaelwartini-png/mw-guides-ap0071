import type { ReactNode } from "react";
import {
  getActiveBilder,
  getBilderByKategorie,
  getHeroVorschauBild,
  getKategorieLabel,
  VORSCHAU_KATEGORIEN,
  type BildKategorie,
  type GalerieBild,
  type GalerieData,
} from "@/components/admin/galerieData";
import { cn } from "@/lib/cn";

interface GaleriePreviewProps {
  data: GalerieData;
  onNavigateToBild?: (id: string) => void;
  focusedBildId?: string | null;
}

function BildThumb({
  src,
  alt,
  titel,
  className,
  dimmed = false,
}: {
  src: string;
  alt: string;
  titel: string;
  className?: string;
  dimmed?: boolean;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5",
          className,
        )}
      >
        <p className="font-mono text-[9px] uppercase tracking-wider text-stone">Kein Bild</p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt || titel}
      className={cn("object-cover", dimmed && "opacity-50 grayscale-[30%]", className)}
    />
  );
}

export function SterneAnzeige({ count, size = "sm" }: { count: number; size?: "sm" | "xs" }) {
  if (count <= 0) return null;
  return (
    <span
      className={cn("text-accent", size === "xs" ? "text-[10px]" : "text-[11px]")}
      aria-label={`${count} von 5 Sternen`}
    >
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export function BildscoreAnzeige({
  sternBewertung,
  mwGuidesBildscore,
  compact = false,
  inline = false,
}: {
  sternBewertung: number;
  mwGuidesBildscore: number;
  compact?: boolean;
  inline?: boolean;
}) {
  if (sternBewertung <= 0 && mwGuidesBildscore <= 0) {
    return compact ? null : (
      <span className="text-[10px] text-stone">Kein Score</span>
    );
  }

  return (
    <div
      className={cn(
        inline ? "flex flex-wrap items-center gap-2" : "space-y-0.5",
        compact && !inline && "space-y-0",
      )}
    >
      <SterneAnzeige count={sternBewertung} size={compact ? "xs" : "sm"} />
      {mwGuidesBildscore > 0 && (
        <div className={cn("flex items-center gap-1.5", inline && "min-w-[72px]")}>
          <div
            className={cn(
              "h-1 overflow-hidden rounded-full bg-[var(--mwg-line)]",
              compact ? "w-14" : "w-16",
            )}
          >
            <div
              className="h-full rounded-full bg-accent transition-[width] duration-200"
              style={{ width: `${mwGuidesBildscore}%` }}
            />
          </div>
          <span className="text-[10px] font-medium tabular-nums text-stone">{mwGuidesBildscore}%</span>
        </div>
      )}
    </div>
  );
}

export function BildStatusBadges({
  bild,
  isHero,
  compact = false,
}: {
  bild: GalerieBild;
  isHero: boolean;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {isHero && (
        <span className="rounded bg-accent/12 px-1.5 py-0.5 text-[10px] font-medium text-accent">
          ⭐ Hero
        </span>
      )}
      {bild.pflichtbild && (
        <span className="rounded bg-accent/12 px-1.5 py-0.5 text-[10px] font-medium text-accent">
          📌 Pflicht
        </span>
      )}
      <span
        className={cn(
          "rounded px-1.5 py-0.5 text-[10px] font-medium",
          bild.aktiv ? "bg-emerald-500/10 text-emerald-800" : "bg-stone/10 text-stone",
        )}
      >
        {bild.aktiv ? "● Aktiv" : "○ Inaktiv"}
      </span>
      {!compact && bild.mwGuidesBildscore > 0 && (
        <span className="rounded bg-[var(--mwg-line)]/70 px-1.5 py-0.5 text-[10px] tabular-nums text-stone">
          Score {bild.mwGuidesBildscore}%
        </span>
      )}
    </div>
  );
}

function KategoriePills({ kategorien, max = 6 }: { kategorien: BildKategorie[]; max?: number }) {
  const visible = kategorien.slice(0, max);
  const rest = kategorien.length - visible.length;

  return (
    <div className="flex flex-wrap gap-0.5">
      {visible.map((kat) => (
        <span
          key={kat}
          className="rounded bg-[var(--mwg-line)]/50 px-1.5 py-0.5 text-[9px] text-stone"
        >
          {getKategorieLabel(kat)}
        </span>
      ))}
      {rest > 0 && (
        <span className="rounded bg-[var(--mwg-line)]/50 px-1.5 py-0.5 text-[9px] text-stone">
          +{rest}
        </span>
      )}
    </div>
  );
}

function NavigableBild({
  bild,
  onNavigate,
  isFocused,
  children,
  className,
  meta,
}: {
  bild: GalerieBild;
  onNavigate?: (id: string) => void;
  isFocused?: boolean;
  children: ReactNode;
  className?: string;
  meta?: ReactNode;
}) {
  if (!onNavigate) {
    return <div className={className}>{children}</div>;
  }

  const isHero = bild.kategorien.includes("hero");

  return (
    <button
      type="button"
      onClick={() => onNavigate(bild.id)}
      className={cn(
        "group w-full cursor-pointer overflow-hidden rounded-lg border text-left transition-all hover:border-accent/50",
        isFocused
          ? "border-accent bg-accent/5 ring-2 ring-accent/35 shadow-sm"
          : "border-[var(--mwg-line)]",
        className,
      )}
      title={`${bild.titel || "Bild"} im Editor öffnen`}
    >
      {children}
      {meta ?? (
        <div className="space-y-1 border-t border-[var(--mwg-line)]/60 bg-paper/80 px-2 py-1.5">
          <p className="truncate text-[11px] font-medium text-ink">{bild.titel || "Ohne Titel"}</p>
          <BildStatusBadges bild={bild} isHero={isHero} compact />
          <BildscoreAnzeige
            sternBewertung={bild.sternBewertung}
            mwGuidesBildscore={bild.mwGuidesBildscore}
            compact
            inline
          />
          <KategoriePills kategorien={bild.kategorien} max={4} />
        </div>
      )}
    </button>
  );
}

function KategorieSektion({
  kategorie,
  bilder,
  onNavigate,
  focusedBildId,
}: {
  kategorie: BildKategorie;
  bilder: GalerieBild[];
  onNavigate?: (id: string) => void;
  focusedBildId?: string | null;
}) {
  if (bilder.length === 0) return null;

  return (
    <section>
      <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-stone">
        {getKategorieLabel(kategorie)} ({bilder.length})
      </p>
      <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-0.5">
        {bilder.map((bild) => (
          <NavigableBild
            key={bild.id}
            bild={bild}
            onNavigate={onNavigate}
            isFocused={focusedBildId === bild.id}
            className="w-[4.75rem] shrink-0"
            meta={
              <p className="truncate px-1 py-1 text-[8px] text-stone group-hover:text-ink">
                {bild.titel || "—"}
              </p>
            }
          >
            <BildThumb
              src={bild.bildUrl}
              alt={bild.altText}
              titel={bild.titel}
              className="aspect-square w-full"
              dimmed={!bild.aktiv}
            />
          </NavigableBild>
        ))}
      </div>
    </section>
  );
}

export function GaleriePreview({ data, onNavigateToBild, focusedBildId }: GaleriePreviewProps) {
  const heroBild = getHeroVorschauBild(data.items);
  const galerieBilder = getBilderByKategorie(data.items, "galerie");
  const bildfolge = getActiveBilder(data.items);
  const inactiveCount = data.items.filter((item) => !item.aktiv).length;
  const pflichtBild = data.items.find((item) => item.pflichtbild);

  return (
    <div className="sticky top-4 space-y-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
        Galerie – Live-Vorschau
      </p>

      <div className="rounded-xl border border-[var(--mwg-line)] bg-paper-raised p-3.5 shadow-[0_8px_24px_-16px_rgba(26,26,24,0.2)]">
        <h3 className="font-display text-[15px] font-medium text-ink">Website-Vorschau</h3>
        <p className="mt-0.5 text-[11px] text-stone">
          Live · {data.items.length} Bilder · Klick = Navigation
        </p>

        <div className="mt-3 space-y-3">
          <section>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-stone">Hero</p>
            {heroBild ? (
              <NavigableBild
                bild={heroBild}
                onNavigate={onNavigateToBild}
                isFocused={focusedBildId === heroBild.id}
                className="mt-1.5 rounded-lg"
              >
                <BildThumb
                  src={heroBild.bildUrl}
                  alt={heroBild.altText}
                  titel={heroBild.titel}
                  className="aspect-[21/9] w-full"
                />
              </NavigableBild>
            ) : (
              <p className="mt-1.5 rounded-lg border border-dashed border-[var(--mwg-line)] px-2 py-4 text-center text-[11px] text-stone">
                Kein aktives Hero-Bild
              </p>
            )}
          </section>

          <section>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-stone">
              Galerie ({galerieBilder.length})
            </p>
            {galerieBilder.length > 0 ? (
              <div className="mt-1.5 grid grid-cols-2 gap-1.5">
                {galerieBilder.map((bild) => (
                  <NavigableBild
                    key={bild.id}
                    bild={bild}
                    onNavigate={onNavigateToBild}
                    isFocused={focusedBildId === bild.id}
                  >
                    <BildThumb
                      src={bild.bildUrl}
                      alt={bild.altText}
                      titel={bild.titel}
                      className="aspect-[4/3] w-full"
                      dimmed={!bild.aktiv}
                    />
                  </NavigableBild>
                ))}
              </div>
            ) : (
              <p className="mt-1.5 rounded-lg border border-dashed border-[var(--mwg-line)] px-2 py-4 text-center text-[11px] text-stone">
                Keine Galerie-Bilder
              </p>
            )}
          </section>

          <section>
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-stone">
              Bildfolge ({bildfolge.length})
            </p>
            {bildfolge.length > 0 ? (
              <div className="mt-1.5 flex gap-1.5 overflow-x-auto pb-0.5">
                {bildfolge.map((bild, index) => (
                  <NavigableBild
                    key={bild.id}
                    bild={bild}
                    onNavigate={onNavigateToBild}
                    isFocused={focusedBildId === bild.id}
                    className="w-[4.5rem] shrink-0"
                    meta={
                      <p className="truncate px-1 py-0.5 text-[8px] text-stone group-hover:text-ink">
                        {index + 1}. {bild.titel || "—"}
                      </p>
                    }
                  >
                    <BildThumb
                      src={bild.bildUrl}
                      alt={bild.altText}
                      titel={bild.titel}
                      className="aspect-square w-full"
                    />
                  </NavigableBild>
                ))}
              </div>
            ) : (
              <p className="mt-1.5 rounded-lg border border-dashed border-[var(--mwg-line)] px-2 py-4 text-center text-[11px] text-stone">
                Keine aktive Bildfolge
              </p>
            )}
          </section>
        </div>

        {inactiveCount > 0 && (
          <p className="mt-2 text-[10px] text-stone">
            {inactiveCount} inaktiv – nicht in Bildfolge
          </p>
        )}
        {!pflichtBild && (
          <p className="mt-1 text-[10px] text-amber-700">⚠ Kein Pflichtbild markiert</p>
        )}
      </div>

      <div className="rounded-lg border border-[var(--mwg-line)] bg-paper p-3">
        <p className="text-[11px] font-medium text-ink">Ausgabekanäle</p>
        <div className="mt-2 space-y-2">
          {VORSCHAU_KATEGORIEN.filter((kat) => !["hero", "galerie"].includes(kat)).map((kat) => (
            <KategorieSektion
              key={kat}
              kategorie={kat}
              bilder={getBilderByKategorie(data.items, kat)}
              onNavigate={onNavigateToBild}
              focusedBildId={focusedBildId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
