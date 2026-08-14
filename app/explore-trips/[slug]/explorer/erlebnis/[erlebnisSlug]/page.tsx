import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ErlebnisprofilRenderer } from "@/components/erlebnisprofil/ErlebnisprofilRenderer";
import { ExploreTripChannelExtensions } from "@/components/erlebnisprofil/channels/ExploreTripChannelExtensions";
import { ErlebnisdetailBreadcrumbs } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailBreadcrumbs";
import { ErlebnisdetailHero } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailHero";
import { ErlebnisdetailScoreBar } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailScoreBar";
import { ErlebnisdetailView } from "@/components/trip-explorer/erlebnisdetail/ErlebnisdetailView";
import { getExploreTripChannelExtension } from "@/content/exploreTripChannelExtensions";
import { getExploreTripBySlug } from "@/content/exploreTrips";
import { getErlebnisdetailBySlug } from "@/content/erlebnisdetails";
import {
  explorerHighlights,
  getErlebnisSlugsForTrip,
  getHighlightBySlug,
} from "@/content/explorerHighlights";
import { getTripExplorerByTripSlug } from "@/content/tripExplorers";
import { resolveErlebnisdetail } from "@/lib/resolveErlebnisdetail";
import { resolveErlebnisprofilBySlug, usesErlebnisprofilGenerator } from "@/lib/resolveErlebnisprofil";
import { isLiveRideGuide } from "@/content/rideGuideCopy";

interface ErlebnisdetailPageProps {
  params: Promise<{ slug: string; erlebnisSlug: string }>;
}

export const dynamicParams = true;

export function generateStaticParams() {
  return explorerHighlights.flatMap((trip) =>
    getErlebnisSlugsForTrip(trip.tripSlug).map((erlebnisSlug) => ({
      slug: trip.tripSlug,
      erlebnisSlug,
    })),
  );
}

export async function generateMetadata({ params }: ErlebnisdetailPageProps): Promise<Metadata> {
  const { slug, erlebnisSlug } = await params;

  const bundle = await resolveErlebnisprofilBySlug(erlebnisSlug);
  if (bundle) {
    return {
      title: `${bundle.product.title} — MW Guides`,
      description: bundle.product.subtitle,
    };
  }

  const detail = resolveErlebnisdetail(slug, erlebnisSlug, getErlebnisdetailBySlug);
  if (!detail) return { title: "Erlebnis nicht gefunden" };
  return {
    title: `${detail.title} — MW Guides`,
    description: detail.subtitle,
  };
}

function buildWebsiteOptionsFromChannel(
  channel: NonNullable<ReturnType<typeof getExploreTripChannelExtension>>,
) {
  const rideGuide = isLiveRideGuide(channel.rideGuideCta)
    ? {
        label: channel.rideGuideCta.label,
        price: channel.rideGuideCta.price,
        href: channel.rideGuideCta.href,
      }
    : undefined;

  return {
    introVideoLabel: channel.introVideoLabel,
    mapEnhancement: channel.mapEnhancement,
    rideGuide,
  };
}

/**
 * AP-011 — Erlebnisdetail (Ebene 2 detail view).
 * AP-0022C — Generator-based Erlebnisprofil + Explore-Trip channel extensions when available.
 */
export default async function ErlebnisdetailPage({ params }: ErlebnisdetailPageProps) {
  const { slug, erlebnisSlug } = await params;
  const trip = getExploreTripBySlug(slug);
  const explorer = getTripExplorerByTripSlug(slug);
  const highlight = getHighlightBySlug(slug, erlebnisSlug);

  if (!trip || !explorer || !highlight) {
    notFound();
  }

  const welt = explorer.erlebniswelten.find((w) => w.slug === highlight.erlebnisweltSlug);
  const weltTitle = welt?.explorerTitle ?? welt?.title ?? highlight.erlebnisweltSlug;

  if (await usesErlebnisprofilGenerator(erlebnisSlug)) {
    const bundle = await resolveErlebnisprofilBySlug(erlebnisSlug);
    if (!bundle) {
      notFound();
    }

    const channel = getExploreTripChannelExtension(slug, erlebnisSlug);

    return (
      <>
        <Header />
        <main className="flex-1">
          <ErlebnisdetailBreadcrumbs
            tripSlug={slug}
            tripTitle={trip.title}
            weltTitle={weltTitle}
            erlebnisTitle={bundle.product.title}
          />
          <ErlebnisprofilRenderer
            product={bundle.product}
            mode="website"
            website={channel ? buildWebsiteOptionsFromChannel(channel) : undefined}
          />
          {channel ? (
            <ExploreTripChannelExtensions
              data={channel}
              ticketHref={bundle.product.officialLinks.ticketshop}
            />
          ) : null}
        </main>
        <Footer />
      </>
    );
  }

  const detail = resolveErlebnisdetail(slug, erlebnisSlug, getErlebnisdetailBySlug);
  if (!detail || detail.tripSlug !== slug) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <ErlebnisdetailBreadcrumbs
          tripSlug={slug}
          tripTitle={trip.title}
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
