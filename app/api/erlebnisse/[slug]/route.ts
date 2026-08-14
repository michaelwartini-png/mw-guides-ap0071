import { NextResponse } from "next/server";
import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import { readErlebnisRecord, writeErlebnisRecord } from "@/lib/erlebnisStore";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const record = await readErlebnisRecord(slug);

  if (!record) {
    return NextResponse.json({ error: "Erlebnis nicht gefunden." }, { status: 404 });
  }

  return NextResponse.json({ record });
}

export async function PUT(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const body = (await request.json()) as { record?: ErlebnisRecord };

  if (!body.record || body.record.slug !== slug) {
    return NextResponse.json({ error: "Ungültiger Datensatz." }, { status: 400 });
  }

  const saved = await writeErlebnisRecord(body.record);
  return NextResponse.json({ record: saved });
}
