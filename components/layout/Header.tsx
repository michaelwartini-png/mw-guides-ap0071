"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Button } from "@/components/ui/Button";
import { primaryNav, type NavLink } from "@/content/navigation";
import { useScrolled } from "@/hooks/useScrolled";

interface HeaderProps {
  /** Sit on top of a full-bleed hero with light type until the page scrolls. */
  overlay?: boolean;
}

export function Header({ overlay = false }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();
  const onHero = overlay && !scrolled;

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`${overlay ? "fixed inset-x-0 top-0" : "sticky top-0"} z-50 transition-colors duration-300`}
      style={{
        background: scrolled ? "rgba(250,248,244,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid var(--mwg-line)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="MW Guides Startseite" className="transition-opacity hover:opacity-80">
          <Logo dark={onHero} />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Hauptnavigation">
          {primaryNav.map((l) => {
            const active =
              pathname === l.href || (l.href !== "/" && pathname.startsWith(`${l.href}/`));
            return (
              <NavItem key={l.label} link={l} active={active} onHero={onHero} />
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LanguageSwitch
            className={
              onHero
                ? "border-white/25 text-white/80 hover:border-white/60 hover:text-white"
                : ""
            }
          />
          <Button href="/explore-trips" variant="accent">
            Explore Trips entdecken
          </Button>
        </div>

        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden ${
            onHero ? "text-white hover:bg-white/10" : "hover:bg-[var(--mwg-line)]"
          }`}
          onClick={() => setOpen(true)}
          aria-label="Menü öffnen"
          aria-expanded={open}
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-[var(--mwg-ink)]/40 transition-opacity"
            onClick={() => setOpen(false)}
          />
          <div className="animate-[mwg-slide-in_0.32s_ease-out] absolute right-0 top-0 bottom-0 flex w-[82%] max-w-[340px] flex-col bg-[var(--mwg-paper-raised)] px-7 py-6 shadow-[-20px_0_50px_-20px_rgba(26,26,24,0.35)]">
            <div className="mb-10 flex items-center justify-between">
              <Logo />
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[var(--mwg-line)]"
              >
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1" aria-label="Mobile Navigation">
              {primaryNav.map((l, i) => {
                const active =
                  pathname === l.href || (l.href !== "/" && pathname.startsWith(`${l.href}/`));
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`border-b border-[var(--mwg-line)] py-3 font-display transition-colors ${
                      l.weight === "featured" ? "text-[24px]" : "text-[22px]"
                    } ${l.weight === "quiet" ? "text-[20px] text-[var(--mwg-ink-45)]" : ""} ${
                      active ? "text-[var(--mwg-accent)]" : ""
                    }`}
                    style={{
                      animation: "mwg-fade-in-up 0.35s ease-out backwards",
                      animationDelay: `${0.05 + i * 0.04}s`,
                    }}
                  >
                    {l.label}
                    {l.hint && (
                      <span className="mt-1 block font-[var(--font-body)] text-[13px] font-normal leading-snug text-[var(--mwg-ink-45)]">
                        {l.hint}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <LanguageSwitch className="justify-center py-2.5" label="Sprache: DE" />
              <Button href="/explore-trips" variant="accent" className="w-full py-3">
                Explore Trips entdecken
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavItem({
  link,
  active,
  onHero,
}: {
  link: NavLink;
  active: boolean;
  onHero: boolean;
}) {
  const featured = link.weight === "featured";
  const quiet = link.weight === "quiet";

  const color = onHero
    ? active
      ? "text-white"
      : quiet
        ? "text-white/50 hover:text-white/80"
        : "text-white/75 hover:text-white"
    : active
      ? "text-[var(--mwg-ink)]"
      : quiet
        ? "text-[var(--mwg-ink-45)] hover:text-[var(--mwg-ink-70)]"
        : "text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]";

  return (
    <div className="group/nav relative">
      <Link
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`relative py-1 transition-colors ${featured ? "text-[15px] font-medium" : "text-[14.5px]"} ${quiet ? "text-[13.5px]" : ""} ${color}`}
      >
        {link.label}
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-[var(--mwg-accent)] transition-all duration-300 ${
            active ? "w-full" : "w-0 group-hover/nav:w-full"
          }`}
          aria-hidden="true"
        />
      </Link>
      {link.hint && (
        <span
          className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 w-[230px] -translate-x-1/2 rounded-sm border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] px-3.5 py-2.5 text-center text-[12.5px] leading-snug text-[var(--mwg-ink-70)] opacity-0 shadow-[0_12px_28px_-16px_rgba(26,26,24,0.4)] transition-opacity duration-200 group-hover/nav:opacity-100"
          role="tooltip"
        >
          {link.hint}
        </span>
      )}
    </div>
  );
}
