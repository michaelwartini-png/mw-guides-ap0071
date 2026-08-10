import type { ReactNode } from "react";

export type ErlebnisprofilSectionId =
  | "description"
  | "highlights"
  | "tipps"
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
