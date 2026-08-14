"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { AdminSecondaryButton } from "@/components/admin/adminButtons";
import {
  GalerieBildDialog,
  getSelectableGalerieBilder,
} from "@/components/admin/GalerieBildDialog";
import {
  getGalerieBildById,
  type GalerieBild,
} from "@/components/admin/galerieData";

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

/** AP-0018.3 — Referenz auf ein Galerie-Bild via Dialog, kein Upload. */
export function GalerieBildPicker({
  galerieItems,
  value,
  onChange,
  idPrefix,
  label = "Bild",
}: GalerieBildPickerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const selectable = getSelectableGalerieBilder(galerieItems);
  const linkedBild = getGalerieBildById(galerieItems, value);
  const hasLinkedImage = Boolean(value && linkedBild?.bildUrl);

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-ink">{label}</p>

      <BildPreview bild={linkedBild} />

      <div className="flex flex-wrap gap-2">
        <AdminSecondaryButton type="button" onClick={() => setDialogOpen(true)}>
          <ImageIcon size={15} />
          {hasLinkedImage ? "Anderes Bild aus Galerie" : "Bild aus Galerie auswählen"}
        </AdminSecondaryButton>

        {value ? (
          <AdminSecondaryButton type="button" onClick={() => onChange(null)}>
            Verknüpfung entfernen
          </AdminSecondaryButton>
        ) : null}
      </div>

      {selectable.length === 0 ? (
        <p className="text-[12px] leading-relaxed text-stone">
          {galerieItems.length === 0
            ? "Noch keine Bilder in der Galerie. Bitte zuerst unter „Galerie & Bildverwaltung“ Bilder anlegen und speichern."
            : "Keine aktiven Galeriebilder mit Vorschau verfügbar. Bitte in der Galerie Bilder aktivieren und speichern."}
        </p>
      ) : (
        <p className="text-[12px] text-[var(--mwg-ink-70)]">
          {selectable.length} Bild{selectable.length === 1 ? "" : "er"} in der Galerie verfügbar.
        </p>
      )}

      {linkedBild && !linkedBild.aktiv ? (
        <p className="text-[12px] text-amber-800">
          Verknüpftes Bild ist inaktiv — in der Galerie aktivieren oder anderes Bild wählen.
        </p>
      ) : null}

      <GalerieBildDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        galerieItems={galerieItems}
        selectedId={value}
        onSelect={(galerieBildId) => onChange(galerieBildId)}
        title={`${label} — Galerie`}
      />

      <input
        type="hidden"
        id={`${idPrefix}-bild-ref`}
        name={`${idPrefix}-bild-ref`}
        value={value ?? ""}
        readOnly
      />
    </div>
  );
}
