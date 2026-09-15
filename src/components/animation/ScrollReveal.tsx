"use client";

import { motion, useReducedMotion, type Variant } from "motion/react";
import { ease, duration as dur } from "@/lib/design-tokens";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Custom Motion variants — overrides the default fade+slide */
  variants?: { hidden: Variant; visible: Variant };
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  className?: string;
}

const defaultVariants = {
  hidden: { opacity: 0, y: 40 } as Variant,
  visible: { opacity: 1, y: 0 } as Variant,
};

/**
 * Generic scroll-triggered reveal with customisable Motion variants.
 *
 * Use `<FadeIn>` for simple directional fades.
 * Use `<ScrollReveal>` when you need full control over the
 * initial → visible variant (e.g. scale, rotate, clip-path).
 */
export default function ScrollReveal({
  children,
  variants = defaultVariants,
  delay = 0,
  duration = dur.slow,
  once = true,
  amount = 0.05,
  className,
}: ScrollRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: ease.reveal }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
