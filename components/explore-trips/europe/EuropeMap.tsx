import Image from "next/image";
import Link from "next/link";
import {
  europeEntryTrips,
  europeMapCopy,
  europeTripStatusLabel,
  type EuropeEntryTrip,
  type EuropeTripStatus,
} from "@/content/europeEntry";

const DOT: Record<EuropeTripStatus, string> = {
  available: "border-white bg-[var(--mwg-accent)]",
  "in-progress": "border-white bg-[#c4a36a]",
  planned: "border-[var(--mwg-ink-45)] bg-[var(--mwg-paper)]",
};

const LABEL: Record<EuropeTripStatus, string> = {
  available:
    "bg-[var(--mwg-paper-raised)] text-[var(--mwg-accent)] shadow-[0_4px_18px_-8px_rgba(47,111,111,0.55)]",
  "in-progress":
    "bg-[var(--mwg-paper-raised)] text-[#8a6a38] shadow-[0_4px_18px_-8px_rgba(196,163,106,0.55)]",
  planned: "bg-[var(--mwg-paper-raised)]/90 text-[var(--mwg-ink-70)]",
};

/**
 * AP-ET001 V1.1 — illustrated Europe map as the page centre.
 * Pins are HTML overlays; coming-soon trips stay visible but not clickable.
 */
export function EuropeMap() {
  return (
    <section id="karte" className="scroll-mt-[76px] overflow-hidden bg-[var(--mwg-paper)] py-24 lg:py-36">
      <div className="mx-auto max-w-[1520px] px-6 lg:pl-10 lg:pr-4 xl:pr-8">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[minmax(0,260px)_minmax(0,1fr)] xl:gap-6">
          <div>
            <span className="mwg-eyebrow text-[var(--mwg-accent)]">{europeMapCopy.eyebrow}</span>
            <h2 className="mwg-display-lg mt-3 max-w-[12ch]">{europeMapCopy.heading}</h2>
            <p className="mt-4 max-w-[28ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
              {europeMapCopy.body}
            </p>

            <ul className="mt-10 flex flex-col gap-3 text-[13.5px] text-[var(--mwg-ink)]">
              {(["available", "in-progress", "planned"] as const).map((status) => (
                <li key={status} className="flex items-center gap-3">
                  <span
                    className={`inline-block h-3.5 w-3.5 rounded-full border-2 shadow-[0_1px_4px_rgba(26,26,24,0.18)] ${DOT[status]}`}
                    aria-hidden="true"
                  />
                  <span className="font-medium">{europeTripStatusLabel[status]}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:-mr-2 xl:mr-0">
            <Image
              src="/images/explore-trips/europe-map.png"
              alt="Illustrierte Karte Europas mit Explore-Trip-Regionen"
              width={1600}
              height={1200}
              className="h-auto w-full drop-shadow-[0_28px_60px_-24px_rgba(26,26,24,0.22)]"
              sizes="(min-width: 1024px) 78vw, 100vw"
              priority
            />

            {europeEntryTrips.map((trip) => (
              <EuropeMapMarker key={trip.slug} trip={trip} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EuropeMapMarker({ trip }: { trip: EuropeEntryTrip }) {
  const clickable = Boolean(trip.href) && trip.status !== "planned";
  const available = trip.status === "available";
  const side = trip.labelSide ?? "right";

  const labelPos =
    side === "left"
      ? "right-full top-1/2 mr-2 -translate-y-1/2 text-right"
      : side === "bottom"
        ? "left-1/2 top-full mt-2 -translate-x-1/2 text-center"
        : "left-full top-1/2 ml-2 -translate-y-1/2";

  const inner = (
    <span className="relative flex h-5 w-5 items-center justify-center">
      {available && (
        <span
          className="mwg-map-pulse absolute inset-0 rounded-full bg-[var(--mwg-accent)]"
          aria-hidden="true"
        />
      )}
      <span
        className={`relative block h-[15px] w-[15px] rounded-full border-2 shadow-[0_2px_8px_rgba(26,26,24,0.28)] transition-transform duration-200 ${DOT[trip.status]} ${
          clickable ? "group-hover:scale-125" : ""
        }`}
      />
      <span
        className={`absolute whitespace-nowrap rounded-full px-2.5 py-1 font-display text-[13.5px] font-medium leading-none tracking-[-0.01em] shadow-[0_6px_20px_-10px_rgba(26,26,24,0.35)] ring-1 ring-black/[0.06] ${LABEL[trip.status]} ${labelPos}`}
      >
        {trip.mapLabel}
      </span>
    </span>
  );

  const className = `group absolute z-10 -translate-x-1/2 -translate-y-1/2 ${
    clickable ? "cursor-pointer" : "cursor-default"
  }`;
  const style = { left: `${trip.map.left}%`, top: `${trip.map.top}%` };

  if (clickable && trip.href) {
    return (
      <Link
        href={trip.href}
        className={className}
        style={style}
        aria-label={`${trip.title} — ${europeTripStatusLabel[trip.status]}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <span
      className={className}
      style={style}
      aria-label={`${trip.title} — ${europeTripStatusLabel[trip.status]}`}
    >
      {inner}
    </span>
  );
}
