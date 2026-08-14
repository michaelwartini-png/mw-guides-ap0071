import Image from "next/image";
import Link from "next/link";

export interface ErlebnisbausteinCardData {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category?: string;
  href: string;
}

interface ErlebnisbausteinCardProps {
  item: ErlebnisbausteinCardData;
}

/** AP-ET002 — Erlebnisbaustein preview: image, title, description, optional category. */
export function ErlebnisbausteinCard({ item }: ErlebnisbausteinCardProps) {
  return (
    <Link
      href={item.href}
      className="group flex w-[250px] flex-col overflow-hidden rounded-2xl border border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)] transition-all duration-300 hover:border-[var(--mwg-line)] hover:shadow-[0_20px_44px_-14px_rgba(26,26,24,0.18)] motion-safe:hover:-translate-y-0.5 sm:w-[270px]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={item.image}
          alt={item.imageAlt}
          fill
          sizes="270px"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.05]"
        />
      </div>
      <div className="flex flex-1 flex-col px-5 py-5">
        {item.category && (
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--mwg-ink-70)]">
            {item.category}
          </p>
        )}
        <h3 className="font-display text-[18px] font-medium leading-snug">{item.title}</h3>
        {item.description && (
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--mwg-ink-70)]">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
}
