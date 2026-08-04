import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ErlebnisdetailBreadcrumbs } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailBreadcrumbs";
import { ErlebnisdetailHero } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailHero";
import { ErlebnisdetailScoreBar } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailScoreBar";
import { ErlebnisdetailView } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailView";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getErlebnisdetailBySlug } from "@/content/erlebnisdetails";
import { getErlebnisSlugsForTrip } from "@/content/explorerHighlights";
import { getTripExplorerByTripSlug } from "@/content/tripExplorers";
import { resolveErlebnisdetail } from "@/lib/resolveErlebnisdetail";

interface ErlebnisdetailPageProps {
  params: Promise<{ slug: string; erlebnisSlug: string }>;
}

export function generateStaticParams() {
  return getErlebnisSlugsForTrip("bodensee").map((erlebnisSlug) => ({
    slug: "bodensee",
    erlebnisSlug,
  }));
}

export async function generateMetadata({ params }: ErlebnisdetailPageProps): Promise<Metadata> {
  const { slug, erlebnisSlug } = await params;
  const detail = resolveErlebnisdetail(slug, erlebnisSlug, getErlebnisdetailBySlug);
  if (!detail) return { title: "Erlebnis nicht gefunden" };
  return {
    title: `${detail.title} — MW Guides`,
    description: detail.subtitle,
  };
}

/**
 * AP-011 — Erlebnisdetail (Ebene 2 detail view). Experience-first page
 * with optional Ride Guide product link.
 */
export default async function ErlebnisdetailPage({ params }: ErlebnisdetailPageProps) {
  const { slug, erlebnisSlug } = await params;
  const trip = getExploreTripBySlug(slug);
  const explorer = getTripExplorerByTripSlug(slug);
  const detail = resolveErlebnisdetail(slug, erlebnisSlug, getErlebnisdetailBySlug);

  if (!trip || !explorer || !detail || detail.tripSlug !== slug) {
    notFound();
  }

  const welt = explorer.erlebniswelten.find((w) => w.slug === detail.erlebnisweltSlug);
  const weltTitle = welt?.explorerTitle ?? welt?.title ?? detail.erlebnisweltSlug;

  return (
    <>
      <Header />
      <main className="flex-1">
        <ErlebnisdetailBreadcrumbs
          tripSlug={slug}
          weltTitle={weltTitle}
          erlebnisTitle={detail.title}
        />
        <ErlebnisdetailHero detail={detail} />
        <ErlebnisdetailScoreBar detail={detail} />
        <ErlebnisdetailView detail={detail} />
      </main>
      <Footer />
    </>
  );
}
