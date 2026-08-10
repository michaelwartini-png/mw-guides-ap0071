"use client";

import { type FormEvent, type ReactNode, useCallback, useMemo, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { EditorRedakteurPanel } from "@/components/admin/EditorRedakteurPanel";
import { GalerieBildPicker } from "@/components/admin/GalerieBildPicker";
import type { GalerieBild } from "@/components/admin/galerieData";
import type { EditorRxProps } from "@/components/admin/redakteurExperienceData";
import { useEditorRxState } from "@/components/admin/useEditorRxState";
import { MWGuidesTippsPreview } from "@/components/admin/MWGuidesTippsPreview";
import {
  createFreierTipp,
  createStandardTipp,
  EMPTY_MW_GUIDES_TIPPS_DATA,
  getNextReihenfolge,
  getThemaLabel,
  PRIORITAET_OPTIONS,
  sortTipps,
  STANDARD_TIPP_THEMEN,
  swapTippOrder,
  type MWGuidesTippsData,
  type StandardTippThema,
  type TippPrioritaet,
} from "@/components/admin/mwGuidesTippsData";
import { cn } from "@/lib/cn";

const FIELD_CLASS =
  "w-full rounded-xl border border-[var(--mwg-line)] bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent";

const TEXTAREA_CLASS = `${FIELD_CLASS} min-h-[88px] resize-y`;

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

interface MWGuidesTippsEditorProps extends EditorRxProps {
  initialData?: MWGuidesTippsData;
  galerieItems?: GalerieBild[];
  onPersist?: (data: MWGuidesTippsData) => void;
}

function normalizeTippsData(data: MWGuidesTippsData): MWGuidesTippsData {
  return {
    items: data.items.map((item) => {
      const legacy = item as MWGuidesTippsData["items"][number] & { hasBild?: boolean };
      return {
        ...legacy,
        galerieBildId: legacy.galerieBildId ?? null,
      };
    }),
  };
}

export function MWGuidesTippsEditor({
  initialData = EMPTY_MW_GUIDES_TIPPS_DATA,
  galerieItems = [],
  onPersist,
  onDirtyChange,
  registerActions,
}: MWGuidesTippsEditorProps) {
  const normalizedInitial = useMemo(() => normalizeTippsData(initialData), [initialData]);
  const [savedData, setSavedData] = useState<MWGuidesTippsData>(normalizedInitial);
  const [formData, setFormData] = useState<MWGuidesTippsData>(normalizedInitial);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [selectedThema, setSelectedThema] = useState<StandardTippThema>(
    STANDARD_TIPP_THEMEN[0].id,
  );

  const sortedItems = useMemo(() => sortTipps(formData.items), [formData.items]);

  function updateItems(items: MWGuidesTippsData["items"]) {
    setFormData({ items });
    setSaveMessage(null);
  }

  function updateItem(id: string, patch: Partial<MWGuidesTippsData["items"][number]>) {
    updateItems(formData.items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addStandardTipp() {
    updateItems([...formData.items, createStandardTipp(selectedThema, getNextReihenfolge(formData.items))]);
  }

  function addFreierTipp() {
    updateItems([...formData.items, createFreierTipp(getNextReihenfolge(formData.items))]);
  }

  function removeItem(id: string) {
    updateItems(formData.items.filter((item) => item.id !== id));
  }

  function moveItem(id: string, direction: "up" | "down") {
    updateItems(swapTippOrder(formData.items, id, direction));
  }

  function handleDiscard() {
    setFormData(savedData);
    setSaveMessage(null);
    onDirtyChange?.(false);
  }

  const persistSave = useCallback(() => {
    setSavedData(formData);
    onPersist?.(formData);
    onDirtyChange?.(false);
    setSaveMessage("Änderungen wurden gespeichert.");
  }, [formData, onDirtyChange, onPersist]);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persistSave();
  }

  useEditorRxState(formData, savedData, onDirtyChange, registerActions, {
    save: persistSave,
    discard: handleDiscard,
  });

  return (
    <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_280px]">
      <form onSubmit={handleSave} className="space-y-6">
        <EditorRedakteurPanel section="mw-guides-tipps" />
        {saveMessage && (
          <div
            role="status"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
          <p className="font-medium text-ink">Redaktionsregel</p>
          <p className="mt-1">
            MW Guides Tipps sind redaktionelle Empfehlungen – keine Preise, Tickets, Öffnungszeiten,
            Kontaktdaten oder Betreiberinformationen. Diese gehören in „Offizielle Informationen“.
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-xl border border-[var(--mwg-line)] p-4 sm:flex-row sm:flex-wrap sm:items-end">
          <div className="min-w-[220px] flex-1 space-y-2">
            <FieldLabel htmlFor="standard-thema">Standard-Tippblock</FieldLabel>
            <select
              id="standard-thema"
              value={selectedThema}
              onChange={(event) => setSelectedThema(event.target.value as StandardTippThema)}
              className={FIELD_CLASS}
            >
              {STANDARD_TIPP_THEMEN.map((thema) => (
                <option key={thema.id} value={thema.id}>
                  {thema.label}
                </option>
              ))}
            </select>
          </div>
          <AdminSecondaryButton type="button" onClick={addStandardTipp}>
            + Standard-Tippblock hinzufügen
          </AdminSecondaryButton>
          <AdminSecondaryButton type="button" onClick={addFreierTipp}>
            + Freien Redaktionstipp hinzufügen
          </AdminSecondaryButton>
        </div>

        <div className="space-y-4">
          {sortedItems.length === 0 && (
            <p className="rounded-xl border border-dashed border-[var(--mwg-line)] px-4 py-8 text-center text-[14px] text-stone">
              Noch keine Tipps. Standard-Block oder freien Tipp hinzufügen.
            </p>
          )}

          {sortedItems.map((item, index) => (
            <fieldset
              key={item.id}
              className={cn(
                "space-y-4 rounded-xl border p-4",
                item.aktiv
                  ? "border-[var(--mwg-line)]"
                  : "border-dashed border-[var(--mwg-line)] bg-paper/60 opacity-80",
              )}
            >
              <legend className="flex flex-wrap items-center gap-2 px-1 text-sm font-semibold text-ink">
                {item.typ === "standard" ? "Standard-Tipp" : "Freier Tipp"} · Reihenfolge{" "}
                {item.reihenfolge}
                {item.typ === "standard" && item.thema && (
                  <span className="font-normal text-stone">({getThemaLabel(item.thema)})</span>
                )}
                {!item.aktiv && (
                  <span className="rounded-full bg-[var(--mwg-line)] px-2 py-0.5 text-[11px] font-medium text-stone">
                    Inaktiv
                  </span>
                )}
              </legend>

              <div className="space-y-2">
                <FieldLabel htmlFor={`tipp-ueberschrift-${item.id}`}>Überschrift</FieldLabel>
                <input
                  id={`tipp-ueberschrift-${item.id}`}
                  type="text"
                  value={item.ueberschrift}
                  onChange={(event) => updateItem(item.id, { ueberschrift: event.target.value })}
                  className={FIELD_CLASS}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor={`tipp-beschreibung-${item.id}`}>Beschreibung</FieldLabel>
                <textarea
                  id={`tipp-beschreibung-${item.id}`}
                  value={item.beschreibung}
                  onChange={(event) => updateItem(item.id, { beschreibung: event.target.value })}
                  className={TEXTAREA_CLASS}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel htmlFor={`tipp-prioritaet-${item.id}`}>Priorität (optional)</FieldLabel>
                  <select
                    id={`tipp-prioritaet-${item.id}`}
                    value={item.prioritaet}
                    onChange={(event) =>
                      updateItem(item.id, { prioritaet: event.target.value as TippPrioritaet })
                    }
                    className={FIELD_CLASS}
                  >
                    {PRIORITAET_OPTIONS.map((option) => (
                      <option key={option.value || "none"} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor={`tipp-reihenfolge-${item.id}`}>Reihenfolge</FieldLabel>
                  <input
                    id={`tipp-reihenfolge-${item.id}`}
                    type="number"
                    min={1}
                    value={item.reihenfolge}
                    onChange={(event) =>
                      updateItem(item.id, {
                        reihenfolge: Math.max(1, Number(event.target.value) || 1),
                      })
                    }
                    className={FIELD_CLASS}
                  />
                </div>
              </div>

              <GalerieBildPicker
                galerieItems={galerieItems}
                value={item.galerieBildId}
                onChange={(galerieBildId) => updateItem(item.id, { galerieBildId })}
                idPrefix={`tipp-${item.id}`}
                label="Bild (optional)"
              />

              <label className="flex cursor-pointer items-center gap-3 text-[14.5px]">
                <input
                  type="checkbox"
                  checked={item.aktiv}
                  onChange={(event) => updateItem(item.id, { aktiv: event.target.checked })}
                  className="h-4 w-4 accent-[var(--mwg-accent)]"
                />
                Aktiv
              </label>

              <div className="flex flex-wrap gap-2">
                <AdminSecondaryButton
                  type="button"
                  onClick={() => moveItem(item.id, "up")}
                  disabled={index === 0}
                >
                  ↑ Nach oben
                </AdminSecondaryButton>
                <AdminSecondaryButton
                  type="button"
                  onClick={() => moveItem(item.id, "down")}
                  disabled={index === sortedItems.length - 1}
                >
                  ↓ Nach unten
                </AdminSecondaryButton>
                <AdminSecondaryButton type="button" onClick={() => removeItem(item.id)}>
                  Tipp löschen
                </AdminSecondaryButton>
              </div>
            </fieldset>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 border-t border-[var(--mwg-line)] pt-6">
          <AdminPrimaryButton type="submit">
            <span aria-hidden="true">💾</span>
            Speichern
          </AdminPrimaryButton>
          <AdminSecondaryButton type="button" onClick={handleDiscard}>
            <span aria-hidden="true">↩</span>
            Änderungen verwerfen
          </AdminSecondaryButton>
        </div>
      </form>

      <MWGuidesTippsPreview data={formData} galerieItems={galerieItems} />
    </div>
  );
}
