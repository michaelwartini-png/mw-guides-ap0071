import type { ErlebnisRecord } from "@/components/admin/erlebnisData";
import type { PublicationStatus } from "@/lib/erlebnisPublication";

async function parseJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T & { error?: string };
  if (!response.ok) {
    throw new Error(data.error ?? `Anfrage fehlgeschlagen (${response.status}).`);
  }
  return data;
}

export async function fetchAllErlebnisRecords(): Promise<ErlebnisRecord[]> {
  const data = await parseJson<{ records: ErlebnisRecord[] }>(
    await fetch("/api/erlebnisse", { cache: "no-store" }),
  );
  return data.records;
}

export async function fetchErlebnisRecord(slug: string): Promise<ErlebnisRecord | undefined> {
  const response = await fetch(`/api/erlebnisse/${encodeURIComponent(slug)}`, {
    cache: "no-store",
  });
  if (response.status === 404) return undefined;
  const data = await parseJson<{ record: ErlebnisRecord }>(response);
  return data.record;
}

export async function createErlebnisRecord(input: { name: string }): Promise<ErlebnisRecord> {
  const data = await parseJson<{ record: ErlebnisRecord }>(
    await fetch("/api/erlebnisse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    }),
  );
  return data.record;
}

export async function saveErlebnisRecord(record: ErlebnisRecord): Promise<ErlebnisRecord> {
  const data = await parseJson<{ record: ErlebnisRecord }>(
    await fetch(`/api/erlebnisse/${encodeURIComponent(record.slug)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ record }),
    }),
  );
  return data.record;
}

export async function setErlebnisPublicationStatus(
  slug: string,
  status: PublicationStatus,
): Promise<ErlebnisRecord> {
  const data = await parseJson<{ record: ErlebnisRecord }>(
    await fetch(`/api/erlebnisse/${encodeURIComponent(slug)}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }),
  );
  return data.record;
}

export async function publishErlebnis(slug: string): Promise<ErlebnisRecord> {
  const data = await parseJson<{ record: ErlebnisRecord }>(
    await fetch(`/api/erlebnisse/${encodeURIComponent(slug)}/status`, {
      method: "POST",
    }),
  );
  return data.record;
}

export async function duplicateErlebnisRecord(slug: string): Promise<ErlebnisRecord> {
  const data = await parseJson<{ record: ErlebnisRecord }>(
    await fetch(`/api/erlebnisse/${encodeURIComponent(slug)}/duplicate`, {
      method: "POST",
    }),
  );
  return data.record;
}
