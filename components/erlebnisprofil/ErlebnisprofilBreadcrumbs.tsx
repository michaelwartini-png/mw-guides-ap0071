import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type ErlebnisprofilBreadcrumbItem = {
  label: string;
  href?: string;
};

interface ErlebnisprofilBreadcrumbsProps {
  items: ErlebnisprofilBreadcrumbItem[];
}

export function ErlebnisprofilBreadcrumbs({ items }: ErlebnisprofilBreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Brotkrumen" className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <ol className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-1 px-6 py-3 text-[13px] lg:px-10">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight size={14} className="text-[var(--mwg-ink-45)]" aria-hidden="true" />
              ) : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "font-medium text-[var(--mwg-ink)]" : "text-[var(--mwg-ink-70)]"}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
