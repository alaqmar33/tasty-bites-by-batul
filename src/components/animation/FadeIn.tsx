"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease, duration as dur } from "@/lib/design-tokens";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  /** Slide direction (set to "none" for pure fade) */
  direction?: "up" | "down" | "left" | "right" | "none";
  /** Seconds before animation starts */
  delay?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Slide distance in pixels */
  distance?: number;
  /** Only animate once when entering viewport */
  once?: boolean;
  /** Fraction of element visible before triggering (0–1) */
  amount?: number;
  className?: string;
}

/**
 * Fade-in with optional directional slide.
 * Wraps children in a `motion.div` that animates on viewport entry.
 *
 * Falls back to a plain `<div>` when `prefers-reduced-motion` is set.
 */
export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = dur.normal,
  distance = 30,
  once = true,
  amount = 0.2,
  className,
}: FadeInProps) {
  const shouldReduce = useReducedMotion();

  const offsets: Record<string, object> = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...offsets[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: ease.out }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
