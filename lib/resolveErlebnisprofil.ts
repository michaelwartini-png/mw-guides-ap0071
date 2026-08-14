import {
  canGenerateErlebnisprofil,
  generateErlebnisprofilBundle,
  type ErlebnisprofilProduct,
} from "@/components/admin/products/erlebnisprofilProduct";
import type { GeneratedProductBundle } from "@/components/admin/products/productTypes";
import { isPublishedStatus } from "@/lib/erlebnisPublication";
import {
  getPublishedErlebnisRecord,
  listPublishedErlebnisSlugs,
  readErlebnisRecord,
} from "@/lib/erlebnisStore";

/** Dynamically resolved published slugs (AP-0023). */
export async function getPublishedErlebnisSlugs(): Promise<string[]> {
  return listPublishedErlebnisSlugs();
}

export async function resolvePublishedErlebnisprofil(
  slug: string,
): Promise<GeneratedProductBundle<ErlebnisprofilProduct> | undefined> {
  const record = await getPublishedErlebnisRecord(slug);
  if (!record || !canGenerateErlebnisprofil(record)) return undefined;
  return generateErlebnisprofilBundle(record);
}

/** Published ErlebnisRecord with generator completeness — used by all public routes. */
export async function resolveErlebnisprofilBySlug(
  slug: string,
): Promise<GeneratedProductBundle<ErlebnisprofilProduct> | undefined> {
  return resolvePublishedErlebnisprofil(slug);
}

export async function usesErlebnisprofilGenerator(slug: string): Promise<boolean> {
  return (await resolveErlebnisprofilBySlug(slug)) !== undefined;
}

/** Admin/preview: read any record regardless of publish status. */
export async function getErlebnisRecordForAdmin(slug: string) {
  return readErlebnisRecord(slug);
}

export function isRecordPublished(record: { profileStatus: string }): boolean {
  return isPublishedStatus(record.profileStatus);
}
