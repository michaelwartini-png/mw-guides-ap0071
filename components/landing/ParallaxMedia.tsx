"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface ParallaxMediaProps {
  children: ReactNode;
  className?: string;
  speed?: number;
}

/**
 * Subtle scroll parallax. Honours prefers-reduced-motion.
 */
export function ParallaxMedia({ children, className = "", speed = 0.18 }: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      node.style.transform = `translate3d(0, ${offset}px, 0) scale(1.08)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}
