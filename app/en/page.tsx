import { LandingPage } from "@/components/landing/LandingPage";
import { landingMetadata } from "@/lib/landing";

export const metadata = landingMetadata("en");

export default function EnglishHomePage() {
  return <LandingPage locale="en" />;
}
