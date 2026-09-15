/**
 * Design tokens for Tasty Bites by Batul.
 *
 * Color tokens live in globals.css (@theme) and are consumed via
 * Tailwind utility classes. This file holds values that are easier
 * to consume from TypeScript — animation curves, spacing presets,
 * and layout helpers.
 */

/* ------------------------------------------------
   Animation Presets
   ------------------------------------------------ */

export const ease = {
  /** Standard content entrance (ease-out) */
  out: [0.25, 0.1, 0.25, 1] as const,
  /** Scroll-reveal sections */
  reveal: [0.22, 1, 0.36, 1] as const,
  /** Dramatic image mask reveals */
  dramatic: [0.77, 0, 0.175, 1] as const,
  /** Snappy interactive hover / press */
  snappy: [0.4, 0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.7,
  reveal: 0.8,
};

export const stagger = {
  fast: 0.06,
  normal: 0.1,
  slow: 0.15,
};

/* ------------------------------------------------
   Layout — Tailwind class presets
   ------------------------------------------------ */

/** Vertical section padding */
export const sectionPadding = {
  default: "py-12 md:py-24 lg:py-32",
  compact: "py-10 md:py-16 lg:py-20",
  spacious: "py-16 md:py-32 lg:py-40",
} as const;

/** Horizontal-centred containers */
export const container = {
  /** Standard content width (max 80rem / 1280px) */
  default: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
  /** Narrow for text-heavy content (max 56rem / 896px) */
  narrow: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
  /** Wide for galleries / hero (max 90rem / 1440px) */
  wide: "mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8",
  /** Full bleed — edge to edge */
  full: "w-full",
} as const;
