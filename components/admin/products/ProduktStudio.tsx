"use client";

import { useCallback, useMemo, useState } from "react";
import { AdminSecondaryButton } from "@/components/admin/adminButtons";
import { ProductHerkunftOverview } from "@/components/admin/EditorRedakteurPanel";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import { ErlebnisprofilProductView } from "@/components/admin/products/ErlebnisprofilProductView";
import {
  generateErlebnisprofilBundle,
  getErlebnisprofilCompleteness,
} from "@/components/admin/products/erlebnisprofilProduct";
import { PRODUCT_REGISTRY } from "@/components/admin/products/productRegistry";
import type { ProductId } from "@/components/admin/products/productTypes";
import { cn } from "@/lib/cn";
import { RefreshCw, Sparkles } from "lucide-react";

interface ProduktStudioProps {
  erlebnis: ErlebnisRecord;
}

export function ProduktStudio({ erlebnis }: ProduktStudioProps) {
  const [selectedProductId, setSelectedProductId] = useState<ProductId>("erlebnisprofil");
  const [generatedAt, setGeneratedAt] = useState<number>(() => Date.now());
  const [isRegenerating, setIsRegenerating] = useState(false);

  const erlebnisprofilCompleteness = useMemo(
    () => getErlebnisprofilCompleteness(erlebnis),
    [erlebnis],
  );

  const erlebnisprofilBundle = useMemo(() => {
    void generatedAt;
    return generateErlebnisprofilBundle(erlebnis);
  }, [erlebnis, generatedAt]);

  const handleRegenerate = useCallback(() => {
    setIsRegenerating(true);
    setGeneratedAt(Date.now());
    window.setTimeout(() => setIsRegenerating(false), 400);
  }, []);

  return (
    <div className="space-y-5">
      {/* Studio chrome — product generator, not CMS editor */}
      <div className="rounded-xl border border-accent/20 bg-gradient-to-r from-accent/8 via-[var(--mwg-paper-raised)] to-[var(--mwg-paper-raised)] px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              <Sparkles size={12} />
              Produktgenerator · MW Guides Studio
            </p>
            <h3 className="mt-2 font-display text-[20px] font-medium text-ink">
              Aus Erlebnisbaustein wird Produkt
            </h3>
            <p className="mt-1 max-w-2xl text-[14px] leading-relaxed text-[var(--mwg-ink-70)]">
              Links pflegst du den Master. Hier entsteht daraus automatisch das{" "}
              <span className="font-medium text-ink">Erlebnisprofil</span> — veröffentlichungsreif,
              ohne doppelte Datenpflege. Nach Speichern im Erlebnisbaustein erscheint das Ergebnis
              hier.
            </p>
          </div>
          <AdminSecondaryButton
            onClick={handleRegenerate}
            className={cn(isRegenerating && "opacity-70")}
          >
            <RefreshCw size={15} className={cn(isRegenerating && "animate-spin")} />
            Neu erzeugen
          </AdminSecondaryButton>
        </div>
      </div>

      {/* Compact product selector */}
      <div className="flex flex-wrap gap-2">
        {PRODUCT_REGISTRY.map((product) => {
          const isAvailable = product.availability === "available";
          const isSelected = selectedProductId === product.id;

          return (
            <button
              key={product.id}
              type="button"
              disabled={!isAvailable}
              onClick={() => isAvailable && setSelectedProductId(product.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-medium transition-colors",
                isAvailable
                  ? isSelected
                    ? "border-accent bg-accent text-white"
                    : "border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] text-[var(--mwg-ink-70)] hover:border-accent/30"
                  : "cursor-not-allowed border-[var(--mwg-line)] bg-stone/5 text-stone opacity-60",
              )}
            >
              <span aria-hidden="true">{isAvailable ? "✅" : "⏳"}</span>
              {product.label}
              {!isAvailable && product.roadmapNote ? (
                <span className="text-[11px] opacity-80">{product.roadmapNote}</span>
              ) : null}
              {isAvailable && product.id === "erlebnisprofil" ? (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-[10px]",
                    isSelected ? "bg-white/20" : "bg-accent/10 text-accent",
                  )}
                >
                  {erlebnisprofilCompleteness.percent}%
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {selectedProductId === "erlebnisprofil" ? (
        <div className="space-y-4">
          <ProductHerkunftOverview />
          <ErlebnisprofilProductView bundle={erlebnisprofilBundle} />
        </div>
      ) : null}
    </div>
  );
}
