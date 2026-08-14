import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ExplorerProgressStepper } from "@/components/trip-explorer/workspace/ExplorerProgressStepper";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getTripExplorerByTripSlug } from "@/content/tripExplorers";

interface ReisebegleiterPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "bodensee" }];
}

export async function generateMetadata({ params }: ReisebegleiterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getExploreTripBySlug(slug);
  if (!trip) return { title: "Reisebegleiter" };
  return {
    title: `Reisebegleiter — ${trip.title}`,
    description: "Stelle als Nächstes deinen persönlichen digitalen Reisebegleiter zusammen.",
  };
}

/**
 * AP-ET004.2 — Destination after confirming ET-04.
 * Product selection itself is ET-05 and is not implemented here.
 */
export default async function ReisebegleiterPage({ params }: ReisebegleiterPageProps) {
  const { slug } = await params;
  const trip = getExploreTripBySlug(slug);
  const explorer = getTripExplorerByTripSlug(slug);

  if (!trip || !explorer) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-[720px] px-6 py-16 lg:px-10 lg:py-24">
          <ExplorerProgressStepper currentStep={5} tripSlug={slug} />
          <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--mwg-accent)]">
            Schritt 5 von 5
          </p>
          <h1 className="mt-3 font-display text-[32px] font-medium leading-tight">
            Reisebegleiter auswählen
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-[var(--mwg-ink-70)]">
            Deine Reise ist bestätigt. Als Nächstes stellst du deinen persönlichen digitalen
            Reisebegleiter zusammen. Die Produktauswahl folgt in einem eigenen Schritt.
          </p>
          <Link
            href={`/explore-trips/${slug}/explorer/ueberpruefen`}
            className="mt-8 inline-flex text-[14px] font-medium text-[var(--mwg-accent)] hover:underline"
          >
            Zurück zur Überprüfung
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
