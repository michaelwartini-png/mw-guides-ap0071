import { Globe2 } from "lucide-react";

interface LanguageSwitchProps {
  className?: string;
  label?: string;
}

/**
 * Placeholder language switcher (AP-000.1 scope: UI only, no i18n routing yet).
 * Wire this up to real locale switching in a later work package.
 */
export function LanguageSwitch({ className = "", label = "DE" }: LanguageSwitchProps) {
  return (
    <button
      type="button"
      className={`flex items-center gap-1.5 rounded-full border border-[var(--mwg-line)] px-3 py-1.5 font-mono text-[12px] tracking-[0.04em] text-[var(--mwg-ink-70)] transition-colors hover:border-[var(--mwg-ink)] hover:text-[var(--mwg-ink)] ${className}`}
      aria-label="Sprache wählen"
    >
      <Globe2 size={13} strokeWidth={1.75} />
      {label}
    </button>
  );
}
