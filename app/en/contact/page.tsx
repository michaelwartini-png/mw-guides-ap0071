import type { Metadata } from "next";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
import { LandingPartyDetails } from "@/components/landing/LandingPartyDetails";
import { landingCopy } from "@/content/landing";
import { landingMetadata } from "@/lib/landing";

const copy = landingCopy.en.contact;

export const metadata: Metadata = landingMetadata("en", {
  title: copy.title,
  description: copy.body,
  path: "/en/contact",
});

export default function ContactPage() {
  return (
    <LandingSubpage locale="en" title={copy.title} headline={copy.headline} paragraphs={[copy.body]}>
      <LandingPartyDetails locale="en" />
    </LandingSubpage>
  );
}
