import {
  getActiveTipps,
  getThemaLabel,
  PRIORITAET_OPTIONS,
  type MWGuidesTippsData,
} from "@/components/admin/mwGuidesTippsData";

interface MWGuidesTippsPreviewProps {
  data: MWGuidesTippsData;
}

function prioritaetLabel(value: string): string | null {
  const option = PRIORITAET_OPTIONS.find((entry) => entry.value === value);
  return option?.value ? option.label : null;
}

export function MWGuidesTippsPreview({ data }: MWGuidesTippsPreviewProps) {
  const activeItems = getActiveTipps(data.items);
  const inactiveCount = data.items.filter((item) => !item.aktiv).length;

  return (
    <div className="sticky top-6 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        MW Guides Tipps – Vorschau
      </p>

      <div className="rounded-2xl border border-[var(--mwg-line)] bg-paper-raised p-5 shadow-[0_12px_32px_-20px_rgba(26,26,24,0.25)]">
        <h3 className="font-display text-[17px] font-medium text-ink">MW Guides Tipps</h3>
        <p className="mt-1 text-[13px] text-stone">
          Redaktionelle Empfehlungen – nur aktive Tipps in Reihenfolge.
        </p>

        {activeItems.length > 0 ? (
          <ol className="mt-4 space-y-4">
            {activeItems.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-xl border border-[var(--mwg-line)] bg-paper"
              >
                {item.hasBild && (
                  <div className="flex aspect-[16/7] items-center justify-center bg-gradient-to-br from-accent/15 to-accent/5">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-stone">
                      Bild-Platzhalter
                    </p>
                  </div>
                )}
                <div className="space-y-1.5 p-3.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-accent">
                      {item.typ === "standard" ? "Standard" : "Frei"}
                    </span>
                    {item.prioritaet && (
                      <span className="rounded-full bg-[var(--mwg-line)] px-2 py-0.5 text-[10px] font-medium text-stone">
                        {prioritaetLabel(item.prioritaet)}
                      </span>
                    )}
                  </div>
                  <p className="text-[14px] font-medium leading-snug text-ink">
                    {item.ueberschrift || "—"}
                  </p>
                  {item.typ === "standard" && item.thema && (
                    <p className="text-[12px] text-stone">Thema: {getThemaLabel(item.thema)}</p>
                  )}
                  {item.beschreibung.trim() && (
                    <p className="whitespace-pre-line text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
                      {item.beschreibung}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className="mt-4 text-[13px] text-stone">Noch keine aktiven Tipps.</p>
        )}

        {inactiveCount > 0 && (
          <p className="mt-4 text-[12px] text-stone">
            {inactiveCount} inaktive{inactiveCount === 1 ? "r" : ""} Tipp
            {inactiveCount === 1 ? "" : "s"} nicht in der Vorschau.
          </p>
        )}
      </div>
    </div>
  );
}
