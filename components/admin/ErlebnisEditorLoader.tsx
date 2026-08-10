"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { AnalyseWorkspace } from "@/components/admin/AnalyseWorkspace";
import { loadErlebnisRecord } from "@/components/admin/erlebnisRecordStore";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";

interface ErlebnisEditorLoaderProps {
  slug: string;
}

export function ErlebnisEditorLoader({ slug }: ErlebnisEditorLoaderProps) {
  const [erlebnis, setErlebnis] = useState<ErlebnisRecord | null | undefined>(undefined);

  useEffect(() => {
    setErlebnis(loadErlebnisRecord(slug) ?? null);
  }, [slug]);

  if (erlebnis === undefined) {
    return <div className="text-[15px] text-[var(--mwg-ink-70)]">Laden…</div>;
  }

  if (!erlebnis) {
    notFound();
  }

  return <AnalyseWorkspace key={erlebnis.slug} erlebnis={erlebnis} />;
}
