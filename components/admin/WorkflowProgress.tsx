import {
  getCompletedCount,
  getProgressPercent,
  isWorkflowComplete,
  type WorkflowSection,
} from "@/components/admin/workflowData";

interface WorkflowProgressProps {
  sections: WorkflowSection[];
  experienceName: string;
  profileStatus: string;
  lastSaved: {
    date: string;
    time: string;
  };
  progressPercent?: number;
}

export function WorkflowProgress({
  sections,
  experienceName,
  profileStatus,
  lastSaved,
  progressPercent,
}: WorkflowProgressProps) {
  const completedCount = getCompletedCount(sections);
  const totalCount = sections.length;
  const displayPercent = progressPercent ?? getProgressPercent(sections);
  const isComplete = isWorkflowComplete(sections);

  return (
    <div className="space-y-3">
      <div>
        <h1 className="font-display text-[1.625rem] font-medium leading-tight tracking-tight text-ink">
          {experienceName}
        </h1>
        <p className="mt-0.5 text-[13px] text-stone">Erlebnisprofil bearbeiten</p>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[13px] text-[var(--mwg-ink-70)]">
        <span>
          Status: <span className="font-medium text-ink">{profileStatus}</span>
        </span>
        <span className="font-medium text-ink">{displayPercent}&nbsp;% vollständig</span>
        <span>
          Zuletzt gespeichert: {lastSaved.date} · {lastSaved.time}
        </span>
      </div>

      {isComplete && (
        <div
          role="status"
          className="rounded-lg border border-accent/25 bg-accent/10 px-4 py-3 text-[14px] leading-relaxed text-ink"
        >
          <p className="font-medium">🎉 Erlebnisprofil vollständig.</p>
          <p className="mt-0.5 text-[var(--mwg-ink-70)]">Bereit für Veröffentlichung.</p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-0.5">
        <div className="h-1.5 min-w-[160px] max-w-sm flex-1 overflow-hidden rounded-full bg-[var(--mwg-line)]">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${displayPercent}%` }}
          />
        </div>
        <p className="text-[13px] text-stone">
          {completedCount} von {totalCount} Bereichen abgeschlossen
        </p>
      </div>
    </div>
  );
}
