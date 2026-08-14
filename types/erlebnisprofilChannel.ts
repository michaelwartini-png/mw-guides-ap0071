/** Explore-Trip channel extension data — not part of ErlebnisprofilProduct. */

export type ExploreTripChannelLink = {
  slug: string;
  title: string;
  image: string;
  imageAlt: string;
};

export type ExploreTripMapEnhancement = {
  preview?: { src: string; alt: string };
  departureA?: string;
  departureB?: string;
  parking?: string;
};

export type ExploreTripChannelData = {
  erlebnisSlug: string;
  tripSlug: string;
  introVideoLabel?: string;
  mapEnhancement?: ExploreTripMapEnhancement;
  recommendations: ExploreTripChannelLink[];
  combinations: ExploreTripChannelLink[];
  includedInTrips: ExploreTripChannelLink[];
  addedCount?: number;
  rideGuideCta?: {
    label: string;
    price: string;
    href?: string;
    disabled?: boolean;
  };
};
