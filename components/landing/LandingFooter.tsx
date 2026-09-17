import Link from "next/link";
import { LandingLogo } from "@/components/landing/LandingLogo";
import { landingCopy, landingPaths, type LandingLocale } from "@/content/landing";

export function LandingFooter({ locale }: { locale: LandingLocale }) {
  const copy = landingCopy[locale];
  const paths = landingPaths[locale];
  const year = new Date().getFullYear();

  const links = [
    { href: paths.contact, label: copy.footer.contact },
    { href: paths.imprint, label: copy.footer.imprint },
    { href: paths.privacy, label: copy.footer.privacy },
  ];

  return (
    <footer className="border-t border-[var(--mwg-line)] bg-[var(--mwg-paper)]">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <Link href={paths.home} aria-label={copy.nav.homeAria} className="transition-opacity hover:opacity-80">
          <LandingLogo />
        </Link>
        <nav className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-[var(--mwg-line)]">
        <div className="mx-auto max-w-[1240px] px-6 py-5 lg:px-10">
          <p className="font-mono text-[11px] tracking-[0.02em] text-[var(--mwg-ink-45)]">
            © {year} MW Guides. {copy.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
