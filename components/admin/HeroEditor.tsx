"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import {
  DEFAULT_HERO_DATA,
  HERO_BADGES,
  MAX_GALERIE_COUNT,
  MIN_GALERIE_COUNT,
  type HeroBadge,
  type HeroData,
} from "@/components/admin/heroData";
import { HeroPreview } from "@/components/admin/HeroPreview";

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

interface HeroEditorProps {
  initialData?: HeroData;
}

export function HeroEditor({ initialData = DEFAULT_HERO_DATA }: HeroEditorProps) {
  const [savedData, setSavedData] = useState<HeroData>(initialData);
  const [formData, setFormData] = useState<HeroData>(initialData);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function updateField<K extends keyof HeroData>(key: K, value: HeroData[K]) {
    setFormData((current) => ({ ...current, [key]: value }));
    setSaveMessage(null);
  }

  function toggleBadge(badge: HeroBadge) {
    setFormData((current) => {
      const badges = current.badges.includes(badge)
        ? current.badges.filter((item) => item !== badge)
        : [...current.badges, badge];
      return { ...current, badges };
    });
    setSaveMessage(null);
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
    <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_240px]">
      <form onSubmit={handleSave} className="space-y-8">
        {saveMessage && (
          <div
            role="status"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <div className="space-y-2">
          <FieldLabel htmlFor="hero-titel">Titel</FieldLabel>
          <input
            id="hero-titel"
            type="text"
            value={formData.titel}
            onChange={(event) => updateField("titel", event.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div className="space-y-2">
          <FieldLabel htmlFor="hero-untertitel">Untertitel</FieldLabel>
          <input
            id="hero-untertitel"
            type="text"
            value={formData.untertitel}
            onChange={(event) => updateField("untertitel", event.target.value)}
            className={FIELD_CLASS}
          />
        </div>

        <div className="space-y-3">
          <SectionTitle>Hero-Bild</SectionTitle>
          <div className="flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed border-[var(--mwg-line)] bg-paper">
            {formData.hasHeroImage ? (
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-24 rounded-lg bg-gradient-to-br from-accent/30 to-accent/10" />
                <p className="text-[14px] text-[var(--mwg-ink-70)]">Hero-Bild (Platzhalter)</p>
              </div>
            ) : (
              <p className="text-[14px] text-stone">Kein Hero-Bild ausgewählt</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => updateField("hasHeroImage", true)}
              className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink"
            >
              Hero-Bild auswählen
            </button>
            <button
              type="button"
              onClick={() => updateField("hasHeroImage", false)}
              disabled={!formData.hasHeroImage}
              className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Hero-Bild entfernen
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <SectionTitle>Galerie</SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: formData.galerieCount }, (_, index) => (
              <div
                key={index}
                className="flex aspect-square items-center justify-center rounded-xl border border-dashed border-[var(--mwg-line)] bg-paper text-[12px] text-stone"
              >
                Bild {index + 1}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() =>
                updateField("galerieCount", Math.min(formData.galerieCount + 1, MAX_GALERIE_COUNT))
              }
              disabled={formData.galerieCount >= MAX_GALERIE_COUNT}
              className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Bild hinzufügen
            </button>
            <button
              type="button"
              onClick={() =>
                updateField("galerieCount", Math.max(formData.galerieCount - 1, MIN_GALERIE_COUNT))
              }
              disabled={formData.galerieCount <= MIN_GALERIE_COUNT}
              className="rounded-full border border-[var(--mwg-line)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-ink hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
            >
              Bild entfernen
            </button>
          </div>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-ink">Badges</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {HERO_BADGES.map((badge) => (
              <label
                key={badge}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--mwg-line)] px-4 py-3 text-[14.5px] transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
              >
                <input
                  type="checkbox"
                  checked={formData.badges.includes(badge)}
                  onChange={() => toggleBadge(badge)}
                  className="h-4 w-4 accent-[var(--mwg-accent)]"
                />
                {badge}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="space-y-2">
          <FieldLabel htmlFor="hero-score">MW Guides Score</FieldLabel>
          <input
            id="hero-score"
            type="text"
            inputMode="decimal"
            value={formData.score}
            onChange={(event) => updateField("score", event.target.value)}
            className={`${FIELD_CLASS} max-w-[120px]`}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-3 text-[14.5px]">
          <input
            type="checkbox"
            checked={formData.rideGuideAvailable}
            onChange={(event) => updateField("rideGuideAvailable", event.target.checked)}
            className="h-4 w-4 accent-[var(--mwg-accent)]"
          />
          Ride Guide verfügbar
        </label>

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

      <HeroPreview data={formData} />
    </div>
  );
}
