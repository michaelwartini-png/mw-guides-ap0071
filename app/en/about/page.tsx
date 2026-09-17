import type { Metadata } from "next";
import aboutPhoto from "@/public/images/explore-trips/bodensee-natur.jpg";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
import { landingCopy } from "@/content/landing";
import { landingMetadata } from "@/lib/landing";

const copy = landingCopy.en.about;

export const metadata: Metadata = landingMetadata("en", {
  title: copy.title,
  description: copy.paragraphs[0],
  path: "/en/about",
});

export default function AboutPage() {
  return (
    <LandingSubpage
      locale="en"
      title={copy.title}
      headline={copy.headline}
      paragraphs={copy.paragraphs}
      image={aboutPhoto}
      imageAlt={copy.imageAlt}
    />
  );
}
