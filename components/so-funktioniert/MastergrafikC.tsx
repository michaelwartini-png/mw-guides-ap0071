"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const GRAPHIC_WIDTH = 1440;

/**
 * So funktioniert MW Guides V1.0 (eingefroren, 15.08.2026).
 * Website-Einbindung von Mastergrafik C V1 ohne Grafik-Kopf und
 * Grafik-Fuß. Original bleibt v1.html.
 * Siehe docs/AP-G-so-funktioniert-v1.0.md — Änderungen nur als 1.1+.
 */
export function MastergrafikC() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [graphicHeight, setGraphicHeight] = useState(1001);

  const measure = useCallback(() => {
    const width = wrapRef.current?.clientWidth ?? GRAPHIC_WIDTH;
    setScale(Math.min(1, width / GRAPHIC_WIDTH));

    const doc = frameRef.current?.contentDocument;
    const node = doc?.getElementById("mastergrafik") ?? doc?.body;
    if (node) {
      setGraphicHeight(node.scrollHeight);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  return (
    <div
      ref={wrapRef}
      className="w-full overflow-hidden"
      style={{ height: graphicHeight * scale }}
    >
      <iframe
        ref={frameRef}
        title="Mastergrafik C — So begleitet dich Meine Reise"
        src="/mastergrafik-c/v1-embed.html"
        width={GRAPHIC_WIDTH}
        height={graphicHeight}
        onLoad={measure}
        className="origin-top-left border-0"
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}
