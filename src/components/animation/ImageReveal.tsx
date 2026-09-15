"use client";

import { motion, useReducedMotion } from "motion/react";
import { ease, duration as dur } from "@/lib/design-tokens";
import type { ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  trigger?: "scroll" | "mount";
  className?: string;
}

const clipPaths: Record<string, { hidden: string; visible: string }> = {
  left: { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" },
  right: { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" },
  up: { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" },
  down: { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" },
};

export default function ImageReveal({
  children,
  direction = "left",
  delay = 0,
  duration = dur.reveal,
  once = true,
  amount = 0.05,
  trigger = "scroll",
  className,
}: ImageRevealProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className}>{children}</div>;
  }

  const paths = clipPaths[direction];
  const animationProps = trigger === "scroll"
    ? { whileInView: { clipPath: paths.visible }, viewport: { once, amount } }
    : { animate: { clipPath: paths.visible } };

  return (
    <motion.div
      initial={{ clipPath: paths.hidden }}
      {...animationProps}
      transition={{ duration, delay, ease: ease.dramatic }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
