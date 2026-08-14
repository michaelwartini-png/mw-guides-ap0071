import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { TripReviewView } from "@/components/trip-explorer/review/TripReviewView";
import { getExplorerReviewByTripSlug } from "@/content/explorerReview";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getTripExplorerByTripSlug } from "@/content/tripExplorers";

interface ReviewPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: "bodensee" }];
}

export async function generateMetadata({ params }: ReviewPageProps): Promise<Metadata> {
  const { slug } = await params;
  const review = getExplorerReviewByTripSlug(slug);
  if (!review) return { title: "Reise überprüfen" };
  return {
    title: `Reise überprüfen — ${review.tripTitle}`,
    description: "Prüfe deine zusammengestellte Reise, bevor du deinen digitalen Reisebegleiter auswählst.",
  };
}

/** AP-ET004 — ET-04 review step. */
export default async function TripReviewPage({ params }: ReviewPageProps) {
  const { slug } = await params;
  const trip = getExploreTripBySlug(slug);
  const explorer = getTripExplorerByTripSlug(slug);
  const review = getExplorerReviewByTripSlug(slug);

  if (!trip || !explorer || !review) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-[var(--mwg-paper)]">
        <TripReviewView review={review} />
      </main>
      <Footer />
    </>
  );
}
