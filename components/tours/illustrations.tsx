import type { SVGProps } from "react";

/**
 * Shared monochrome background used behind every tour illustration, so
 * real photography can later be dropped in at the same aspect ratio
 * without layout changes — see TourCard.tsx for the swap point.
 *
 * AP-002.0: recolored from per-tour duotones to one consistent
 * anthracite-to-black frame, with a single accent highlight per scene —
 * matching the brief's reduced palette ("nur eine Akzentfarbe").
 */
function IllustrationFrame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 400 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mwg-illustration-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#242320" />
          <stop offset="100%" stopColor="#0e0e0d" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#mwg-illustration-frame)" />
      {children}
    </svg>
  );
}

const LINE = { stroke: "rgba(250,248,244,0.85)", fill: "none", strokeWidth: 2 } satisfies SVGProps<SVGPathElement>;
const LINE_SOFT = { stroke: "rgba(250,248,244,0.32)", fill: "none", strokeWidth: 1.5 } satisfies SVGProps<SVGPathElement>;
const ACCENT = { stroke: "#4a9494", fill: "none", strokeWidth: 2.5 } satisfies SVGProps<SVGPathElement>;

export function SchwebebahnIllustration() {
  return (
    <IllustrationFrame>
      {/* River */}
      <path d="M0 175 C 80 165, 120 185, 200 175 S 320 165, 400 178" {...LINE_SOFT} />
      {/* Support pillars */}
      <path d="M110 175 L120 60" {...LINE_SOFT} />
      <path d="M290 175 L300 60" {...LINE_SOFT} />
      {/* Elevated rail */}
      <path d="M40 60 C 140 50, 260 50, 360 60" {...LINE} />
      {/* Suspended car — the accent focal point */}
      <path d="M175 60 L182 82 M225 60 L218 82" {...LINE_SOFT} />
      <rect x="175" y="82" width="50" height="26" rx="6" {...ACCENT} />
      <path d="M183 108 L183 118 M217 108 L217 118" {...LINE_SOFT} />
    </IllustrationFrame>
  );
}

export function WienTramIllustration() {
  return (
    <IllustrationFrame>
      {/* Building silhouettes */}
      <path d="M0 150 L0 90 L40 90 L40 70 L80 70 L80 100 L130 100 L130 60 L180 60 L180 150 Z" {...LINE_SOFT} />
      <path d="M220 150 L220 80 L260 80 L260 110 L310 110 L310 65 L360 65 L360 150 Z" {...LINE_SOFT} />
      {/* Overhead wire */}
      <path d="M20 55 L380 55" {...LINE_SOFT} />
      <path d="M120 55 L120 40 M280 55 L280 40" {...LINE_SOFT} />
      {/* Rail */}
      <path d="M0 168 L400 168" {...LINE} />
      {/* Tram body — accent focal point */}
      <rect x="150" y="118" width="100" height="42" rx="6" {...ACCENT} />
      <path d="M162 130 L188 130 M162 145 L188 145 M212 130 L238 130 M212 145 L238 145" {...LINE_SOFT} />
      <path d="M200 118 L200 108" {...LINE_SOFT} />
      <circle cx="172" cy="164" r="6" {...LINE_SOFT} />
      <circle cx="228" cy="164" r="6" {...LINE_SOFT} />
    </IllustrationFrame>
  );
}

export function KuestentramIllustration() {
  return (
    <IllustrationFrame>
      {/* Waves */}
      <path d="M0 150 C 40 140, 80 160, 120 150 S 200 140, 240 150 S 320 160, 400 148" {...LINE_SOFT} />
      <path d="M0 168 C 40 158, 80 178, 120 168 S 200 158, 240 168 S 320 178, 400 166" {...LINE_SOFT} />
      {/* Dune grass */}
      <path d="M40 150 C 36 130, 44 120, 40 105 M50 150 C 54 128, 46 118, 50 100" {...LINE_SOFT} />
      <path d="M330 150 C 326 130, 334 120, 330 105 M340 150 C 344 128, 336 118, 340 100" {...LINE_SOFT} />
      {/* Coastal rail */}
      <path d="M20 120 L380 120" {...LINE} />
      {/* Tram silhouette — accent focal point */}
      <rect x="150" y="80" width="110" height="40" rx="8" {...ACCENT} />
      <path d="M165 92 L192 92 M165 106 L192 106 M215 92 L245 92 M215 106 L245 106" {...LINE_SOFT} />
      <circle cx="172" cy="124" r="6" {...LINE_SOFT} />
      <circle cx="238" cy="124" r="6" {...LINE_SOFT} />
    </IllustrationFrame>
  );
}

export function BrueggeIllustration() {
  return (
    <IllustrationFrame>
      {/* Canal water + reflection */}
      <path d="M0 150 L400 150" {...LINE_SOFT} />
      <path d="M60 165 L100 155 M160 168 L190 158 M260 165 L300 155" {...LINE_SOFT} />
      {/* Gabled houses */}
      <path d="M20 150 L20 100 L45 75 L70 100 L70 150 Z" {...LINE_SOFT} />
      <path d="M75 150 L75 90 L100 65 L125 90 L125 150 Z" {...LINE} />
      <path d="M130 150 L130 105 L152 82 L174 105 L174 150 Z" {...LINE_SOFT} />
      {/* Bridge arch — accent focal point */}
      <path d="M200 150 C 220 105, 300 105, 320 150" {...ACCENT} />
      <path d="M200 150 L200 160 M320 150 L320 160" {...LINE_SOFT} />
      {/* Belfry silhouette */}
      <path d="M340 150 L340 70 L352 55 L364 70 L364 150 Z" {...LINE_SOFT} />
    </IllustrationFrame>
  );
}
