import type { ReactNode } from "react";
import { ExplorerTripProvider } from "@/components/trip-explorer/workspace/ExplorerTripContext";

interface ExplorerLayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}

/** AP-011 — Shared session state for Trip Explorer and Erlebnisdetail pages. */
export default async function ExplorerLayout({ children, params }: ExplorerLayoutProps) {
  const { slug } = await params;

  return <ExplorerTripProvider tripSlug={slug}>{children}</ExplorerTripProvider>;
}
