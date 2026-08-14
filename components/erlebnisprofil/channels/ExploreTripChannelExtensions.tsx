import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { ExploreTripChannelData } from "@/types/erlebnisprofilChannel";
import { ExploreTripStickyBar } from "@/components/erlebnisprofil/channels/ExploreTripStickyBar";
import { isLiveRideGuide } from "@/content/rideGuideCopy";

interface ExploreTripChannelExtensionsProps {
  data: ExploreTripChannelData;
  ticketHref?: string;
}

export function ExploreTripChannelExtensions({
  data,
  ticketHref,
}: ExploreTripChannelExtensionsProps) {
  const { tripSlug } = data;

  return (
    <>
      <div className="mx-auto max-w-[1240px] px-6 pb-28 lg:px-10">
        {data.recommendations.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">Passt hervorragend dazu</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {data.recommendations.map((rec) => (
                <Link
                  key={rec.slug}
                  href={`/explore-trips/${tripSlug}/explorer/erlebnis/${rec.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-3 transition-colors hover:border-[var(--mwg-accent)]/40"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={rec.image}
                      alt={rec.imageAlt}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <span className="text-[14px] font-medium group-hover:text-[var(--mwg-accent)]">
                    {rec.title}
                  </span>
                  <ChevronRight size={16} className="ml-auto text-[var(--mwg-ink-45)]" />
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {data.combinations.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">Kombinierbar mit</h2>
            <ul className="mt-4 space-y-2">
              {data.combinations.map((combo) => (
                <li key={combo.slug}>
                  <Link
                    href={`/explore-trips/${tripSlug}/explorer/erlebnis/${combo.slug}`}
                    className="flex items-center gap-2 text-[14px] text-[var(--mwg-ink-70)] hover:text-[var(--mwg-accent)]"
                  >
                    <ArrowRight size={14} />
                    {combo.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {data.includedInTrips.length > 0 ? (
          <section className="mt-12">
            <h2 className="font-display text-[22px] font-medium">In folgenden Explore Trips enthalten</h2>
            <div className="mt-5 flex flex-wrap gap-4">
              {data.includedInTrips.map((trip) => (
                <Link
                  key={trip.slug}
                  href={`/explore-trips/${trip.slug}`}
                  className="flex items-center gap-3 rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] p-3 transition-colors hover:border-[var(--mwg-accent)]/40"
                >
                  <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={trip.image}
                      alt={trip.imageAlt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <span className="text-[14px] font-medium">{trip.title}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </div>

      <ExploreTripStickyBar
        tripSlug={tripSlug}
        erlebnisSlug={data.erlebnisSlug}
        addedCount={data.addedCount}
        rideGuide={isLiveRideGuide(data.rideGuideCta) ? data.rideGuideCta : undefined}
        ticketHref={ticketHref}
      />
    </>
  );
}
