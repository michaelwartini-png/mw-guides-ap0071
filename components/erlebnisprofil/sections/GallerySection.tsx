"use client";

import { useState, type ReactNode } from "react";
import type { ErlebnisprofilGalleryImage } from "@/components/admin/products/erlebnisprofilProduct";
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
      <section className="mx-auto mt-12 max-w-[1240px] px-6 lg:mt-16 lg:px-10">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">{headingMeta}</div>
        <h2 className="font-display text-[22px] font-medium">Impressionen</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((bild, index) => (
            <button
              key={bild.src + bild.titel}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`${bild.titel} vergrößern`}
              data-lightbox-index={index}
              data-lightbox-ready="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bild.src}
                alt={bild.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
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
