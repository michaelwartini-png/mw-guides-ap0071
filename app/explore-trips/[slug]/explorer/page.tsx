import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { Header } from "@/components/layout/Header";

import { Footer } from "@/components/footer/Footer";

import { TripExplorerView } from "@/components/trip-explorer/TripExplorerView";

import { TripExplorerWorkspace } from "@/components/trip-explorer/workspace/TripExplorerWorkspace";

import { getExploreTripBySlug } from "@/content/exploreTrips";

import { getTripExplorerByTripSlug, getTripExplorerSlugs } from "@/content/tripExplorers";



interface TripExplorerPageProps {

  params: Promise<{ slug: string }>;

}



export function generateStaticParams() {

  return getTripExplorerSlugs().map((slug) => ({ slug }));

}



export async function generateMetadata({ params }: TripExplorerPageProps): Promise<Metadata> {

  const { slug } = await params;

  const explorer = getTripExplorerByTripSlug(slug);

  if (!explorer) return { title: "Trip Explorer nicht gefunden" };

  return {

    title: `Trip Explorer — ${explorer.heroTitle}`,

    description: explorer.heroSubtitle,

  };

}



function getWorkspaceWeltenSlugs(slug: string): string[] {

  const trip = getExploreTripBySlug(slug);

  const refs = trip?.landing?.erlebnisweltenFromExplorer;

  if (refs?.length) return refs.map((r) => r.slug);

  return [];

}



/**

 * AP-011 — Trip Explorer (Ebene 2). Bodensee uses the interactive

 * three-column workspace; other trips keep the legacy discovery layout.

 */

export default async function TripExplorerPage({ params }: TripExplorerPageProps) {

  const { slug } = await params;

  const trip = getExploreTripBySlug(slug);

  const explorer = getTripExplorerByTripSlug(slug);



  if (!trip || !explorer) {

    notFound();

  }



  const isWorkspace = explorer.layout === "workspace";



  return (

    <>

      <Header />

      <main className="flex-1">

        {isWorkspace ? (

          <TripExplorerWorkspace

            explorer={explorer}

            workspaceWeltenSlugs={getWorkspaceWeltenSlugs(slug)}

            uspBar={trip.landing?.uspBar}

          />

        ) : (

          <TripExplorerView explorer={explorer} tripTitle={trip.title} />

        )}

      </main>

      <Footer />

    </>

  );

}


