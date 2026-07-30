import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock, Globe2, MapPin, WifiOff, Navigation } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/footer/Footer";
import { tours, getTourBySlug } from "@/content/tours";
import schwebebahnHeroPhoto from "@/public/images/tours/schwebebahn-detail-hero.webp";

interface TourPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour nicht gefunden" };
  return {
    title: tour.title,
    description: tour.description,
  };
}

const BADGE_STYLES: Record<string, string> = {
  Neu: "border-white/25 text-white/90",
  Bestseller: "border-[var(--mwg-accent)]/50 text-[var(--mwg-accent)]",
};

/**
 * Real photography, where available. AP-002.1: Schwebebahn is the first
 * tour with a real hero photo (Völklinger Straße station) — see README
 * "Offene Punkte" for the other three, which still use the tint gradient.
 */
const HERO_PHOTOS: Partial<Record<string, typeof schwebebahnHeroPhoto>> = {
  schwebebahn: schwebebahnHeroPhoto,
};

/**
 * Placeholder tour detail page. Full itinerary, stops, and audio playback
 * are defined in a later work package.
 *
 * AP-002.0: this page carries the price, offline/GPS and badge metadata
 * that AP-001.1 showed on the homepage cards — decluttered off the
 * homepage tiles, not removed. See README "Offene Punkte".
 * AP-002.1: Schwebebahn's hero now uses a real photo instead of the tint
 * gradient (`HERO_PHOTOS` map above) — the other three tours are
 * unchanged until their photography exists.
 */
export default async function TourDetailPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);

  if (!tour) {
    notFound();
  }

  const heroPhoto = HERO_PHOTOS[tour.slug];

  return (
    <>
      <Header />
      <main className="flex-1">
        <div
          className={`relative flex h-[64vh] min-h-[440px] items-end overflow-hidden p-6 lg:p-12 ${
            heroPhoto ? "" : `bg-gradient-to-br ${tour.tint}`
          }`}
        >
          {heroPhoto ? (
            <>
              <Image
                src={heroPhoto}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10"
                aria-hidden="true"
              />
            </>
          ) : (
            <div className="mwg-route-dots absolute inset-0 opacity-[0.1]" aria-hidden="true" />
          )}
          <div className="relative mx-auto w-full max-w-[1240px]">
            {tour.badge && (
              <span
                className={`mb-4 inline-block rounded-full border px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] ${BADGE_STYLES[tour.badge]}`}
              >
                {tour.badge}
              </span>
            )}
            <span className="flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.1em] text-white/70">
              <MapPin size={13} /> {tour.place}
            </span>
            <h1 className="mwg-display-xl mt-3 text-white">{tour.title}</h1>
            <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-white/70">
              {tour.story}
            </p>
          </div>
        </div>

        <section className="mx-auto max-w-[1240px] px-6 py-16 lg:px-10">
          <p className="max-w-[620px] text-[16px] leading-relaxed text-[var(--mwg-ink-70)]">
            {tour.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[12.5px] text-[var(--mwg-ink-45)]">
            <span className="flex items-center gap-1.5">
              <Clock size={13} /> {tour.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Globe2 size={13} /> {tour.language}
            </span>
            {tour.offline && (
              <span className="flex items-center gap-1.5">
                <WifiOff size={13} /> Offline nutzbar
              </span>
            )}
            {tour.gpsGuided && (
              <span className="flex items-center gap-1.5">
                <Navigation size={13} /> GPS-geführt
              </span>
            )}
            <span className="text-[var(--mwg-ink)]">{tour.priceFrom}</span>
          </div>

          <p className="mt-10 max-w-[620px] rounded-sm border border-dashed border-[var(--mwg-line)] p-5 text-[13.5px] text-[var(--mwg-ink-45)]">
            Detaillierter Streckenverlauf, Stationen, Hörproben und
            Kaufabschluss folgen in einem späteren Arbeitspaket.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
