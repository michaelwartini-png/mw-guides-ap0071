"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AdminSecondaryButton } from "@/components/admin/adminButtons";
import {
  sortGalerieBilder,
  type GalerieBild,
} from "@/components/admin/galerieData";
import { cn } from "@/lib/cn";

export function getSelectableGalerieBilder(items: GalerieBild[]): GalerieBild[] {
  return sortGalerieBilder(items).filter((item) => item.aktiv && item.bildUrl.trim());
}

interface GalerieBildDialogProps {
  open: boolean;
  onClose: () => void;
  galerieItems: GalerieBild[];
  selectedId?: string | null;
  onSelect: (galerieBildId: string) => void;
  title?: string;
}

export function GalerieBildDialog({
  open,
  onClose,
  galerieItems,
  selectedId,
  onSelect,
  title = "Bild aus Galerie auswählen",
}: GalerieBildDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const selectable = getSelectableGalerieBilder(galerieItems);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSelect(id: string) {
    onSelect(id);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="galerie-bild-dialog-title"
        className="flex max-h-[min(90vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-paper-raised shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[var(--mwg-line)] px-5 py-4">
          <div>
            <h2 id="galerie-bild-dialog-title" className="font-display text-[20px] font-medium text-ink">
              {title}
            </h2>
            <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">
              Es wird nur eine Referenz auf das Galeriebild gespeichert — kein Upload, keine Kopie.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--mwg-line)] text-[var(--mwg-ink-70)] hover:text-ink"
            aria-label="Dialog schließen"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {selectable.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[var(--mwg-line)] px-4 py-10 text-center">
              <p className="text-[15px] font-medium text-ink">Noch keine Galeriebilder verfügbar</p>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
                Bitte zuerst unter „Galerie & Bildverwaltung“ Bilder hinzufügen, aktivieren und
                speichern. Anschließend können sie hier referenziert werden.
              </p>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {selectable.map((bild) => {
                const isSelected = selectedId === bild.id;

                return (
                  <button
                    key={bild.id}
                    type="button"
                    onClick={() => handleSelect(bild.id)}
                    className={cn(
                      "overflow-hidden rounded-xl border text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                      isSelected
                        ? "border-accent ring-2 ring-accent/30"
                        : "border-[var(--mwg-line)] hover:border-accent/40",
                    )}
                  >
                    <div className="relative aspect-[4/3] bg-paper">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={bild.bildUrl}
                        alt={bild.altText || bild.titel || "Galeriebild"}
                        className="h-full w-full object-cover"
                      />
                      {isSelected ? (
                        <span className="absolute right-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-white">
                          Ausgewählt
                        </span>
                      ) : null}
                    </div>
                    <div className="space-y-0.5 p-3">
                      <p className="truncate text-[14px] font-medium text-ink">
                        {bild.titel || "Ohne Titel"}
                      </p>
                      {bild.aufnahmeort.trim() ? (
                        <p className="truncate text-[12px] text-[var(--mwg-ink-70)]">
                          {bild.aufnahmeort}
                        </p>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="flex justify-end border-t border-[var(--mwg-line)] px-5 py-4">
          <AdminSecondaryButton type="button" onClick={onClose}>
            Abbrechen
          </AdminSecondaryButton>
        </div>
      </div>
    </div>
  );
}
