import type { ReactNode } from "react";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";
import {
  firstLine,
  normalizeExternalUrl,
} from "@/components/erlebnisprofil/utils";

interface OfficialLinksSectionProps {
  officialLinks: ErlebnisprofilProduct["officialLinks"];
  mapInfo: ErlebnisprofilProduct["mapInfo"];
  headingMeta?: ReactNode;
}

const PLACEHOLDER = "—";

export function OfficialLinksSection({
  officialLinks,
  mapInfo,
  headingMeta,
}: OfficialLinksSectionProps) {
  const websiteHref = normalizeExternalUrl(officialLinks.website);
  const ticketHref = normalizeExternalUrl(officialLinks.ticketshop);
  const mapHref = normalizeExternalUrl(mapInfo.kartenlink);
  const schedule = firstLine(officialLinks.fahrplan);
  const prices = firstLine(officialLinks.preise);

  const entries: {
    emoji: string;
    label: string;
    value?: string;
    href?: string;
  }[] = [
    {
      emoji: "🌐",
      label: "Offizielle Webseite",
      value: officialLinks.website,
      href: websiteHref ?? undefined,
    },
    {
      emoji: "🗺️",
      label: "Karte",
      value: mapInfo.gps || mapInfo.adresse,
      href: mapHref ?? (mapInfo.adresse || mapInfo.gps ? "#erlebnis-karte" : undefined),
    },
    {
      emoji: "🕒",
      label: "Fahrplan / Öffnungszeiten",
      value: schedule,
    },
    {
      emoji: "💶",
      label: "Preise",
      value: prices,
    },
  ];

  const hasContent = entries.some((entry) => entry.value?.trim()) || Boolean(ticketHref);
  if (!hasContent) return null;

  return (
    <section className="mt-16">
      <ErlebnisprofilSectionHeading
        eyebrow="Offiziell"
        title="Offizielle Informationen"
        meta={headingMeta}
      />
      <div className="mt-6 rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
        <ul className="space-y-3">
          {entries.map((entry) => {
            const linkHref = entry.href;
            const linkLabel = entry.value ?? (linkHref ? "Öffnen" : undefined);

            return (
              <li key={entry.label} className="flex items-start gap-2.5 text-[13px]">
                <span className="mt-0.5 shrink-0" aria-hidden>
                  {entry.emoji}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[var(--mwg-ink-70)]">{entry.label}</p>
                  {linkHref && linkLabel ? (
                    <a
                      href={linkHref}
                      target={linkHref.startsWith("#") ? undefined : "_blank"}
                      rel={linkHref.startsWith("#") ? undefined : "noopener noreferrer"}
                      className="mt-0.5 block truncate font-medium text-[var(--mwg-accent)] hover:underline"
                    >
                      {linkLabel}
                    </a>
                  ) : (
                    <p className="mt-0.5 font-medium">{entry.value ?? PLACEHOLDER}</p>
                  )}
                </div>
              </li>
            );
          })}
          {ticketHref ? (
            <li className="flex items-start gap-2.5 text-[13px]">
              <span className="mt-0.5 shrink-0" aria-hidden>
                🎟️
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[var(--mwg-ink-70)]">Tickets</p>
                <a
                  href={ticketHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 block font-medium text-[var(--mwg-accent)] hover:underline"
                >
                  Tickets buchen
                </a>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </section>
  );
}
