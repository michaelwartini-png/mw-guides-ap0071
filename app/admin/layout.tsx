import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Admin · MW Guides",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-[var(--mwg-line)] bg-paper-raised">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-2.5 lg:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-stone">
              Intern · Prototyp
            </p>
            <p className="font-display text-base font-medium">MW Guides Admin</p>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-[1400px] px-5 py-5 lg:px-8 lg:py-6">{children}</main>
    </div>
  );
}
