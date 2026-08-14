"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Plus } from "lucide-react";
import { getHighlightBySlug } from "@/content/explorerHighlights";
import { useExplorerTrip } from "@/components/trip-explorer/workspace/ExplorerTripContext";
import { RideGuideCta, type RideGuideCtaConfig } from "@/components/erlebnisprofil/RideGuideCta";
import { isLiveRideGuide, TICKETS_CTA_LABEL } from "@/content/rideGuideCopy";
import { normalizeExternalUrl } from "@/components/erlebnisprofil/utils";

interface ExploreTripStickyBarProps {
  tripSlug: string;
  erlebnisSlug: string;
  addedCount?: number;
  rideGuide?: RideGuideCtaConfig;
  ticketHref?: string;
}

export function ExploreTripStickyBar({
  tripSlug,
  erlebnisSlug,
  addedCount,
  rideGuide,
  ticketHref,
}: ExploreTripStickyBarProps) {
  const { addHighlight, isSelected } = useExplorerTrip();
  const highlight = getHighlightBySlug(tripSlug, erlebnisSlug);
  const selected = isSelected(erlebnisSlug);
  const explorerHref = `/explore-trips/${tripSlug}/explorer`;
  const ticketsUrl = ticketHref ? normalizeExternalUrl(ticketHref) : null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 py-3 lg:px-10">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={explorerHref}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-4 py-2 text-[13px] font-medium text-[var(--mwg-ink-70)] hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
          >
            <ArrowLeft size={14} />
            Zurück zum Explorer
          </Link>
          <button
            type="button"
            onClick={() => highlight && addHighlight(highlight)}
            disabled={selected || !highlight}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-medium ${
              selected
                ? "cursor-default border-[var(--mwg-line)] text-[var(--mwg-ink-45)]"
                : "border-[var(--mwg-line)] text-[var(--mwg-ink-70)] hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]"
            }`}
          >
            {selected ? "Bereits in deiner Reise" : "Zu meiner Reise"}
            {!selected && <Plus size={14} />}
          </button>
        </div>

        {addedCount != null ? (
          <p className="hidden text-[13px] text-[var(--mwg-ink-70)] xl:block">
            Bereits {addedCount} Mal zu einer Reise hinzugefügt
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2">
          {ticketsUrl ? (
            <a
              href={ticketsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--mwg-accent)] px-5 py-2.5 text-[14px] font-medium text-[var(--mwg-accent)] transition-colors hover:bg-[var(--mwg-accent)] hover:text-white"
            >
              {TICKETS_CTA_LABEL}
              <ArrowRight size={16} />
            </a>
          ) : null}
          {rideGuide && isLiveRideGuide(rideGuide) ? (
            <RideGuideCta config={rideGuide} variant="scoreBar" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
