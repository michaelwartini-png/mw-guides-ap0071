import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1240px] px-6 py-28 text-center lg:px-10">
          <span className="font-mono text-[12px] uppercase tracking-[0.15em] text-[var(--mwg-accent)]">
            404
          </span>
          <h1 className="mt-3 font-display text-[36px] font-medium sm:text-[44px]">
            Diese Seite ist nicht auf der Karte.
          </h1>
          <p className="mx-auto mt-4 max-w-[420px] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
            Die aufgerufene Seite existiert nicht oder wurde verschoben.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--mwg-ink)] px-6 py-3 text-[14px] font-medium text-[var(--mwg-paper)]"
          >
            Zurück zur Startseite
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
