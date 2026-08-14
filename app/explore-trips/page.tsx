import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { EuropeHero } from "@/components/explore-trips/europe/EuropeHero";
import { EuropeMap } from "@/components/explore-trips/europe/EuropeMap";
import { EuropeTripGrid } from "@/components/explore-trips/europe/EuropeTripGrid";
import { EuropeWhy } from "@/components/explore-trips/europe/EuropeWhy";
import { EuropeNewsletter } from "@/components/explore-trips/europe/EuropeNewsletter";

export const metadata: Metadata = {
  title: "Explore Trips — Europa",
  description:
    "Außergewöhnliche Explore Trips für Individualreisende in Europa – nachhaltig, flexibel und voller besonderer Erlebnisse.",
};

/**
 * AP-ET001 — ET-01 Europe entry. Inspiration and selection only.
 * No booking, tickets, or Ride Guides.
 */
export default function ExploreTripsPage() {
  return (
    <>
      <Header overlay />
      <main className="flex-1">
        <EuropeHero />
        <EuropeMap />
        <EuropeTripGrid />
        <EuropeWhy />
        <EuropeNewsletter />
      </main>
      <Footer />
    </>
  );
}
