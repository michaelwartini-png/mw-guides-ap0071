"use client";

import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { AnalyseWorkspace } from "@/components/admin/AnalyseWorkspace";
import { getErlebnisBySlug, type ErlebnisRecord } from "@/components/admin/erlebnisData";
import { getSessionErlebnisBySlug } from "@/components/admin/erlebnisSessionStore";

interface ErlebnisEditorLoaderProps {
  slug: string;
}

export function ErlebnisEditorLoader({ slug }: ErlebnisEditorLoaderProps) {
  const [erlebnis, setErlebnis] = useState<ErlebnisRecord | null | undefined>(undefined);

  useEffect(() => {
    setErlebnis(getErlebnisBySlug(slug) ?? getSessionErlebnisBySlug(slug) ?? null);
  }, [slug]);

  if (erlebnis === undefined) {
    return <div className="text-[15px] text-[var(--mwg-ink-70)]">Laden…</div>;
  }

  if (!erlebnis) {
    notFound();
  }

  return <AnalyseWorkspace key={erlebnis.slug} erlebnis={erlebnis} />;
}
