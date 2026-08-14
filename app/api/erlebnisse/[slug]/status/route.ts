import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { canGenerateErlebnisprofil } from "@/components/admin/products/erlebnisprofilProduct";
import { PUBLICATION_STATUSES, type PublicationStatus } from "@/lib/erlebnisPublication";
import { readErlebnisRecord, setErlebnisPublicationStatus } from "@/lib/erlebnisStore";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

function revalidateErlebnisPaths(slug: string) {
  revalidatePath(`/erlebnisse/${slug}`);
  revalidatePath("/erlebnisse");
  revalidatePath(`/explore-trips/bodensee/explorer/erlebnis/${slug}`);
  revalidatePath("/explore-trips/bodensee/explorer/erlebnis");
}

export async function PATCH(request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const body = (await request.json()) as { status?: string };

  if (!body.status || !PUBLICATION_STATUSES.includes(body.status as PublicationStatus)) {
    return NextResponse.json({ error: "Ungültiger Status." }, { status: 400 });
  }

  const status = body.status as PublicationStatus;

  if (status === "Veröffentlicht") {
    const existing = await readErlebnisRecord(slug);
    if (!existing) {
      return NextResponse.json({ error: "Erlebnis nicht gefunden." }, { status: 404 });
    }
    if (!canGenerateErlebnisprofil(existing)) {
      return NextResponse.json(
        { error: "Erlebnisprofil ist noch nicht vollständig genug (min. 70 %)." },
        { status: 422 },
      );
    }
  }

  const record = await setErlebnisPublicationStatus(slug, status);
  if (!record) {
    return NextResponse.json({ error: "Erlebnis nicht gefunden." }, { status: 404 });
  }

  if (status === "Veröffentlicht") {
    revalidateErlebnisPaths(slug);
  }

  return NextResponse.json({ record });
}

/** Convenience alias: publish = set status to Veröffentlicht. */
export async function POST(request: Request, context: RouteContext) {
  const patched = new Request(request.url, {
    method: "PATCH",
    headers: request.headers,
    body: JSON.stringify({ status: "Veröffentlicht" }),
  });
  return PATCH(patched, context);
}
