"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { LandingLogo } from "@/components/landing/LandingLogo";
import { landingCopy, landingPaths, counterpartPath, type LandingLocale } from "@/content/landing";
import { useScrolled } from "@/hooks/useScrolled";

interface LandingHeaderProps {
  locale: LandingLocale;
  overlay?: boolean;
}

export function LandingHeader({ locale, overlay = false }: LandingHeaderProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();
  const copy = landingCopy[locale];
  const paths = landingPaths[locale];
  const onHero = overlay && !scrolled;
  const homeHash = (id: string) => `${paths.home}#${id}`;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { label: copy.nav.exploreTrips, href: homeHash("explore-trips") },
    { label: copy.nav.rideGuides, href: homeHash("ride-guides") },
    { label: copy.nav.about, href: paths.about },
  ];

  const color = onHero ? "text-white/80 hover:text-white" : "text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]";
  const activeColor = onHero ? "text-white" : "text-[var(--mwg-ink)]";

  return (
    <header
      className={`${overlay ? "fixed inset-x-0 top-0" : "sticky top-0"} z-50 transition-colors duration-300`}
      style={{
        background: scrolled || !overlay ? "rgba(250,248,244,0.92)" : "transparent",
        backdropFilter: scrolled || !overlay ? "blur(12px)" : "none",
        borderBottom:
          scrolled || !overlay ? "1px solid var(--mwg-line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Link
          href={paths.home}
          aria-label={copy.nav.homeAria}
          className="transition-opacity hover:opacity-80"
        >
          <LandingLogo inverted={onHero} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label={locale === "de" ? "Hauptnavigation" : "Main"}>
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <LandingNavAnchor
                key={link.label}
                href={link.href}
                className={`group relative py-1 text-[14.5px] transition-colors ${active ? activeColor : color}`}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--mwg-accent)] transition-all duration-300 group-hover:w-full"
                  aria-hidden="true"
                />
              </LandingNavAnchor>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <LanguagePair locale={locale} pathname={pathname} onHero={onHero} />
        </div>

        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
            onHero ? "text-white hover:bg-white/10" : "hover:bg-[var(--mwg-line)]"
          }`}
          onClick={() => setOpen(true)}
          aria-label={copy.nav.menuOpen}
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-[var(--mwg-ink)]/40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 flex w-[82%] max-w-[340px] flex-col bg-[var(--mwg-paper-raised)] px-7 py-6 shadow-[-20px_0_50px_-20px_rgba(26,26,24,0.35)]">
            <div className="mb-10 flex items-center justify-between">
              <LandingLogo />
              <button
                onClick={() => setOpen(false)}
                aria-label={copy.nav.menuClose}
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--mwg-line)]"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {links.map((link) => (
                <LandingNavAnchor
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[var(--mwg-line)] py-3 font-display text-[22px]"
                >
                  {link.label}
                </LandingNavAnchor>
              ))}
            </nav>
            <div className="mt-auto pt-6">
              <LanguagePair locale={locale} pathname={pathname} onHero={false} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function LandingNavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (href.includes("#")) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function LanguagePair({
  locale,
  pathname,
  onHero,
}: {
  locale: LandingLocale;
  pathname: string;
  onHero: boolean;
}) {
  const muted = onHero ? "text-white/50 hover:text-white" : "text-[var(--mwg-ink-45)] hover:text-[var(--mwg-ink)]";
  const current = onHero ? "text-white" : "text-[var(--mwg-ink)]";
  const divider = onHero ? "text-white/35" : "text-[var(--mwg-ink-45)]";

  return (
    <div className="flex items-center gap-2 font-mono text-[12px] tracking-[0.08em]">
      <Link
        href={counterpartPath(pathname, "de")}
        hrefLang="de"
        className={locale === "de" ? current : muted}
        aria-current={locale === "de" ? "true" : undefined}
      >
        DE
      </Link>
      <span className={divider} aria-hidden="true">
        |
      </span>
      <Link
        href={counterpartPath(pathname, "en")}
        hrefLang="en"
        className={locale === "en" ? current : muted}
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </Link>
    </div>
  );
}
