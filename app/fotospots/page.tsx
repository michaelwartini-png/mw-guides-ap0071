import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Fotospots",
  description: "Die schönsten Fotospots entlang unserer Touren. Inhalte folgen in einem späteren Arbeitspaket.",
};

/**
 * Placeholder page (AP-000.1 scope). Content and layout for this route are
 * defined in a later work package.
 */
export default function FotospotsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1240px] px-6 py-28 lg:px-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--mwg-accent)]">
            Seite in Vorbereitung
          </span>
          <h1 className="mt-3 font-display text-[36px] font-medium sm:text-[44px]">
            Fotospots
          </h1>
          <p className="mt-4 max-w-[560px] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
            Die schönsten Fotospots entlang unserer Touren. Inhalte folgen in einem späteren Arbeitspaket.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
