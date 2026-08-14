"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Globe, Loader2 } from "lucide-react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import {
  canGenerateErlebnisprofil,
  getErlebnisprofilCompleteness,
} from "@/components/admin/products/erlebnisprofilProduct";
import { PUBLICATION_STATUSES, type PublicationStatus } from "@/lib/erlebnisPublication";
import { publishErlebnis, setErlebnisPublicationStatus } from "@/lib/erlebnisApiClient";
import { cn } from "@/lib/cn";

interface PublishPanelProps {
  erlebnis: ErlebnisRecord;
  onRecordChange: (record: ErlebnisRecord) => void;
}

export function PublishPanel({ erlebnis, onRecordChange }: PublishPanelProps) {
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const completeness = getErlebnisprofilCompleteness(erlebnis);
  const canPublish = canGenerateErlebnisprofil(erlebnis);
  const isPublished = erlebnis.profileStatus === "Veröffentlicht";
  const publicUrl = `/erlebnisse/${erlebnis.slug}`;

  async function handleStatusChange(status: PublicationStatus) {
    setIsBusy(true);
    setError(null);
    setMessage(null);

    try {
      const record =
        status === "Veröffentlicht"
          ? await publishErlebnis(erlebnis.slug)
          : await setErlebnisPublicationStatus(erlebnis.slug, status);

      onRecordChange(record);
      setMessage(
        status === "Veröffentlicht"
          ? "Erlebnisprofil wurde veröffentlicht."
          : `Status geändert: ${status}.`,
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Aktion fehlgeschlagen.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            <Globe size={12} />
            Veröffentlichung
          </p>
          <h3 className="mt-2 font-display text-[18px] font-medium text-ink">
            Öffentliche Erlebnisseite
          </h3>
          <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
            Status:{" "}
            <span className="font-medium text-ink">{erlebnis.profileStatus}</span>
            {erlebnis.publishedAt ? (
              <>
                {" "}
                · Veröffentlicht am{" "}
                {new Date(erlebnis.publishedAt).toLocaleDateString("de-DE")}
              </>
            ) : null}
          </p>
          <p className="mt-2 text-[13px] text-[var(--mwg-ink-70)]">
            Vollständigkeit: {completeness.percent}% ({completeness.filled}/{completeness.total}{" "}
            Checks)
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {!isPublished ? (
            <AdminPrimaryButton
              type="button"
              disabled={!canPublish || isBusy}
              onClick={() => void handleStatusChange("Veröffentlicht")}
            >
              {isBusy ? <Loader2 size={15} className="animate-spin" /> : null}
              Veröffentlichen
            </AdminPrimaryButton>
          ) : (
            <AdminSecondaryButton
              type="button"
              disabled={isBusy}
              onClick={() => void handleStatusChange("Archiviert")}
            >
              Archivieren
            </AdminSecondaryButton>
          )}
        </div>
      </div>

      {!canPublish && !isPublished ? (
        <p className="mt-4 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-[13px] text-[var(--mwg-ink-70)]">
          Mindestens 70&nbsp;% Vollständigkeit erforderlich, bevor veröffentlicht werden kann.
        </p>
      ) : null}

      {isPublished ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href={publicUrl}
            target="_blank"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-accent hover:underline"
          >
            {publicUrl}
            <ExternalLink size={14} />
          </Link>
        </div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {PUBLICATION_STATUSES.filter((status) => status !== "Veröffentlicht").map((status) => (
          <button
            key={status}
            type="button"
            disabled={isBusy || erlebnis.profileStatus === status}
            onClick={() => void handleStatusChange(status)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-[12px] font-medium transition-colors",
              erlebnis.profileStatus === status
                ? "border-accent bg-accent/10 text-accent"
                : "border-[var(--mwg-line)] text-[var(--mwg-ink-70)] hover:border-accent/30",
            )}
          >
            {status}
          </button>
        ))}
      </div>

      {message ? (
        <p role="status" className="mt-4 text-[13px] text-accent">
          {message}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="mt-4 text-[13px] text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
