"use client";

import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";

interface UnsavedChangesDialogProps {
  open: boolean;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

export function UnsavedChangesDialog({
  open,
  onSave,
  onDiscard,
  onCancel,
}: UnsavedChangesDialogProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unsaved-dialog-title"
    >
      <div className="w-full max-w-md rounded-2xl border border-[var(--mwg-line)] bg-paper-raised p-6 shadow-xl">
        <h3 id="unsaved-dialog-title" className="font-display text-lg font-medium text-ink">
          Ungespeicherte Änderungen
        </h3>
        <p className="mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
          Sie haben ungespeicherte Änderungen in diesem Bereich. Was möchten Sie tun?
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <AdminPrimaryButton type="button" onClick={onSave}>
            Speichern
          </AdminPrimaryButton>
          <AdminSecondaryButton type="button" onClick={onDiscard}>
            Verwerfen
          </AdminSecondaryButton>
          <AdminSecondaryButton type="button" onClick={onCancel}>
            Abbrechen
          </AdminSecondaryButton>
        </div>
      </div>
    </div>
  );
}
