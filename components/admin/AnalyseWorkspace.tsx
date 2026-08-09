"use client";

import { useMemo, useState } from "react";
import { AllgemeinEditor } from "@/components/admin/AllgemeinEditor";
import { BewertungenEditor } from "@/components/admin/BewertungenEditor";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { HighlightsEditor } from "@/components/admin/HighlightsEditor";
import { OffizielleInformationenEditor } from "@/components/admin/OffizielleInformationenEditor";
import { AdminLink } from "@/components/admin/adminButtons";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import { buildNewErlebnisRecord } from "@/components/admin/erlebnisSessionStore";
import { WorkflowNav } from "@/components/admin/WorkflowNav";
import { WorkflowNavigation } from "@/components/admin/WorkflowNavigation";
import { WorkflowProgress } from "@/components/admin/WorkflowProgress";
import { getSectionStep, WorkflowStepHeader } from "@/components/admin/WorkflowStepHeader";
import {
  PLACEHOLDER_TEXT,
  type WorkflowSection,
  type WorkflowSectionId,
} from "@/components/admin/workflowData";

interface AnalyseWorkspaceProps {
  erlebnis?: ErlebnisRecord;
}

export function AnalyseWorkspace({ erlebnis }: AnalyseWorkspaceProps) {
  const emptyErlebnis = useMemo(() => buildNewErlebnisRecord({ name: "" }), []);
  const data = erlebnis ?? emptyErlebnis;
  const [sections] = useState<WorkflowSection[]>(data.workflowSections);
  const [activeItem, setActiveItem] = useState<WorkflowSectionId>("allgemein");
  const { step, total, label } = getSectionStep(activeItem, sections.length);

  return (
    <div className="space-y-5">
      <AdminLink href="/admin">← Zur Erlebnisverwaltung</AdminLink>

      <WorkflowProgress
        sections={sections}
        experienceName={data.name}
        profileStatus={data.profileStatus}
        lastSaved={data.lastSaved}
        progressPercent={data.progress}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(200px,25%)_minmax(0,75%)] lg:gap-6">
        <WorkflowNav sections={sections} activeId={activeItem} onSelect={setActiveItem} />

        <section className="min-h-[320px] rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-5 py-6 sm:px-7">
          <WorkflowStepHeader step={step} total={total} label={label} />

          {activeItem === "allgemein" ? (
            <AllgemeinEditor key={`${data.slug}-allgemein`} initialData={data.allgemein} />
          ) : activeItem === "hero" ? (
            <HeroEditor key={`${data.slug}-hero`} initialData={data.hero} />
          ) : activeItem === "bewertungen" ? (
            <BewertungenEditor key={`${data.slug}-bewertungen`} initialData={data.bewertungen} />
          ) : activeItem === "offizielle-informationen" ? (
            <OffizielleInformationenEditor
              key={`${data.slug}-offiziell`}
              initialData={data.offizielleInformationen}
            />
          ) : activeItem === "highlights" ? (
            <HighlightsEditor key={`${data.slug}-highlights`} initialData={data.highlights} />
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
