import { notFound } from "next/navigation";
import { AnalyseWorkspace } from "@/components/admin/AnalyseWorkspace";
import { getErlebnisBySlug } from "@/components/admin/erlebnisData";

interface ErlebnisPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ErlebnisPage({ params }: ErlebnisPageProps) {
  const { slug } = await params;
  const erlebnis = getErlebnisBySlug(slug);

  if (!erlebnis) {
    notFound();
  }

  return <AnalyseWorkspace erlebnis={erlebnis} />;
}
