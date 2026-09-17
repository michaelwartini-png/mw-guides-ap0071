"use client";

import { useEffect } from "react";
import type { LandingLocale } from "@/content/landing";

export function DocumentLang({ locale }: { locale: LandingLocale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
