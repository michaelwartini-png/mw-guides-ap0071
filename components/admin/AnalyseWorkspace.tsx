"use client";

import { useState } from "react";
import { AllgemeinEditor } from "@/components/admin/AllgemeinEditor";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { WorkflowNav } from "@/components/admin/WorkflowNav";
import { WorkflowNavigation } from "@/components/admin/WorkflowNavigation";
import { WorkflowProgress } from "@/components/admin/WorkflowProgress";
import { getSectionStep, WorkflowStepHeader } from "@/components/admin/WorkflowStepHeader";
import {
  PLACEHOLDER_TEXT,
  WORKFLOW_SECTIONS,
  type WorkflowSection,
  type WorkflowSectionId,
} from "@/components/admin/workflowData";

export function AnalyseWorkspace() {
  const [sections] = useState<WorkflowSection[]>(WORKFLOW_SECTIONS);
  const [activeItem, setActiveItem] = useState<WorkflowSectionId>("allgemein");
  const { step, total, label } = getSectionStep(activeItem, sections.length);

  return (
    <div className="space-y-5">
      <WorkflowProgress sections={sections} />

      <div className="grid gap-5 lg:grid-cols-[minmax(200px,25%)_minmax(0,75%)] lg:gap-6">
        <WorkflowNav sections={sections} activeId={activeItem} onSelect={setActiveItem} />

        <section className="min-h-[320px] rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-5 py-6 sm:px-7">
          <WorkflowStepHeader step={step} total={total} label={label} />

          {activeItem === "allgemein" ? (
            <AllgemeinEditor />
          ) : activeItem === "hero" ? (
            <HeroEditor />
          ) : (
            <div className="flex min-h-[200px] items-center justify-center px-4 py-10">
              <p className="max-w-md text-center text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                {PLACEHOLDER_TEXT[activeItem]}
              </p>
            </div>
          )}

          <WorkflowNavigation activeId={activeItem} onNavigate={setActiveItem} />
        </section>
      </div>
    </div>
  );
}
