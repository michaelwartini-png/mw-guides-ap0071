import {
  europeTripStatusLabel,
  type EuropeTripStatus,
} from "@/content/europeEntry";

const PILL: Record<EuropeTripStatus, string> = {
  available: "bg-[var(--mwg-accent)] text-white",
  "in-progress": "bg-[#c4a36a] text-white",
  planned: "border border-white/80 bg-white/90 text-[var(--mwg-ink-70)]",
};

interface EuropeTripStatusBadgeProps {
  status: EuropeTripStatus;
}

/** Status pill as shown on ET-01 trip cards. */
export function EuropeTripStatusBadge({ status }: EuropeTripStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${PILL[status]}`}
    >
      {europeTripStatusLabel[status]}
    </span>
  );
}
