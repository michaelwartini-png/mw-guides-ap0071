"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { LanguageSwitch } from "@/components/ui/LanguageSwitch";
import { Button } from "@/components/ui/Button";
import { primaryNav } from "@/content/navigation";
import { useScrolled } from "@/hooks/useScrolled";

export function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled();
  const pathname = usePathname();

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? "rgba(250,248,244,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--mwg-line)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-[76px] max-w-[1240px] items-center justify-between px-6 lg:px-10">
        <Link href="/" aria-label="MW Guides Startseite" className="transition-opacity hover:opacity-80">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Hauptnavigation">
          {primaryNav.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 text-[14.5px] transition-colors ${
                  active ? "text-[var(--mwg-ink)]" : "text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[var(--mwg-accent)] transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch />
          <Button href="/touren" variant="primary">
            Ride Guides entdecken
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[var(--mwg-line)] lg:hidden"
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
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.label}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`border-b border-[var(--mwg-line)] py-3 font-display text-[22px] transition-colors ${
                      active ? "text-[var(--mwg-accent)]" : ""
                    }`}
                    style={{
                      animation: "mwg-fade-in-up 0.35s ease-out backwards",
                      animationDelay: `${0.05 + i * 0.04}s`,
                    }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-6">
              <LanguageSwitch className="justify-center py-2.5" label="Sprache: DE" />
              <Button href="/touren" variant="primary" className="w-full py-3">
                Ride Guides entdecken
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
