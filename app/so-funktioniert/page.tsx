import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/ui/Button";
import { ChapterAccordion } from "@/components/so-funktioniert/ChapterAccordion";
import { MastergrafikA } from "@/components/so-funktioniert/MastergrafikA";
import { MastergrafikB } from "@/components/so-funktioniert/MastergrafikB";
import { MastergrafikC } from "@/components/so-funktioniert/MastergrafikC";

export const metadata: Metadata = {
  title: "So funktioniert MW Guides",
  description:
    "Plane deine Reise individuell, entdecke außergewöhnliche Erlebnisse und begleite deine Reise bis zum Schluss.",
};

/**
 * So funktioniert MW Guides V1.0 — eingefroren 15.08.2026 (Release Candidate).
 * Keine direkten Änderungen. Nächste Arbeit nur als Version 1.1 / 1.2 / 2.0.
 * Siehe docs/AP-G-so-funktioniert-v1.0.md
 */
export default function SoFunktioniertPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ChapterAccordion
          items={[
            {
              id: "kapitel-verstehen",
              title: "1. Verstehe das Prinzip von MW Guides",
              intro: [
                "Plane deine Reise individuell und entdecke außergewöhnliche Erlebnisse.",
                "Erfahre, wie Explore Trips, Ride Guides und „Meine Reise“ zusammenspielen.",
                "„Meine Reise“ ist dein persönlicher Reisebereich. Hier laufen Planung, Unterlagen und Premium Guides zusammen.",
              ],
              legend: true,
              graphic: <MastergrafikA />,
            },
            {
              id: "kapitel-planen",
              title: "2. Plane deine persönliche Reise",
              intro:
                "Vom ersten Explore Trip bis zu deiner fertigen Reiseroute – Schritt für Schritt.",
              graphic: <MastergrafikB />,
            },
            {
              id: "kapitel-begleiten",
              title: "3. Lass dich vor, während und nach der Reise begleiten",
              intro:
                "„Meine Reise“ begleitet dich von der Vorbereitung über die Reise bis zu deinen Erinnerungen nach der Rückkehr.",
              graphic: <MastergrafikC />,
            },
          ]}
        />

        <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10 lg:py-24">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/explore-trips" variant="accent">
              Explore Trips entdecken
            </Button>
            <Button href="/touren" variant="accent">
              Ride Guides entdecken
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
