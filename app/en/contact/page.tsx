import type { Metadata } from "next";
import { LandingSubpage } from "@/components/landing/LandingSubpage";
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
      <p className="mt-8">
        <a
          href={`mailto:${copy.email}`}
          className="text-[17px] text-[var(--mwg-ink)] underline decoration-[var(--mwg-accent)] underline-offset-4 transition-opacity hover:opacity-70"
        >
          {copy.email}
        </a>
      </p>
    </LandingSubpage>
  );
}
