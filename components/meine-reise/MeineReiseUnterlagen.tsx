import { ArrowRight, BookOpen, Check, FileText, Map, Ticket } from "lucide-react";
import type { MeineReiseDashboard, MeineReiseDocument } from "@/types/meineReise";

const DOC_ICONS: Record<MeineReiseDocument["kind"], typeof BookOpen> = {
  guide: BookOpen,
  handout: FileText,
  tickets: Ticket,
  pdf: Map,
};

interface MeineReiseUnterlagenProps {
  dashboard: MeineReiseDashboard;
  onOpenGuide: () => void;
}

/** AP-MR001 — documents stay a dedicated block. Offline badge only on Premium Guide. */
export function MeineReiseUnterlagen({ dashboard, onOpenGuide }: MeineReiseUnterlagenProps) {
  return (
    <section
      id="unterlagen"
      className="scroll-mt-24 rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5"
    >
      <h2 className="font-display text-[18px] font-medium">Unterlagen</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {dashboard.documents.map((doc) => {
          const Icon = DOC_ICONS[doc.kind];
          const inner = (
            <>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--mwg-accent)]/10 text-[var(--mwg-accent)]">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[14px] font-medium">{doc.title}</span>
                <span className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] text-[var(--mwg-ink-45)]">
                  {doc.meta}
                  {doc.offlineAvailable ? (
                    <span className="inline-flex items-center gap-1 text-[var(--mwg-accent)]">
                      <Check size={12} strokeWidth={2.25} />
                      Offline verfügbar
                    </span>
                  ) : null}
                </span>
              </span>
            </>
          );

          if (doc.id === "premium-guide") {
            return (
              <li key={doc.id}>
                <button
                  type="button"
                  onClick={onOpenGuide}
                  className="flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors hover:bg-[var(--mwg-paper)]"
                >
                  {inner}
                </button>
              </li>
            );
          }

          if (doc.href) {
            return (
              <li key={doc.id}>
                <a
                  href={doc.href}
                  {...(doc.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-[var(--mwg-paper)]"
                >
                  {inner}
                </a>
              </li>
            );
          }

          return (
            <li key={doc.id} className="flex items-center gap-3 rounded-xl px-2 py-2">
              {inner}
            </li>
          );
        })}
      </ul>
      <a
        href="#unterlagen"
        className="mt-3 inline-flex items-center gap-1 text-[13px] text-[var(--mwg-accent)] hover:underline"
      >
        Alle Unterlagen anzeigen
        <ArrowRight size={13} />
      </a>
    </section>
  );
}
