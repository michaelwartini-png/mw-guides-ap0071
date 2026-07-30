interface LogoProps {
  /** Renders the light-on-dark variant used on the footer and dark sections. */
  dark?: boolean;
}

export function Logo({ dark = false }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold"
        style={{
          background: dark ? "#faf8f4" : "#1a1a18",
          color: dark ? "#1a1a18" : "#faf8f4",
        }}
      >
        MW
      </div>
      <span
        className="font-display text-[19px] font-medium tracking-tight"
        style={{ color: dark ? "#faf8f4" : "#1a1a18" }}
      >
        MW Guides
      </span>
    </div>
  );
}
