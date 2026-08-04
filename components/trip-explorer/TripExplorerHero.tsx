import Image from "next/image";

interface TripExplorerHeroProps {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
}

export function TripExplorerHero({ title, subtitle, image, imageAlt }: TripExplorerHeroProps) {
  return (
    <div className="relative flex min-h-[72vh] items-end overflow-hidden lg:min-h-[80vh]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        aria-hidden="true"
      />
      <div className="relative mx-auto w-full max-w-[1240px] px-6 pb-12 pt-32 lg:px-10 lg:pb-16">
        <span className="mwg-eyebrow text-white/60">Trip Explorer</span>
        <h1 className="mwg-display-hero mt-4 max-w-[12ch] text-white">{title}</h1>
        <p className="mt-5 max-w-[42ch] font-display text-[clamp(1.125rem,1rem+0.8vw,1.5rem)] italic leading-relaxed text-white/85">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
