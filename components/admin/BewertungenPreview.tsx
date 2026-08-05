import { getStarDisplay, type BewertungenData } from "@/components/admin/bewertungenData";

interface BewertungenPreviewProps {
  data: BewertungenData;
}

function PlatformPreview({
  label,
  bewertung,
  anzahl,
}: {
  label: string;
  bewertung: string;
  anzahl: string;
}) {
  const rating = parseFloat(bewertung) || 0;
  const count = anzahl.trim();

  return (
    <div className="space-y-1">
      <p className="text-[13px] text-[var(--mwg-ink-70)]">
        <span className="tracking-wide text-amber-500">{getStarDisplay(rating)}</span>{" "}
        <span className="font-medium text-ink">{label}</span>
      </p>
      <p className="font-medium text-ink">{bewertung || "—"}</p>
      {count && <p className="text-[12px] text-stone">({count})</p>}
    </div>
  );
}

export function BewertungenPreview({ data }: BewertungenPreviewProps) {
  return (
    <div className="sticky top-6 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        Bewertungen-Vorschau
      </p>

      <div className="space-y-5 rounded-2xl border border-[var(--mwg-line)] bg-paper-raised p-5 shadow-[0_12px_32px_-20px_rgba(26,26,24,0.25)]">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-stone">MW Guides</p>
          <p className="mt-1 font-display text-2xl font-medium text-ink">
            {data.mwgScore || "—"}
            <span className="text-base font-normal text-stone"> / 10</span>
          </p>
        </div>

        <div className="space-y-4 border-t border-[var(--mwg-line)] pt-4">
          <PlatformPreview
            label="Google"
            bewertung={data.google.bewertung}
            anzahl={data.google.anzahl}
          />
          <PlatformPreview
            label="Tripadvisor"
            bewertung={data.tripadvisor.bewertung}
            anzahl={data.tripadvisor.anzahl}
          />
        </div>
      </div>
    </div>
  );
}
