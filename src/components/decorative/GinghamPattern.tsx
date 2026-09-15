import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GinghamPatternProps {
  children?: ReactNode;
  /** Pattern opacity — 0 to 1. Keep very low for subtlety. */
  intensity?: number;
  /** Grid cell size in pixels */
  size?: number;
  className?: string;
}

/**
 * Decorative gingham/checkered pattern overlay.
 *
 * Wraps content with a subtle blue gingham texture inspired by
 * the Tasty Bites brand identity. Keep `intensity` low (0.04–0.08)
 * so the pattern reads as a premium texture, not a tablecloth.
 *
 * ```tsx
 * <GinghamPattern intensity={0.05}>
 *   <section className="py-20">...</section>
 * </GinghamPattern>
 * ```
 */
export default function GinghamPattern({
  children,
  intensity = 0.06,
  size = 20,
  className,
}: GinghamPatternProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Pattern layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(74, 111, 165, ${intensity}) 50%,
              transparent 50%
            ),
            linear-gradient(
              90deg,
              rgba(74, 111, 165, ${intensity}) 50%,
              transparent 50%
            )
          `,
          backgroundSize: `${size}px ${size}px`,
        }}
      />
      {/* Content above pattern */}
      <div className="relative">{children}</div>
    </div>
  );
}
