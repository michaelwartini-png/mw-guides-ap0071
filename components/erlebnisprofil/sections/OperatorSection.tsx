import type { ReactNode } from "react";
import { Building2, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";

interface OperatorSectionProps {
  operator: ErlebnisprofilProduct["operator"];
  standort: ErlebnisprofilProduct["standort"];
  headingMeta?: ReactNode;
}

export function OperatorSection({ operator, standort, headingMeta }: OperatorSectionProps) {
  if (!operator.name && !standort.adresse) return null;

  return (
    <section className="mt-16">
      <ErlebnisprofilSectionHeading
        eyebrow="Anbieter"
        title="Betreiber & Standort"
        meta={headingMeta}
      />
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <article className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-6">
          {operator.name ? (
            <>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Building2 size={20} strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-[22px] font-medium">{operator.name}</h3>
              </div>
              <ul className="mt-6 space-y-3 text-[15px] text-[var(--mwg-ink-70)]">
                {operator.phone ? (
                  <li className="flex items-center gap-3">
                    <Phone size={16} className="shrink-0 text-accent" strokeWidth={1.5} />
                    {operator.phone}
                  </li>
                ) : null}
                {operator.email ? (
                  <li className="flex items-center gap-3">
                    <Mail size={16} className="shrink-0 text-accent" strokeWidth={1.5} />
                    {operator.email}
                  </li>
                ) : null}
                {operator.website ? (
                  <li className="flex items-center gap-3">
                    <ExternalLink size={16} className="shrink-0 text-accent" strokeWidth={1.5} />
                    <span className="text-accent">{operator.website}</span>
                  </li>
                ) : null}
              </ul>
            </>
          ) : null}
        </article>

        <article className="overflow-hidden rounded-2xl border border-[var(--mwg-line)]">
          <div className="relative min-h-[220px] bg-gradient-to-br from-accent/15 via-[var(--mwg-paper)] to-accent/5 p-6">
            <div className="flex items-start gap-3">
              <MapPin size={20} className="mt-0.5 shrink-0 text-accent" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-[18px] font-medium">Standort</h3>
                {standort.adresse ? (
                  <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                    {standort.adresse}
                  </p>
                ) : null}
                {standort.gps ? (
                  <p className="mt-2 font-mono text-[12px] text-[var(--mwg-ink-45)]">{standort.gps}</p>
                ) : null}
                {standort.kartenlink ? (
                  <p className="mt-3 inline-flex items-center gap-1.5 text-[14px] font-medium text-accent">
                    <ExternalLink size={14} />
                    Karte öffnen
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
