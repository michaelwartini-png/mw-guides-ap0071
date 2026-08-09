"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { registerNewErlebnis } from "@/components/admin/erlebnisSessionStore";

const KATEGORIEN = [
  "Mit besonderen Verkehrsmitteln unterwegs",
  "Natur & Landschaft",
  "Kultur & Geschichte",
  "Aktiv & Abenteuer",
  "Genuss & Kulinarik",
];

export function NeuesErlebnisForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [kategorie, setKategorie] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const record = registerNewErlebnis({ name });

    const params = new URLSearchParams({
      created: "1",
      name: record.name,
    });
    router.push(`/admin?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2">
        <label htmlFor="erlebnis-name" className="block text-sm font-medium text-ink">
          Name des Erlebnisses
        </label>
        <input
          id="erlebnis-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="z. B. Katamaran Konstanz–Friedrichshafen"
          className="w-full rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="erlebnis-website" className="block text-sm font-medium text-ink">
          Offizielle Webseite
        </label>
        <input
          id="erlebnis-website"
          type="url"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          placeholder="https://"
          className="w-full rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="erlebnis-kategorie" className="block text-sm font-medium text-ink">
          Kategorie
        </label>
        <select
          id="erlebnis-kategorie"
          value={kategorie}
          onChange={(event) => setKategorie(event.target.value)}
          className="w-full rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-4 py-3 text-[15px] outline-none transition-colors focus:border-accent"
        >
          <option value="">Kategorie wählen</option>
          {KATEGORIEN.map((kategorieOption) => (
            <option key={kategorieOption} value={kategorieOption}>
              {kategorieOption}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-[14.5px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_-12px_rgba(47,111,111,0.55)]"
      >
        Erlebnis erstellen
      </button>
    </form>
  );
}
