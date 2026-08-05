import { NeuesErlebnisForm } from "@/components/admin/NeuesErlebnisForm";

export default function NeuesErlebnisPage() {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <p className="mwg-eyebrow">Admin</p>
        <h1 className="mwg-display-lg">Neues Erlebnis</h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
          Grunddaten erfassen und den Analyse-Workflow starten. Es werden noch keine echten
          Daten verarbeitet.
        </p>
      </div>

      <NeuesErlebnisForm />
    </div>
  );
}
