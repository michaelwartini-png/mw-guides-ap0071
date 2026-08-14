"use client";

import { useEffect, useState } from "react";
import { getExplorerReviewByTripSlug } from "@/content/explorerReview";
import { getPremiumPreview } from "@/content/reisebegleiter";
import { PremiumPreviewDialog } from "@/components/trip-explorer/reisebegleiter/PremiumPreviewDialog";
import { MeineReiseAufgaben } from "@/components/meine-reise/MeineReiseAufgaben";
import { MeineReiseHero } from "@/components/meine-reise/MeineReiseHero";
import { MeineReiseNachDerReise } from "@/components/meine-reise/MeineReiseNachDerReise";
import { MeineReiseNav } from "@/components/meine-reise/MeineReiseNav";
import { MeineReisePlan } from "@/components/meine-reise/MeineReisePlan";
import { MeineReiseUeberblick } from "@/components/meine-reise/MeineReiseUeberblick";
import { MeineReiseUnterlagen } from "@/components/meine-reise/MeineReiseUnterlagen";
import { MeineReiseWetter } from "@/components/meine-reise/MeineReiseWetter";
import type { MeineReiseDashboard as MeineReiseDashboardData, MeineReiseNavId } from "@/types/meineReise";

interface MeineReiseDashboardProps {
  dashboard: MeineReiseDashboardData;
}

/** AP-MR001 — Meine Reise V1 shell. Structure matches the approved mockup. */
export function MeineReiseDashboard({ dashboard }: MeineReiseDashboardProps) {
  const [activeId, setActiveId] = useState<MeineReiseNavId>("uebersicht");
  const [benefitsOpen, setBenefitsOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const review = getExplorerReviewByTripSlug(dashboard.tripSlug);
  const preview = getPremiumPreview(dashboard.tripTitle, review?.tip ?? "");

  useEffect(() => {
    const sync = () => {
      const id = window.location.hash.replace("#", "") as MeineReiseNavId;
      if (dashboard.nav.some((item) => item.id === id)) {
        setActiveId(id);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [dashboard.nav]);

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-8 lg:flex-row lg:items-start lg:gap-10 lg:px-10 lg:py-10">
      <MeineReiseNav dashboard={dashboard} activeId={activeId} />

      <div className="min-w-0 flex-1">
        <MeineReiseHero
          dashboard={dashboard}
          benefitsOpen={benefitsOpen}
          onToggleBenefits={() => setBenefitsOpen((open) => !open)}
          onOpenGuide={() => setGuideOpen(true)}
        />

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(220px,0.72fr)_minmax(420px,1.65fr)_minmax(240px,0.78fr)] lg:[grid-template-areas:'aufgaben_plan_aside'_'map_map_aside']">
          <div className="h-full lg:[grid-area:aufgaben]">
            <MeineReiseAufgaben dashboard={dashboard} />
          </div>
          <div className="h-full lg:[grid-area:plan]">
            <MeineReisePlan dashboard={dashboard} />
          </div>
          <div className="flex flex-col gap-6 lg:[grid-area:aside]">
            <MeineReiseWetter dashboard={dashboard} />
            <MeineReiseNachDerReise />
            <MeineReiseUnterlagen dashboard={dashboard} onOpenGuide={() => setGuideOpen(true)} />
          </div>
          <div className="lg:[grid-area:map]">
            <MeineReiseUeberblick dashboard={dashboard} />
          </div>
        </div>

        <p id="packliste" className="sr-only">
          Packliste
        </p>
        <p id="kalender" className="sr-only">
          Kalender
        </p>
      </div>

      {review ? (
        <PremiumPreviewDialog
          open={guideOpen}
          onClose={() => setGuideOpen(false)}
          preview={preview}
          review={review}
          heroImage={dashboard.heroImage}
          heroImageAlt={dashboard.heroImageAlt}
        />
      ) : null}
    </div>
  );
}
