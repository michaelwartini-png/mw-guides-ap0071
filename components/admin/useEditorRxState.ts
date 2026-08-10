"use client";

import { useEffect } from "react";
import type { EditorPersistActions } from "@/components/admin/redakteurExperienceData";

export function useEditorRxState(
  formData: unknown,
  savedData: unknown,
  onDirtyChange?: (dirty: boolean) => void,
  registerActions?: (actions: EditorPersistActions | null) => void,
  actions?: EditorPersistActions,
) {
  useEffect(() => {
    const dirty = JSON.stringify(formData) !== JSON.stringify(savedData);
    onDirtyChange?.(dirty);
  }, [formData, savedData, onDirtyChange]);

  useEffect(() => {
    if (!registerActions || !actions) return;
    registerActions(actions);
    return () => registerActions(null);
  }, [registerActions, actions]);
}
