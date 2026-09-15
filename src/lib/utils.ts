/**
 * Combines class names, filtering out falsy values.
 * Lightweight alternative to clsx — no external dependency needed.
 */
export function cn(
  ...classes: (string | false | null | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
