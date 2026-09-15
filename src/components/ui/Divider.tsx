import { cn } from "@/lib/utils";

interface DividerProps {
  /** Visual style */
  variant?: "simple" | "ornamental" | "dotted";
  className?: string;
}

/**
 * Horizontal divider between content sections.
 *
 * - `simple` — Single thin line
 * - `ornamental` — Two lines flanking a small rotated diamond
 * - `dotted` — Three small dots
 */
export default function Divider({
  variant = "simple",
  className,
}: DividerProps) {
  if (variant === "ornamental") {
    return (
      <div className={cn("flex items-center justify-center gap-3 py-2", className)}>
        <span className="h-px w-16 bg-border" />
        <span className="h-2 w-2 rotate-45 border border-rose" />
        <span className="h-px w-16 bg-border" />
      </div>
    );
  }

  if (variant === "dotted") {
    return (
      <div className={cn("flex items-center justify-center gap-2 py-2", className)}>
        <span className="h-1.5 w-1.5 rounded-full bg-rose/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-rose/50" />
      </div>
    );
  }

  return <hr className={cn("border-t border-border", className)} />;
}
