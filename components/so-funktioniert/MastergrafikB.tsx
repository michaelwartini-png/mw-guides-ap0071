import Image from "next/image";

const SRC_W = 1364;
const SRC_H = 2048;
/** Top of step 1 in the 2× PNG — title, subtitle and legend sit above this. */
const CROP_TOP = 168;
/** Bottom symbol-legend / value-prop band in the 2× PNG. */
const CROP_BOTTOM = 128;
const VISIBLE_H = SRC_H - CROP_TOP - CROP_BOTTOM;

/**
 * So funktioniert MW Guides V1.0 (eingefroren, 15.08.2026).
 * Website-Einbindung von Mastergrafik B V2.1 ohne Grafik-Kopf und
 * Grafik-Fuß. Die Original-PNG bleibt unverändert.
 * Siehe docs/AP-G-so-funktioniert-v1.0.md — Änderungen nur als 1.1+.
 */
export function MastergrafikB() {
  return (
    <div
      className="overflow-hidden"
      style={{ aspectRatio: `${SRC_W} / ${VISIBLE_H}` }}
    >
      <Image
        src="/mastergrafik-b/v2.1.png"
        alt="In fünf Schritten zur persönlichen Reise — ab Europa entdecken"
        width={SRC_W}
        height={SRC_H}
        unoptimized
        className="h-auto w-full max-w-none"
        sizes="(min-width: 1440px) 1440px, 100vw"
        style={{ marginTop: `${(-CROP_TOP / SRC_W) * 100}%` }}
      />
    </div>
  );
}
