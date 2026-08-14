import type { ReactNode } from "react";
import { MapPin } from "lucide-react";
import Image from "next/image";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import type { ExploreTripMapEnhancement } from "@/types/erlebnisprofilChannel";
import { getPracticalIcon } from "@/lib/erlebnisdetailHelpers";
import { firstLine, normalizeExternalUrl } from "@/components/erlebnisprofil/utils";
import { InfoDisclosure } from "@/components/erlebnisprofil/InfoDisclosure";
import { TICKETS_CTA_LABEL } from "@/content/rideGuideCopy";

const OFFICIAL_PLACEHOLDER = "—";

interface OverviewSectionProps {
  product: Pick<
    ErlebnisprofilProduct,
    | "description"
    | "scoreBegruendung"
    | "features"
    | "mapInfo"
    | "officialLinks"
    | "practicalInfo"
    | "operator"
  >;
  headingMeta?: {
    description?: ReactNode;
    map?: ReactNode;
    official?: ReactNode;
    practical?: ReactNode;
  };
  mapEnhancement?: ExploreTripMapEnhancement;
  collapsible?: boolean;
}

export function OverviewSection({
  product,
  headingMeta,
  mapEnhancement,
  collapsible = false,
}: OverviewSectionProps) {
  const websiteHref = normalizeExternalUrl(product.officialLinks.website);
  const ticketHref = normalizeExternalUrl(product.officialLinks.ticketshop);
  const mapHref = normalizeExternalUrl(product.mapInfo.kartenlink);
  const schedule = firstLine(product.officialLinks.fahrplan);
  const prices = firstLine(product.officialLinks.preise);

  const officialEntries: {
    emoji: string;
    label: string;
    value?: string;
    href?: string;
  }[] = [
    {
      emoji: "🌐",
      label: "Offizielle Webseite",
      value: product.officialLinks.website,
      href: websiteHref ?? undefined,
    },
    {
      emoji: "🗺️",
      label: "Karte",
      value: product.mapInfo.gps || product.mapInfo.adresse,
      href: mapHref ?? (product.mapInfo.adresse || product.mapInfo.gps ? "#erlebnis-karte" : undefined),
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

  const descriptionParagraphs = product.description
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .filter((paragraph) => paragraph !== product.scoreBegruendung.trim());

  const showMap = Boolean(
    product.mapInfo.adresse.trim() ||
      product.mapInfo.gps.trim() ||
      product.mapInfo.anreiseHinweise.trim() ||
      product.mapInfo.kartenlink.trim() ||
      mapEnhancement?.preview ||
      mapEnhancement?.departureA ||
      mapEnhancement?.departureB ||
      mapEnhancement?.parking,
  );

  const mapCards: { label: string; value: string }[] = [];
  if (mapEnhancement?.departureA) {
    mapCards.push({ label: "Abfahrt", value: mapEnhancement.departureA });
  }
  if (mapEnhancement?.departureB) {
    mapCards.push({ label: "Abfahrt", value: mapEnhancement.departureB });
  }
  if (mapEnhancement?.parking) {
    mapCards.push({ label: "Parken / ÖPNV", value: mapEnhancement.parking });
  } else if (product.mapInfo.anreiseHinweise) {
    mapCards.push({ label: "Parken / ÖPNV", value: product.mapInfo.anreiseHinweise });
  }
  if (product.mapInfo.gps) {
    mapCards.push({ label: "GPS", value: product.mapInfo.gps });
  }

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-10 lg:px-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr_0.9fr] lg:gap-8">
        {/* Left: Das Erlebnis */}
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {headingMeta?.description}
          </div>
          <h2 className="font-display text-[22px] font-medium">Warum lohnt sich diese Fahrt?</h2>
          {product.scoreBegruendung ? (
            <p className="mt-4 text-[15px] leading-[1.75] text-[var(--mwg-ink)]">
              {product.scoreBegruendung}
            </p>
          ) : null}
          {descriptionParagraphs.map((paragraph) => (
            <p
              key={paragraph.slice(0, 48)}
              className="mt-4 text-[15px] leading-[1.75] text-[var(--mwg-ink-70)]"
            >
              {paragraph}
            </p>
          ))}
          {product.features.length > 0 ? (
            <ul className="mt-6 space-y-3">
              {product.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-2.5 text-[14px]">
                  <span className="shrink-0 text-[16px]" aria-hidden>
                    {feature.icon}
                  </span>
                  {feature.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Middle: Karte */}
        <div id="erlebnis-karte" className="scroll-mt-36">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[17px] font-medium">Karte</h3>
            {showMap ? (
              <a
                href="#erlebnis-karte"
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-3 py-1.5 text-[12px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
              >
                <MapPin size={13} />
                Karte öffnen
              </a>
            ) : null}
          </div>
          {showMap ? (
            <>
              <div className="relative mt-3 aspect-[4/3] overflow-hidden rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)]">
                {mapEnhancement?.preview ? (
                  <Image
                    src={mapEnhancement.preview.src}
                    alt={mapEnhancement.preview.alt}
                    fill
                    className="object-contain p-4"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                  />
                ) : (
                  <>
                    <div className="absolute inset-0 mwg-route-dots opacity-[0.08]" aria-hidden="true" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />
                    <div className="relative flex h-full flex-col justify-end p-4">
                      <MapPin size={20} className="text-accent" strokeWidth={1.5} />
                      {product.mapInfo.adresse ? (
                        <p className="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
                          {product.mapInfo.adresse}
                        </p>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
              {mapCards.length > 0 ? (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {mapCards.map((card) => (
                    <div
                      key={`${card.label}-${card.value.slice(0, 24)}`}
                      className="rounded-lg border border-[var(--mwg-line)] p-3"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-wider text-[var(--mwg-ink-45)]">
                        {card.label}
                      </p>
                      <p className="mt-1 whitespace-pre-line text-[13px] text-[var(--mwg-ink-70)]">
                        {card.value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </>
          ) : (
            <p className="mt-3 text-[13px] text-[var(--mwg-ink-45)]">{OFFICIAL_PLACEHOLDER}</p>
          )}
        </div>

        {/* Right: Offizielle + Praktische Informationen + Betreiber */}
        <div className="space-y-6">
          <InfoDisclosure
            title="Offizielle Informationen"
            defaultOpen={false}
            collapsible={collapsible}
          >
            <ul className="space-y-3">
              {officialEntries.map((entry) => {
                const linkHref = entry.href;
                const linkLabel =
                  entry.value ?? (entry.label === "Karte" && linkHref ? "Karte öffnen" : undefined);

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
                        <p className="mt-0.5 font-medium">
                          {entry.value ?? OFFICIAL_PLACEHOLDER}
                        </p>
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
                      {TICKETS_CTA_LABEL}
                    </a>
                  </div>
                </li>
              ) : null}
            </ul>
          </InfoDisclosure>

          {product.practicalInfo.length > 0 ? (
            <InfoDisclosure
              title="Praktische Informationen"
              defaultOpen
              collapsible={collapsible}
            >
              <dl className="divide-y divide-[var(--mwg-line)]">
                {product.practicalInfo.map((row, index) => {
                  const icon = getPracticalIcon(row.label);
                  const rowHref = row.href ? normalizeExternalUrl(row.href) : null;
                  const isMultiline = row.value.includes("\n");
                  return (
                    <div
                      key={`${row.label}-${index}`}
                      className={`flex gap-4 py-2.5 text-[13px] ${
                        isMultiline ? "flex-col" : "justify-between"
                      }`}
                    >
                      <dt className="flex items-center gap-2 text-[var(--mwg-ink-70)]">
                        {icon ? (
                          <span className="shrink-0" aria-hidden>
                            {icon}
                          </span>
                        ) : null}
                        {row.label}
                      </dt>
                      <dd className={isMultiline ? "font-medium" : "text-right font-medium"}>
                        {rowHref ? (
                          <a
                            href={rowHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--mwg-accent)] hover:underline"
                          >
                            {row.value}
                          </a>
                        ) : (
                          <span className="whitespace-pre-line">{row.value}</span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </InfoDisclosure>
          ) : null}

          {product.operator.name ? (
            <div className="rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-4">
              <h3 className="font-display text-[17px] font-medium">Betreiber</h3>
              <p className="mt-2 text-[14px] font-medium">{product.operator.name}</p>
              {product.operator.phone ? (
                <p className="mt-1 text-[13px] text-[var(--mwg-ink-70)]">{product.operator.phone}</p>
              ) : null}
              {product.operator.email ? (
                <p className="text-[13px] text-[var(--mwg-ink-70)]">{product.operator.email}</p>
              ) : null}
              {product.operator.website ? (
                <p className="text-[13px] text-[var(--mwg-accent)]">{product.operator.website}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
