import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { BrandIdea } from "@/components/sections/BrandIdea";
import { WhyMWGuides } from "@/components/sections/WhyMWGuides";
import { PopularTours } from "@/components/tours/PopularTours";
import { ExploreTripsSection } from "@/components/sections/ExploreTripsSection";
import { EveryCityHasAStory } from "@/components/sections/EveryCityHasAStory";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TravelerMoments } from "@/components/sections/TravelerMoments";
import { Footer } from "@/components/footer/Footer";

/**
 * AP-002.2: reordered so the two content worlds are explained where the
 * nav promises them. 1. Hero — 2. Unsere Haltung (BrandIdea) —
 * 3. Unsere Arbeitsweise (WhyMWGuides, "Wir reisen zuerst.") —
 * 4. Ride Guides (PopularTours, now headed literally "Ride Guides") —
 * 5. Explore Trips (ExploreTripsSection, new) —
 * 6. Jede Stadt hat eine Geschichte (EveryCityHasAStory) —
 * 7. So entsteht eine Tour (TravelerMoments). HowItWorks wasn't named in
 * the brief's list; kept in its prior relative position (just before
 * TravelerMoments) rather than removed.
 *
 * AP-007: swapped Explore Trips ahead of Ride Guides. The brief's UX
 * goal is explicit and sequential — "zuerst Lust auf eine Reise bekommen
 * [Explore Trips], erst danach entdeckt er die passenden Ride Guides" —
 * which the AP-002.2 order (Ride Guides, then Explore Trips) contradicted.
 * Neither component itself changed, only their order below.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <BrandIdea />
        <WhyMWGuides />
        <ExploreTripsSection />
        <PopularTours />
        <EveryCityHasAStory />
        <HowItWorks />
        <TravelerMoments />
      </main>
      <Footer />
    </>
  );
}
