"use client";

import { useState } from "react";
import type { TripExplorer } from "@/types/tripExplorer";
import type { ExploreTripLandingUsp } from "@/types/exploreTrip";
import { getHighlightsByErlebniswelt, getHighlightsByTripSlug } from "@/content/explorerHighlights";
import { ExplorerPageHeader } from "@/components/trip-explorer/workspace/ExplorerPageHeader";
import { ErlebnisweltSidebar } from "@/components/trip-explorer/workspace/ErlebnisweltSidebar";
import { HighlightGrid } from "@/components/trip-explorer/workspace/HighlightGrid";
import { MeineReiseSidebar } from "@/components/trip-explorer/workspace/MeineReiseSidebar";
import { USPBar } from "@/components/explore-trips/landing/USPBar";

interface TripExplorerWorkspaceProps {
  explorer: TripExplorer;
  /** Subset of Erlebniswelten shown in sidebar (matches Ebene 1). */
  workspaceWeltenSlugs: string[];
  uspBar?: ExploreTripLandingUsp[];
}

/** AP-011 — Three-column Trip Explorer workspace (mockup 1). */
export function TripExplorerWorkspace({
  explorer,
  workspaceWeltenSlugs,
  uspBar,
}: TripExplorerWorkspaceProps) {
  const welten = explorer.erlebniswelten.filter((w) => workspaceWeltenSlugs.includes(w.slug));
  const defaultWelt = welten.find((w) => w.slug === "mobilitaet")?.slug ?? welten[0]?.slug ?? "";
  const [selectedWelt, setSelectedWelt] = useState(defaultWelt);

  const highlights = getHighlightsByErlebniswelt(explorer.tripSlug, selectedWelt);
  const totalHighlights = getHighlightsByTripSlug(explorer.tripSlug).length;
  const selectedWeltData = welten.find((w) => w.slug === selectedWelt);
  const weltTitle = selectedWeltData?.explorerTitle ?? selectedWeltData?.title ?? "";

  return (
    <>
      <ExplorerPageHeader tripSlug={explorer.tripSlug} />

      <div className="mx-auto max-w-[1400px] px-6 py-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(240px,22%)_1fr_minmax(280px,26%)] lg:gap-6 xl:gap-8">
          <ErlebnisweltSidebar
            welten={welten}
            selectedSlug={selectedWelt}
            onSelect={setSelectedWelt}
          />
          <HighlightGrid
            highlights={highlights}
            tripSlug={explorer.tripSlug}
            weltTitle={weltTitle}
          />
          <MeineReiseSidebar totalHighlights={totalHighlights} />
        </div>
      </div>

      {uspBar && uspBar.length > 0 && (
        <section className="border-t border-[var(--mwg-line)] bg-[var(--mwg-paper)] pb-8 pt-4">
          <USPBar items={uspBar} embedded />
        </section>
      )}
    </>
  );
}
