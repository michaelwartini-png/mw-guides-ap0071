import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { ErlebnisprofilRenderer } from "@/components/erlebnisprofil/ErlebnisprofilRenderer";
import { getTourBySlug } from "@/content/tours";
import {
  getPublishedErlebnisSlugs,
  resolvePublishedErlebnisprofil,
} from "@/lib/resolveErlebnisprofil";

interface ErlebnisprofilPageProps {
  params: Promise<{ slug: string }>;
}

/** Maps Erlebnisprofil slugs to Ride Guide tour slugs for website CTAs. */
const RIDE_GUIDE_TOUR_SLUG: Partial<Record<string, string>> = {
  "wuppertaler-schwebebahn": "schwebebahn",
};

export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedErlebnisSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ErlebnisprofilPageProps): Promise<Metadata> {
  const { slug } = await params;
  const bundle = await resolvePublishedErlebnisprofil(slug);
  if (!bundle) return { title: "Erlebnis nicht gefunden" };

  const { product } = bundle;
  return {
    title: `${product.title} — MW Guides`,
    description: product.subtitle,
  };
}

/**
 * AP-0022B — Generator-based public Erlebnisprofil page.
 * AP-0023 — Dynamische Auflösung veröffentlichter Erlebnisse aus Admin-Store.
 */
export default async function ErlebnisprofilPage({ params }: ErlebnisprofilPageProps) {
  const { slug } = await params;
  const bundle = await resolvePublishedErlebnisprofil(slug);

  if (!bundle) {
    notFound();
  }

  const { product } = bundle;
  const tourSlug = RIDE_GUIDE_TOUR_SLUG[slug];
  const tour = tourSlug ? getTourBySlug(tourSlug) : undefined;

  return (
    <>
      <Header />
      <main className="flex-1">
        <ErlebnisprofilRenderer
          product={product}
          mode="website"
          website={{
            breadcrumbs: [
              { label: "Startseite", href: "/" },
              { label: product.kategorie || "Erlebnis" },
              { label: product.title },
            ],
            rideGuide:
              product.rideGuideAvailable && tour
                ? {
                    href: `/touren/${tour.slug}`,
                    label: "Ride Guide entdecken",
                    price: tour.priceFrom,
                  }
                : undefined,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
