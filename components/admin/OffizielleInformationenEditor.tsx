"use client";

import { type FormEvent, type ReactNode, useState } from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import {
  BARRIEREFreiheit_OPTIONS,
  DEFAULT_OFFIZIELLE_INFORMATIONEN,
  normalizeExternalUrl,
  type BarrierefreiheitFlags,
  type OffizielleInformationenData,
} from "@/components/admin/offizielleInformationenData";
import { OffizielleInformationenPreview } from "@/components/admin/OffizielleInformationenPreview";

const FIELD_CLASS =
  "w-full rounded-xl border border-[var(--mwg-line)] bg-paper px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent";

const TEXTAREA_CLASS = `${FIELD_CLASS} min-h-[120px] resize-y`;

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

function OpenLinkButton({
  label,
  url,
}: {
  label: string;
  url: string;
}) {
  const href = normalizeExternalUrl(url);

  return (
    <AdminSecondaryButton
      type="button"
      disabled={!href}
      onClick={() => {
        if (href) window.open(href, "_blank", "noopener,noreferrer");
      }}
    >
      {label}
    </AdminSecondaryButton>
  );
}

interface OffizielleInformationenEditorProps {
  initialData?: OffizielleInformationenData;
}

export function OffizielleInformationenEditor({
  initialData = DEFAULT_OFFIZIELLE_INFORMATIONEN,
}: OffizielleInformationenEditorProps) {
  const [savedData, setSavedData] = useState<OffizielleInformationenData>(initialData);
  const [formData, setFormData] = useState<OffizielleInformationenData>(initialData);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  function updateField<K extends keyof OffizielleInformationenData>(
    key: K,
    value: OffizielleInformationenData[K],
  ) {
    setFormData((current) => ({ ...current, [key]: value }));
    setSaveMessage(null);
  }

  function toggleBarrierefreiheit(key: keyof BarrierefreiheitFlags) {
    setFormData((current) => ({
      ...current,
      barrierefreiheit: {
        ...current.barrierefreiheit,
        [key]: !current.barrierefreiheit[key],
      },
    }));
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
    <div className="grid gap-8 2xl:grid-cols-[minmax(0,1fr)_260px]">
      <form onSubmit={handleSave} className="space-y-8">
        {saveMessage && (
          <div
            role="status"
            className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14.5px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 1 – Betreiber</SectionTitle>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-betreiber">Betreiber</FieldLabel>
            <input
              id="offiziell-betreiber"
              type="text"
              value={formData.betreiber}
              onChange={(event) => updateField("betreiber", event.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-betreiber-webseite">Betreiber-Webseite</FieldLabel>
            <input
              id="offiziell-betreiber-webseite"
              type="url"
              value={formData.betreiberWebseite}
              onChange={(event) => updateField("betreiberWebseite", event.target.value)}
              placeholder="https://"
              className={FIELD_CLASS}
            />
          </div>
          <OpenLinkButton label="🌐 Betreiber-Webseite öffnen" url={formData.betreiberWebseite} />
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 2 – Offizielle Webseite</SectionTitle>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-webseite">Offizielle Webseite</FieldLabel>
            <input
              id="offiziell-webseite"
              type="url"
              value={formData.offizielleWebseite}
              onChange={(event) => updateField("offizielleWebseite", event.target.value)}
              placeholder="https://"
              className={FIELD_CLASS}
            />
          </div>
          <OpenLinkButton label="🌐 Webseite öffnen" url={formData.offizielleWebseite} />
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 3 – Fahrplan / Öffnungszeiten</SectionTitle>
          <textarea
            id="offiziell-fahrplan"
            value={formData.fahrplan}
            onChange={(event) => updateField("fahrplan", event.target.value)}
            className={TEXTAREA_CLASS}
            aria-label="Fahrplan / Öffnungszeiten"
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 4 – Preise</SectionTitle>
          <textarea
            id="offiziell-preise"
            value={formData.preise}
            onChange={(event) => updateField("preise", event.target.value)}
            className={TEXTAREA_CLASS}
            aria-label="Preise"
          />
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 5 – Tickets</SectionTitle>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-ticketshop">Ticketshop</FieldLabel>
            <input
              id="offiziell-ticketshop"
              type="url"
              value={formData.ticketshop}
              onChange={(event) => updateField("ticketshop", event.target.value)}
              placeholder="https://"
              className={FIELD_CLASS}
            />
          </div>
          <OpenLinkButton label="🎟 Ticketshop öffnen" url={formData.ticketshop} />
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 6 – Standort</SectionTitle>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-adresse">Adresse</FieldLabel>
            <input
              id="offiziell-adresse"
              type="text"
              value={formData.adresse}
              onChange={(event) => updateField("adresse", event.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <FieldLabel htmlFor="offiziell-breitengrad">Breitengrad</FieldLabel>
              <input
                id="offiziell-breitengrad"
                type="text"
                value={formData.gpsBreitengrad}
                onChange={(event) => updateField("gpsBreitengrad", event.target.value)}
                className={FIELD_CLASS}
              />
            </div>
            <div className="space-y-2">
              <FieldLabel htmlFor="offiziell-laengengrad">Längengrad</FieldLabel>
              <input
                id="offiziell-laengengrad"
                type="text"
                value={formData.gpsLaengengrad}
                onChange={(event) => updateField("gpsLaengengrad", event.target.value)}
                className={FIELD_CLASS}
              />
            </div>
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-kartenlink">Kartenlink</FieldLabel>
            <input
              id="offiziell-kartenlink"
              type="url"
              value={formData.kartenlink}
              onChange={(event) => updateField("kartenlink", event.target.value)}
              placeholder="https://"
              className={FIELD_CLASS}
            />
          </div>
          <OpenLinkButton label="🗺 Karte öffnen" url={formData.kartenlink} />
        </fieldset>

        <fieldset className="space-y-4 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 7 – Kontakt</SectionTitle>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-telefon">Telefon</FieldLabel>
            <input
              id="offiziell-telefon"
              type="text"
              value={formData.telefon}
              onChange={(event) => updateField("telefon", event.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-email">E-Mail</FieldLabel>
            <input
              id="offiziell-email"
              type="email"
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
              className={FIELD_CLASS}
            />
          </div>
          <div className="space-y-2">
            <FieldLabel htmlFor="offiziell-kontaktseite">Kontaktseite</FieldLabel>
            <input
              id="offiziell-kontaktseite"
              type="url"
              value={formData.kontaktseite}
              onChange={(event) => updateField("kontaktseite", event.target.value)}
              placeholder="https://"
              className={FIELD_CLASS}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-3 rounded-xl border border-[var(--mwg-line)] p-4">
          <SectionTitle>Abschnitt 8 – Barrierefreiheit & Service</SectionTitle>
          <div className="grid gap-2 sm:grid-cols-2">
            {BARRIEREFreiheit_OPTIONS.map(({ key, label }) => (
              <label
                key={key}
                className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--mwg-line)] px-4 py-3 text-[14.5px] transition-colors has-[:checked]:border-accent has-[:checked]:bg-accent/5"
              >
                <input
                  type="checkbox"
                  checked={formData.barrierefreiheit[key]}
                  onChange={() => toggleBarrierefreiheit(key)}
                  className="h-4 w-4 accent-[var(--mwg-accent)]"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

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

      <OffizielleInformationenPreview data={formData} />
    </div>
  );
}
