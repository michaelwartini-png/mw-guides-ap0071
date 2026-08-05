import { AdminLink, AdminSecondaryButton } from "@/components/admin/adminButtons";
import type { DashboardErlebnis } from "@/components/admin/erlebnisDashboardData";
import { cn } from "@/lib/cn";

interface ErlebnisCardProps {
  erlebnis: DashboardErlebnis;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
}

function StatusBadge({ status }: { status: DashboardErlebnis["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium",
        status === "Veröffentlicht" && "bg-accent/10 text-accent",
        status === "In Bearbeitung" && "bg-amber-400/15 text-[var(--mwg-ink)]",
        status === "Entwurf" && "bg-[var(--mwg-line)] text-[var(--mwg-ink-70)]",
      )}
    >
      {status}
    </span>
  );
}

export function ErlebnisCard({ erlebnis, onDuplicate, onDelete }: ErlebnisCardProps) {
  return (
    <article className="flex flex-col rounded-xl border border-[var(--mwg-line)] bg-paper-raised p-5 transition-shadow hover:shadow-[0_8px_24px_-16px_rgba(26,26,24,0.2)]">
      <div className="flex flex-1 flex-col gap-4">
        <div className="space-y-2">
          <h2 className="font-display text-lg font-medium leading-snug text-ink">
            {erlebnis.name}
          </h2>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[var(--mwg-ink-70)]">
            <span>
              Kategorie: <span className="text-ink">{erlebnis.kategorie}</span>
            </span>
            <span>
              Erlebniswelt: <span className="text-ink">{erlebnis.erlebniswelt}</span>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={erlebnis.status} />
          <span className="text-[13px] text-stone">{erlebnis.progress}&nbsp;%</span>
        </div>

        <div className="space-y-1.5">
          <div className="h-1.5 overflow-hidden rounded-full bg-[var(--mwg-line)]">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${erlebnis.progress}%` }}
            />
          </div>
          <p className="text-[12px] text-stone">
            Zuletzt geändert: {erlebnis.lastModifiedLabel}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-[var(--mwg-line)] pt-4">
        <AdminLink href="/admin/neues-erlebnis/analyse" variant="primary">
          Bearbeiten
        </AdminLink>
        <AdminSecondaryButton type="button" onClick={() => onDuplicate(erlebnis.id)}>
          Duplizieren
        </AdminSecondaryButton>
        <AdminSecondaryButton type="button" onClick={() => onDelete(erlebnis.id)}>
          Löschen
        </AdminSecondaryButton>
      </div>
    </article>
  );
}
