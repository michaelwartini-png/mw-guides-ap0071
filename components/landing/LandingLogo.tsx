interface LandingLogoProps {
  inverted?: boolean;
}

export function LandingLogo({ inverted = false }: LandingLogoProps) {
  const ink = inverted ? "#faf8f4" : "currentColor";
  const accent = inverted ? "#faf8f4" : "var(--mwg-accent)";

  return (
    <span
      className={`flex items-center gap-2.5 ${inverted ? "text-white" : "text-[var(--mwg-ink)]"}`}
    >
      <svg
        width="36"
        height="28"
        viewBox="0 0 36 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M2 24c8-3 11-14 16.5-18.5"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M18.5 5.5c4.5 0 8.2.8 13.5 2.2"
          stroke={accent}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path d="M24.2 8.2 26.6 11.8" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
        <rect x="22.2" y="11.6" width="10.2" height="7.4" rx="1.6" fill={ink} />
        <path d="M24.1 11.6h6.4v3.2h-6.4z" fill={inverted ? "#1a1a18" : "#faf8f4"} opacity="0.28" />
        <circle cx="24.4" cy="19.6" r="0.7" fill={accent} />
        <circle cx="30.2" cy="19.6" r="0.7" fill={accent} />
      </svg>
      <span className="flex items-baseline gap-[0.3em] font-display text-[19px] font-medium tracking-tight">
        <span>MW</span>
        <span style={{ color: inverted ? "#faf8f4" : "var(--mwg-accent)" }}>Guides</span>
      </span>
    </span>
  );
}
