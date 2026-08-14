/** Shared Ride-Guide copy for the Erlebnisprofil master template (AP-ET003). */

export const RIDE_GUIDE_CTA_LABEL = "Ride Guide entdecken";

export const RIDE_GUIDE_HERO_HINT =
  "Audioguide mit Geschichten, Hintergrundwissen und Insider-Tipps für unterwegs.";

export const RIDE_GUIDE_EXPLAINER_HEADING = "Was ist ein Ride Guide?";

export const RIDE_GUIDE_EXPLAINER_BODY =
  "Ein Ride Guide begleitet dich während der Fahrt mit Audio, Hintergrundwissen, Geschichten und Insider-Tipps direkt auf deinem Smartphone.";

export const TICKETS_CTA_LABEL = "Tickets buchen";

export type LiveRideGuide = {
  label: string;
  price: string;
  href: string;
};

/** Ride Guide UI is shown only when a real, purchasable guide exists. */
export function isLiveRideGuide<T extends { href?: string; disabled?: boolean }>(
  config?: T | null,
): config is T & LiveRideGuide {
  return Boolean(config && config.href && !config.disabled);
}
