import type { ReactNode } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { DocumentLang } from "@/components/landing/DocumentLang";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Reveal } from "@/components/ui/Reveal";
import type { LandingLocale } from "@/content/landing";

interface LandingSubpageProps {
  locale: LandingLocale;
  title: string;
  headline: string;
  paragraphs: readonly string[];
  image?: StaticImageData;
  imageAlt?: string;
  children?: ReactNode;
}

export function LandingSubpage({
  locale,
  title,
  headline,
  paragraphs,
  image,
  imageAlt,
  children,
}: LandingSubpageProps) {
  return (
    <>
      <DocumentLang locale={locale} />
      <LandingHeader locale={locale} />
      <main className="flex-1">
        {image && (
          <div className="relative h-[42vh] min-h-[240px] overflow-hidden">
            <Image
              src={image}
              alt={imageAlt ?? ""}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[var(--mwg-ink)]/20" aria-hidden="true" />
          </div>
        )}
        <section className="mx-auto max-w-[760px] px-6 py-20 lg:px-10 lg:py-28">
          <Reveal>
            <p className="mwg-eyebrow text-[var(--mwg-accent)]">{title}</p>
            <h1 className="mwg-display-lg mt-4">{headline}</h1>
            <div className="mt-10 flex flex-col gap-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
                  {paragraph}
                </p>
              ))}
            </div>
            {children}
          </Reveal>
        </section>
      </main>
      <LandingFooter locale={locale} />
    </>
  );
}
