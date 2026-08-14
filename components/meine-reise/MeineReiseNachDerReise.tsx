import { Camera, ImageIcon, Star } from "lucide-react";

/** AP-MR001 — reduced before departure. No large preview. */
export function MeineReiseNachDerReise() {
  return (
    <section className="rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-5 py-4">
      <h2 className="font-display text-[16px] font-medium">Nach der Reise</h2>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-[var(--mwg-ink-70)]">
        <li className="inline-flex items-center gap-1.5">
          <ImageIcon size={13} strokeWidth={1.75} className="text-[var(--mwg-ink-45)]" />
          Fotos
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Camera size={13} strokeWidth={1.75} className="text-[var(--mwg-ink-45)]" />
          Erinnerungen
        </li>
        <li className="inline-flex items-center gap-1.5">
          <Star size={13} strokeWidth={1.75} className="text-[var(--mwg-ink-45)]" />
          Bewertungen
        </li>
      </ul>
      <p className="mt-2 text-[12px] text-[var(--mwg-ink-45)]">Wird nach deiner Reise aktiviert.</p>
    </section>
  );
}
