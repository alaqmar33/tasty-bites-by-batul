import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Main heading text */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Show the decorative divider below the heading */
  ornament?: boolean;
  className?: string;
}

/**
 * Consistent section heading used across all pages.
 *
 * Renders an `<h2>` with optional subtitle and a small
 * decorative ornament (rose lines + gold dot).
 */
export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  ornament = true,
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={cn(isCenter ? "text-center" : "text-left", className)}>
      <h2 className="font-serif text-[32px] md:text-4xl lg:text-5xl text-navy tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "mt-4 text-taupe text-lg md:text-xl leading-relaxed",
            isCenter && "mx-auto max-w-2xl",
          )}
        >
          {subtitle}
        </p>
      )}

      {ornament && (
        <div
          className={cn(
            "mt-6 flex items-center gap-2",
            isCenter ? "justify-center" : "justify-start",
          )}
        >
          <span className="h-px w-12 bg-rose" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-px w-12 bg-rose" />
        </div>
      )}
    </div>
  );
}
