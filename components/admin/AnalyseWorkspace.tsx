"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AllgemeinEditor } from "@/components/admin/AllgemeinEditor";
import { BewertungenEditor } from "@/components/admin/BewertungenEditor";
import { GalerieEditor } from "@/components/admin/GalerieEditor";
import { EMPTY_GALERIE_DATA, getHeroVorschauBild } from "@/components/admin/galerieData";
import { HeroEditor } from "@/components/admin/HeroEditor";
import { HighlightsEditor } from "@/components/admin/HighlightsEditor";
import { MWGuidesTippsEditor } from "@/components/admin/MWGuidesTippsEditor";
import { OffizielleInformationenEditor } from "@/components/admin/OffizielleInformationenEditor";
import { AdminLink } from "@/components/admin/adminButtons";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import {
  persistErlebnisSection,
  type ErlebnisSectionKey,
} from "@/components/admin/erlebnisRecordStore";
import type { EditorPersistActions } from "@/components/admin/redakteurExperienceData";
import { buildNewErlebnisRecord } from "@/components/admin/erlebnisSessionStore";
import { ProduktStudio } from "@/components/admin/products/ProduktStudio";
import { UnsavedChangesDialog } from "@/components/admin/UnsavedChangesDialog";
import { WorkflowNav } from "@/components/admin/WorkflowNav";
import { WorkflowNavigation } from "@/components/admin/WorkflowNavigation";
import { WorkflowProgress } from "@/components/admin/WorkflowProgress";
import { getSectionStep, WorkflowStepHeader } from "@/components/admin/WorkflowStepHeader";
import {
  PLACEHOLDER_TEXT,
  type WorkflowSection,
  type WorkflowSectionId,
} from "@/components/admin/workflowData";
import { cn } from "@/lib/cn";

interface AnalyseWorkspaceProps {
  erlebnis?: ErlebnisRecord;
}

export function AnalyseWorkspace({ erlebnis }: AnalyseWorkspaceProps) {
  const emptyErlebnis = useMemo(() => buildNewErlebnisRecord({ name: "" }), []);
  const seedRecord = erlebnis ?? emptyErlebnis;
  const [record, setRecord] = useState<ErlebnisRecord>(seedRecord);
  const [sections] = useState<WorkflowSection[]>(seedRecord.workflowSections);
  const [activeItem, setActiveItem] = useState<WorkflowSectionId>("allgemein");
  const [isDirty, setIsDirty] = useState(false);
  const [pendingNav, setPendingNav] = useState<WorkflowSectionId | null>(null);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);
  const editorActionsRef = useRef<EditorPersistActions | null>(null);
  const { step, total, label } = getSectionStep(activeItem, sections.length);

  useEffect(() => {
    if (erlebnis) {
      setRecord(erlebnis);
    }
  }, [erlebnis?.slug]);

  const persistSection = useCallback(
    <K extends ErlebnisSectionKey>(
      section: K,
      data: Parameters<typeof persistErlebnisSection<K>>[2],
    ) => {
      setRecord((current) => persistErlebnisSection(current, section, data));
    },
    [],
  );

  const registerEditorActions = useCallback((actions: EditorPersistActions | null) => {
    editorActionsRef.current = actions;
  }, []);

  const navigateTo = useCallback(
    (id: WorkflowSectionId) => {
      if (isDirty && id !== activeItem) {
        setPendingNav(id);
        setShowUnsavedDialog(true);
        return;
      }
      setIsDirty(false);
      setActiveItem(id);
    },
    [activeItem, isDirty],
  );

  const handleUnsavedSave = useCallback(() => {
    editorActionsRef.current?.save();
    setShowUnsavedDialog(false);
    if (pendingNav) {
      setIsDirty(false);
      setActiveItem(pendingNav);
      setPendingNav(null);
    }
  }, [pendingNav]);

  const handleUnsavedDiscard = useCallback(() => {
    editorActionsRef.current?.discard();
    setShowUnsavedDialog(false);
    if (pendingNav) {
      setIsDirty(false);
      setActiveItem(pendingNav);
      setPendingNav(null);
    }
  }, [pendingNav]);

  const handleUnsavedCancel = useCallback(() => {
    setShowUnsavedDialog(false);
    setPendingNav(null);
  }, []);

  const editorRxProps = {
    onDirtyChange: setIsDirty,
    registerActions: registerEditorActions,
  };

  const heroResolvedContent = useMemo(() => {
    const heroBild = getHeroVorschauBild(record.galerie?.items ?? []);
    return {
      titel: record.allgemein.name,
      untertitel: record.allgemein.untertitel,
      heroImageUrl: heroBild?.bildUrl,
      heroImageAlt: heroBild?.altText,
      mwgScore: record.bewertungen.mwgScore,
    };
  }, [record]);

  return (
    <div className="space-y-5">
      <AdminLink href="/admin">← Zur Erlebnisverwaltung</AdminLink>

      <WorkflowProgress
        sections={sections}
        experienceName={record.name}
        profileStatus={record.profileStatus}
        lastSaved={record.lastSaved}
        progressPercent={record.progress}
      />

      <div className="grid gap-5 lg:grid-cols-[minmax(200px,25%)_minmax(0,75%)] lg:gap-6">
        <WorkflowNav sections={sections} activeId={activeItem} onSelect={navigateTo} />

        <section
          className={cn(
            "min-h-[320px]",
            activeItem === "produkte"
              ? "rounded-xl border border-[var(--mwg-line)] bg-[var(--mwg-paper)] px-3 py-4 sm:px-4"
              : "rounded-xl border border-[var(--mwg-line)] bg-paper-raised px-5 py-6 sm:px-7",
          )}
        >
          {activeItem !== "produkte" ? (
            <WorkflowStepHeader step={step} total={total} label={label} />
          ) : (
            <div className="mb-4 border-b border-[var(--mwg-line)] pb-4 px-2 sm:px-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-stone">
                Erlebnisbaustein · {record.name}
              </p>
              <h2 className="mt-1 text-lg font-medium text-ink">Produkte</h2>
            </div>
          )}

          {activeItem === "allgemein" ? (
            <AllgemeinEditor
              key={`${record.slug}-allgemein`}
              initialData={record.allgemein}
              onPersist={(data) => persistSection("allgemein", data)}
              {...editorRxProps}
            />
          ) : activeItem === "hero" ? (
            <HeroEditor
              key={`${record.slug}-hero`}
              initialData={record.hero}
              resolvedContent={heroResolvedContent}
              onPersist={(data) => persistSection("hero", data)}
              {...editorRxProps}
            />
          ) : activeItem === "bewertungen" ? (
            <BewertungenEditor
              key={`${record.slug}-bewertungen`}
              initialData={record.bewertungen}
              onPersist={(data) => persistSection("bewertungen", data)}
              {...editorRxProps}
            />
          ) : activeItem === "offizielle-informationen" ? (
            <OffizielleInformationenEditor
              key={`${record.slug}-offiziell`}
              initialData={record.offizielleInformationen}
              onPersist={(data) => persistSection("offizielleInformationen", data)}
              {...editorRxProps}
            />
          ) : activeItem === "highlights" ? (
            <HighlightsEditor
              key={`${record.slug}-highlights`}
              initialData={record.highlights}
              galerieItems={record.galerie?.items ?? []}
              onPersist={(data) => persistSection("highlights", data)}
              {...editorRxProps}
            />
          ) : activeItem === "mw-guides-tipps" ? (
            <MWGuidesTippsEditor
              key={`${record.slug}-tipps`}
              initialData={record.mwGuidesTipps}
              galerieItems={record.galerie?.items ?? []}
              onPersist={(data) => persistSection("mwGuidesTipps", data)}
              {...editorRxProps}
            />
          ) : activeItem === "galerie" ? (
            <GalerieEditor
              key={`${record.slug}-galerie`}
              initialData={record.galerie ?? EMPTY_GALERIE_DATA}
              usageContext={{
                highlights: record.highlights,
                mwGuidesTipps: record.mwGuidesTipps,
              }}
              onPersist={(data) => persistSection("galerie", data)}
              {...editorRxProps}
            />
          ) : activeItem === "produkte" ? (
            <ProduktStudio key={`${record.slug}-produkte`} erlebnis={record} />
          ) : (
            <div className="flex min-h-[200px] items-center justify-center px-4 py-10">
              <p className="max-w-md text-center text-[15px] leading-relaxed text-[var(--mwg-ink-70)]">
                {PLACEHOLDER_TEXT[activeItem]}
              </p>
            </div>
          )}

          <WorkflowNavigation activeId={activeItem} onNavigate={navigateTo} />
        </section>
      </div>

      <UnsavedChangesDialog
        open={showUnsavedDialog}
        onSave={handleUnsavedSave}
        onDiscard={handleUnsavedDiscard}
        onCancel={handleUnsavedCancel}
      />
    </div>
  );
}
