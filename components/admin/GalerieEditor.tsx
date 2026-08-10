"use client";

import {
  type FormEvent,
  type ReactNode,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AdminPrimaryButton, AdminSecondaryButton } from "@/components/admin/adminButtons";
import { EditorRedakteurPanel } from "@/components/admin/EditorRedakteurPanel";
import { GalerieVerwendetIn } from "@/components/admin/GalerieVerwendetIn";
import type { EditorRxProps } from "@/components/admin/redakteurExperienceData";
import type { GalerieUsageContext } from "@/components/admin/galerieUsage";
import { useEditorRxState } from "@/components/admin/useEditorRxState";
import {
  BildscoreAnzeige,
  BildStatusBadges,
  GaleriePreview,
} from "@/components/admin/GaleriePreview";
import {
  applyExclusiveHero,
  BILD_KATEGORIEN,
  BILD_TYPEN,
  createGalerieBild,
  EMPTY_GALERIE_DATA,
  getBildtypLabel,
  getKategorieLabel,
  getNextReihenfolge,
  JAHRESZEIT_OPTIONS,
  KI_BILD_STATUS_OPTIONS,
  PRESET_BILDER,
  setPflichtbildForItem,
  sortGalerieBilder,
  swapGalerieOrder,
  toggleKategorieWithHeroRule,
  type BildKategorie,
  type BildTyp,
  type GalerieBild,
  type GalerieData,
  type Jahreszeit,
  type KiBildStatus,
} from "@/components/admin/galerieData";
import { cn } from "@/lib/cn";

const FIELD_CLASS =
  "w-full rounded-lg border border-[var(--mwg-line)] bg-paper px-3 py-2 text-[14px] outline-none transition-colors focus:border-accent";

const TEXTAREA_CLASS = `${FIELD_CLASS} min-h-[56px] resize-y`;

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[13px] font-medium text-ink">
      {children}
    </label>
  );
}

function SterneInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Sternebewertung">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(value === star ? 0 : star)}
          className={cn(
            "text-lg leading-none transition-colors",
            star <= value ? "text-accent" : "text-[var(--mwg-line)] hover:text-accent/50",
          )}
          aria-label={`${star} Stern${star === 1 ? "" : "e"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function BildThumbnail({ bildUrl, titel }: { bildUrl: string; titel: string }) {
  if (!bildUrl) {
    return (
      <div className="flex h-16 w-[4.5rem] shrink-0 items-center justify-center rounded-md border border-dashed border-[var(--mwg-line)] bg-paper text-[9px] text-stone">
        Leer
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={bildUrl}
      alt={titel || "Vorschau"}
      className="h-16 w-[4.5rem] shrink-0 rounded-md border border-[var(--mwg-line)] object-cover"
    />
  );
}

function KategoriePills({ kategorien }: { kategorien: BildKategorie[] }) {
  return (
    <div className="flex flex-wrap gap-0.5">
      {kategorien.map((kat) => (
        <span
          key={kat}
          className="rounded bg-[var(--mwg-line)]/45 px-1.5 py-0.5 text-[9px] text-stone"
        >
          {getKategorieLabel(kat)}
        </span>
      ))}
    </div>
  );
}

interface GalerieEditorProps extends EditorRxProps {
  initialData?: GalerieData;
  usageContext?: GalerieUsageContext;
  onPersist?: (data: GalerieData) => void;
}

export function GalerieEditor({
  initialData = EMPTY_GALERIE_DATA,
  usageContext = { highlights: { items: [] }, mwGuidesTipps: { items: [] } },
  onPersist,
  onDirtyChange,
  registerActions,
}: GalerieEditorProps) {
  const [savedData, setSavedData] = useState<GalerieData>(initialData);
  const [formData, setFormData] = useState<GalerieData>(initialData);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string>(PRESET_BILDER[0].url);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(() => new Set());
  const [focusedBildId, setFocusedBildId] = useState<string | null>(null);

  const uploadInputRef = useRef<HTMLInputElement>(null);
  const cardRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const scrollPreserveRef = useRef<string | null>(null);

  const sortedItems = useMemo(() => sortGalerieBilder(formData.items), [formData.items]);

  useLayoutEffect(() => {
    const preserveId = scrollPreserveRef.current;
    if (!preserveId) return;

    const element = cardRefs.current.get(preserveId);
    if (element) {
      element.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
    scrollPreserveRef.current = null;
  }, [formData.items]);

  const updateItems = useCallback((items: GalerieBild[], preserveScrollForId?: string) => {
    if (preserveScrollForId) {
      scrollPreserveRef.current = preserveScrollForId;
    }
    setFormData({ items });
    setSaveMessage(null);
  }, []);

  function focusBild(id: string) {
    setFocusedBildId(id);
  }

  function updateItem(id: string, patch: Partial<GalerieBild>) {
    focusBild(id);
    updateItems(
      formData.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      id,
    );
  }

  function toggleExpanded(id: string) {
    focusBild(id);
    setExpandedCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function navigateToBild(id: string) {
    focusBild(id);
    setExpandedCards((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      cardRefs.current.get(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  function setAsHero(id: string) {
    focusBild(id);
    updateItems(applyExclusiveHero(formData.items, id), id);
  }

  function setAsPflichtbild(id: string) {
    focusBild(id);
    updateItems(setPflichtbildForItem(formData.items, id, true), id);
  }

  function toggleAktiv(id: string) {
    const item = formData.items.find((entry) => entry.id === id);
    if (!item) return;
    updateItem(id, { aktiv: !item.aktiv });
  }

  function toggleKategorieForItem(id: string, kategorie: BildKategorie) {
    focusBild(id);
    updateItems(toggleKategorieWithHeroRule(formData.items, id, kategorie), id);
  }

  function handlePflichtbildChange(id: string, checked: boolean) {
    focusBild(id);
    updateItems(setPflichtbildForItem(formData.items, id, checked), id);
  }

  function addFromPreset() {
    const preset = PRESET_BILDER.find((entry) => entry.url === selectedPreset);
    if (!preset) return;
    const reihenfolge = getNextReihenfolge(formData.items);
    const newId = `bild-${Date.now()}-${reihenfolge}`;
    updateItems([
      ...formData.items,
      createGalerieBild({
        id: newId,
        bildUrl: preset.url,
        titel: preset.label,
        altText: preset.label,
        reihenfolge,
      }),
    ]);
    setExpandedCards((prev) => new Set(prev).add(newId));
    focusBild(newId);
    scrollPreserveRef.current = newId;
  }

  function addFromUpload(file: File) {
    const url = URL.createObjectURL(file);
    const reihenfolge = getNextReihenfolge(formData.items);
    const name = file.name.replace(/\.[^.]+$/, "");
    const newId = `bild-${Date.now()}-${reihenfolge}`;
    updateItems([
      ...formData.items,
      createGalerieBild({
        id: newId,
        bildUrl: url,
        titel: name,
        altText: name,
        reihenfolge,
      }),
    ]);
    setExpandedCards((prev) => new Set(prev).add(newId));
    focusBild(newId);
    scrollPreserveRef.current = newId;
  }

  function handleUploadChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) addFromUpload(file);
    event.target.value = "";
  }

  function removeItem(id: string) {
    updateItems(formData.items.filter((item) => item.id !== id));
    setExpandedCards((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (focusedBildId === id) setFocusedBildId(null);
  }

  function moveItem(id: string, direction: "up" | "down") {
    focusBild(id);
    updateItems(swapGalerieOrder(formData.items, id, direction), id);
  }

  function handleDiscard() {
    setFormData(savedData);
    setSaveMessage(null);
    onDirtyChange?.(false);
  }

  const persistSave = useCallback(() => {
    const preserveId =
      scrollPreserveRef.current ?? focusedBildId ?? [...expandedCards][0] ?? sortedItems[0]?.id;
    if (preserveId) scrollPreserveRef.current = preserveId;
    setSavedData(formData);
    onPersist?.(formData);
    onDirtyChange?.(false);
    setSaveMessage("Änderungen wurden gespeichert.");
  }, [expandedCards, focusedBildId, formData, onDirtyChange, onPersist, sortedItems]);

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    persistSave();
  }

  useEditorRxState(formData, savedData, onDirtyChange, registerActions, {
    save: persistSave,
    discard: handleDiscard,
  });

  const isHero = (item: GalerieBild) => item.kategorien.includes("hero");

  return (
    <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_280px]">
      <form onSubmit={handleSave} className="space-y-4">
        <EditorRedakteurPanel section="galerie" />
        {saveMessage && (
          <div
            role="status"
            className="rounded-lg border border-accent/25 bg-accent/10 px-3 py-2 text-[13px] text-ink"
          >
            {saveMessage}
          </div>
        )}

        <div className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-[12px] leading-snug text-[var(--mwg-ink-70)]">
          <span className="font-medium text-ink">CMS-Regel:</span> Ein Bild – viele Verwendungen.
          Keine Dubletten.
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-[var(--mwg-line)] p-3 sm:flex-row sm:flex-wrap sm:items-end">
          <input
            ref={uploadInputRef}
            type="file"
            accept="image/*"
            onChange={handleUploadChange}
            className="hidden"
          />
          <AdminSecondaryButton type="button" onClick={() => uploadInputRef.current?.click()}>
            + Hochladen
          </AdminSecondaryButton>
          <div className="min-w-[180px] flex-1 space-y-1">
            <FieldLabel htmlFor="preset-bild">Medienbibliothek</FieldLabel>
            <select
              id="preset-bild"
              value={selectedPreset}
              onChange={(event) => setSelectedPreset(event.target.value)}
              className={FIELD_CLASS}
            >
              {PRESET_BILDER.map((preset) => (
                <option key={preset.url} value={preset.url}>
                  {preset.label}
                </option>
              ))}
            </select>
          </div>
          <AdminSecondaryButton type="button" onClick={addFromPreset}>
            + Hinzufügen
          </AdminSecondaryButton>
        </div>

        <p className="text-[12px] text-stone">
          {sortedItems.length} Bild{sortedItems.length === 1 ? "" : "er"} · Reihenfolge{" "}
          {sortedItems.length > 0 ? `#${sortedItems[0]?.reihenfolge}–#${sortedItems[sortedItems.length - 1]?.reihenfolge}` : "—"}
        </p>

        <div className="space-y-2">
          {sortedItems.length === 0 && (
            <p className="rounded-lg border border-dashed border-[var(--mwg-line)] px-3 py-6 text-center text-[13px] text-stone">
              Noch keine Bilder.
            </p>
          )}

          {sortedItems.map((item, index) => {
            const isExpanded = expandedCards.has(item.id);
            const isFocused = focusedBildId === item.id;
            const itemIsHero = isHero(item);

            return (
              <div
                key={item.id}
                id={`bild-card-${item.id}`}
                ref={(element) => {
                  if (element) cardRefs.current.set(item.id, element);
                  else cardRefs.current.delete(item.id);
                }}
                className={cn(
                  "overflow-hidden rounded-lg border transition-all duration-200",
                  item.aktiv
                    ? "border-[var(--mwg-line)] bg-paper-raised"
                    : "border-dashed border-[var(--mwg-line)] bg-paper/50 opacity-85",
                  isFocused && "border-accent bg-accent/[0.04] ring-2 ring-accent/40 shadow-sm",
                )}
              >
                {isFocused && (
                  <div className="border-b border-accent/25 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent">
                    Dieses Bild bearbeite ich gerade
                  </div>
                )}

                <div className="flex items-start gap-1 border-b border-[var(--mwg-line)]/70 px-2 py-1.5">
                  <button
                    type="button"
                    onClick={() => setAsHero(item.id)}
                    className={cn(
                      "rounded px-2 py-1 text-[11px] font-medium transition-colors",
                      itemIsHero
                        ? "bg-accent/15 text-accent"
                        : "text-stone hover:bg-accent/10 hover:text-accent",
                    )}
                  >
                    ⭐ Hero
                  </button>
                  <button
                    type="button"
                    onClick={() => setAsPflichtbild(item.id)}
                    className={cn(
                      "rounded px-2 py-1 text-[11px] font-medium transition-colors",
                      item.pflichtbild
                        ? "bg-accent/15 text-accent"
                        : "text-stone hover:bg-accent/10 hover:text-accent",
                    )}
                  >
                    📌 Pflicht
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAktiv(item.id)}
                    className={cn(
                      "rounded px-2 py-1 text-[11px] font-medium transition-colors",
                      item.aktiv
                        ? "bg-emerald-500/10 text-emerald-800"
                        : "text-stone hover:bg-stone/10",
                    )}
                  >
                    👁 {item.aktiv ? "Aktiv" : "Inaktiv"}
                  </button>
                  <span className="ml-auto self-center text-[10px] tabular-nums text-stone">
                    #{item.reihenfolge}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleExpanded(item.id)}
                  className="flex w-full items-start gap-2.5 px-2.5 py-2 text-left hover:bg-paper/60"
                >
                  <BildThumbnail bildUrl={item.bildUrl} titel={item.titel} />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink">
                      {item.titel || "Ohne Titel"}
                    </p>
                    <p className="text-[11px] text-stone">{getBildtypLabel(item.bildtyp)}</p>
                    <BildStatusBadges bild={item} isHero={itemIsHero} />
                    <BildscoreAnzeige
                      sternBewertung={item.sternBewertung}
                      mwGuidesBildscore={item.mwGuidesBildscore}
                      compact
                      inline
                    />
                    {item.kategorien.length > 0 && <KategoriePills kategorien={item.kategorien} />}
                    <GalerieVerwendetIn
                      bild={item}
                      galerieItems={formData.items}
                      context={usageContext}
                      compact
                    />
                  </div>
                  <span className="shrink-0 pt-0.5 text-[11px] text-stone" aria-hidden="true">
                    {isExpanded ? "▼" : "▶"}
                  </span>
                </button>

                {isExpanded && (
                  <div className="space-y-3 border-t border-[var(--mwg-line)]/70 px-2.5 py-2.5">
                    <GalerieVerwendetIn
                      bild={item}
                      galerieItems={formData.items}
                      context={usageContext}
                    />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1 sm:col-span-2">
                        <FieldLabel htmlFor={`bild-titel-${item.id}`}>Titel</FieldLabel>
                        <input
                          id={`bild-titel-${item.id}`}
                          type="text"
                          value={item.titel}
                          onChange={(event) => updateItem(item.id, { titel: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <FieldLabel htmlFor={`bild-beschreibung-${item.id}`}>
                          Kurzbeschreibung
                        </FieldLabel>
                        <textarea
                          id={`bild-beschreibung-${item.id}`}
                          value={item.kurzbeschreibung}
                          onChange={(event) =>
                            updateItem(item.id, { kurzbeschreibung: event.target.value })
                          }
                          className={TEXTAREA_CLASS}
                        />
                      </div>

                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-fotograf-${item.id}`}>Fotograf</FieldLabel>
                        <input
                          id={`bild-fotograf-${item.id}`}
                          type="text"
                          value={item.fotograf}
                          onChange={(event) =>
                            updateItem(item.id, { fotograf: event.target.value })
                          }
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-quelle-${item.id}`}>Quelle</FieldLabel>
                        <input
                          id={`bild-quelle-${item.id}`}
                          type="text"
                          value={item.quelle}
                          onChange={(event) => updateItem(item.id, { quelle: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-lizenz-${item.id}`}>Lizenz</FieldLabel>
                        <input
                          id={`bild-lizenz-${item.id}`}
                          type="text"
                          value={item.lizenz}
                          onChange={(event) => updateItem(item.id, { lizenz: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-copyright-${item.id}`}>Copyright</FieldLabel>
                        <input
                          id={`bild-copyright-${item.id}`}
                          type="text"
                          value={item.copyright}
                          onChange={(event) =>
                            updateItem(item.id, { copyright: event.target.value })
                          }
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-1 sm:col-span-2">
                        <FieldLabel htmlFor={`bild-alt-${item.id}`}>Alt-Text</FieldLabel>
                        <input
                          id={`bild-alt-${item.id}`}
                          type="text"
                          value={item.altText}
                          onChange={(event) => updateItem(item.id, { altText: event.target.value })}
                          className={FIELD_CLASS}
                        />
                      </div>

                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-typ-${item.id}`}>Bildtyp</FieldLabel>
                        <select
                          id={`bild-typ-${item.id}`}
                          value={item.bildtyp}
                          onChange={(event) =>
                            updateItem(item.id, { bildtyp: event.target.value as BildTyp })
                          }
                          className={FIELD_CLASS}
                        >
                          {BILD_TYPEN.map((typ) => (
                            <option key={typ.id} value={typ.id}>
                              {typ.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-reihenfolge-${item.id}`}>Reihenfolge</FieldLabel>
                        <input
                          id={`bild-reihenfolge-${item.id}`}
                          type="number"
                          min={1}
                          value={item.reihenfolge}
                          onChange={(event) =>
                            updateItem(item.id, {
                              reihenfolge: Math.max(1, Number(event.target.value) || 1),
                            })
                          }
                          className={FIELD_CLASS}
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[13px] font-medium text-ink">Kategorien</p>
                      <div className="flex flex-wrap gap-1">
                        {BILD_KATEGORIEN.map((kategorie) => {
                          const active = item.kategorien.includes(kategorie.id);
                          return (
                            <button
                              key={kategorie.id}
                              type="button"
                              onClick={() => toggleKategorieForItem(item.id, kategorie.id)}
                              className={cn(
                                "rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors",
                                active
                                  ? "border-accent bg-accent/10 text-accent"
                                  : "border-[var(--mwg-line)] text-stone hover:border-accent/40",
                              )}
                            >
                              {active ? "✓ " : ""}
                              {kategorie.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-1">
                        <p className="text-[13px] font-medium text-ink">Sternebewertung</p>
                        <SterneInput
                          value={item.sternBewertung}
                          onChange={(sternBewertung) => updateItem(item.id, { sternBewertung })}
                        />
                      </div>
                      <div className="space-y-1">
                        <FieldLabel htmlFor={`bild-score-${item.id}`}>MW Guides Bildscore</FieldLabel>
                        <input
                          id={`bild-score-${item.id}`}
                          type="number"
                          min={0}
                          max={100}
                          value={item.mwGuidesBildscore || ""}
                          onChange={(event) =>
                            updateItem(item.id, {
                              mwGuidesBildscore: Math.min(
                                100,
                                Math.max(0, Number(event.target.value) || 0),
                              ),
                            })
                          }
                          className={FIELD_CLASS}
                          placeholder="0–100"
                        />
                        <BildscoreAnzeige
                          sternBewertung={item.sternBewertung}
                          mwGuidesBildscore={item.mwGuidesBildscore}
                          compact
                        />
                      </div>
                    </div>

                    <details className="rounded-lg border border-[var(--mwg-line)] bg-paper/40">
                      <summary className="cursor-pointer px-3 py-2 text-[13px] font-medium text-ink">
                        Bildinformationen (optional)
                      </summary>
                      <div className="grid gap-3 border-t border-[var(--mwg-line)] p-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-ort-${item.id}`}>Aufnahmeort</FieldLabel>
                          <input
                            id={`bild-ort-${item.id}`}
                            type="text"
                            value={item.aufnahmeort}
                            onChange={(event) =>
                              updateItem(item.id, { aufnahmeort: event.target.value })
                            }
                            className={FIELD_CLASS}
                          />
                        </div>
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-gps-${item.id}`}>GPS</FieldLabel>
                          <input
                            id={`bild-gps-${item.id}`}
                            type="text"
                            value={item.gps}
                            onChange={(event) => updateItem(item.id, { gps: event.target.value })}
                            className={FIELD_CLASS}
                          />
                        </div>
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-datum-${item.id}`}>Aufnahmedatum</FieldLabel>
                          <input
                            id={`bild-datum-${item.id}`}
                            type="date"
                            value={item.aufnahmedatum}
                            onChange={(event) =>
                              updateItem(item.id, { aufnahmedatum: event.target.value })
                            }
                            className={FIELD_CLASS}
                          />
                        </div>
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-blick-${item.id}`}>Blickrichtung</FieldLabel>
                          <input
                            id={`bild-blick-${item.id}`}
                            type="text"
                            value={item.blickrichtung}
                            onChange={(event) =>
                              updateItem(item.id, { blickrichtung: event.target.value })
                            }
                            className={FIELD_CLASS}
                          />
                        </div>
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-jahreszeit-${item.id}`}>Jahreszeit</FieldLabel>
                          <select
                            id={`bild-jahreszeit-${item.id}`}
                            value={item.jahreszeit}
                            onChange={(event) =>
                              updateItem(item.id, {
                                jahreszeit: event.target.value as Jahreszeit,
                              })
                            }
                            className={FIELD_CLASS}
                          >
                            {JAHRESZEIT_OPTIONS.map((option) => (
                              <option key={option.value || "none"} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </details>

                    <details className="rounded-lg border border-[var(--mwg-line)] bg-paper/40">
                      <summary className="cursor-pointer px-3 py-2 text-[13px] font-medium text-ink">
                        KI-Vorbereitung
                      </summary>
                      <div className="grid gap-3 border-t border-[var(--mwg-line)] p-3 sm:grid-cols-2">
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-ki-quelle-${item.id}`}>KI-Quelle</FieldLabel>
                          <input
                            id={`bild-ki-quelle-${item.id}`}
                            type="text"
                            value={item.kiQuelle}
                            onChange={(event) =>
                              updateItem(item.id, { kiQuelle: event.target.value })
                            }
                            className={FIELD_CLASS}
                          />
                        </div>
                        <div className="space-y-1">
                          <FieldLabel htmlFor={`bild-ki-status-${item.id}`}>Status</FieldLabel>
                          <select
                            id={`bild-ki-status-${item.id}`}
                            value={item.kiStatus}
                            onChange={(event) =>
                              updateItem(item.id, {
                                kiStatus: event.target.value as KiBildStatus,
                              })
                            }
                            className={FIELD_CLASS}
                          >
                            {KI_BILD_STATUS_OPTIONS.map((option) => (
                              <option key={option.id} value={option.id}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </details>

                    <div className="flex flex-wrap gap-1.5">
                      <AdminSecondaryButton
                        type="button"
                        onClick={() => moveItem(item.id, "up")}
                        disabled={index === 0}
                      >
                        ↑
                      </AdminSecondaryButton>
                      <AdminSecondaryButton
                        type="button"
                        onClick={() => moveItem(item.id, "down")}
                        disabled={index === sortedItems.length - 1}
                      >
                        ↓
                      </AdminSecondaryButton>
                      <AdminSecondaryButton type="button" onClick={() => removeItem(item.id)}>
                        Löschen
                      </AdminSecondaryButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[var(--mwg-line)] pt-4">
          <AdminPrimaryButton type="submit">
            <span aria-hidden="true">💾</span>
            Speichern
          </AdminPrimaryButton>
          <AdminSecondaryButton type="button" onClick={handleDiscard}>
            <span aria-hidden="true">↩</span>
            Verwerfen
          </AdminSecondaryButton>
        </div>
      </form>

      <GaleriePreview
        data={formData}
        onNavigateToBild={navigateToBild}
        focusedBildId={focusedBildId}
      />
    </div>
  );
}
