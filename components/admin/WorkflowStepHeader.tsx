import type { WorkflowSectionId } from "@/components/admin/workflowData";

interface WorkflowStepHeaderProps {
  step: number;
  total: number;
  label: string;
}

export function WorkflowStepHeader({ step, total, label }: WorkflowStepHeaderProps) {
  return (
    <div className="mb-6 border-b border-[var(--mwg-line)] pb-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
        Schritt {step} von {total}
      </p>
      <h2 className="mt-1 text-lg font-medium text-ink">{label}</h2>
    </div>
  );
}

export function getSectionStep(sectionId: WorkflowSectionId, total: number) {
  const index = WORKFLOW_SECTION_INDEX[sectionId];
  return { step: index + 1, total, label: WORKFLOW_SECTION_LABELS[sectionId] };
}

const WORKFLOW_SECTION_LABELS: Record<WorkflowSectionId, string> = {
  allgemein: "Allgemein",
  hero: "Hero",
  bewertungen: "Bewertungen",
  "offizielle-informationen": "Offizielle Informationen",
  highlights: "Highlights",
  "praktische-informationen": "Praktische Informationen",
  galerie: "Galerie",
  videos: "Videos",
  faq: "FAQ",
};

const WORKFLOW_SECTION_INDEX: Record<WorkflowSectionId, number> = {
  allgemein: 0,
  hero: 1,
  bewertungen: 2,
  "offizielle-informationen": 3,
  highlights: 4,
  "praktische-informationen": 5,
  galerie: 6,
  videos: 7,
  faq: 8,
};
