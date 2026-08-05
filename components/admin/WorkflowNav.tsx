import { cn } from "@/lib/cn";
import {
  DISPLAY_STATUS_ICON,
  getDisplayStatus,
  SECTION_ICONS,
  type WorkflowSection,
  type WorkflowSectionId,
} from "@/components/admin/workflowData";

interface WorkflowNavProps {
  sections: WorkflowSection[];
  activeId: WorkflowSectionId;
  onSelect: (id: WorkflowSectionId) => void;
}

export function WorkflowNav({ sections, activeId, onSelect }: WorkflowNavProps) {
  return (
    <nav aria-label="Workflow-Navigation" className="space-y-0.5">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        const displayStatus = getDisplayStatus(section, isActive);

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSelect(section.id)}
            className={cn(
              "group relative flex w-full flex-col gap-0.5 rounded-lg py-2.5 pl-3.5 pr-3 text-left transition-colors",
              isActive
                ? "border border-accent/20 bg-accent/[0.07] font-medium text-ink shadow-[inset_3px_0_0_var(--mwg-accent)]"
                : "border border-transparent text-[var(--mwg-ink-70)] hover:border-[var(--mwg-line)] hover:bg-paper-raised/80 hover:text-ink",
            )}
          >
            <span className="flex items-center gap-2 text-[13.5px] leading-snug">
              <span aria-hidden="true" className="w-5 shrink-0 text-center text-[14px]">
                {SECTION_ICONS[section.id]}
              </span>
              <span className="min-w-0 flex-1">{section.label}</span>
              <span aria-hidden="true" className="shrink-0 text-[10px]">
                {DISPLAY_STATUS_ICON[displayStatus]}
              </span>
              {isActive && (
                <span aria-hidden="true" className="shrink-0 text-accent">
                  →
                </span>
              )}
            </span>

            <span className="pl-7 text-[11px] text-stone">
              {section.fieldsFilled} / {section.fieldsTotal} Felder
            </span>
          </button>
        );
      })}
    </nav>
  );
}
