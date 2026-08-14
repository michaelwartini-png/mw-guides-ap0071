import type { ReactNode } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import type { ErlebnisprofilMapInfo } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";
import { normalizeExternalUrl } from "@/components/admin/offizielleInformationenData";

interface MapSectionProps {
  mapInfo: ErlebnisprofilMapInfo;
  headingMeta?: ReactNode;
}

export function MapSection({ mapInfo, headingMeta }: MapSectionProps) {
  const hasContent = Boolean(
    mapInfo.adresse.trim() || mapInfo.gps.trim() || mapInfo.anreiseHinweise.trim(),
  );

  if (!hasContent) return null;

  const mapHref = normalizeExternalUrl(mapInfo.kartenlink) ?? "#erlebnis-karte";

  return (
    <section id="erlebnis-karte" className="scroll-mt-36 mt-16">
      <div className="flex items-center justify-between gap-3">
        <ErlebnisprofilSectionHeading eyebrow="Standort" title="Karte & Anreise" meta={headingMeta} />
        {mapInfo.kartenlink ? (
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-3 py-1.5 text-[12px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
          >
            <MapPin size={13} />
            Karte öffnen
          </a>
        ) : null}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-gradient-to-br from-accent/15 via-[var(--mwg-paper)] to-accent/5">
          <div className="absolute inset-0 mwg-route-dots opacity-[0.08]" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-end p-6">
            <MapPin size={24} className="text-accent" strokeWidth={1.5} />
            {mapInfo.adresse ? (
              <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-[var(--mwg-ink)]">
                {mapInfo.adresse}
              </p>
            ) : null}
            {mapInfo.gps ? (
              <p className="mt-2 font-mono text-[12px] text-[var(--mwg-ink-45)]">{mapInfo.gps}</p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {mapInfo.anreiseHinweise ? (
            <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                Parken / ÖPNV
              </p>
              <p className="mt-2 whitespace-pre-line text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
                {mapInfo.anreiseHinweise}
              </p>
            </div>
          ) : null}
          {mapInfo.gps ? (
            <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                GPS
              </p>
              <p className="mt-2 text-[13px] text-[var(--mwg-ink-70)]">{mapInfo.gps}</p>
            </div>
          ) : null}
          {mapInfo.kartenlink ? (
            <a
              href={mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4 text-[13px] font-medium text-accent transition-colors hover:border-accent/40"
            >
              <ExternalLink size={14} />
              Externe Karte öffnen
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
