"use client";

import { type FormEvent, type ReactNode, useMemo, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { HighlightsPreview } from "@/components/admin/HighlightsPreview";
import {
  createHighlightItem,
  DEFAULT_HIGHLIGHTS_DATA,
  getNextReihenfolge,
  HIGHLIGHT_ICON_OPTIONS,
  MAX_HIGHLIGHTS,
  MIN_HIGHLIGHTS,
  sortHighlights,
  swapHighlightOrder,
  type HighlightIcon,
  type HighlightItem,
  type HighlightsData,
} from "@/components/admin/highlightsData";
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

interface HighlightsEditorProps {
  initialData?: HighlightsData;
}

export function HighlightsEditor({ initialData = DEFAULT_HIGHLIGHTS_DATA }: HighlightsEditorProps) {
  const [savedData, setSavedData] = useState<HighlightsData>(initialData);
  const [formData, setFormData] = useState<HighlightsData>(initialData);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const sortedItems = useMemo(() => sortHighlights(formData.items), [formData.items]);

  function updateItems(items: HighlightItem[]) {
    setFormData({ items });
    setSaveMessage(null);
  }

  function updateItem(id: string, patch: Partial<HighlightItem>) {
    updateItems(formData.items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function addItem() {
    if (formData.items.length >= MAX_HIGHLIGHTS) return;
    updateItems([...formData.items, createHighlightItem(getNextReihenfolge(formData.items))]);
  }

  function removeItem(id: string) {
    if (formData.items.length <= MIN_HIGHLIGHTS) return;
    updateItems(formData.items.filter((item) => item.id !== id));
  }

  function moveItem(id: string, direction: "up" | "down") {
    updateItems(swapHighlightOrder(formData.items, id, direction));
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavedData(formData);
    setSaveMessage("Änderungen wurden gespeichert.");
  }

  function handleDiscard() {
    setFormData(savedData);
    setSaveMessage(null);
  }

  return (
    <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_280px]">
      <form onSubmit={handleSave} className="space-y-6">
        {saveMessage && (
          <div
            role="status"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <p className="text-[13px] text-stone">
          Highlights erscheinen später auf der Erlebnisprofilseite unter „Das Erlebnis“ – als
          Merkmale mit Icon und optional mit Bild.
        </p>

        <div className="space-y-4">
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
                Highlight · Reihenfolge {item.reihenfolge}
                {!item.aktiv && (
                  <span className="rounded-full bg-[var(--mwg-line)] px-2 py-0.5 text-[11px] font-medium text-stone">
                    Inaktiv
                  </span>
                )}
              </legend>

              <div className="space-y-2">
                <FieldLabel htmlFor={`highlight-titel-${item.id}`}>Titel</FieldLabel>
                <input
                  id={`highlight-titel-${item.id}`}
                  type="text"
                  value={item.titel}
                  onChange={(event) => updateItem(item.id, { titel: event.target.value })}
                  className={FIELD_CLASS}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel htmlFor={`highlight-beschreibung-${item.id}`}>
                  Kurzbeschreibung
                </FieldLabel>
                <textarea
                  id={`highlight-beschreibung-${item.id}`}
                  value={item.kurzbeschreibung}
                  onChange={(event) =>
                    updateItem(item.id, { kurzbeschreibung: event.target.value })
                  }
                  className={TEXTAREA_CLASS}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <FieldLabel htmlFor={`highlight-icon-${item.id}`}>Icon</FieldLabel>
                  <select
                    id={`highlight-icon-${item.id}`}
                    value={item.icon}
                    onChange={(event) =>
                      updateItem(item.id, { icon: event.target.value as HighlightIcon })
                    }
                    className={FIELD_CLASS}
                  >
                    {HIGHLIGHT_ICON_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.emoji} {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel htmlFor={`highlight-reihenfolge-${item.id}`}>Reihenfolge</FieldLabel>
                  <input
                    id={`highlight-reihenfolge-${item.id}`}
                    type="number"
                    min={1}
                    max={MAX_HIGHLIGHTS}
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

              <div className="space-y-3">
                <p className="text-sm font-medium text-ink">Bild</p>
                <div className="flex aspect-[16/7] items-center justify-center rounded-xl border border-dashed border-[var(--mwg-line)] bg-paper">
                  {item.hasBild ? (
                    <p className="text-[13px] text-[var(--mwg-ink-70)]">Bild (Platzhalter)</p>
                  ) : (
                    <p className="text-[13px] text-stone">Kein Bild ausgewählt</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <AdminSecondaryButton
                    type="button"
                    onClick={() => updateItem(item.id, { hasBild: true })}
                  >
                    Bild auswählen
                  </AdminSecondaryButton>
                  <AdminSecondaryButton
                    type="button"
                    onClick={() => updateItem(item.id, { hasBild: false })}
                    disabled={!item.hasBild}
                  >
                    Bild entfernen
                  </AdminSecondaryButton>
                </div>
              </div>

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
                {formData.items.length > MIN_HIGHLIGHTS && (
                  <AdminSecondaryButton type="button" onClick={() => removeItem(item.id)}>
                    Highlight entfernen
                  </AdminSecondaryButton>
                )}
              </div>
            </fieldset>
          ))}
        </div>

        <AdminSecondaryButton
          type="button"
          onClick={addItem}
          disabled={formData.items.length >= MAX_HIGHLIGHTS}
        >
          + Highlight hinzufügen
        </AdminSecondaryButton>

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

      <HighlightsPreview data={formData} />
    </div>
  );
}
