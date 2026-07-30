"use client";

import type { ReactNode, ElementType } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  delayMs?: number;
  className?: string;
}

/**
 * Wraps content in a subtle fade + slide-up reveal that fires once the
 * element scrolls into view. Used across sections for AP-001.1's
 * "Scroll Experience" — deliberately understated per the brief
 * ("keine übertriebenen Animationen").
 */
export function Reveal({ children, as: Tag = "div", delayMs = 0, className = "" }: RevealProps) {
  const { ref, inView } = useInView();

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.7s ease ${delayMs}ms, transform 0.7s ease ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
