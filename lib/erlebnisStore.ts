import { promises as fs } from "fs";
import path from "path";
import { ERLEBNIS_LIST, type ErlebnisRecord } from "@/components/admin/erlebnisData";
import {
  slugifyErlebnisName,
} from "@/components/admin/erlebnisSessionStore";
import {
  isPublishedStatus,
  normalizePublicationStatus,
  type PublicationStatus,
} from "@/lib/erlebnisPublication";

const DATA_DIR = path.join(process.cwd(), "data", "erlebnisse");

/** Slugs that ship as published when bootstrapping from legacy seeds. */
const BOOTSTRAP_PUBLISHED_SLUGS = new Set([
  "wuppertaler-schwebebahn",
  "katamaran-konstanz-friedrichshafen",
]);

function recordPath(slug: string): string {
  return path.join(DATA_DIR, `${slug}.json`);
}

function prepareSeedRecord(record: ErlebnisRecord): ErlebnisRecord {
  const next = structuredClone(record);
  const status = BOOTSTRAP_PUBLISHED_SLUGS.has(record.slug)
    ? "Veröffentlicht"
    : normalizePublicationStatus(record.profileStatus);

  next.profileStatus = status;
  next.allgemein = { ...next.allgemein, status };

  if (isPublishedStatus(status) && !next.publishedAt) {
    next.publishedAt = new Date().toISOString();
  }

  return next;
}

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function hasAnyRecords(): Promise<boolean> {
  try {
    const files = await fs.readdir(DATA_DIR);
    return files.some((file) => file.endsWith(".json"));
  } catch {
    return false;
  }
}

export async function bootstrapErlebnisStoreFromSeeds(): Promise<void> {
  await ensureDataDir();
  if (await hasAnyRecords()) return;

  for (const record of ERLEBNIS_LIST) {
    await writeErlebnisRecord(prepareSeedRecord(record));
  }
}

async function ensureBootstrapped(): Promise<void> {
  await bootstrapErlebnisStoreFromSeeds();
}

export async function listErlebnisRecords(): Promise<ErlebnisRecord[]> {
  await ensureBootstrapped();
  const files = await fs.readdir(DATA_DIR);
  const records: ErlebnisRecord[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const slug = file.replace(/\.json$/, "");
    const record = await readErlebnisRecord(slug);
    if (record) records.push(record);
  }

  return records.sort(
    (a, b) => new Date(b.lastModifiedAt).getTime() - new Date(a.lastModifiedAt).getTime(),
  );
}

export async function readErlebnisRecord(slug: string): Promise<ErlebnisRecord | undefined> {
  try {
    const raw = await fs.readFile(recordPath(slug), "utf8");
    const parsed = JSON.parse(raw) as ErlebnisRecord;
    if (!parsed?.slug) return undefined;

    parsed.profileStatus = normalizePublicationStatus(parsed.profileStatus);
    parsed.allgemein = {
      ...parsed.allgemein,
      status: normalizePublicationStatus(parsed.allgemein?.status ?? parsed.profileStatus),
    };

    return parsed;
  } catch {
    return undefined;
  }
}

export async function writeErlebnisRecord(record: ErlebnisRecord): Promise<ErlebnisRecord> {
  await ensureDataDir();

  const next: ErlebnisRecord = {
    ...record,
    profileStatus: normalizePublicationStatus(record.profileStatus),
    allgemein: {
      ...record.allgemein,
      status: normalizePublicationStatus(record.allgemein.status),
    },
  };

  await fs.writeFile(recordPath(next.slug), JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function deleteErlebnisRecord(slug: string): Promise<boolean> {
  try {
    await fs.unlink(recordPath(slug));
    return true;
  } catch {
    return false;
  }
}

export async function listPublishedErlebnisSlugs(): Promise<string[]> {
  const records = await listErlebnisRecords();
  return records.filter((record) => isPublishedStatus(record.profileStatus)).map((r) => r.slug);
}

export async function getPublishedErlebnisRecord(slug: string): Promise<ErlebnisRecord | undefined> {
  const record = await readErlebnisRecord(slug);
  if (!record || !isPublishedStatus(record.profileStatus)) return undefined;
  return record;
}

export async function setErlebnisPublicationStatus(
  slug: string,
  status: PublicationStatus,
): Promise<ErlebnisRecord | undefined> {
  const record = await readErlebnisRecord(slug);
  if (!record) return undefined;

  const now = new Date();
  const next: ErlebnisRecord = {
    ...record,
    profileStatus: status,
    allgemein: { ...record.allgemein, status },
    lastModifiedAt: now.toISOString(),
  };

  if (status === "Veröffentlicht") {
    next.publishedAt = record.publishedAt ?? now.toISOString();
  }

  return writeErlebnisRecord(next);
}

export async function slugExists(slug: string): Promise<boolean> {
  try {
    await fs.access(recordPath(slug));
    return true;
  } catch {
    return false;
  }
}

async function getExistingSlugs(): Promise<Set<string>> {
  const records = await listErlebnisRecords();
  return new Set(records.map((record) => record.slug));
}

export async function allocateUniqueSlug(baseName: string): Promise<string> {
  const existing = await getExistingSlugs();
  let slug = slugifyErlebnisName(baseName);

  if (!existing.has(slug)) return slug;

  let counter = 2;
  while (existing.has(`${slug}-${counter}`)) {
    counter += 1;
  }

  return `${slug}-${counter}`;
}

export async function allocateDuplicateSlug(sourceSlug: string): Promise<string> {
  const existing = await getExistingSlugs();
  const baseSlug = sourceSlug.replace(/-kopie(-\d+)?$/, "");
  let slug = `${baseSlug}-kopie`;

  if (!existing.has(slug)) return slug;

  let counter = 2;
  while (existing.has(`${baseSlug}-kopie-${counter}`)) {
    counter += 1;
  }

  return `${baseSlug}-kopie-${counter}`;
}
