/**
 * AP-ET003 — optional tasks a baustein can add to „Meine Reise“.
 * Only live actions with a real target are listed. No placeholders.
 */

export type ReiseplanAufgabe = {
  id: string;
  label: string;
  href: string;
  /** Official operator pages open in a new tab. */
  external?: boolean;
  optional?: boolean;
};

const AUFGABEN_BY_ERLEBNIS: Record<string, ReiseplanAufgabe[]> = {
  "katamaran-konstanz-friedrichshafen": [
    {
      id: "tickets",
      label: "Ticket buchen",
      href: "https://www.bsb-online.com",
      external: true,
    },
    {
      id: "website",
      label: "Offizielle Website besuchen",
      href: "https://www.katamaran-bodensee.de",
      external: true,
    },
  ],
  "wuppertaler-schwebebahn": [
    {
      id: "ride-guide",
      label: "Ride Guide erwerben",
      href: "/touren/schwebebahn",
      optional: true,
    },
  ],
};

export function getReiseplanAufgaben(erlebnisSlug: string): ReiseplanAufgabe[] {
  return AUFGABEN_BY_ERLEBNIS[erlebnisSlug] ?? [];
}
