"use client";

import { useEffect, useState } from "react";

/**
 * Returns true once the page has been scrolled past `threshold` pixels.
 * Used to switch the header background from transparent to solid.
 */
export function useScrolled(threshold = 8): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
