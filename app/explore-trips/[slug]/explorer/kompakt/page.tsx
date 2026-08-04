import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { TripExplorerView } from "@/components/trip-explorer/TripExplorerView";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getTripExplorerByTripSlug, getTripExplorerSlugs } from "@/content/tripExplorers";

interface TripExplorerKompaktPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTripExplorerSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TripExplorerKompaktPageProps): Promise<Metadata> {
  const { slug } = await params;
  const explorer = getTripExplorerByTripSlug(slug);
  if (!explorer) return { title: "Trip Explorer Kompakt nicht gefunden" };
  return {
    title: `Trip Explorer Kompakt — ${explorer.heroTitle}`,
    description: explorer.heroSubtitle,
  };
}

export default async function TripExplorerKompaktPage({ params }: TripExplorerKompaktPageProps) {
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
        <TripExplorerView explorer={explorer} tripTitle={trip.title} compact />
        <section className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-10">
          <Link
            href={`/explore-trips/${slug}/explorer`}
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
          >
            Zurück zum Trip Explorer
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
