import Link from "next/link";
import { CalendarDays, Check, Headphones, Lightbulb, Lock, MapPin, Wallet } from "lucide-react";
import type { ExplorerReview } from "@/types/explorerReview";
import { ACCOMMODATION_STATUS_LABEL } from "@/content/explorerReview";
import { ReviewPriceDetails } from "@/components/trip-explorer/review/ReviewPriceDetails";

interface ReviewSummaryColumnProps {
  review: ExplorerReview;
  tripSlug: string;
}

function formatBudget(amount: number) {
  return `ca. ${amount} €`;
}

/** AP-ET004 — Right-hand review summary, confirmation and next-step cue. */
export function ReviewSummaryColumn({ review, tripSlug }: ReviewSummaryColumnProps) {
  const duration = `${review.days} Tage (${review.nights} ${review.nights === 1 ? "Nacht" : "Nächte"})`;
  const rideGuides = review.highlights.filter((highlight) => highlight.rideGuide).length;
  const datesLabel =
    review.travelDates.kind === "set"
      ? `${review.travelDates.fromLabel} – ${review.travelDates.toLabel}`
      : "Reisedatum noch nicht festgelegt";

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-[92px]">
      <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
        <h2 className="font-display text-[18px] font-medium">Deine Reise auf einen Blick</h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <GlanceItem icon={CalendarDays} label={duration} />
          <GlanceItem icon={MapPin} label={`${review.highlights.length} Highlights`} />
          <GlanceItem icon={Headphones} label={`${rideGuides} Ride Guides`} />
          <GlanceItem icon={Wallet} label={`${formatBudget(review.budgetPerPerson)} pro Person`} />
        </div>
      </section>

      <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
        <h2 className="font-display text-[18px] font-medium">Reisezusammenfassung</h2>
        <dl className="mt-4 space-y-2.5 text-[13px]">
          <SummaryRow label="Reisedauer" value={duration} />
          <SummaryRow label="Reisezeitraum" value={datesLabel} />
          <SummaryRow label="Beste Reisezeit" value={review.bestSeason} />
          <SummaryRow
            label="Unterkunft"
            value={ACCOMMODATION_STATUS_LABEL[review.accommodationStatus]}
            hint={review.accommodationNote}
          />
          <SummaryRow label="Fortbewegung" value={review.transport.join(", ")} />
          <SummaryRow label="Reisetempo" value={review.pace} />
          <SummaryRow label="Budget (geschätzt)" value={`${formatBudget(review.budgetPerPerson)} p.P.`} />
        </dl>
        <ReviewPriceDetails explanation={review.budgetExplanation} lines={review.budgetLines} />
      </section>

      <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] px-5 py-4">
        <p className="flex items-start gap-2 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
          <Lightbulb size={16} className="mt-0.5 shrink-0 text-[var(--mwg-accent)]" strokeWidth={1.75} />
          <span>
            <span className="font-medium text-[var(--mwg-ink)]">Unser Tipp. </span>
            {review.tip}
          </span>
        </p>
      </section>

      <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-5">
        <h2 className="font-display text-[18px] font-medium">Passt alles zu dir?</h2>
        <ul className="mt-3 space-y-1.5">
          {review.checklist.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[13px] text-[var(--mwg-ink-70)]">
              <Check size={14} className="shrink-0 text-[var(--mwg-accent)]" strokeWidth={2.5} />
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-[13px] font-medium text-[var(--mwg-ink)]">Deine Reise ist bereit.</p>
      </section>

      <div>
        <Link
          href={`/explore-trips/${tripSlug}/explorer/reisebegleiter`}
          className="flex w-full items-center justify-center rounded-full bg-[var(--mwg-accent)] px-5 py-3.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Reise bestätigen
        </Link>
        <p className="mt-3 text-center text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
          Im nächsten Schritt stellst du deinen persönlichen digitalen Reisebegleiter zusammen.
        </p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[12px] text-[var(--mwg-ink-45)]">
          <Lock size={12} strokeWidth={1.75} />
          Sicher & unkompliziert – keine Buchung, nur digitale Inhalte.
        </p>
      </div>
    </aside>
  );
}

function GlanceItem({
  icon: Icon,
  label,
}: {
  icon: typeof CalendarDays;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-[var(--mwg-paper)] px-3 py-3 text-center">
      <Icon size={16} strokeWidth={1.75} className="text-[var(--mwg-accent)]" />
      <span className="text-[13px] font-medium leading-snug">{label}</span>
    </div>
  );
}

function SummaryRow({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <dt className="text-[var(--mwg-ink-45)]">{label}</dt>
      <dd className="text-right font-medium sm:max-w-[58%]">
        {value}
        {hint ? <span className="mt-0.5 block text-[12px] font-normal text-[var(--mwg-ink-45)]">{hint}</span> : null}
      </dd>
    </div>
  );
}
