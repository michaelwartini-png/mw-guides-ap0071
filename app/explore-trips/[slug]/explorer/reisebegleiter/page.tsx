import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ReisebegleiterView } from "@/components/trip-explorer/reisebegleiter/ReisebegleiterView";
import { getExplorerReviewByTripSlug } from "@/content/explorerReview";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getPremiumPreview, getTripRideGuideProducts } from "@/content/reisebegleiter";
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
    description: "Wähle deine digitalen Reisebegleiter für die geplante Reise.",
  };
}

/** AP-ET005 — ET-05 companion selection. No checkout, login, or Meine Reise. */
export default async function ReisebegleiterPage({ params }: ReisebegleiterPageProps) {
  const { slug } = await params;
  const trip = getExploreTripBySlug(slug);
  const explorer = getTripExplorerByTripSlug(slug);
  const review = getExplorerReviewByTripSlug(slug);

  if (!trip || !explorer || !review) {
    notFound();
  }

  const rideGuides = getTripRideGuideProducts(slug);
  const preview = getPremiumPreview(review.tripTitle, review.tip);
  const heroImage = review.highlights[0]?.image ?? trip.heroImage;
  const heroImageAlt = review.highlights[0]?.imageAlt ?? trip.heroImageAlt;

  return (
    <>
      <Header />
      <main className="flex-1 bg-[var(--mwg-paper)]">
        <ReisebegleiterView
          review={review}
          rideGuides={rideGuides}
          preview={preview}
          heroImage={heroImage}
          heroImageAlt={heroImageAlt}
        />
      </main>
      <Footer />
    </>
  );
}
