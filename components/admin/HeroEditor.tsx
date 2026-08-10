"use client";

import { type FormEvent, type ReactNode, useCallback, useMemo, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { EditorRedakteurPanel } from "@/components/admin/EditorRedakteurPanel";
import type { EditorRxProps } from "@/components/admin/redakteurExperienceData";
import { useEditorRxState } from "@/components/admin/useEditorRxState";
import {
  EMPTY_HERO_DATA,
  HERO_BADGES,
  type HeroBadge,
  type HeroData,
} from "@/components/admin/heroData";
import { HeroPreview } from "@/components/admin/HeroPreview";

const READONLY_FIELD_CLASS =
  "w-full rounded-xl border border-[var(--mwg-line)] bg-stone/[0.04] px-4 py-3 text-[15px] text-[var(--mwg-ink-70)]";

function FieldLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-ink">
      {children}
    </label>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-ink">{children}</h3>;
}

function SourceBadge({ source }: { source: string }) {
  return (
    <span className="shrink-0 rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
      ← {source}
    </span>
  );
}

function ReadOnlyField({
  label,
  value,
  source,
  emptyText,
  id,
}: {
  label: string;
  value: string;
  source: string;
  emptyText: string;
  id?: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FieldLabel htmlFor={id}>{label}</FieldLabel>
        <SourceBadge source={source} />
      </div>
      <div id={id} className={READONLY_FIELD_CLASS} aria-readonly="true">
        {value.trim() || emptyText}
      </div>
      <p className="text-[12px] text-stone">Wird aus {source} übernommen — hier nicht bearbeitbar.</p>
    </div>
  );
}

function HeroKonfigurationHint() {
  return (
    <div className="space-y-3 rounded-xl border border-accent/25 bg-gradient-to-br from-accent/[0.08] to-transparent px-4 py-4 sm:px-5">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">Hero-Konfiguration</p>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
          Der Inhalt des Heroes wird automatisch aus dem Erlebnisbaustein übernommen.
        </p>
      </div>
      <ul className="space-y-1 text-[13px] text-[var(--mwg-ink-70)]">
        <li>
          <span className="text-ink">Titel</span>
          <span className="mx-2 text-stone" aria-hidden="true">
            →
          </span>
          <span className="font-medium text-accent">Allgemein</span>
        </li>
        <li>
          <span className="text-ink">Untertitel</span>
          <span className="mx-2 text-stone" aria-hidden="true">
            →
          </span>
          <span className="font-medium text-accent">Allgemein</span>
        </li>
        <li>
          <span className="text-ink">Hero-Bild</span>
          <span className="mx-2 text-stone" aria-hidden="true">
            →
          </span>
          <span className="font-medium text-accent">Galerie & Bildverwaltung</span>
        </li>
        <li>
          <span className="text-ink">Bewertung</span>
          <span className="mx-2 text-stone" aria-hidden="true">
            →
          </span>
          <span className="font-medium text-accent">Bewertungen</span>
        </li>
      </ul>
      <p className="border-t border-accent/15 pt-3 text-[13px] font-medium text-ink">
        Hier konfigurieren Sie ausschließlich die Darstellung des Heroes.
      </p>
    </div>
  );
}

export type HeroResolvedContent = {
  titel: string;
  untertitel: string;
  heroImageUrl?: string;
  heroImageAlt?: string;
  mwgScore: string;
};

type HeroEditableState = Pick<HeroData, "badges" | "rideGuideAvailable">;

interface HeroEditorProps extends EditorRxProps {
  initialData?: HeroData;
  resolvedContent: HeroResolvedContent;
  onPersist?: (data: HeroData) => void;
}

export function HeroEditor({
  initialData = EMPTY_HERO_DATA,
  resolvedContent,
  onPersist,
  onDirtyChange,
  registerActions,
}: HeroEditorProps) {
  const [savedData, setSavedData] = useState<HeroEditableState>(() => ({
    badges: initialData.badges,
    rideGuideAvailable: initialData.rideGuideAvailable,
  }));
  const [formData, setFormData] = useState<HeroEditableState>(() => ({
    badges: initialData.badges,
    rideGuideAvailable: initialData.rideGuideAvailable,
  }));
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function toggleBadge(badge: HeroBadge) {
    setFormData((current) => {
      const badges = current.badges.includes(badge)
        ? current.badges.filter((item) => item !== badge)
        : [...current.badges, badge];
      return { ...current, badges };
    });
    setSaveMessage(null);
  }

  function handleDiscard() {
    setFormData(savedData);
    setSaveMessage(null);
    onDirtyChange?.(false);
  }

  const buildPersistPayload = useCallback(
    (editable: HeroEditableState): HeroData => ({
      ...initialData,
      titel: resolvedContent.titel,
      untertitel: resolvedContent.untertitel,
      hasHeroImage: Boolean(resolvedContent.heroImageUrl),
      galerieCount: initialData.galerieCount,
      score: resolvedContent.mwgScore,
      badges: editable.badges,
      rideGuideAvailable: editable.rideGuideAvailable,
    }),
    [initialData, resolvedContent],
  );

  const persistSave = useCallback(() => {
    setSavedData(formData);
    onPersist?.(buildPersistPayload(formData));
    onDirtyChange?.(false);
    setSaveMessage("Hero-Darstellung wurde gespeichert.");
  }, [buildPersistPayload, formData, onDirtyChange, onPersist]);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persistSave();
  }

  useEditorRxState(formData, savedData, onDirtyChange, registerActions, {
    save: persistSave,
    discard: handleDiscard,
  });

  const previewContent = useMemo(
    () => ({
      titel: resolvedContent.titel,
      untertitel: resolvedContent.untertitel,
      heroImageUrl: resolvedContent.heroImageUrl,
      heroImageAlt: resolvedContent.heroImageAlt,
      mwgScore: resolvedContent.mwgScore,
      badges: formData.badges,
    }),
    [formData.badges, resolvedContent],
  );

  return (
    <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_240px]">
      <form onSubmit={handleSave} className="space-y-8">
        <HeroKonfigurationHint />
        <EditorRedakteurPanel section="hero" />

        {saveMessage && (
          <div
            role="status"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <section className="space-y-5 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] p-4 sm:p-5">
          <div>
            <SectionTitle>Übernommener Inhalt</SectionTitle>
            <p className="mt-1 text-[13px] text-stone">Nur zur Orientierung — Änderungen in den Quell-Bereichen.</p>
          </div>

          <ReadOnlyField
            id="hero-readonly-titel"
            label="Titel"
            value={resolvedContent.titel}
            source="Allgemein"
            emptyText="Noch kein Titel in Allgemein"
          />

          <ReadOnlyField
            id="hero-readonly-untertitel"
            label="Untertitel"
            value={resolvedContent.untertitel}
            source="Allgemein"
            emptyText="Noch kein Untertitel in Allgemein"
          />

          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <SectionTitle>Hero-Bild</SectionTitle>
              <SourceBadge source="Galerie & Bildverwaltung" />
            </div>
            <div className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-stone/[0.04]">
              {resolvedContent.heroImageUrl ? (
                <div className="relative aspect-[16/7]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resolvedContent.heroImageUrl}
                    alt={resolvedContent.heroImageAlt || resolvedContent.titel || "Hero-Bild"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/7] items-center justify-center text-[14px] text-stone">
                  Kein Hero-Bild — Kategorie „Hero“ in der Galerie pflegen
                </div>
              )}
            </div>
            <p className="text-[12px] text-stone">
              Wird aus Galerie & Bildverwaltung übernommen — hier nicht bearbeitbar.
            </p>
          </div>

          <ReadOnlyField
            id="hero-readonly-score"
            label="MW Guides Score"
            value={resolvedContent.mwgScore}
            source="Bewertungen"
            emptyText="Noch kein Score in Bewertungen"
          />
        </section>

        <section className="space-y-4">
          <div>
            <SectionTitle>Hero-Darstellung</SectionTitle>
            <p className="mt-1 text-[13px] text-stone">Diese Einstellungen gelten nur für den Hero — Quelle: Hero.</p>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-ink">Badge</legend>
            <p className="text-[13px] text-stone">
              Das erste gewählte Badge erscheint im Erlebnisprofil.
            </p>
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

          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--mwg-line)] px-4 py-3 text-[14.5px] has-[:checked]:border-accent has-[:checked]:bg-accent/5">
            <input
              type="checkbox"
              checked={formData.rideGuideAvailable}
              onChange={(event) => {
                setFormData((current) => ({
                  ...current,
                  rideGuideAvailable: event.target.checked,
                }));
                setSaveMessage(null);
              }}
              className="h-4 w-4 accent-[var(--mwg-accent)]"
            />
            Ride Guide verfügbar
          </label>
        </section>

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

      <HeroPreview content={previewContent} />
    </div>
  );
}
