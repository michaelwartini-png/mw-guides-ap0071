import type { Metadata } from "next";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
import { landingCopy } from "@/content/landing";
import { landingMetadata } from "@/lib/landing";

const copy = landingCopy.de.privacy;

export const metadata: Metadata = landingMetadata("de", {
  title: copy.title,
  description: copy.paragraphs[0],
  path: "/datenschutz",
});

export default function DatenschutzPage() {
  return (
    <LandingSubpage locale="de" title={copy.title} headline={copy.headline} paragraphs={copy.paragraphs} />
  );
}
