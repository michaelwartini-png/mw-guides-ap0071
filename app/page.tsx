import { LandingPage } from "@/components/landing/LandingPage";
import { landingMetadata } from "@/lib/landing";

export const metadata = landingMetadata("de");

/**
 * AP-0031 — temporary bilingual public landing page.
 * Replaces the previous product homepage for the pre-launch period.
 */
export default function HomePage() {
  return <LandingPage locale="de" />;
}
