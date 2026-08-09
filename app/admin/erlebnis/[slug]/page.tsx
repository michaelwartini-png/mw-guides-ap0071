import { ErlebnisEditorLoader } from "@/components/admin/ErlebnisEditorLoader";

interface ErlebnisPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ErlebnisPage({ params }: ErlebnisPageProps) {
  const { slug } = await params;

  return <ErlebnisEditorLoader slug={slug} />;
}
