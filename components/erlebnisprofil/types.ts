import type { ReactNode } from "react";
import type { ExploreTripMapEnhancement } from "@/types/erlebnisprofilChannel";

/** Admin shows editor chrome via slots; website renders product content only. */
export type ErlebnisprofilRenderMode = "admin" | "website";

export type ErlebnisprofilSectionId =
  | "description"
  | "highlights"
  | "tipps"
  | "map"
  | "official"
  | "gallery"
  | "reviews"
  | "practical"
  | "operator";

export type ErlebnisprofilRendererSlots = {
  /** Content above hero badges (e.g. admin generator badge + source labels). */
  heroLead?: ReactNode;
  /** Content beside hero title block (e.g. admin product status card). */
  heroAside?: ReactNode;
  /** Optional meta beside section eyebrows (e.g. admin source labels). */
  sectionHeadingMeta?: (section: ErlebnisprofilSectionId) => ReactNode;
};

/** Website-only render options (ignored in admin mode). Not part of the product model. */
export type ErlebnisprofilWebsiteOptions = {
  breadcrumbs?: { label: string; href?: string }[];
  introVideoLabel?: string;
  mapEnhancement?: ExploreTripMapEnhancement;
  rideGuide?: {
    label: string;
    price: string;
    href: string;
  };
};
