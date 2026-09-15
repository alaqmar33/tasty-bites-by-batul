"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Divider from "@/components/ui/Divider";
import Card from "@/components/ui/Card";

import FadeIn from "@/components/animation/FadeIn";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import ImageReveal from "@/components/animation/ImageReveal";

import GinghamPattern from "@/components/decorative/GinghamPattern";
import ScallopedEdge from "@/components/decorative/ScallopedEdge";

/* ==========================================================
   DESIGN SYSTEM SHOWCASE — Temporary preview page
   ========================================================== */

/* ---- Helpers ---- */

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="border-b border-border pb-3 mb-10">
      <h2 className="font-serif text-2xl md:text-3xl text-navy">{children}</h2>
    </div>
  );
}

function Swatch({
  name,
  hex,
  bg,
  dark = false,
}: {
  name: string;
  hex: string;
  bg: string;
  dark?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`h-24 sm:h-28 rounded-2xl shadow-sm ring-1 ring-black/5 ${bg}`}
      />
      <p className={`text-sm font-medium ${dark ? "text-navy" : "text-navy"}`}>
        {name}
      </p>
      <p className="text-xs text-taupe font-mono">{hex}</p>
    </div>
  );
}

function Placeholder({
  label,
  className = "",
  aspect = "aspect-[4/3]",
}: {
  label?: string;
  className?: string;
  aspect?: string;
}) {
  return (
    <div
      className={`${aspect} rounded-2xl bg-gradient-to-br from-blush to-rose/60 flex items-center justify-center ${className}`}
    >
      {label && (
        <span className="text-navy/30 font-serif text-lg select-none">
          {label}
        </span>
      )}
    </div>
  );
}

/* ---- Parallax Demo (inline, no real image needed) ---- */

function ParallaxDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <div ref={ref} className="overflow-hidden rounded-2xl h-72 relative">
      <motion.div
        style={shouldReduce ? {} : { y }}
        className="absolute inset-[-20%] bg-gradient-to-br from-cream-dark via-blush to-rose/50 flex items-center justify-center"
      >
        <span className="text-navy/30 font-serif text-xl select-none">
          ↕ Scroll to see parallax movement
        </span>
      </motion.div>
    </div>
  );
}

/* ---- Page ---- */

export default function DesignSystemShowcase() {
  const section = "py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto";

  return (
    <main className="min-h-screen">
      {/* ============================== HEADER ============================== */}
      <header className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-taupe mb-4">
          Temporary Preview
        </p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy mb-4">
          Design System Showcase
        </h1>
        <p className="text-taupe text-lg max-w-xl mx-auto">
          Visual reference for all design tokens, components, and animation
          primitives. This page will be removed before production.
        </p>
      </header>

      <Divider variant="ornamental" className="max-w-xs mx-auto mb-8" />

      {/* ============================== COLORS ============================== */}
      <section className={section}>
        <SectionLabel>Colors</SectionLabel>

        {/* Backgrounds */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-4 font-medium">
          Backgrounds
        </p>
        <div className="grid grid-cols-3 gap-4 mb-12">
          <Swatch name="cream" hex="#FFF9F5" bg="bg-cream ring-2 ring-border/50" />
          <Swatch name="cream-dark" hex="#F3EBE2" bg="bg-cream-dark" />
          <Swatch name="blush" hex="#F5E1DC" bg="bg-blush" />
        </div>

        {/* Brand */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-4 font-medium">
          Brand
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-12">
          <Swatch name="navy" hex="#1B2A4A" bg="bg-navy" dark />
          <Swatch name="navy-light" hex="#2D4A7A" bg="bg-navy-light" dark />
          <Swatch name="rose" hex="#D4A5A5" bg="bg-rose" />
          <Swatch name="gold" hex="#C9A96E" bg="bg-gold" />
          <Swatch name="gingham" hex="#4A6FA5" bg="bg-gingham" />
        </div>

        {/* Neutrals */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-4 font-medium">
          Neutrals &amp; Text
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Swatch name="warm-brown" hex="#5C4F44" bg="bg-warm-brown" dark />
          <Swatch name="taupe" hex="#8A7F77" bg="bg-taupe" />
          <Swatch name="border" hex="#E8DDD4" bg="bg-border" />
          <Swatch name="border-light" hex="#F0E8E0" bg="bg-border-light" />
        </div>
      </section>

      {/* ============================== TYPOGRAPHY ============================== */}
      <section className="bg-cream-dark">
        <div className={section}>
          <SectionLabel>Typography</SectionLabel>

          <div className="space-y-8 mb-12">
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                Playfair Display · Hero / 4xl–6xl
              </p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy">
                Baked with Love
              </h1>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                Playfair Display · Section Heading / 3xl–5xl
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-navy">
                Our Gourmet Collection
              </h2>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                Playfair Display · Sub-heading / xl–2xl
              </p>
              <h3 className="font-serif text-xl md:text-2xl text-navy">
                Handcrafted Brownies &amp; Cookies
              </h3>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                Playfair Display · Small Heading / lg–xl
              </p>
              <h4 className="font-serif text-lg md:text-xl text-navy">
                Made Fresh, Delivered Pan India
              </h4>
            </div>
          </div>

          <Divider className="my-10" />

          <div className="space-y-6 max-w-3xl">
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                DM Sans · Body / base (16px)
              </p>
              <p className="text-base text-warm-brown leading-relaxed">
                Every dessert is handcrafted in small batches using premium
                ingredients. From gooey brownies to dreamy cookies and
                cheesecakes, each bite is a little moment of indulgence. We
                believe dessert should feel special — not mass-produced.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                DM Sans · Large Body / lg (18px)
              </p>
              <p className="text-lg text-warm-brown leading-relaxed">
                Baked with love, made to satisfy your sweet cravings.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                DM Sans · Small / sm (14px)
              </p>
              <p className="text-sm text-taupe">
                Minimum order value ₹500. Free delivery in Bandra on orders above ₹1,000.
                Pan India shipping available. All prices inclusive of taxes.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-2">
                DM Sans · Caption / xs (12px) · Uppercase Tracking
              </p>
              <p className="text-xs uppercase tracking-[0.15em] text-taupe font-medium">
                Bestseller · New Arrival · Limited Edition · Eggless Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== BUTTONS ============================== */}
      <section className={section}>
        <SectionLabel>Buttons</SectionLabel>

        {/* Variants */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Variants (medium · default shape)
        </p>
        <div className="flex flex-wrap gap-4 mb-12">
          <Button variant="primary">Order Now</Button>
          <Button variant="secondary">View Menu</Button>
          <Button variant="outline">Learn More</Button>
          <Button variant="ghost">See All</Button>
          <Button variant="whatsapp">WhatsApp Us</Button>
        </div>

        {/* Shape Comparison */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Shape: rounded-xl (default) vs pill (selective)
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Button>Default (rounded-xl)</Button>
          <Button pill>Pill CTA</Button>
          <Button variant="outline">Default Outline</Button>
          <Button variant="outline" pill>Pill Outline</Button>
        </div>
        <p className="text-sm text-taupe mb-12">
          Pill shape is used selectively — WhatsApp buttons auto-pill.
          Special CTAs can opt-in with <code className="text-xs bg-cream-dark px-1.5 py-0.5 rounded">pill</code>.
        </p>

        {/* Sizes — Primary */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Sizes — Primary
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>

        {/* Sizes — Outline */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Sizes — Outline
        </p>
        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="md">Medium</Button>
          <Button variant="outline" size="lg">Large</Button>
        </div>

        {/* Full Width */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Full Width
        </p>
        <div className="max-w-md space-y-3">
          <Button variant="whatsapp" fullWidth>Order via WhatsApp</Button>
          <Button variant="outline" fullWidth>
            Browse Full Menu
          </Button>
        </div>
      </section>

      {/* ============================== BADGES ============================== */}
      <section className="bg-cream-dark">
        <div className={section}>
          <SectionLabel>Badges</SectionLabel>
          <div className="flex flex-wrap gap-3">
            <Badge>Cookie</Badge>
            <Badge variant="bestseller">Bestseller</Badge>
            <Badge variant="new">New</Badge>
            <Badge variant="eggless">Eggless</Badge>
            <Badge variant="veg">Veg</Badge>
          </div>
        </div>
      </section>

      {/* ============================== SECTION HEADING ============================== */}
      <section className={section}>
        <SectionLabel>Section Heading Component</SectionLabel>

        <div className="space-y-16">
          <SectionHeading
            title="Our Signature Collection"
            subtitle="From gooey brownies to dreamy cookies, each treat is crafted with premium ingredients and a whole lot of love."
          />

          <SectionHeading
            title="What Our Customers Say"
            align="left"
          />

          <SectionHeading
            title="Minimal Heading"
            ornament={false}
          />
        </div>
      </section>

      {/* ============================== DIVIDERS ============================== */}
      <section className="bg-cream-dark">
        <div className={section}>
          <SectionLabel>Dividers</SectionLabel>

          <div className="max-w-md mx-auto space-y-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-4 text-center">
                Simple
              </p>
              <Divider variant="simple" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-4 text-center">
                Ornamental
              </p>
              <Divider variant="ornamental" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-taupe mb-4 text-center">
                Dotted
              </p>
              <Divider variant="dotted" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================== DECORATIVE BRAND ELEMENTS ============================== */}
      <ScallopedEdge color="var(--color-cream-dark)" />

      <section className={section}>
        <SectionLabel>Decorative Brand Elements</SectionLabel>
        <p className="text-taupe mb-12 max-w-2xl">
          Subtle details drawn from the Tasty Bites brand identity — blue
          gingham patterns and organic scalloped shapes. Used sparingly as
          texture, never as the dominant visual.
        </p>

        {/* Gingham Pattern */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Gingham Pattern Overlay
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GinghamPattern intensity={0.04} className="rounded-2xl overflow-hidden">
            <div className="bg-cream-dark p-8 text-center">
              <p className="text-xs text-taupe uppercase tracking-widest mb-1">
                Intensity: 0.04
              </p>
              <p className="font-serif text-lg text-navy">Very Subtle</p>
            </div>
          </GinghamPattern>
          <GinghamPattern intensity={0.07} className="rounded-2xl overflow-hidden">
            <div className="bg-cream-dark p-8 text-center">
              <p className="text-xs text-taupe uppercase tracking-widest mb-1">
                Intensity: 0.07
              </p>
              <p className="font-serif text-lg text-navy">Recommended</p>
            </div>
          </GinghamPattern>
          <GinghamPattern intensity={0.12} size={16} className="rounded-2xl overflow-hidden">
            <div className="bg-cream-dark p-8 text-center">
              <p className="text-xs text-taupe uppercase tracking-widest mb-1">
                Intensity: 0.12 · Size: 16px
              </p>
              <p className="font-serif text-lg text-navy">Max (too much?)</p>
            </div>
          </GinghamPattern>
        </div>

        {/* Gingham in context */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Gingham in Context — Feature Panel
        </p>
        <GinghamPattern intensity={0.05} className="rounded-2xl overflow-hidden mb-16">
          <div className="bg-cream-dark p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <Placeholder aspect="aspect-square" className="w-48 shrink-0" />
            <div>
              <Badge variant="bestseller" className="mb-3">Bestseller</Badge>
              <h3 className="font-serif text-2xl text-navy mb-2">
                Chocolate Hazelnut Brownie
              </h3>
              <p className="text-warm-brown mb-4">
                Rich Belgian chocolate with roasted hazelnuts, finished with
                a sprinkle of sea salt. Our most requested dessert.
              </p>
              <Button variant="whatsapp" size="sm">Order on WhatsApp</Button>
            </div>
          </div>
        </GinghamPattern>

        {/* Scalloped Edges */}
        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Scalloped Edge — Section Divider
        </p>
        <div className="space-y-0">
          <div className="bg-cream-dark rounded-t-2xl p-8 text-center">
            <p className="font-serif text-navy">Section with cream-dark background</p>
          </div>
          <ScallopedEdge color="var(--color-cream-dark)" />
          <div className="bg-blush rounded-b-2xl p-8 text-center">
            <p className="font-serif text-navy">Section with blush background</p>
          </div>
        </div>

        <div className="mt-8 space-y-0">
          <div className="bg-navy rounded-t-2xl p-8 text-center">
            <p className="font-serif text-cream">Dark section (navy)</p>
          </div>
          <ScallopedEdge color="var(--color-navy)" />
          <div className="bg-cream-dark rounded-b-2xl p-8 text-center">
            <p className="font-serif text-navy">Light section below</p>
          </div>
        </div>
      </section>

      {/* ============================== CARDS ============================== */}
      <section className={section}>
        <SectionLabel>Cards</SectionLabel>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <p className="text-xs uppercase tracking-widest text-taupe mb-3">
              Default
            </p>
            <h3 className="font-serif text-xl text-navy mb-2">
              Chocolate Brownie
            </h3>
            <p className="text-sm text-warm-brown mb-4">
              Rich, fudgy, and topped with a crackly crust. Made with
              premium dark chocolate.
            </p>
            <p className="text-lg font-medium text-navy">₹350</p>
          </Card>

          <Card variant="elevated">
            <p className="text-xs uppercase tracking-widest text-taupe mb-3">
              Elevated (hover me)
            </p>
            <h3 className="font-serif text-xl text-navy mb-2">
              Red Velvet Cookie
            </h3>
            <p className="text-sm text-warm-brown mb-4">
              Soft-baked with white chocolate chips and a hint of cocoa.
              Our current bestseller.
            </p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium text-navy">₹180</p>
              <Badge variant="bestseller">Bestseller</Badge>
            </div>
          </Card>

          <Card variant="outlined">
            <p className="text-xs uppercase tracking-widest text-taupe mb-3">
              Outlined
            </p>
            <h3 className="font-serif text-xl text-navy mb-2">
              Classic Tiramisu
            </h3>
            <p className="text-sm text-warm-brown mb-4">
              Layered mascarpone, espresso-soaked ladyfingers, and a
              dusting of cocoa.
            </p>
            <p className="text-lg font-medium text-navy">₹600</p>
          </Card>
        </div>
      </section>

      {/* ============================== NAVIGATION PREVIEW ============================== */}
      <section className="bg-cream-dark">
        <div className={section}>
          <SectionLabel>Navigation Preview</SectionLabel>

          {/* Desktop Nav */}
          <p className="text-xs uppercase tracking-widest text-taupe mb-4 font-medium">
            Desktop
          </p>
          <nav className="bg-cream/80 backdrop-blur-md rounded-2xl px-6 py-4 flex items-center justify-between shadow-sm ring-1 ring-border/50 mb-10">
            <span className="font-serif text-xl text-navy">
              Tasty Bites by Batul
            </span>
            <div className="hidden md:flex items-center gap-8">
              {["Home", "Menu", "About", "Gallery", "Offers", "FAQs", "Contact"].map(
                (link) => (
                  <span
                    key={link}
                    className="text-sm text-warm-brown hover:text-navy transition-colors cursor-pointer"
                  >
                    {link}
                  </span>
                ),
              )}
            </div>
            <Button size="sm" pill>Order Now</Button>
          </nav>

          {/* Mobile Nav */}
          <p className="text-xs uppercase tracking-widest text-taupe mb-4 font-medium">
            Mobile
          </p>
          <div className="max-w-sm">
            <nav className="bg-cream/80 backdrop-blur-md rounded-2xl px-4 py-3 flex items-center justify-between shadow-sm ring-1 ring-border/50">
              <span className="font-serif text-lg text-navy">
                Tasty Bites
              </span>
              <div className="flex items-center gap-3">
                <Button size="sm" pill>Order</Button>
                {/* Hamburger icon */}
                <div className="flex flex-col gap-1.5 p-2 cursor-pointer">
                  <span className="block w-5 h-0.5 bg-navy" />
                  <span className="block w-5 h-0.5 bg-navy" />
                  <span className="block w-3.5 h-0.5 bg-navy" />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </section>

      {/* ============================== IMAGE CONTAINERS ============================== */}
      <section className={section}>
        <SectionLabel>Image Containers</SectionLabel>

        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Editorial Layout — Asymmetric
        </p>
        <div className="grid grid-cols-12 gap-4 mb-12">
          <div className="col-span-12 md:col-span-7">
            <Placeholder label="Hero · 16:9" aspect="aspect-[16/9]" />
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            <Placeholder label="Square" aspect="aspect-square" />
            <Placeholder label="Wide · 3:2" aspect="aspect-[3/2]" />
          </div>
        </div>

        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Full-Bleed
        </p>
        <Placeholder
          label="Full Width · 21:9 Cinematic"
          aspect="aspect-[21/9]"
          className="mb-12"
        />

        <p className="text-sm uppercase tracking-widest text-taupe mb-6 font-medium">
          Rounded Shapes
        </p>
        <div className="flex flex-wrap gap-6 items-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blush to-rose/60 flex items-center justify-center">
            <span className="text-navy/30 font-serif text-sm select-none">
              Circle
            </span>
          </div>
          <div className="w-64 h-36 rounded-[2rem] bg-gradient-to-br from-cream-dark to-blush flex items-center justify-center">
            <span className="text-navy/30 font-serif text-sm select-none">
              Pill
            </span>
          </div>
          <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-blush to-rose/60 flex items-center justify-center rotate-3 shadow-lg">
            <span className="text-navy/30 font-serif text-sm select-none -rotate-3">
              Tilted
            </span>
          </div>
        </div>
      </section>

      {/* ============================== DARK SECTION DEMO ============================== */}
      <section className="bg-navy text-cream">
        <div className={section}>
          <SectionLabel>Dark Section (Navy Background)</SectionLabel>
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl text-cream mb-4">
              A Taste of Something Special
            </h2>
            <p className="text-cream/70 text-lg leading-relaxed mb-6">
              This demonstrates how content looks on the navy background — useful
              for hero overlays, featured sections, and CTAs.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">Browse Menu</Button>
              <Button variant="outline" className="border-cream/40 text-cream hover:bg-cream hover:text-navy">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== ANIMATIONS ============================== */}
      <section className={section}>
        <SectionLabel>Animation Primitives</SectionLabel>

        <p className="text-taupe text-base mb-16 max-w-2xl">
          Scroll down through each section. Animations trigger when elements
          enter the viewport. Each primitive fires once by default.
        </p>

        {/* FadeIn */}
        <div className="mb-24">
          <p className="text-sm uppercase tracking-widest text-taupe mb-8 font-medium">
            FadeIn — Directional
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FadeIn direction="up" delay={0}>
              <Card variant="outlined" padding="md">
                <p className="text-xs text-taupe uppercase tracking-widest mb-2">
                  Direction
                </p>
                <p className="font-serif text-lg text-navy">↑ Up</p>
              </Card>
            </FadeIn>
            <FadeIn direction="down" delay={0.1}>
              <Card variant="outlined" padding="md">
                <p className="text-xs text-taupe uppercase tracking-widest mb-2">
                  Direction
                </p>
                <p className="font-serif text-lg text-navy">↓ Down</p>
              </Card>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <Card variant="outlined" padding="md">
                <p className="text-xs text-taupe uppercase tracking-widest mb-2">
                  Direction
                </p>
                <p className="font-serif text-lg text-navy">← Left</p>
              </Card>
            </FadeIn>
            <FadeIn direction="right" delay={0.3}>
              <Card variant="outlined" padding="md">
                <p className="text-xs text-taupe uppercase tracking-widest mb-2">
                  Direction
                </p>
                <p className="font-serif text-lg text-navy">→ Right</p>
              </Card>
            </FadeIn>
          </div>
        </div>

        {/* ScrollReveal */}
        <div className="mb-24">
          <p className="text-sm uppercase tracking-widest text-taupe mb-8 font-medium">
            ScrollReveal — Custom Variants
          </p>
          <ScrollReveal>
            <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-2xl text-navy mb-3">
                Scroll Reveal
              </h3>
              <p className="text-warm-brown">
                This card fades in and slides up when scrolled into view.
                Uses the default fade+slide variant.
              </p>
            </Card>
          </ScrollReveal>

          <div className="mt-8">
            <ScrollReveal
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1 },
              }}
            >
              <Card variant="elevated" padding="lg" className="max-w-2xl mx-auto text-center">
                <h3 className="font-serif text-2xl text-navy mb-3">
                  Scale Variant
                </h3>
                <p className="text-warm-brown">
                  Custom variant — scales from 90% to 100% with fade.
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>

        {/* StaggerContainer */}
        <div className="mb-24">
          <p className="text-sm uppercase tracking-widest text-taupe mb-8 font-medium">
            StaggerContainer + StaggerItem
          </p>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["Cookies", "Brownies", "Berliners", "Tiramisu"].map(
              (item, i) => (
                <StaggerItem key={item}>
                  <Card variant="elevated" padding="md">
                    <div className="h-32 rounded-xl bg-gradient-to-br from-blush to-rose/50 mb-4 flex items-center justify-center">
                      <span className="text-navy/30 font-serif select-none">
                        {i + 1}
                      </span>
                    </div>
                    <h4 className="font-serif text-lg text-navy">{item}</h4>
                    <p className="text-sm text-taupe mt-1">
                      Each card staggers in sequence
                    </p>
                  </Card>
                </StaggerItem>
              ),
            )}
          </StaggerContainer>
        </div>

        {/* ImageReveal */}
        <div className="mb-24">
          <p className="text-sm uppercase tracking-widest text-taupe mb-8 font-medium">
            ImageReveal — Clip-Path Wipe
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(["left", "right", "up", "down"] as const).map((dir, i) => (
              <ImageReveal key={dir} direction={dir} delay={i * 0.15}>
                <Placeholder label={`Reveal: ${dir}`} aspect="aspect-[3/4]" />
              </ImageReveal>
            ))}
          </div>
        </div>

        {/* ParallaxImage */}
        <div className="mb-16">
          <p className="text-sm uppercase tracking-widest text-taupe mb-8 font-medium">
            ParallaxImage — Scroll-Linked
          </p>
          <p className="text-sm text-taupe mb-6">
            The gradient below moves at a different speed than the page as you
            scroll. In production this wraps a Next.js Image component.
          </p>
          <ParallaxDemo />
        </div>
      </section>

      {/* ============================== COMBINED DEMO ============================== */}
      <section className="bg-blush/40">
        <div className={section}>
          <FadeIn>
            <SectionHeading
              title="Everything Together"
              subtitle="A quick composition showing how tokens, components, and animations combine."
            />
          </FadeIn>

          <StaggerContainer className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Warm Palette",
                desc: "Cream, blush, and navy create an inviting, premium feel.",
              },
              {
                title: "Editorial Type",
                desc: "Playfair Display headlines paired with DM Sans body text.",
              },
              {
                title: "Smooth Motion",
                desc: "Scroll-triggered reveals, staggered grids, and parallax depth.",
              },
            ].map((card) => (
              <StaggerItem key={card.title}>
                <Card variant="elevated" padding="lg">
                  <ImageReveal className="mb-6">
                    <Placeholder aspect="aspect-[3/2]" />
                  </ImageReveal>
                  <h3 className="font-serif text-xl text-navy mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-warm-brown leading-relaxed">
                    {card.desc}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="py-16 text-center">
        <Divider variant="dotted" className="mb-6 max-w-xs mx-auto" />
        <p className="text-sm text-taupe">End of Design System Showcase</p>
      </div>
    </main>
  );
}
