import type { ExplorerReview } from "@/types/explorerReview";

interface ReviewRouteSketchProps {
  review: ExplorerReview;
  className?: string;
  compact?: boolean;
}

/** AP-ET004 / AP-ET005 — Schematic lake route, reused in review and companion preview. */
export function ReviewRouteSketch({ review, className = "", compact = false }: ReviewRouteSketchProps) {
  const points = review.waypoints
    .map((waypoint) => `${(waypoint.x / 100) * 520},${(waypoint.y / 100) * 320}`)
    .join(" ");

  return (
    <svg
      viewBox="0 0 520 320"
      className={`h-auto w-full ${className}`}
      role="img"
      aria-label="Routenskizze rund um den Bodensee"
    >
      <rect width="520" height="320" fill="#f4f1ea" />
      <path
        d="M78 228 C 70 210, 88 188, 128 198 C 142 130, 168 96, 214 108 C 258 88, 318 102, 368 128 C 428 148, 478 168, 492 214 C 498 252, 452 278, 392 286 C 318 298, 248 292, 186 268 C 148 254, 122 246, 108 238 C 92 248, 84 240, 78 228 Z"
        fill="#cfe3df"
        stroke="#7aa8a4"
        strokeWidth="1.25"
      />
      <path
        d="M108 228 C 88 232, 62 248, 54 268 C 48 286, 68 298, 92 292 C 112 288, 128 262, 132 242"
        fill="#cfe3df"
        stroke="#7aa8a4"
        strokeWidth="1.25"
      />
      <polyline
        points={points}
        fill="none"
        stroke="var(--mwg-accent)"
        strokeWidth="2"
        strokeDasharray="5 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {review.waypoints.map((waypoint) => {
        const cx = (waypoint.x / 100) * 520;
        const cy = (waypoint.y / 100) * 320;
        const labelRight = waypoint.x < 78;
        return (
          <g key={waypoint.id}>
            <circle cx={cx} cy={cy} r="11" fill="var(--mwg-ink)" />
                <text
                  x={cx}
                  y={cy + 4}
                  textAnchor="middle"
                  fill="white"
                  fontSize="11"
                  fontFamily="var(--font-body)"
                  fontWeight="600"
                >
                  {waypoint.number}
                </text>
                {compact ? null : (
                  <text
                    x={labelRight ? cx + 16 : cx}
                    y={labelRight ? cy + 4 : cy - 16}
                    textAnchor={labelRight ? "start" : "middle"}
                    fill="var(--mwg-ink)"
                    fontSize="11"
                    fontFamily="var(--font-body)"
                  >
                    {waypoint.label}
                  </text>
                )}
          </g>
        );
      })}
    </svg>
  );
}
