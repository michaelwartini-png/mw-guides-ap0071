import { DocumentLang } from "@/components/landing/DocumentLang";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingIdea } from "@/components/landing/LandingIdea";
import { LandingEmerging } from "@/components/landing/LandingEmerging";
import { LandingStatus } from "@/components/landing/LandingStatus";
import { LandingFooter } from "@/components/landing/LandingFooter";
import type { LandingLocale } from "@/content/landing";

export function LandingPage({ locale }: { locale: LandingLocale }) {
  return (
    <>
      <DocumentLang locale={locale} />
      <LandingHeader locale={locale} />
      <main className="flex-1">
        <LandingHero locale={locale} />
        <LandingIdea locale={locale} />
        <LandingEmerging locale={locale} />
        <LandingStatus locale={locale} />
      </main>
      <LandingFooter locale={locale} />
    </>
  );
}
