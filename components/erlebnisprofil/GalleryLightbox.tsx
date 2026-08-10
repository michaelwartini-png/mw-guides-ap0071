import { X } from "lucide-react";
import type { ErlebnisprofilGalleryImage } from "@/components/admin/products/erlebnisprofilProduct";

interface GalleryLightboxProps {
  images: ErlebnisprofilGalleryImage[];
  activeIndex: number;
  onClose: () => void;
}

export function GalleryLightbox({ images, activeIndex, onClose }: GalleryLightboxProps) {
  const image = images[activeIndex];
  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Galerie-Vorschau"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
        aria-label="Schließen"
      >
        <X size={20} />
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
        onClick={(event) => event.stopPropagation()}
        data-lightbox-index={activeIndex}
      />
    </div>
  );
}
