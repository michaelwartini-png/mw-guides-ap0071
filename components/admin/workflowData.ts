export type WorkflowSectionId =
  | "allgemein"
  | "hero"
  | "bewertungen"
  | "offizielle-informationen"
  | "highlights"
  | "mw-guides-tipps"
  | "galerie"
  | "produkte"
  | "videos"
  | "faq";

export type WorkflowSectionStatus = "completed" | "open";

export type WorkflowSection = {
  id: WorkflowSectionId;
  label: string;
  status: WorkflowSectionStatus;
  fieldsFilled: number;
  fieldsTotal: number;
};

/** Dummy-Workflow: Allgemein und Hero abgeschlossen, Rest offen. */
export const WORKFLOW_SECTIONS: WorkflowSection[] = [
  { id: "allgemein", label: "Allgemein", status: "completed", fieldsFilled: 8, fieldsTotal: 8 },
  { id: "hero", label: "Hero", status: "completed", fieldsFilled: 4, fieldsTotal: 8 },
  { id: "bewertungen", label: "Bewertungen", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  {
    id: "offizielle-informationen",
    label: "Offizielle Informationen",
    status: "open",
    fieldsFilled: 0,
    fieldsTotal: 7,
  },
  { id: "highlights", label: "Highlights", status: "open", fieldsFilled: 0, fieldsTotal: 5 },
  {
    id: "mw-guides-tipps",
    label: "MW Guides Tipps",
    status: "open",
    fieldsFilled: 0,
    fieldsTotal: 5,
  },
  { id: "galerie", label: "Galerie & Bildverwaltung", status: "open", fieldsFilled: 0, fieldsTotal: 8 },
  { id: "produkte", label: "Produkte", status: "open", fieldsFilled: 0, fieldsTotal: 6 },
  { id: "videos", label: "Videos", status: "open", fieldsFilled: 0, fieldsTotal: 3 },
  { id: "faq", label: "FAQ", status: "open", fieldsFilled: 0, fieldsTotal: 4 },
];

export const WORKFLOW_EXPERIENCE_NAME = "Katamaran Konstanz–Friedrichshafen";

export const WORKFLOW_PROFILE_STATUS = "Entwurf";

export const WORKFLOW_LAST_SAVED = {
  date: "05.08.2026",
  time: "09:45 Uhr",
};

export function getCompletedCount(sections: WorkflowSection[]): number {
  return sections.filter((section) => section.status === "completed").length;
}

export function getProgressPercent(sections: WorkflowSection[]): number {
  return Math.round((getCompletedCount(sections) / sections.length) * 100);
}

export function isWorkflowComplete(sections: WorkflowSection[]): boolean {
  return sections.every((section) => section.status === "completed");
}

export type DisplayStatus = "completed" | "in_progress" | "open";

export function getDisplayStatus(
  section: WorkflowSection,
  isActive: boolean,
): DisplayStatus {
  if (isActive) return "in_progress";
  if (section.status === "completed") return "completed";
  return "open";
}

export const DISPLAY_STATUS_ICON: Record<DisplayStatus, string> = {
  completed: "🟢",
  in_progress: "🟡",
  open: "⚪",
};

export const SECTION_ICONS: Record<WorkflowSectionId, string> = {
  allgemein: "📄",
  hero: "🖼",
  bewertungen: "⭐",
  "offizielle-informationen": "🌐",
  highlights: "✨",
  "mw-guides-tipps": "💡",
  galerie: "📷",
  produkte: "🏭",
  videos: "🎬",
  faq: "❓",
};

export function getSectionIndex(sectionId: WorkflowSectionId): number {
  return WORKFLOW_SECTIONS.findIndex((section) => section.id === sectionId);
}

export function getAdjacentSectionId(
  currentId: WorkflowSectionId,
  direction: "prev" | "next",
): WorkflowSectionId | null {
  const index = WORKFLOW_SECTIONS.findIndex((section) => section.id === currentId);
  if (index === -1) return null;

  const nextIndex = direction === "prev" ? index - 1 : index + 1;
  const adjacent = WORKFLOW_SECTIONS[nextIndex];
  return adjacent?.id ?? null;
}

export const PLACEHOLDER_TEXT: Record<
  Exclude<
    WorkflowSectionId,
    "allgemein" | "hero" | "bewertungen" | "offizielle-informationen" | "highlights" | "mw-guides-tipps" | "galerie" | "produkte"
  >,
  string
> = {
  videos: "Hier werden später die Videos angezeigt.",
  faq: "Hier werden später die FAQ angezeigt.",
};
