import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import type { ErlebnisprofilRendererSlots } from "@/components/erlebnisprofil/types";
import { DescriptionSection } from "@/components/erlebnisprofil/sections/DescriptionSection";
import { GallerySection } from "@/components/erlebnisprofil/sections/GallerySection";
import { HeroSection } from "@/components/erlebnisprofil/sections/HeroSection";
import { HighlightsSection } from "@/components/erlebnisprofil/sections/HighlightsSection";
import { MWGuidesTipsSection } from "@/components/erlebnisprofil/sections/MWGuidesTipsSection";
import { OperatorSection } from "@/components/erlebnisprofil/sections/OperatorSection";
import { PracticalInfoSection } from "@/components/erlebnisprofil/sections/PracticalInfoSection";
import { ReviewsSection } from "@/components/erlebnisprofil/sections/ReviewsSection";
import { StatsStripSection } from "@/components/erlebnisprofil/sections/StatsStripSection";

interface ErlebnisprofilRendererProps {
  product: ErlebnisprofilProduct;
  slots?: ErlebnisprofilRendererSlots;
}

export function ErlebnisprofilRenderer({ product, slots }: ErlebnisprofilRendererProps) {
  const sectionMeta = slots?.sectionHeadingMeta;

  return (
    <>
      <HeroSection product={product} lead={slots?.heroLead} aside={slots?.heroAside} />
      <StatsStripSection stats={product.stats} />

      <div className="mx-auto max-w-[1240px] px-6 py-12 lg:px-10 lg:py-16">
        <DescriptionSection
          description={product.description}
          scoreBegruendung={product.scoreBegruendung}
          headingMeta={sectionMeta?.("description")}
        />

        <HighlightsSection
          features={product.features}
          className={product.description ? "mt-16" : undefined}
          headingMeta={sectionMeta?.("highlights")}
        />

        <MWGuidesTipsSection tipps={product.tipps} headingMeta={sectionMeta?.("tipps")} />

        <GallerySection gallery={product.gallery} headingMeta={sectionMeta?.("gallery")} />

        <ReviewsSection
          mwgScore={product.mwgScore}
          reviews={product.reviews}
          headingMeta={sectionMeta?.("reviews")}
        />

        <PracticalInfoSection
          practicalInfo={product.practicalInfo}
          headingMeta={sectionMeta?.("practical")}
        />

        <OperatorSection
          operator={product.operator}
          standort={product.standort}
          headingMeta={sectionMeta?.("operator")}
        />
      </div>
    </>
  );
}

export type { ErlebnisprofilRendererSlots, ErlebnisprofilSectionId } from "@/components/erlebnisprofil/types";
