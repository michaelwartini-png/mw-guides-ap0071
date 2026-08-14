"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdminPrimaryLink, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { ErlebnisCard } from "@/components/admin/ErlebnisCard";
import {
  filterErlebnisse,
  getDashboardStats,
  sortErlebnisse,
  toDashboardErlebnis,
  type DashboardErlebnis,
  type ErlebnisFilter,
  type ErlebnisSort,
} from "@/components/admin/erlebnisDashboardData";
import { duplicateErlebnisRecord, fetchAllErlebnisRecords } from "@/lib/erlebnisApiClient";

const FILTER_OPTIONS: ErlebnisFilter[] = [
  "Alle",
  "Entwurf",
  "In Prüfung",
  "Veröffentlicht",
  "Archiviert",
];

const SORT_OPTIONS: ErlebnisSort[] = ["Zuletzt geändert", "Alphabetisch", "Fortschritt"];

const FIELD_CLASS =
  "h-10 rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-4 text-[14px] outline-none transition-colors focus:border-accent";

export function ErlebnisDashboard() {
  const searchParams = useSearchParams();
  const [erlebnisse, setErlebnisse] = useState<DashboardErlebnis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<ErlebnisFilter>("Alle");
  const [sort, setSort] = useState<ErlebnisSort>("Zuletzt geändert");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DashboardErlebnis | null>(null);

  const reload = useCallback(async () => {
    const records = await fetchAllErlebnisRecords();
    setErlebnisse(records.map(toDashboardErlebnis));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);

  useEffect(() => {
    if (searchParams.get("created") !== "1") return;

    const name = searchParams.get("name");
    setStatusMessage(
      name
        ? `„${name}" wurde erfolgreich angelegt.`
        : "Das Erlebnis wurde erfolgreich angelegt.",
    );

    const timeout = window.setTimeout(() => setStatusMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [searchParams]);

  const stats = getDashboardStats(erlebnisse);

  const visibleErlebnisse = useMemo(() => {
    const filtered = filterErlebnisse(erlebnisse, searchQuery, filter);
    return sortErlebnisse(filtered, sort);
  }, [erlebnisse, searchQuery, filter, sort]);

  async function handleDuplicate(id: string) {
    try {
      const record = await duplicateErlebnisRecord(id);
      const duplicate = toDashboardErlebnis(record);
      setErlebnisse((current) => [duplicate, ...current]);
      setStatusMessage(`„${duplicate.name}" wurde erstellt.`);
      window.setTimeout(() => setStatusMessage(null), 5000);
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Duplizieren fehlgeschlagen.");
    }
  }

  function handleDeleteConfirm() {
    setDeleteTarget(null);
  }

  if (isLoading) {
    return <div className="text-[15px] text-[var(--mwg-ink-70)]">Laden…</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
            MW Guides Admin
          </p>
          <h1 className="font-display text-[1.625rem] font-medium leading-tight text-ink">
            Erlebnisverwaltung
          </h1>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[var(--mwg-ink-70)]">
            <span>
              <span className="font-medium text-ink">{stats.total}</span> Erlebnisse
            </span>
            <span>
              <span className="font-medium text-ink">{stats.entwurf}</span> Entwurf
            </span>
            <span>
              <span className="font-medium text-ink">{stats.inPruefung}</span> In Prüfung
            </span>
            <span>
              <span className="font-medium text-ink">{stats.veroeffentlicht}</span> veröffentlicht
            </span>
          </div>
        </div>

        <AdminPrimaryLink href="/admin/neues-erlebnis" className="h-11 px-6 text-[15px]">
          + Neues Erlebnis
        </AdminPrimaryLink>
      </div>

      {statusMessage && (
        <div
          role="status"
          className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 text-[14px] text-ink"
        >
          {statusMessage}
        </div>
      )}

      {erlebnisse.length > 0 && (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Erlebnis suchen…"
            className={`${FIELD_CLASS} w-full sm:min-w-[220px] sm:flex-1`}
          />
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as ErlebnisFilter)}
            className={`${FIELD_CLASS} w-full sm:w-auto`}
            aria-label="Status filtern"
          >
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as ErlebnisSort)}
            className={`${FIELD_CLASS} w-full sm:w-auto`}
            aria-label="Sortierung"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {erlebnisse.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--mwg-line)] bg-paper-raised px-6 py-16 text-center">
          <p className="text-[15px] text-[var(--mwg-ink-70)]">Noch keine Erlebnisse vorhanden.</p>
          <AdminPrimaryLink href="/admin/neues-erlebnis" className="mt-5">
            + Neues Erlebnis erstellen
          </AdminPrimaryLink>
        </div>
      ) : visibleErlebnisse.length === 0 ? (
        <div className="rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-6 py-12 text-center">
          <p className="text-[15px] text-[var(--mwg-ink-70)]">
            Keine Erlebnisse für diese Suche oder diesen Filter gefunden.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleErlebnisse.map((erlebnis) => (
            <ErlebnisCard
              key={erlebnis.id}
              erlebnis={erlebnis}
              onDuplicate={handleDuplicate}
              onDelete={(id) => {
                const target = erlebnisse.find((item) => item.id === id) ?? null;
                setDeleteTarget(target);
              }}
            />
          ))}
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="presentation"
          onClick={() => setDeleteTarget(null)}
        >
          <div
            role="dialog"
            aria-labelledby="delete-dialog-title"
            aria-modal="true"
            className="w-full max-w-md rounded-xl border border-[var(--mwg-line)] bg-paper-raised p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="delete-dialog-title" className="text-lg font-medium text-ink">
              Erlebnis löschen?
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
              „{deleteTarget.name}“ wirklich löschen? Diese Aktion ist im Prototyp noch nicht
              umgesetzt.
            </p>
            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <AdminSecondaryButton type="button" onClick={() => setDeleteTarget(null)}>
                Abbrechen
              </AdminSecondaryButton>
              <AdminSecondaryButton type="button" onClick={handleDeleteConfirm}>
                Löschen
              </AdminSecondaryButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
