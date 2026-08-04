import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ErlebnisdetailBreadcrumbsProps {
  tripSlug: string;
  weltTitle: string;
  erlebnisTitle: string;
}

export function ErlebnisdetailBreadcrumbs({
  tripSlug,
  weltTitle,
  erlebnisTitle,
}: ErlebnisdetailBreadcrumbsProps) {
  const explorerHref = `/explore-trips/${tripSlug}/explorer`;

  return (
    <nav aria-label="Brotkrumen" className="border-b border-[var(--mwg-line)] bg-[var(--mwg-paper-raised)]">
      <ol className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-1 px-6 py-3 text-[13px] lg:px-10">
        <li>
          <Link href={explorerHref} className="text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]">
            Explorer
          </Link>
        </li>
        <ChevronRight size={14} className="text-[var(--mwg-ink-45)]" aria-hidden="true" />
        <li>
          <Link href={explorerHref} className="text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]">
            Erlebniswelten
          </Link>
        </li>
        <ChevronRight size={14} className="text-[var(--mwg-ink-45)]" aria-hidden="true" />
        <li>
          <Link href={explorerHref} className="text-[var(--mwg-ink-70)] hover:text-[var(--mwg-ink)]">
            {weltTitle}
          </Link>
        </li>
        <ChevronRight size={14} className="text-[var(--mwg-ink-45)]" aria-hidden="true" />
        <li className="font-medium text-[var(--mwg-ink)]">{erlebnisTitle}</li>
      </ol>
    </nav>
  );
}
