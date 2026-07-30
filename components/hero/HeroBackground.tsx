import Image from "next/image";
import heroPhoto from "@/public/images/hero/homepage-hero.jpg";

interface HeroBackgroundProps {
  /**
   * Future video/cinemagraph source. When provided, a looping muted <video>
   * is rendered in place of the photo — no other markup needs to change.
   */
  videoSrc?: string;
}

/**
 * Fullscreen hero backdrop. AP-002.1: replaced the AP-002.0 placeholder
 * SVG with the real Schwebebahn photo now available — static import gives
 * Next.js the image's real dimensions up front, so no layout shift occurs
 * while it loads. `priority` is set because this is always above the
 * fold. A dark gradient keeps the hero headline legible over the photo.
 */
export function HeroBackground({ videoSrc }: HeroBackgroundProps) {
  if (videoSrc) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
    );
  }

  return (
    <>
      <Image
        src={heroPhoto}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70"
        aria-hidden="true"
      />
    </>
  );
}
