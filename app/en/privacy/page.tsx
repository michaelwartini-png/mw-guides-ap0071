import type { Metadata } from "next";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
import { landingCopy } from "@/content/landing";
import { landingMetadata } from "@/lib/landing";

const copy = landingCopy.en.privacy;

export const metadata: Metadata = landingMetadata("en", {
  title: copy.title,
  description: copy.paragraphs[0],
  path: "/en/privacy",
});

export default function PrivacyPage() {
  return (
    <LandingSubpage locale="en" title={copy.title} headline={copy.headline} paragraphs={copy.paragraphs} />
  );
}
