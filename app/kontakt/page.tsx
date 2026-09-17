import type { Metadata } from "next";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
import { LandingPartyDetails } from "@/components/landing/LandingPartyDetails";
import { landingCopy } from "@/content/landing";
import { landingMetadata } from "@/lib/landing";

const copy = landingCopy.de.contact;

export const metadata: Metadata = landingMetadata("de", {
  title: copy.title,
  description: copy.body,
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <LandingSubpage locale="de" title={copy.title} headline={copy.headline} paragraphs={[copy.body]}>
      <LandingPartyDetails locale="de" />
    </LandingSubpage>
  );
}
