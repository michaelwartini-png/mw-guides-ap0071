import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { primaryNav, secondaryNav, footerCompanyNav, footerLegalNav } from "@/content/navigation";

const socialPlaceholders = ["IG", "FB", "YT"];

function FooterLink({ href, children }: { href: string; children: string }) {
  return (
    <Link
      href={href}
      className="group relative inline-block w-fit text-[13.5px] text-[var(--mwg-paper)]/65 transition-colors duration-200 hover:text-[var(--mwg-paper)]"
    >
      {children}
      <span
        className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--mwg-accent)] transition-all duration-300 group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="bg-[var(--mwg-black)]">
      {/* thin brand accent, echoing the route-line motif without repeating it literally */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--mwg-accent)]/30 to-transparent" />

      <div className="mx-auto max-w-[1240px] px-6 pt-20 pb-10 lg:px-10">
        <div className="grid gap-12 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="lg:col-span-2">
            <Logo dark />
            <p className="mt-5 max-w-[280px] text-[13.5px] leading-[1.7] text-[var(--mwg-paper)]/55">
              Digitale Reiseerlebnisse für Individualreisende, Kreuzfahrtgäste
              und Städtereisende — selbstgeführt, mehrsprachig, offline
              nutzbar.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socialPlaceholders.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 font-mono text-[11px] text-[var(--mwg-paper)]/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--mwg-accent)]/50 hover:text-[var(--mwg-paper)]"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 lg:col-start-4">
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-paper)]/40">
              Entdecken
            </h4>
            <ul className="flex flex-col gap-3.5">
              {[...primaryNav, ...secondaryNav].map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-paper)]/40">
              Unternehmen
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerCompanyNav.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-paper)]/40">
              Rechtliches
            </h4>
            <ul className="flex flex-col gap-3.5">
              {footerLegalNav.map((l) => (
                <li key={l.label}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 sm:flex-row">
          <span className="font-mono text-[11px] tracking-[0.02em] text-[var(--mwg-paper)]/35">
            © {new Date().getFullYear()} MW Guides. Alle Rechte vorbehalten.
          </span>
          <span className="font-mono text-[11px] tracking-[0.02em] text-[var(--mwg-paper)]/35">
            Made for the road, from Wuppertal.
          </span>
        </div>
      </div>
    </footer>
  );
}
