import { Suspense } from "react";
import { ErlebnisDashboard } from "@/components/admin/ErlebnisDashboard";

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="text-[15px] text-[var(--mwg-ink-70)]">Laden…</div>}>
      <ErlebnisDashboard />
    </Suspense>
  );
}
