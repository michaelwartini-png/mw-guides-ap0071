import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { Button } from "@/components/ui/Button";
import { meineReiseHint } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Meine Reise",
  description: "Wähle zuerst einen Explore Trip — deine Reise entsteht im nächsten Schritt.",
};

/**
 * AP-PP000 — navigation target only. No login, favorites, or trip builder.
 */
export default function MeineReisePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-[1240px] px-6 pt-28 pb-28 lg:px-10 lg:pt-40 lg:pb-40">
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">Meine Reise</span>
          <h1 className="mwg-display-xl mt-5 max-w-[16ch]">Zuerst einen Explore Trip wählen.</h1>
          <p className="mt-6 max-w-[52ch] text-[17px] leading-[1.7] text-[var(--mwg-ink-70)]">
            {meineReiseHint}
          </p>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.7] text-[var(--mwg-ink-70)]">
            Deine Reise entsteht, sobald du eine Idee ausgewählt hast. Dieser
            Bereich folgt in einem späteren Prototyp.
          </p>
          <div className="mt-10">
            <Button href="/explore-trips" variant="accent">
              Explore Trips entdecken
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
