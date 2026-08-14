/**
 * AP-ET005 — Digital travel companions offered at the end of the Trip Explorer.
 */

export interface TripRideGuideProduct {
  slug: string;
  title: string;
  place: string;
  priceFrom: string;
  price: number;
}

export interface PremiumPreviewPage {
  title: string;
  excerpt: string;
}

export interface PremiumPreview {
  coverTitle: string;
  coverSubtitle: string;
  toc: string[];
  samplePages: PremiumPreviewPage[];
  insiderTip: {
    title: string;
    body: string;
  };
}
