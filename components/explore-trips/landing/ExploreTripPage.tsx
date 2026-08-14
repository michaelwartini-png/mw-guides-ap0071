import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ErlebnisprofilBreadcrumbs } from "@/components/erlebnisprofil/ErlebnisprofilBreadcrumbs";
import { HeroSection } from "@/components/explore-trips/landing/HeroSection";
import { USPBar } from "@/components/explore-trips/landing/USPBar";
import { ConceptSection } from "@/components/explore-trips/landing/ConceptSection";
import { ErlebnisweltGrid } from "@/components/explore-trips/landing/ErlebnisweltGrid";
import { ErlebnisbausteinSection } from "@/components/explore-trips/landing/ErlebnisbausteinSection";
import { BenefitsSection } from "@/components/explore-trips/landing/BenefitsSection";
import { CTASection } from "@/components/explore-trips/landing/CTASection";
import { getHighlightBySlug } from "@/content/explorerHighlights";
import type { ExploreTrip } from "@/types/exploreTrip";
import type { TripExplorer, TripExplorerErlebniswelt } from "@/types/tripExplorer";

interface ExploreTripPageProps {
  trip: ExploreTrip;
  tripExplorer: TripExplorer;
}

function resolveErlebniswelten(
  explorer: TripExplorer,
  refs: NonNullable<ExploreTrip["landing"]>["erlebnisweltenFromExplorer"],
): TripExplorerErlebniswelt[] {
  return refs
    .map((ref) => {
      const welt = explorer.erlebniswelten.find((w) => w.slug === ref.slug);
      if (!welt) return undefined;
      return ref.title ? { ...welt, title: ref.title } : welt;
    })
    .filter((w): w is TripExplorerErlebniswelt => w !== undefined);
}

function weltTitleForSlug(explorer: TripExplorer, weltSlug: string): string | undefined {
  const welt = explorer.erlebniswelten.find((w) => w.slug === weltSlug);
  return welt?.explorerTitle ?? welt?.title;
}

/**
 * AP-010.2 / AP-ET002 — Ebene 1 master template. Seven fixed sections, all
 * content from ExploreTrip.landing + TripExplorer. Reused by every Explore Trip.
 */
export function ExploreTripPage({ trip, tripExplorer }: ExploreTripPageProps) {
  const landing = trip.landing!;

  const erlebniswelten = resolveErlebniswelten(
    tripExplorer,
    landing.erlebnisweltenFromExplorer,
  );

  const conceptIntro = landing.conceptIntro ?? landing.whyIntro ?? "";
  const erlebnisweltenHeading =
    landing.erlebnisweltenHeading ?? "Wähle deine Erlebniswelten";

  const explorerHref = `/explore-trips/${trip.slug}/explorer`;

  const highlightCards = landing.highlightsFromExplorer.flatMap((slug) => {
    const highlight = getHighlightBySlug(trip.slug, slug);
    if (!highlight) return [];
    return [
      {
        slug: highlight.slug,
        title: highlight.title,
        description: highlight.description,
        image: highlight.image,
        imageAlt: highlight.imageAlt,
        category: weltTitleForSlug(tripExplorer, highlight.erlebnisweltSlug),
        href: `/explore-trips/${trip.slug}/explorer/erlebnis/${highlight.slug}`,
      },
    ];
  });

  return (
    <>
      <Header />
      <main className="flex-1">
        <ErlebnisprofilBreadcrumbs
          items={[
            { label: "Europa", href: "/explore-trips" },
            { label: trip.title },
          ]}
        />
        <HeroSection
          trip={trip}
          languageHint={landing.languageHint}
          primaryCta={landing.heroPrimaryCta}
          secondaryCta={landing.heroSecondaryCta}
        />

        <USPBar items={landing.uspBar} />

        <ConceptSection
          heading={landing.conceptHeading}
          intro={conceptIntro}
          explainerHeading={landing.conceptExplainerHeading}
          explainer={landing.conceptExplainer}
          conceptLink={landing.conceptLink}
          conceptIllustration={landing.conceptIllustration}
        />

        <ErlebnisweltGrid
          welten={erlebniswelten}
          eyebrow={landing.erlebnisweltenEyebrow}
          heading={erlebnisweltenHeading}
          viewAll={landing.erlebnisweltenViewAll}
          cardHref={explorerHref}
        />

        <ErlebnisbausteinSection
          heading={landing.highlightsHeading}
          items={highlightCards}
          viewAll={landing.highlightsViewAll}
        />

        <BenefitsSection items={landing.platformUsps} />

        <CTASection
          image={landing.closingImage}
          imageAlt={landing.closingImageAlt}
          headline={landing.closingHeadline}
          subtitle={landing.closingSubtitle}
          explorerHref={explorerHref}
          buttonSubtext={landing.closingButtonSubtext}
        />

        <section className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-10">
          <Link
            href="/explore-trips"
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
          >
            Alle Explore Trips
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
