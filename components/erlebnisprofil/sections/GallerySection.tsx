"use client";

import { useState, type ReactNode } from "react";
import type { ErlebnisprofilGalleryImage } from "@/components/admin/products/erlebnisprofilProduct";
import { ErlebnisprofilSectionHeading } from "@/components/erlebnisprofil/ErlebnisprofilSectionHeading";
import { GalleryLightbox } from "@/components/erlebnisprofil/GalleryLightbox";

interface GallerySectionProps {
  gallery: ErlebnisprofilGalleryImage[];
  headingMeta?: ReactNode;
}

export function GallerySection({ gallery, headingMeta }: GallerySectionProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (gallery.length === 0) return null;

  return (
    <>
      <section className="mt-16">
        <ErlebnisprofilSectionHeading
          eyebrow="Impressionen"
          title="Bilder vom Erlebnis"
          meta={headingMeta}
        />
        <div className="mt-6 flex gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {gallery.map((bild, index) => (
            <button
              key={bild.src + bild.titel}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative h-[240px] w-[360px] shrink-0 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-[280px] sm:w-[420px]"
              aria-label={`${bild.titel} vergrößern`}
              data-lightbox-index={index}
              data-lightbox-ready="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bild.src}
                alt={bild.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-4 text-left text-[13px] font-medium text-white">
                {bild.titel}
              </span>
            </button>
          ))}
        </div>
      </section>

      {lightboxIndex !== null ? (
        <GalleryLightbox
          images={gallery}
          activeIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      ) : null}
    </>
  );
}
