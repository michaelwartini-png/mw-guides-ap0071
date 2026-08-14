"use client";

import { type FormEvent, type ReactNode, useCallback, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { EditorRedakteurPanel } from "@/components/admin/EditorRedakteurPanel";
import type { EditorRxProps } from "@/components/admin/redakteurExperienceData";
import { useEditorRxState } from "@/components/admin/useEditorRxState";
import {
  EMPTY_BEWERTUNGEN_DATA,
  normalizeBewertungenData,
  type BewertungenData,
  type PlatformReview,
} from "@/components/admin/bewertungenData";
import { BewertungenPreview } from "@/components/admin/BewertungenPreview";

const FIELD_CLASS =
  "w-full rounded-xl border border-[var(--mwg-line)] bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent";

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-ink">{children}</h3>;
}

interface PlatformFieldsProps {
  idPrefix: string;
  title: string;
  data: PlatformReview;
  onChange: (field: keyof PlatformReview, value: string) => void;
}

function PlatformFields({ idPrefix, title, data, onChange }: PlatformFieldsProps) {
  return (
    <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
      <legend className="px-1 text-sm font-semibold text-ink">{title}</legend>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <FieldLabel htmlFor={`${idPrefix}-bewertung`}>Bewertung</FieldLabel>
          <input
            id={`${idPrefix}-bewertung`}
            type="text"
            inputMode="decimal"
            value={data.bewertung}
            onChange={(event) => onChange("bewertung", event.target.value)}
            className={FIELD_CLASS}
          />
        </div>
        <div className="space-y-2">
          <FieldLabel htmlFor={`${idPrefix}-anzahl`}>Anzahl Bewertungen</FieldLabel>
          <input
            id={`${idPrefix}-anzahl`}
            type="text"
            inputMode="numeric"
            value={data.anzahl}
            onChange={(event) => onChange("anzahl", event.target.value)}
            className={FIELD_CLASS}
          />
        </div>
      </div>
      <div className="space-y-2">
        <FieldLabel htmlFor={`${idPrefix}-link`}>
          Link zur {title === "Google" ? "Google-Bewertung" : `${title}-Seite`}
        </FieldLabel>
        <input
          id={`${idPrefix}-link`}
          type="url"
          value={data.link}
          onChange={(event) => onChange("link", event.target.value)}
          placeholder="https://"
          className={FIELD_CLASS}
        />
      </div>
    </fieldset>
  );
}

interface BewertungenEditorProps extends EditorRxProps {
  initialData?: BewertungenData;
  onPersist?: (data: BewertungenData) => void;
}

export function BewertungenEditor({
  initialData = EMPTY_BEWERTUNGEN_DATA,
  onPersist,
  onDirtyChange,
  registerActions,
}: BewertungenEditorProps) {
  const normalizedInitial = normalizeBewertungenData(initialData);
  const [savedData, setSavedData] = useState<BewertungenData>(normalizedInitial);
  const [formData, setFormData] = useState<BewertungenData>(normalizedInitial);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [weitereOpen, setWeitereOpen] = useState(false);

  function updateField<K extends keyof BewertungenData>(key: K, value: BewertungenData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
    setSaveMessage(null);
  }

  function updatePlatform(
    platform: "google" | "tripadvisor",
    field: keyof PlatformReview,
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      [platform]: { ...current[platform], [field]: value },
    }));
    setSaveMessage(null);
  }

  function updateWeiterePlattform(
    platform: keyof BewertungenData["weiterePlattformen"],
    field: keyof PlatformReview,
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      weiterePlattformen: {
        ...current.weiterePlattformen,
        [platform]: { ...current.weiterePlattformen[platform], [field]: value },
      },
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

  const weiterePlattformen = [
    { key: "holidayCheck" as const, label: "HolidayCheck" },
    { key: "trustpilot" as const, label: "Trustpilot" },
    { key: "yelp" as const, label: "Yelp" },
  ];

  return (
    <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_240px]">
      <form onSubmit={handleSave} className="space-y-8">
        <EditorRedakteurPanel section="bewertungen" />
        {saveMessage && (
          <div
            role="status"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <fieldset className="space-y-4">
          <SectionTitle>MW Guides Score</SectionTitle>
          <p className="text-[13px] text-stone">Die interne Bewertung des Erlebnisses.</p>
          <div className="space-y-2">
            <FieldLabel htmlFor="bewertungen-mwg-score">Score</FieldLabel>
            <input
              id="bewertungen-mwg-score"
              type="text"
              inputMode="decimal"
              value={formData.mwgScore}
              onChange={(event) => updateField("mwgScore", event.target.value)}
              className={`${FIELD_CLASS} max-w-[120px]`}
            />
            <p className="text-[12px] text-stone">Bereich: 0,0 bis 10,0</p>
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="bewertungen-kurzbegruendung">Kurzbegründung</FieldLabel>
            <textarea
              id="bewertungen-kurzbegruendung"
              value={formData.kurzbegruendung}
              onChange={(event) => updateField("kurzbegruendung", event.target.value)}
              rows={3}
              className={FIELD_CLASS}
            />
          </div>
        </fieldset>

        <PlatformFields
          idPrefix="google"
          title="Google"
          data={formData.google}
          onChange={(field, value) => updatePlatform("google", field, value)}
        />

        <PlatformFields
          idPrefix="tripadvisor"
          title="Tripadvisor"
          data={formData.tripadvisor}
          onChange={(field, value) => updatePlatform("tripadvisor", field, value)}
        />

        <div className="rounded-xl border border-[var(--mwg-line)]">
          <button
            type="button"
            onClick={() => setWeitereOpen((open) => !open)}
            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-ink"
            aria-expanded={weitereOpen}
          >
            Weitere Plattformen
            <span aria-hidden="true" className="text-stone">
              {weitereOpen ? "▲" : "▼"}
            </span>
          </button>
          {weitereOpen && (
            <div className="space-y-4 border-t border-[var(--mwg-line)] p-4">
              <p className="text-[13px] text-stone">Vorbereitung für später — optional ausfüllbar.</p>
              {weiterePlattformen.map(({ key, label }) => (
                <PlatformFields
                  key={key}
                  idPrefix={key}
                  title={label}
                  data={formData.weiterePlattformen[key]}
                  onChange={(field, value) => updateWeiterePlattform(key, field, value)}
                />
              ))}
            </div>
          )}
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

      <BewertungenPreview data={formData} />
    </div>
  );
}
