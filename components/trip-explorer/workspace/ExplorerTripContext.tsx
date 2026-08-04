"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ExplorerHighlight } from "@/types/explorerHighlight";

export interface TripSelectionItem {
  slug: string;
  title: string;
  location: string;
  image: string;
  imageAlt: string;
  favorited: boolean;
}

interface ExplorerTripContextValue {
  items: TripSelectionItem[];
  addHighlight: (highlight: ExplorerHighlight) => void;
  removeHighlight: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isSelected: (slug: string) => boolean;
  reorderItems: (fromIndex: number, toIndex: number) => void;
}

const ExplorerTripContext = createContext<ExplorerTripContextValue | null>(null);

const TRIP_UPDATE_EVENT = "mwg-explorer-trip-update";
const SERVER_SNAPSHOT: TripSelectionItem[] = [];

/** Per-trip client snapshot cache — getSnapshot must return a stable reference. */
const clientSnapshotCache = new Map<string, TripSelectionItem[]>();

function storageKey(tripSlug: string) {
  return `mwg-explorer-trip-${tripSlug}`;
}

function loadItems(tripSlug: string): TripSelectionItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(storageKey(tripSlug));
    return raw ? (JSON.parse(raw) as TripSelectionItem[]) : [];
  } catch {
    return [];
  }
}

function saveItems(tripSlug: string, items: TripSelectionItem[]) {
  sessionStorage.setItem(storageKey(tripSlug), JSON.stringify(items));
  clientSnapshotCache.set(tripSlug, items);
  window.dispatchEvent(new CustomEvent(TRIP_UPDATE_EVENT, { detail: { tripSlug } }));
}

function getClientSnapshot(tripSlug: string): TripSelectionItem[] {
  if (!clientSnapshotCache.has(tripSlug)) {
    clientSnapshotCache.set(tripSlug, loadItems(tripSlug));
  }
  return clientSnapshotCache.get(tripSlug)!;
}

function subscribe(onStoreChange: () => void) {
  const handler = (event: Event) => {
    const tripSlug = (event as CustomEvent<{ tripSlug: string }>).detail?.tripSlug;
    if (tripSlug) {
      clientSnapshotCache.set(tripSlug, loadItems(tripSlug));
    }
    onStoreChange();
  };
  window.addEventListener(TRIP_UPDATE_EVENT, handler);
  return () => window.removeEventListener(TRIP_UPDATE_EVENT, handler);
}

interface ExplorerTripProviderProps {
  tripSlug: string;
  children: ReactNode;
}

export function ExplorerTripProvider({ tripSlug, children }: ExplorerTripProviderProps) {
  const items = useSyncExternalStore(
    subscribe,
    () => getClientSnapshot(tripSlug),
    () => SERVER_SNAPSHOT,
  );

  const mutate = useCallback(
    (updater: (prev: TripSelectionItem[]) => TripSelectionItem[]) => {
      saveItems(tripSlug, updater(loadItems(tripSlug)));
    },
    [tripSlug],
  );

  const addHighlight = useCallback(
    (highlight: ExplorerHighlight) => {
      mutate((prev) => {
        if (prev.some((i) => i.slug === highlight.slug)) return prev;
        return [
          ...prev,
          {
            slug: highlight.slug,
            title: highlight.title,
            location: highlight.location,
            image: highlight.image,
            imageAlt: highlight.imageAlt,
            favorited: false,
          },
        ];
      });
    },
    [mutate],
  );

  const removeHighlight = useCallback(
    (slug: string) => {
      mutate((prev) => prev.filter((i) => i.slug !== slug));
    },
    [mutate],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      mutate((prev) =>
        prev.map((i) => (i.slug === slug ? { ...i, favorited: !i.favorited } : i)),
      );
    },
    [mutate],
  );

  const isSelected = useCallback(
    (slug: string) => items.some((i) => i.slug === slug),
    [items],
  );

  const reorderItems = useCallback(
    (fromIndex: number, toIndex: number) => {
      mutate((prev) => {
        const next = [...prev];
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        return next;
      });
    },
    [mutate],
  );

  const value = useMemo(
    () => ({
      items,
      addHighlight,
      removeHighlight,
      toggleFavorite,
      isSelected,
      reorderItems,
    }),
    [items, addHighlight, removeHighlight, toggleFavorite, isSelected, reorderItems],
  );

  return (
    <ExplorerTripContext.Provider value={value}>{children}</ExplorerTripContext.Provider>
  );
}

export function useExplorerTrip() {
  const ctx = useContext(ExplorerTripContext);
  if (!ctx) {
    throw new Error("useExplorerTrip must be used within ExplorerTripProvider");
  }
  return ctx;
}
