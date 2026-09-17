import type { Metadata } from "next";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
import { landingCopy } from "@/content/landing";
import { landingMetadata } from "@/lib/landing";

const copy = landingCopy.de.imprint;

export const metadata: Metadata = landingMetadata("de", {
  title: copy.title,
  description: copy.paragraphs[0],
  path: "/impressum",
});

export default function ImpressumPage() {
  return (
    <LandingSubpage locale="de" title={copy.title} headline={copy.headline} paragraphs={copy.paragraphs} />
  );
}
