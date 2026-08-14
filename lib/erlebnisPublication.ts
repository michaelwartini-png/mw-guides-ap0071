/** AP-0023 — Veröffentlichungsstatus für Erlebnisbausteine. */
export const PUBLICATION_STATUSES = [
  "Entwurf",
  "In Prüfung",
  "Veröffentlicht",
  "Archiviert",
] as const;

export type PublicationStatus = (typeof PUBLICATION_STATUSES)[number];

const LEGACY_STATUS_MAP: Record<string, PublicationStatus> = {
  Entwurf: "Entwurf",
  "In Bearbeitung": "In Prüfung",
  Veröffentlichungsbereit: "In Prüfung",
  "In Prüfung": "In Prüfung",
  Veröffentlicht: "Veröffentlicht",
  Archiviert: "Archiviert",
};

export function normalizePublicationStatus(status: string): PublicationStatus {
  return LEGACY_STATUS_MAP[status] ?? "Entwurf";
}

export function isPublishedStatus(status: string): boolean {
  return normalizePublicationStatus(status) === "Veröffentlicht";
}

export function isPubliclyVisibleStatus(status: string): boolean {
  return isPublishedStatus(status);
}
