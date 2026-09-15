import { cn } from "@/lib/utils";

interface ScallopedEdgeProps {
  /** Fill colour — should match the section background above. */
  color?: string;
  /** Flip vertically to use as a top-edge scallop */
  flip?: boolean;
  className?: string;
}

/**
 * Decorative scalloped/doily edge between sections.
 *
 * Place between two `<section>` elements. Set `color` to match the
 * background of the section **above** so the scallops visually
 * "hang" into the section below.
 *
 * ```tsx
 * <section className="bg-cream-dark">...</section>
 * <ScallopedEdge color="var(--color-cream-dark)" />
 * <section className="bg-cream">...</section>
 * ```
 */
export default function ScallopedEdge({
  color = "var(--color-cream)",
  flip = false,
  className,
}: ScallopedEdgeProps) {
  /* 24 scallops across the viewBox width */
  const count = 24;
  const w = 1440 / count; // 60px per scallop
  const baseline = 12;
  const depth = 36;

  let d = `M 0 0 H 1440 V ${baseline}`;
  for (let i = count; i > 0; i--) {
    const endX = (i - 1) * w;
    const cpX = endX + w / 2;
    d += ` Q ${cpX} ${depth}, ${endX} ${baseline}`;
  }
  d += " Z";

  return (
    <div
      className={cn("w-full leading-[0]", flip && "rotate-180", className)}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 1440 ${depth}`}
        preserveAspectRatio="none"
        className="w-full h-3 md:h-4 lg:h-5 block"
      >
        <path d={d} fill={color} />
      </svg>
    </div>
  );
}
