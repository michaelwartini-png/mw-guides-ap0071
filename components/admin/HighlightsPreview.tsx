import {
  getActiveHighlights,
  HIGHLIGHT_ICON_EMOJI,
  type HighlightsData,
} from "@/components/admin/highlightsData";

interface HighlightsPreviewProps {
  data: HighlightsData;
}

export function HighlightsPreview({ data }: HighlightsPreviewProps) {
  const activeItems = getActiveHighlights(data.items);
  const inactiveCount = data.items.filter((item) => !item.aktiv).length;

  return (
    <div className="sticky top-6 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        Highlights – Vorschau
      </p>

      <div className="rounded-2xl border border-[var(--mwg-line)] bg-paper-raised p-5 shadow-[0_12px_32px_-20px_rgba(26,26,24,0.25)]">
        <h3 className="font-display text-[17px] font-medium text-ink">Das Erlebnis</h3>
        <p className="mt-1 text-[13px] text-stone">
          Nur aktive Highlights in Reihenfolge.
        </p>

        {activeItems.length > 0 ? (
          <ul className="mt-4 space-y-4">
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
                  <div className="flex items-start gap-2">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-base">
                      {HIGHLIGHT_ICON_EMOJI[item.icon]}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-medium leading-snug text-ink">
                        {item.titel || "—"}
                      </p>
                      {item.kurzbeschreibung.trim() && (
                        <p className="mt-1 text-[12px] leading-relaxed text-[var(--mwg-ink-70)]">
                          {item.kurzbeschreibung}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-stone">Reihenfolge {item.reihenfolge}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-[13px] text-[var(--mwg-ink-70)]">
            Keine aktiven Highlights.
          </p>
        )}

        {inactiveCount > 0 && (
          <p className="mt-4 text-[12px] text-stone">
            {inactiveCount} inaktive Highlight{inactiveCount === 1 ? "" : "s"} ausgeblendet.
          </p>
        )}

        <div className="mt-5 border-t border-[var(--mwg-line)] pt-4">
          <p className="font-mono text-[10px] uppercase tracking-wider text-stone">
            Kompaktansicht (Erlebnisprofil)
          </p>
          <ul className="mt-3 space-y-2.5">
            {activeItems.map((item) => (
              <li key={`compact-${item.id}`} className="flex items-center gap-2 text-[13px] text-ink">
                <span aria-hidden="true">{HIGHLIGHT_ICON_EMOJI[item.icon]}</span>
                <span>{item.titel || "—"}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
