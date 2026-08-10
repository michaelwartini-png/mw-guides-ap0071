import { Sparkles } from "lucide-react";
import { ProductSourceLabel } from "@/components/admin/EditorRedakteurPanel";
import type { ProductCompleteness } from "@/components/admin/products/productTypes";

export function formatGeneratedAt(iso: string): string {
  const date = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} · ${pad(date.getHours())}:${pad(date.getMinutes())} Uhr`;
}

export function ErlebnisprofilHeroAdminLead() {
  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm">
        <Sparkles size={12} />
        Automatisch erzeugtes Erlebnisprofil
      </span>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        <ProductSourceLabel source="Allgemein" onDark />
        <ProductSourceLabel source="Galerie" onDark />
        <ProductSourceLabel source="Hero" onDark />
        <ProductSourceLabel source="Bewertungen" onDark />
      </div>
    </>
  );
}

export function ProductStatusCard({
  completeness,
  generatedAt,
  masterVersionLabel,
}: {
  completeness: ProductCompleteness;
  generatedAt: string;
  masterVersionLabel: string;
}) {
  const ready = completeness.percent >= 70;

  return (
    <div className="w-full rounded-2xl border border-white/20 bg-[var(--mwg-ink)]/90 p-5 text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-md sm:min-w-[280px] sm:max-w-[320px]">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
        Automatisch erzeugt
      </p>
      <div className="mt-4 space-y-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/50">Produktstatus</p>
          <p className="mt-0.5 text-[15px] font-medium">
            {ready ? "Bereit zur Veröffentlichung" : "Master unvollständig"}
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/50">Generierbarkeit</p>
          <p className="mt-0.5 font-display text-[28px] font-medium leading-none">
            {completeness.percent}
            <span className="text-[16px] text-white/60">%</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-wider text-white/50">Masterdaten</p>
          <p className="mt-0.5 text-[14px]">{ready ? "Vollständig genug" : "Noch ergänzen"}</p>
        </div>
      </div>
      <p className="mt-4 border-t border-white/10 pt-3 font-mono text-[10px] leading-relaxed text-white/45">
        {formatGeneratedAt(generatedAt)}
        <br />
        Master {masterVersionLabel}
      </p>
    </div>
  );
}
