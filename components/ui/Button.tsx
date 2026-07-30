import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "accent" | "ghost-dark" | "ghost-light";
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-[var(--mwg-ink)] text-[var(--mwg-paper)] shadow-[0_1px_0_rgba(255,255,255,0.08)_inset] hover:shadow-[0_14px_28px_-12px_rgba(26,26,24,0.55)]",
  accent:
    "bg-[var(--mwg-accent)] text-white hover:shadow-[0_14px_28px_-12px_rgba(47,111,111,0.55)]",
  "ghost-dark":
    "border border-[var(--mwg-line)] text-[var(--mwg-ink-70)] hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)]",
  "ghost-light":
    "border border-white/25 text-white/90 hover:border-white/60 hover:text-white",
};

const FILLED_VARIANTS = new Set(["primary", "accent"]);

export function Button({ href, children, variant = "primary", className = "" }: ButtonProps) {
  const filled = FILLED_VARIANTS.has(variant);

  return (
    <Link
      href={href}
      className={`group relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full px-6 py-3 text-[14.5px] font-medium tracking-[0.01em] transition-all duration-300 ease-out hover:-translate-y-0.5 ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {filled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative flex items-center gap-1.5">{children}</span>
    </Link>
  );
}
