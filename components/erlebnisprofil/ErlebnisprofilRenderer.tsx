import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilBreadcrumbs } from "@/components/erlebnisprofil/ErlebnisprofilBreadcrumbs";
import type {
  ErlebnisprofilRenderMode,
  ErlebnisprofilRendererSlots,
  ErlebnisprofilWebsiteOptions,
} from "@/components/erlebnisprofil/types";
import { GallerySection } from "@/components/erlebnisprofil/sections/GallerySection";
import { HeroSection } from "@/components/erlebnisprofil/sections/HeroSection";
import { MWGuidesTipsSection } from "@/components/erlebnisprofil/sections/MWGuidesTipsSection";
import { OverviewSection } from "@/components/erlebnisprofil/sections/OverviewSection";
import { ScoreBarSection } from "@/components/erlebnisprofil/sections/ScoreBarSection";

interface ErlebnisprofilRendererProps {
  product: ErlebnisprofilProduct;
  /** Website: product sections only. Admin: optional chrome via slots. */
  mode?: ErlebnisprofilRenderMode;
  slots?: ErlebnisprofilRendererSlots;
  /** Website-only options (breadcrumbs, ride guide link). Ignored in admin mode. */
  website?: ErlebnisprofilWebsiteOptions;
}

export function ErlebnisprofilRenderer({
  product,
  mode = "website",
  slots,
  website,
}: ErlebnisprofilRendererProps) {
  const isWebsite = mode === "website";
  const adminSlots = isWebsite ? undefined : slots;
  const sectionMeta = adminSlots?.sectionHeadingMeta;
  const rideGuide = isWebsite ? website?.rideGuide : undefined;

  return (
    <>
      {isWebsite && website?.breadcrumbs?.length ? (
        <ErlebnisprofilBreadcrumbs items={website.breadcrumbs} />
      ) : null}

      <HeroSection
        product={product}
        mode={mode}
        rideGuide={rideGuide}
        introVideoLabel={isWebsite ? website?.introVideoLabel : undefined}
        lead={adminSlots?.heroLead}
        aside={adminSlots?.heroAside}
      />

      <ScoreBarSection
        mwgScore={product.mwgScore}
        scoreCategories={product.scoreCategories}
        reviews={product.reviews}
        mapInfo={product.mapInfo}
        rideGuide={rideGuide}
      />

      <OverviewSection
        product={product}
        collapsible={isWebsite}
        mapEnhancement={isWebsite ? website?.mapEnhancement : undefined}
        headingMeta={
          sectionMeta
            ? {
                description: sectionMeta("description"),
                map: sectionMeta("map"),
                official: sectionMeta("official"),
                practical: sectionMeta("practical"),
              }
            : undefined
        }
      />

      <div className="mx-auto max-w-[1240px] px-6 pb-12 lg:px-10 lg:pb-16">
        <MWGuidesTipsSection tipps={product.tipps} headingMeta={sectionMeta?.("tipps")} />
      </div>

      <GallerySection gallery={product.gallery} headingMeta={sectionMeta?.("gallery")} />
    </>
  );
}

export type {
  ErlebnisprofilRenderMode,
  ErlebnisprofilRendererSlots,
  ErlebnisprofilSectionId,
  ErlebnisprofilWebsiteOptions,
} from "@/components/erlebnisprofil/types";
