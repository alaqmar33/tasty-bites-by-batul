"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease, stagger as staggerTokens, duration as dur } from "@/lib/design-tokens";
import type { ReactNode } from "react";

/* ------------------------------------------------
   Container
   ------------------------------------------------ */

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  trigger?: "scroll" | "mount";
  className?: string;
}

export default function StaggerContainer({
  children,
  staggerDelay = staggerTokens.normal,
  delay = 0,
  once = true,
  amount = 0.05,
  trigger = "scroll",
  className,
}: StaggerContainerProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const animationProps = trigger === "scroll" 
    ? { whileInView: "visible", viewport: { once, amount } }
    : { animate: "visible" };

  return (
    <motion.div
      initial="hidden"
      {...animationProps}
      transition={{
        delayChildren: delay,
        staggerChildren: staggerDelay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------
   Item (used inside StaggerContainer)
   ------------------------------------------------ */

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

/**
 * Individual child inside a `<StaggerContainer>`.
 * Inherits its trigger from the parent's `whileInView`.
 */
export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: dur.normal, ease: ease.out },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
