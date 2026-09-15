"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Parallax intensity: 0 = none, 0.3 = subtle, 0.6 = strong */
  speed?: number;
  /** Use Next.js Image `fill` mode (requires positioned parent) */
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * Image with subtle scroll-linked parallax movement.
 *
 * The image translates vertically as its container scrolls through
 * the viewport. `overflow-hidden` on the container clips the
 * over-translated image so no gaps appear.
 *
 * Falls back to a static image when `prefers-reduced-motion` is set.
 */
export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  fill,
  width,
  height,
  priority = false,
  className,
  containerClassName,
}: ParallaxImageProps) {
  // If fill is explicitly passed, use it. Otherwise, default to true if no width/height are provided.
  const isFill = fill ?? (!width || !height);
  
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-speed * 100, speed * 100],
  );

  const imageProps = {
    src,
    alt,
    priority,
    className: `object-cover ${className ?? ""}`.trim(),
    ...(isFill ? { fill: true as const } : { width, height }),
  };

  const outerClasses = `overflow-hidden ${isFill ? "h-full w-full" : ""} ${containerClassName ?? ""}`.trim();

  if (shouldReduce) {
    return (
      <div ref={ref} className={outerClasses}>
        <div className="relative h-full w-full">
          <Image {...imageProps} sizes={isFill ? "(max-width: 768px) 100vw, 50vw" : undefined} />
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={outerClasses}>
      {/* 
        Must be relative for Next.js Image fill to work correctly.
        Scaled up slightly (1.15) so parallax translation doesn't reveal empty edges.
      */}
      <motion.div 
        style={{ y }} 
        className="relative h-full w-full scale-[1.15]"
      >
        <Image {...imageProps} sizes={isFill ? "(max-width: 768px) 100vw, 50vw" : undefined} />
      </motion.div>
    </div>
  );
}
