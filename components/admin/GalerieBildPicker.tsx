"use client";

import { AdminSecondaryButton } from "@/components/admin/adminButtons";
import {
  getGalerieBildById,
  sortGalerieBilder,
  type GalerieBild,
} from "@/components/admin/galerieData";
import { cn } from "@/lib/cn";

type GalerieBildPickerProps = {
  galerieItems: GalerieBild[];
  value: string | null;
  onChange: (galerieBildId: string | null) => void;
  idPrefix: string;
  label?: string;
};

function BildPreview({ bild }: { bild: GalerieBild | undefined }) {
  if (!bild?.bildUrl) {
    return (
      <div className="flex aspect-[16/7] items-center justify-center rounded-xl border border-dashed border-[var(--mwg-line)] bg-paper">
        <p className="text-[13px] text-stone">Kein Bild ausgewählt</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--mwg-line)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={bild.bildUrl}
        alt={bild.altText || bild.titel}
        className="aspect-[16/7] w-full object-cover"
      />
      <p className="border-t border-[var(--mwg-line)] px-3 py-2 text-[12px] text-[var(--mwg-ink-70)]">
        {bild.titel}
        {bild.aufnahmeort.trim() ? ` · ${bild.aufnahmeort}` : ""}
      </p>
    </div>
  );
}

/** AP-0018.3 — Referenz auf ein Galerie-Bild, kein Upload. */
export function GalerieBildPicker({
  galerieItems,
  value,
  onChange,
  idPrefix,
  label = "Bild",
}: GalerieBildPickerProps) {
  const selectable = sortGalerieBilder(galerieItems).filter((item) => item.aktiv);
  const linkedBild = getGalerieBildById(galerieItems, value);
  const mode = value ? "linked" : "none";

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-ink">{label}</p>

      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-[14px]">
          <input
            type="radio"
            name={`${idPrefix}-bild-mode`}
            checked={mode === "none"}
            onChange={() => onChange(null)}
            className="accent-[var(--mwg-accent)]"
          />
          Kein Bild
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-[14px]">
          <input
            type="radio"
            name={`${idPrefix}-bild-mode`}
            checked={mode === "linked"}
            onChange={() => {
              if (!value && selectable[0]) {
                onChange(selectable[0].id);
              }
            }}
            className="accent-[var(--mwg-accent)]"
          />
          Bild aus Galerie auswählen
        </label>
      </div>

      {mode === "linked" && (
        <div className="space-y-3 rounded-xl border border-[var(--mwg-line)] bg-paper/60 p-3">
          {selectable.length === 0 ? (
            <p className="text-[13px] text-stone">
              Noch keine aktiven Bilder in der Galerie. Bitte zuerst Bilder in „Galerie &
              Bildverwaltung“ pflegen.
            </p>
          ) : (
            <>
              <label htmlFor={`${idPrefix}-bild-select`} className="sr-only">
                Verknüpftes Bild
              </label>
              <select
                id={`${idPrefix}-bild-select`}
                value={value ?? ""}
                onChange={(event) => onChange(event.target.value || null)}
                className={cn(
                  "w-full rounded-xl border border-[var(--mwg-line)] bg-paper px-4 py-3 text-[14px]",
                  "outline-none transition-colors focus:border-accent",
                )}
              >
                <option value="">Bitte wählen…</option>
                {selectable.map((bild) => (
                  <option key={bild.id} value={bild.id}>
                    {bild.titel || "Ohne Titel"}
                    {bild.aufnahmeort.trim() ? ` — ${bild.aufnahmeort}` : ""}
                  </option>
                ))}
              </select>
              {linkedBild && !linkedBild.aktiv && (
                <p className="text-[12px] text-amber-800">
                  Verknüpftes Bild ist inaktiv — in der Galerie aktivieren oder anderes Bild wählen.
                </p>
              )}
            </>
          )}
          <BildPreview bild={linkedBild} />
          {value && (
            <AdminSecondaryButton type="button" onClick={() => onChange(null)}>
              Verknüpfung entfernen
            </AdminSecondaryButton>
          )}
        </div>
      )}

      {mode === "none" && <BildPreview bild={undefined} />}
    </div>
  );
}
