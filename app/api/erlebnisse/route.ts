import { NextResponse } from "next/server";
import { buildNewErlebnisRecord } from "@/components/admin/erlebnisSessionStore";
import { allocateUniqueSlug, listErlebnisRecords, writeErlebnisRecord } from "@/lib/erlebnisStore";

export async function GET() {
  const records = await listErlebnisRecords();
  return NextResponse.json({ records });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { name?: string };
  const name = body.name?.trim();

  if (!name) {
    return NextResponse.json({ error: "Name ist erforderlich." }, { status: 400 });
  }

  const slug = await allocateUniqueSlug(name);
  const record = buildNewErlebnisRecord({ name, slug });
  const saved = await writeErlebnisRecord(record);

  return NextResponse.json({ record: saved }, { status: 201 });
}
