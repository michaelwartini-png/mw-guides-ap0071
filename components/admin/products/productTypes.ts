import type { ErlebnisRecord } from "@/components/admin/erlebnisData";

export type ProductId =
  | "erlebnisprofil"
  | "ride-guide"
  | "kostenloser-guide"
  | "premium-guide"
  | "explore-trip"
  | "social-media";

export type ProductAvailability = "available" | "roadmap";

export type ProductDefinition = {
  id: ProductId;
  label: string;
  icon: string;
  availability: ProductAvailability;
  roadmapNote?: string;
};

export type CompletenessItem = {
  id: string;
  label: string;
  ok: boolean;
  source?: string;
};

export type ProductCompleteness = {
  filled: number;
  total: number;
  percent: number;
  items: CompletenessItem[];
};

export type ProductGenerationMeta = {
  productId: ProductId;
  sourceSlug: string;
  generatedAt: string;
  masterVersionLabel: string;
};

export type ProductGenerator<TProduct> = {
  id: ProductId;
  generate: (erlebnis: ErlebnisRecord) => TProduct;
  getCompleteness: (erlebnis: ErlebnisRecord) => ProductCompleteness;
  canGenerate: (erlebnis: ErlebnisRecord) => boolean;
};

export type GeneratedProductBundle<TProduct> = {
  meta: ProductGenerationMeta;
  product: TProduct;
  completeness: ProductCompleteness;
};
