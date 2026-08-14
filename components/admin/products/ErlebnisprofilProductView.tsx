"use client";

import { ProductSourceLabel } from "@/components/admin/EditorRedakteurPanel";
import {
  ErlebnisprofilHeroAdminLead,
  ProductStatusCard,
} from "@/components/admin/products/ErlebnisprofilAdminChrome";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import type { GeneratedProductBundle } from "@/components/admin/products/productTypes";
import {
  ErlebnisprofilRenderer,
  type ErlebnisprofilRendererSlots,
  type ErlebnisprofilSectionId,
} from "@/components/erlebnisprofil/ErlebnisprofilRenderer";

interface ErlebnisprofilProductViewProps {
  bundle: GeneratedProductBundle<ErlebnisprofilProduct>;
}

const SECTION_SOURCES: Record<ErlebnisprofilSectionId, string> = {
  description: "Bewertungen & Highlights",
  highlights: "Highlights",
  tipps: "MW Guides Tipps",
  map: "Offizielle Informationen",
  official: "Offizielle Informationen",
  gallery: "Galerie",
  reviews: "Bewertungen",
  practical: "Offizielle Informationen",
  operator: "Offizielle Informationen",
};

function buildAdminSlots(
  bundle: GeneratedProductBundle<ErlebnisprofilProduct>,
): ErlebnisprofilRendererSlots {
  const { meta, completeness } = bundle;

  return {
    heroLead: <ErlebnisprofilHeroAdminLead />,
    heroAside: (
      <ProductStatusCard
        completeness={completeness}
        generatedAt={meta.generatedAt}
        masterVersionLabel={meta.masterVersionLabel}
      />
    ),
    sectionHeadingMeta: (section) => (
      <ProductSourceLabel source={SECTION_SOURCES[section]} />
    ),
  };
}

export function ErlebnisprofilProductView({ bundle }: ErlebnisprofilProductViewProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] shadow-[0_40px_80px_-40px_rgba(26,26,24,0.18)]">
      <ErlebnisprofilRenderer
        product={bundle.product}
        mode="admin"
        slots={buildAdminSlots(bundle)}
      />
    </div>
  );
}
