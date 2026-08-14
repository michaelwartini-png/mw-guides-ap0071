import { NextResponse } from "next/server";
import { buildDuplicateErlebnisRecord } from "@/components/admin/erlebnisSessionStore";
import {
  allocateDuplicateSlug,
  readErlebnisRecord,
  writeErlebnisRecord,
} from "@/lib/erlebnisStore";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function POST(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const source = await readErlebnisRecord(slug);

  if (!source) {
    return NextResponse.json({ error: "Erlebnis nicht gefunden." }, { status: 404 });
  }

  const duplicateSlug = await allocateDuplicateSlug(slug);
  const duplicate = buildDuplicateErlebnisRecord(source, duplicateSlug);
  const saved = await writeErlebnisRecord(duplicate);

  return NextResponse.json({ record: saved }, { status: 201 });
}
