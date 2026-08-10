"use client";

import { type FormEvent, type ReactNode, useCallback, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { EditorRedakteurPanel } from "@/components/admin/EditorRedakteurPanel";
import type { EditorRxProps } from "@/components/admin/redakteurExperienceData";
import { useEditorRxState } from "@/components/admin/useEditorRxState";
import {
  BITTE_WAEHLEN,
  EMPTY_ALLGEMEIN_DATA,
  ERLEBNISWELTEN,
  KATEGORIEN,
  LAENDER,
  STATUS_OPTIONS,
  type AllgemeinData,
} from "@/components/admin/allgemeinData";

const FIELD_CLASS =
  "w-full rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

interface AllgemeinEditorProps extends EditorRxProps {
  initialData?: AllgemeinData;
  onPersist?: (data: AllgemeinData) => void;
}

export function AllgemeinEditor({
  initialData = EMPTY_ALLGEMEIN_DATA,
  onPersist,
  onDirtyChange,
  registerActions,
}: AllgemeinEditorProps) {
  const [savedData, setSavedData] = useState<AllgemeinData>(initialData);
  const [formData, setFormData] = useState<AllgemeinData>(initialData);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function updateField<K extends keyof AllgemeinData>(key: K, value: AllgemeinData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
    setSaveMessage(null);
  }

  function updateOrt(index: number, value: string) {
    setFormData((current) => {
      const orte = [...current.orte];
      orte[index] = value;
      return { ...current, orte };
    });
    setSaveMessage(null);
  }

  function addOrt() {
    setFormData((current) => ({ ...current, orte: [...current.orte, ""] }));
    setSaveMessage(null);
  }

  function removeOrt(index: number) {
    setFormData((current) => ({
      ...current,
      orte: current.orte.filter((_, ortIndex) => ortIndex !== index),
    }));
    setSaveMessage(null);
  }

  function updateLand(index: number, value: string) {
    setFormData((current) => {
      const laender = [...current.laender];
      laender[index] = value;
      return { ...current, laender };
    });
    setSaveMessage(null);
  }

  function addLand() {
    setFormData((current) => ({
      ...current,
      laender: [...current.laender, BITTE_WAEHLEN],
    }));
    setSaveMessage(null);
  }

  function removeLand(index: number) {
    setFormData((current) => ({
      ...current,
      laender: current.laender.filter((_, landIndex) => landIndex !== index),
    }));
    setSaveMessage(null);
  }

  function updateRegion(index: number, value: string) {
    setFormData((current) => {
      const regionen = [...current.regionen];
      regionen[index] = value;
      return { ...current, regionen };
    });
    setSaveMessage(null);
  }

  function addRegion() {
    setFormData((current) => ({ ...current, regionen: [...current.regionen, ""] }));
    setSaveMessage(null);
  }

  function removeRegion(index: number) {
    setFormData((current) => ({
      ...current,
      regionen: current.regionen.filter((_, regionIndex) => regionIndex !== index),
    }));
    setSaveMessage(null);
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
    <form onSubmit={handleSave} className="space-y-8">
      <EditorRedakteurPanel section="allgemein" />
      {saveMessage && (
        <div
          role="status"
          className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
        >
          {saveMessage}
        </div>
      )}

      <div className="space-y-2">
        <FieldLabel htmlFor="allgemein-name">Name</FieldLabel>
        <input
          id="allgemein-name"
          type="text"
          value={formData.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={FIELD_CLASS}
        />
      </div>

      <div className="space-y-2">
        <FieldLabel htmlFor="allgemein-untertitel">Untertitel</FieldLabel>
        <input
          id="allgemein-untertitel"
          type="text"
          value={formData.untertitel}
          onChange={(event) => updateField("untertitel", event.target.value)}
          className={FIELD_CLASS}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor="allgemein-kategorie">Kategorie</FieldLabel>
          <select
            id="allgemein-kategorie"
            value={formData.kategorie}
            onChange={(event) => updateField("kategorie", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value={BITTE_WAEHLEN}>{BITTE_WAEHLEN}</option>
            {KATEGORIEN.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="allgemein-erlebniswelt">Erlebniswelt</FieldLabel>
          <select
            id="allgemein-erlebniswelt"
            value={formData.erlebniswelt}
            onChange={(event) => updateField("erlebniswelt", event.target.value)}
            className={FIELD_CLASS}
          >
            <option value={BITTE_WAEHLEN}>{BITTE_WAEHLEN}</option>
            {ERLEBNISWELTEN.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-ink">Land</legend>
        {formData.laender.map((land, index) => (
          <div key={index} className="flex gap-3">
            <select
              id={index === 0 ? "allgemein-land" : undefined}
              value={land}
              onChange={(event) => updateLand(index, event.target.value)}
              className={FIELD_CLASS}
            >
              <option value={BITTE_WAEHLEN}>{BITTE_WAEHLEN}</option>
              {LAENDER.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {formData.laender.length > 0 && (
              <button
                type="button"
                onClick={() => removeLand(index)}
                className="shrink-0 rounded-xl border border-[var(--mwg-line)] px-3 text-sm text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
                aria-label={`Land ${index + 1} entfernen`}
              >
                Entfernen
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addLand}
          className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
        >
          + Land hinzufügen
        </button>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-ink">Region</legend>
        {formData.regionen.map((region, index) => (
          <div key={index} className="flex gap-3">
            <input
              id={index === 0 ? "allgemein-region" : undefined}
              type="text"
              value={region}
              onChange={(event) => updateRegion(index, event.target.value)}
              placeholder={index === 0 ? "z. B. Bodensee" : "z. B. Allgäu"}
              className={FIELD_CLASS}
            />
            {formData.regionen.length > 0 && (
              <button
                type="button"
                onClick={() => removeRegion(index)}
                className="shrink-0 rounded-xl border border-[var(--mwg-line)] px-3 text-sm text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
                aria-label={`Region ${index + 1} entfernen`}
              >
                Entfernen
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addRegion}
          className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
        >
          + Region hinzufügen
        </button>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-medium text-ink">Ort</legend>
        {formData.orte.map((ort, index) => (
          <div key={index} className="flex gap-3">
            <input
              id={index === 0 ? "allgemein-ort" : undefined}
              type="text"
              value={ort}
              onChange={(event) => updateOrt(index, event.target.value)}
              placeholder={index === 0 ? "z. B. Konstanz" : "z. B. Friedrichshafen"}
              className={FIELD_CLASS}
            />
            {formData.orte.length > 0 && (
              <button
                type="button"
                onClick={() => removeOrt(index)}
                className="shrink-0 rounded-xl border border-[var(--mwg-line)] px-3 text-sm text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
                aria-label={`Ort ${index + 1} entfernen`}
              >
                Entfernen
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addOrt}
          className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
        >
          + Ort hinzufügen
        </button>
      </fieldset>

      <div className="space-y-2">
        <FieldLabel htmlFor="allgemein-status">Status</FieldLabel>
        <select
          id="allgemein-status"
          value={formData.status}
          onChange={(event) => updateField("status", event.target.value)}
          className={FIELD_CLASS}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
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
  );
}
