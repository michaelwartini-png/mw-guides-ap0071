import type { ReactNode } from "react";
import { Star } from "lucide-react";
import type { ErlebnisprofilProduct } from "@/components/admin/products/erlebnisprofilProduct";
import { parseRating } from "@/components/erlebnisprofil/utils";

interface HeroSectionProps {
  product: Pick<
    ErlebnisprofilProduct,
    "heroImage" | "heroImageAlt" | "badge" | "kategorie" | "regionen" | "title" | "subtitle" | "mwgScore"
  >;
  lead?: ReactNode;
  aside?: ReactNode;
}

export function HeroSection({ product, lead, aside }: HeroSectionProps) {
  const mwgScoreValue = parseRating(product.mwgScore);

  return (
    <section className="relative min-h-[460px] overflow-hidden lg:min-h-[520px]">
      {product.heroImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.heroImage}
          alt={product.heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-accent/30 via-accent/10 to-[var(--mwg-paper)]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25" />

      <div className="relative mx-auto flex max-w-[1240px] flex-col gap-8 px-6 py-10 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-14">
        <div className="max-w-[680px]">
          {lead}

          <div className="mt-5 flex flex-wrap items-center gap-2">
            {product.badge ? (
              <span className="rounded-full bg-amber-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--mwg-ink)]">
                {product.badge}
              </span>
            ) : null}
            {product.kategorie ? (
              <span className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/85">
                {product.kategorie}
              </span>
            ) : null}
            {product.regionen.map((region) => (
              <span
                key={region}
                className="rounded-full border border-white/25 px-3 py-1 text-[11px] text-white/85"
              >
                {region}
              </span>
            ))}
          </div>

          <h1 className="mwg-display-lg mt-5 text-white">{product.title}</h1>
          <p className="mt-4 max-w-[52ch] text-[17px] leading-relaxed text-white/88">
            {product.subtitle}
          </p>

          {product.mwgScore ? (
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <span className="font-display text-[24px] font-medium leading-none text-white">
                {product.mwgScore.replace(".", ",")}
              </span>
              <span className="text-[13px] text-white/70">MW Guides Score</span>
              {mwgScoreValue !== null ? (
                <div className="ml-1 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                      strokeWidth={0}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        {aside}
      </div>
    </section>
  );
}
