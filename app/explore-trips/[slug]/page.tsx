import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { EditorialBlock } from "@/components/editorial/EditorialBlock";
import { TourTile } from "@/components/tours/TourTile";
import { exploreTrips, getExploreTripBySlug } from "@/content/exploreTrips";
import { getErlebnisbausteinBySlug } from "@/content/erlebnisbausteine";
import { erlebnisbausteinTypeLabels } from "@/types/erlebnisbaustein";
import { getTourBySlug } from "@/content/tours";

interface ExploreTripPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return exploreTrips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: ExploreTripPageProps): Promise<Metadata> {
  const { slug } = await params;
  const trip = getExploreTripBySlug(slug);
  if (!trip) return { title: "Explore Trip nicht gefunden" };
  return {
    title: trip.title,
    description: trip.teaser,
  };
}

/**
 * Explore Trip detail page. Migrated from the former /reiseideen/[slug]
 * (AP-002.2) — original `sections` rendering unchanged.
 *
 * AP-007: added conditional blocks (subtitle, USP, highlights, duration,
 * Erlebnisbausteine, Ride Guides, Galerie, CTA) that only render when a
 * trip provides that data — the three original Schwebebahn articles have
 * none of these fields set and therefore render exactly as before.
 *
 * AP-008.2: this block order is now the defined standard for all future
 * Explore Trips — Hero → Das Konzept (usp) → Warum diese Reise
 * (highlights) → Alles kann, nichts muss (flexibility) → Erlebnisbausteine
 * → Passende Ride Guides → Galerie → CTA. Also fixed a bug where the
 * Erlebnisbausteine intro paragraph hardcoded "Mailand Unlimited" instead
 * of using `trip.title`, and renamed "Enthaltene Ride Guides" to "Passende
 * Ride Guides" — the old title implied the trip depends on those
 * products, which the brief explicitly rules out.
 */
export default async function ExploreTripDetailPage({ params }: ExploreTripPageProps) {
  const { slug } = await params;
  const trip = getExploreTripBySlug(slug);

  if (!trip) {
    notFound();
  }

  const erlebnisbausteine = (trip.erlebnisbausteineSlugs ?? [])
    .map(getErlebnisbausteinBySlug)
    .filter((e) => e !== undefined);
  const rideGuides = (trip.rideGuideSlugs ?? [])
    .map(getTourBySlug)
    .filter((t) => t !== undefined);

  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="relative flex h-[64vh] min-h-[440px] items-end overflow-hidden p-6 lg:p-12">
          <Image
            src={trip.heroImage}
            alt={trip.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
            aria-hidden="true"
          />
          <div className="relative mx-auto w-full max-w-[1240px]">
            <span className="mwg-eyebrow text-white/60">Explore Trip</span>
            <h1 className="mwg-display-xl mt-3 max-w-[20ch] text-white">
              {trip.title}
            </h1>
            {trip.subtitle && (
              <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-white/80">
                {trip.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* AP-007/AP-008.2: "Das Konzept" — why a fixed base beats a round trip */}
        {trip.usp && (
          <section className="mx-auto max-w-[1240px] px-6 pt-16 lg:px-10">
            <Reveal className="mx-auto max-w-[68ch]">
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Das Konzept</span>
              <p className="mt-4 text-[19px] leading-[1.75] text-[var(--mwg-ink-70)]">
                {trip.usp}
              </p>
              {trip.recommendedDuration && (
                <span className="mt-6 inline-flex items-center gap-1.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-[var(--mwg-ink-45)]">
                  <Clock size={13} /> Empfohlene Reisedauer: {trip.recommendedDuration}
                </span>
              )}
            </Reveal>
          </section>
        )}

        {/* AP-007: highlights */}
        {trip.highlights && trip.highlights.length > 0 && (
          <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
            <Reveal>
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Warum diese Reise</span>
            </Reveal>
            <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {trip.highlights.map((h, i) => (
                <Reveal key={h.title} delayMs={i * 70} className="border-t border-[var(--mwg-line)] pt-4">
                  <h3 className="font-display text-[18px] font-medium">{h.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--mwg-ink-70)]">{h.text}</p>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* AP-008.2/AP-007.1: the "Alles kann - nichts muss" idea, without repeating the
            exact phrase (that now appears exactly once platform-wide, on the homepage —
            see components/sections/ExploreTripsSection.tsx). Positioned before
            Erlebnisbausteine so the following list never reads as a checklist/itinerary. */}
        {trip.flexibility && (
          <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
            <Reveal className="mx-auto max-w-[68ch] rounded-sm border border-[var(--mwg-line)] p-8 lg:p-10">
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Kein fester Ablauf</span>
              <p className="mt-4 font-display text-[20px] italic leading-relaxed text-[var(--mwg-ink)]">
                {trip.flexibility}
              </p>
            </Reveal>
          </section>
        )}

        {/* Original sections rendering — unchanged from AP-002.2 */}
        {trip.sections.map((section, i) =>
          section.image ? (
            <EditorialBlock
              key={i}
              eyebrow={`0${i + 1}`}
              heading={section.heading}
              paragraphs={section.paragraphs}
              image={section.image}
              imageAlt={section.imageAlt ?? ""}
              imagePosition={section.imagePosition}
            />
          ) : (
            <section key={i} className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
              <Reveal className="mx-auto max-w-[68ch]">
                <span className="mwg-eyebrow text-[var(--mwg-accent)]">{`0${i + 1}`}</span>
                <h2 className="mwg-display-lg mt-4 max-w-[20ch]">{section.heading}</h2>
                <div className="mt-6 space-y-5">
                  {section.paragraphs.map((p, pi) => (
                    <p key={pi} className="max-w-[68ch] text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
                      {p}
                    </p>
                  ))}
                </div>
              </Reveal>
            </section>
          )
        )}

        {/* AP-007: Erlebnisbausteine — the modules this trip is built from */}
        {erlebnisbausteine.length > 0 && (
          <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
            <Reveal>
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Erlebnisbausteine</span>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                Aus diesen Bausteinen setzt sich {trip.title} zusammen — Straßenbahnlinien,
                Schifffahrten, Aussichtspunkte und Stadtviertel, jedes für sich ein Grund zu bleiben.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {erlebnisbausteine.map((baustein, i) => {
                const linkedTour = baustein.rideGuideSlug ? getTourBySlug(baustein.rideGuideSlug) : undefined;
                return (
                  <Reveal
                    key={baustein.slug}
                    delayMs={i * 70}
                    className="group rounded-sm border border-[var(--mwg-line)] p-6 transition-colors hover:border-[var(--mwg-accent)]"
                  >
                    <span className="font-display text-[22px] font-medium text-[var(--mwg-ink-45)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="mwg-eyebrow mt-3 block text-[var(--mwg-ink-45)]">
                      {erlebnisbausteinTypeLabels[baustein.type]}
                    </span>
                    <h3 className="mt-1 font-display text-[18px] font-medium">{baustein.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
                      {baustein.description}
                    </p>
                    {linkedTour && (
                      <Link
                        href={`/touren/${linkedTour.slug}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-[var(--mwg-accent)] transition-colors hover:text-[var(--mwg-ink)]"
                      >
                        Eigener Ride Guide verfügbar <ArrowUpRight size={13} />
                      </Link>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </section>
        )}

        {/* AP-008.2: renamed from "Enthaltene Ride Guides" — that title implied the trip
            depends on these products. Ride Guides are optional, never a requirement. */}
        {rideGuides.length > 0 && (
          <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
            <Reveal>
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Passende Ride Guides</span>
              <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                Diese Reise funktioniert auch ohne sie — wer tiefer einsteigen möchte,
                findet hier die dazu passenden, eigenständig nutzbaren Ride Guides.
              </p>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rideGuides.map((tour, i) => (
                <Reveal key={tour.slug} delayMs={i * 80}>
                  <TourTile tour={tour} />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* AP-007: gallery */}
        {trip.gallery && trip.gallery.length > 0 && (
          <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
            <Reveal>
              <span className="mwg-eyebrow text-[var(--mwg-accent)]">Galerie</span>
            </Reveal>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trip.gallery.map((g, i) => (
                <Reveal key={g.image} delayMs={i * 80} className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src={g.image} alt={g.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* AP-007: stronger closing CTA when this is a premium trip (USP present) */}
        {trip.usp && (
          <section className="mx-auto max-w-[1240px] px-6 py-20 text-center lg:px-10 lg:py-28">
            <Reveal>
              <h2 className="mwg-display-lg mx-auto max-w-[18ch]">
                Genau diese Reise möchte ich erleben.
              </h2>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Button href="/explore-trips" variant="accent">
                  {trip.ctaLabel ?? "Alle Explore Trips ansehen"}
                </Button>
                <Button href="/touren" variant="ghost-dark">
                  Ride Guides entdecken
                </Button>
              </div>
            </Reveal>
          </section>
        )}

        <section className="mx-auto max-w-[1240px] px-6 pb-24 lg:px-10">
          <Link
            href="/explore-trips"
            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--mwg-ink-70)] transition-colors hover:text-[var(--mwg-ink)]"
          >
            Alle Explore Trips
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
