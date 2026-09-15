import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/* ------------------------------------------------
   Variants
   ------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-navy text-cream hover:bg-navy-light shadow-sm hover:shadow-md",
  secondary:
    "bg-blush text-navy hover:bg-rose/30",
  outline:
    "border-2 border-navy text-navy hover:bg-navy hover:text-cream",
  ghost:
    "text-navy hover:bg-navy/5",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1DA851] shadow-sm hover:shadow-md",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-[14px] md:text-sm gap-1.5",
  md: "px-6 py-3 text-[15px] md:text-base gap-2",
  lg: "px-8 py-4 text-[16px] md:text-lg gap-3",
};

/* ------------------------------------------------
   Component
   ------------------------------------------------ */

interface ButtonProps extends Omit<ComponentProps<"button">, "color"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  fullWidth?: boolean;
  /** Fully-rounded pill shape. Defaults to `true` for the `whatsapp` variant. */
  pill?: boolean;
}

/**
 * Brand button. Renders as `<Link>` when `href` is provided, `<button>` otherwise.
 *
 * Shape defaults to `rounded-xl`. Set `pill` for fully-rounded ends.
 * WhatsApp variant automatically applies the pill shape by default.
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  pill,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const isWhatsApp = variant === "whatsapp";
  const isPill = pill ?? isWhatsApp;

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-navy",
    variantClasses[variant],
    sizeClasses[size],
    isPill ? "rounded-full" : "rounded-xl",
    fullWidth ? "w-full" : "w-auto",
    className,
  );

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    if (isExternal) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
