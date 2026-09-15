import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "bestseller" | "new" | "eggless" | "veg";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-cream-dark text-warm-brown",
  bestseller: "bg-gold/15 text-gold border border-gold/30",
  new: "bg-navy/10 text-navy",
  eggless: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  veg: "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

/**
 * Small inline badge for product tags — bestseller, new, eggless, etc.
 */
export default function Badge({
  variant = "default",
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center",
        "px-3 py-1 text-xs font-medium tracking-wide uppercase",
        "rounded-full",
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
