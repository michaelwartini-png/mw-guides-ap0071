"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Signature visual motif: a dotted travel route with waypoint pins,
 * echoing the GPS-triggered stops of a self-guided audio tour.
 *
 * AP-002.0: recolored to the single brand accent (was gold), and dialed
 * back in opacity to fit the calmer, less crowded hero. Motion —
 * a slow idle dash-drift and a light scroll-linked parallax offset —
 * is unchanged, no new dependency required.
 */
export function RouteLine() {
  const waypoints: Array<[number, number]> = [
    [280, 640],
    [680, 430],
    [1180, 300],
  ];

  const groupRef = useRef<SVGGElement | null>(null);
  const [reducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const offset = Math.min(window.scrollY * 0.04, 20);
        if (groupRef.current) {
          groupRef.current.style.transform = `translateY(${offset}px)`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.22]"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g ref={groupRef} style={{ transition: "transform 0.2s ease-out" }}>
        <path
          d="M -40 700 C 260 800, 420 480, 700 520 S 1020 300, 1180 360 S 1420 200, 1500 140"
          fill="none"
          stroke="#4a9494"
          strokeWidth="2"
          strokeDasharray="1 12"
          strokeLinecap="round"
          className={reducedMotion ? undefined : "mwg-route-drift"}
        />
        {waypoints.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="5" fill="#4a9494" />
            <circle
              cx={cx}
              cy={cy}
              r="10"
              fill="none"
              stroke="#4a9494"
              strokeWidth="1"
              opacity="0.5"
              className={reducedMotion ? undefined : "mwg-route-pulse"}
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}
