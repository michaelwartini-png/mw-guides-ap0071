import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/ui/Reveal";

interface EditorialBlockProps {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  image: StaticImageData | string;
  imageAlt: string;
  /** Alternates the image to the opposite side for editorial rhythm down the page. */
  imagePosition?: "left" | "right";
}

/**
 * One image, one story, generous whitespace — shared building block used
 * by both the About page and Reiseideen articles. Paragraph width is
 * capped at roughly 70 characters per line, per the brief's "maximal 70
 * Zeichen Zeilenbreite".
 */
export function EditorialBlock({
  eyebrow,
  heading,
  paragraphs,
  image,
  imageAlt,
  imagePosition = "left",
}: EditorialBlockProps) {
  const imageFirst = imagePosition === "left";

  return (
    <section className="mx-auto max-w-[1240px] px-6 py-24 lg:px-10 lg:py-36">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal
          className={`lg:col-span-5 ${imageFirst ? "lg:order-1" : "lg:order-2"}`}
        >
          {typeof image === "string" ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-sm">
              <Image
                src={image}
                alt={imageAlt}
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="h-auto w-full"
              />
            </div>
          )}
        </Reveal>
        <Reveal
          delayMs={120}
          className={`lg:col-span-6 lg:self-center ${imageFirst ? "lg:order-2 lg:col-start-7" : "lg:order-1"}`}
        >
          <span className="mwg-eyebrow text-[var(--mwg-accent)]">{eyebrow}</span>
          <h2 className="mwg-display-xl mt-5 max-w-[16ch]">{heading}</h2>
          <div className="mt-7 space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="max-w-[68ch] text-[17px] leading-[1.75] text-[var(--mwg-ink-70)]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
