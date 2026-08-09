import {
  formatGps,
  getActiveBarrierefreiheitLabels,
  getEffectiveOffizielleWebseite,
  normalizeExternalUrl,
  type OffizielleInformationenData,
} from "@/components/admin/offizielleInformationenData";

interface OffizielleInformationenPreviewProps {
  data: OffizielleInformationenData;
}

function PreviewBlock({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value?: string | null;
}) {
  if (!value?.trim()) return null;

  return (
    <div className="space-y-0.5">
      <p className="text-[13px] text-[var(--mwg-ink-70)]">
        <span aria-hidden="true">{emoji}</span> {label}
      </p>
      <p className="whitespace-pre-line text-[13px] font-medium leading-relaxed text-ink">{value}</p>
    </div>
  );
}

function PreviewLink({
  emoji,
  label,
  url,
}: {
  emoji: string;
  label: string;
  url: string;
}) {
  const href = normalizeExternalUrl(url);
  if (!href) return null;

  return (
    <div className="space-y-0.5">
      <p className="text-[13px] text-[var(--mwg-ink-70)]">
        <span aria-hidden="true">{emoji}</span> {label}
      </p>
      <p className="truncate text-[13px] font-medium text-accent">{url.trim()}</p>
    </div>
  );
}

export function OffizielleInformationenPreview({ data }: OffizielleInformationenPreviewProps) {
  const { standortAnreise } = data;
  const gps = formatGps(standortAnreise);
  const barrierefreiheit = getActiveBarrierefreiheitLabels(data);
  const kontaktParts = [data.telefon, data.email, data.kontaktseite].filter((part) => part.trim());
  const offizielleWebseite = getEffectiveOffizielleWebseite(data);

  return (
    <div className="sticky top-6 space-y-3">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        Offizielle Informationen – Vorschau
      </p>

      <div className="space-y-4 rounded-2xl border border-[var(--mwg-line)] bg-paper-raised p-5 shadow-[0_12px_32px_-20px_rgba(26,26,24,0.25)]">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
          Offizielle Informationen
        </h3>

        <div className="space-y-4">
          <PreviewBlock emoji="" label="Betreiber" value={data.betreiber} />
          {!data.betreiberWebseiteGleichOffiziell && data.betreiberWebseite.trim() && (
            <PreviewLink emoji="🌐" label="Betreiber-Webseite" url={data.betreiberWebseite} />
          )}
          <PreviewLink emoji="🌐" label="Offizielle Webseite" url={offizielleWebseite} />
          {standortAnreise.kartenlink.trim() ? (
            <PreviewLink emoji="🗺" label="Standort & Anreise" url={standortAnreise.kartenlink} />
          ) : (
            (standortAnreise.adresse.trim() || gps) && (
              <PreviewBlock
                emoji="🗺"
                label="Standort & Anreise"
                value={[standortAnreise.adresse, gps].filter(Boolean).join("\n")}
              />
            )
          )}
          {standortAnreise.kartenlink.trim() && standortAnreise.adresse.trim() && (
            <PreviewBlock emoji="" label="Adresse" value={standortAnreise.adresse} />
          )}
          {gps && standortAnreise.kartenlink.trim() && (
            <PreviewBlock emoji="" label="GPS" value={gps} />
          )}
          <PreviewBlock emoji="📅" label="Fahrplan" value={data.fahrplan} />
          <PreviewBlock emoji="💶" label="Preise" value={data.preise} />
          <PreviewLink emoji="🎟" label="Ticketshop" url={data.ticketshop} />
          {kontaktParts.length > 0 && (
            <PreviewBlock emoji="☎" label="Kontakt" value={kontaktParts.join("\n")} />
          )}
          {barrierefreiheit.length > 0 && (
            <PreviewBlock emoji="♿" label="Barrierefreiheit" value={barrierefreiheit.join(", ")} />
          )}
        </div>
      </div>
    </div>
  );
}
