import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardVariant = "default" | "elevated" | "outlined";
type CardPadding = "none" | "sm" | "md" | "lg";

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white",
  elevated:
    "bg-white shadow-md hover:shadow-lg transition-shadow duration-300",
  outlined: "bg-white border border-border",
};

const paddingClasses: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  /** Border radius — default is 2xl (16px) */
  rounded?: "lg" | "2xl" | "3xl";
  className?: string;
}

const roundedClasses: Record<string, string> = {
  lg: "rounded-lg",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
};

/**
 * Content card with variant-based styling.
 *
 * - `default`  — White background, no shadow
 * - `elevated` — White + shadow, lifts on hover
 * - `outlined` — White + subtle border
 */
export default function Card({
  children,
  variant = "default",
  padding = "md",
  rounded = "2xl",
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        roundedClasses[rounded],
        variantClasses[variant],
        paddingClasses[padding],
        className,
      )}
    >
      {children}
    </div>
  );
}
