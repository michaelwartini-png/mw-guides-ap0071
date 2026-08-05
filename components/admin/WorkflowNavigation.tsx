import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import {
  getAdjacentSectionId,
  WORKFLOW_SECTIONS,
  type WorkflowSectionId,
} from "@/components/admin/workflowData";

interface WorkflowNavigationProps {
  activeId: WorkflowSectionId;
  onNavigate: (id: WorkflowSectionId) => void;
}

function getSectionLabel(id: WorkflowSectionId): string {
  return WORKFLOW_SECTIONS.find((section) => section.id === id)?.label ?? id;
}

export function WorkflowNavigation({ activeId, onNavigate }: WorkflowNavigationProps) {
  const previousId = getAdjacentSectionId(activeId, "prev");
  const nextId = getAdjacentSectionId(activeId, "next");

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--mwg-line)] pt-6">
      {previousId ? (
        <AdminSecondaryButton onClick={() => onNavigate(previousId)}>
          <span aria-hidden="true">⬅</span>
          Vorheriger Bereich
          <span className="hidden text-stone md:inline">· {getSectionLabel(previousId)}</span>
        </AdminSecondaryButton>
      ) : (
        <span />
      )}

      {nextId ? (
        <AdminPrimaryButton onClick={() => onNavigate(nextId)}>
          Nächster Bereich
          <span className="hidden text-white/75 md:inline">· {getSectionLabel(nextId)}</span>
          <span aria-hidden="true">➡</span>
        </AdminPrimaryButton>
      ) : (
        <span />
      )}
    </div>
  );
}
