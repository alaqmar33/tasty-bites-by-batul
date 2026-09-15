"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { sectionPadding, container, ease, duration as dur } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface GalleryItem {
  filename: string;
  name: string;
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    filename: "Cinnamon Rolls.jpg",
    name: "Cinnamon Rolls",
    description:
      "Soft, pillowy rolls layered with warm cinnamon and a rich, buttery sweetness, finished with a generous coating of creamy frosting.",
  },
  {
    filename: "Berliners (Assorted).jpg",
    name: "Berliners (Assorted)",
    description:
      "A colourful selection of filled doughnuts in an assortment of signature flavours — each one generously filled and beautifully finished.",
  },
  {
    filename: "Red Velvet Cookies.jpg",
    name: "Red Velvet Cookies",
    description:
      "Soft and chewy red velvet cookies with a rich cocoa note, studded generously with chocolate. Slightly crisp at the edges and indulgently soft in the centre.",
  },
  {
    filename: "Chocolate Lava Cookies.jpg",
    name: "Chocolate Lava Cookies",
    description:
      "Decadent chocolate cookies with a molten centre that flows with rich, warm chocolate in every bite.",
  },
  {
    filename: "Healthy Brookie Pie (made with jaggery and whole wheat).jpg",
    name: "Healthy Brookie Pie (made with jaggery and whole wheat)",
    description:
      "A wholesome twist on a classic — brownie meets cookie, made with jaggery and whole wheat for a treat you can feel good about.",
  },
  {
    filename: "Nutella Brownies.jpg",
    name: "Nutella Brownies",
    description:
      "Dense, fudgy brownies swirled generously with Nutella for an extra layer of hazelnut-chocolate richness in every square.",
  },
  {
    filename: "New York Style Chocolate Chip Cookies.jpg",
    name: "New York Style Chocolate Chip Cookies",
    description:
      "Oversized, golden-edged cookies loaded with chocolate chips — crisp on the outside, impossibly chewy within.",
  },
  {
    filename: "Blueberry Cream Cheese Cookies.jpg",
    name: "Blueberry Cream Cheese Cookies",
    description:
      "Soft-baked cookies studded with blueberries and swirled with cream cheese for a tangy, fruity sweetness.",
  },
  {
    filename: "Molten Lava Cookies.jpg",
    name: "Molten Lava Cookies",
    description:
      "Thick, indulgent cookies hiding a flowing molten chocolate centre — warm, gooey and deeply satisfying.",
  },
  {
    filename: "Couverture Crunch and Melt.jpg",
    name: "Couverture Crunch and Melt",
    description:
      "Premium couverture chocolate shaped into satisfying bites — a balance of smooth melt and delicate crunch.",
  },
  {
    filename: "Korean Cream Cheese Buns.jpg",
    name: "Korean Cream Cheese Buns",
    description:
      "Soft, garlicky buns with a rich cream cheese filling — savoury, fragrant and irresistibly warm.",
  },
  {
    filename: "New York Style Double Chocolate Cookies.jpg",
    name: "New York Style Double Chocolate Cookies",
    description:
      "Bold, thick cookies made with a double dose of chocolate — dark, fudgy and packed with intense cocoa flavour.",
  },
  {
    filename: "Hot Chocolate Bombs.jpg",
    name: "Hot Chocolate Bombs",
    description:
      "Rich chocolate spheres that melt into warm milk, releasing cocoa and a hidden surprise for the perfect cup of hot chocolate.",
  },
  {
    filename: "London Viral Cake.jpg",
    name: "London Viral Cake",
    description:
      "A rich, indulgent chocolate bake with deep cocoa flavour and a wonderfully moist, dense texture — finished with a smooth chocolate topping.",
  },
];

export default function GalleryPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-cream relative">
      {/* ──────────────────────────────────────────────
          GALLERY HERO
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.default, "pt-32 lg:pt-48 pb-12 lg:pb-16")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-[13px] md:text-sm font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
              The Gallery
            </span>
            <SectionHeading
              title="Made to be savoured."
              subtitle="A closer look at the bakes, treats and little indulgences from Tasty Bites by Batul."
              align="center"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          EDITORIAL GALLERY
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.compact, "space-y-20 lg:space-y-32 pb-16 lg:pb-28")}>
        {GALLERY_ITEMS.map((item, index) => {
          const isEven = index % 2 === 0;

          // Animation directions: image slides from its side, text from the opposite
          const imageSlideX = prefersReducedMotion ? 0 : isEven ? -60 : 60;
          const textSlideX = prefersReducedMotion ? 0 : isEven ? 60 : -60;

          const imageVariants = {
            hidden: { opacity: 0, x: imageSlideX },
            visible: { opacity: 1, x: 0 },
          };
          const textVariants = {
            hidden: { opacity: 0, x: textSlideX },
            visible: { opacity: 1, x: 0 },
          };

          return (
            <div key={item.filename} className={container.default}>
              <div
                className={cn(
                  "flex flex-col gap-8 lg:gap-16 items-center",
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                )}
              >
                {/* Image */}
                <motion.div
                  className="w-full lg:w-[55%] relative overflow-hidden rounded-2xl lg:rounded-3xl bg-border/20"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={imageVariants}
                  transition={{
                    duration: dur.reveal,
                    ease: ease.reveal as [number, number, number, number],
                  }}
                >
                  <div className="relative aspect-[4/3] group">
                    <Image
                      src={`/images/gallery/${item.filename}`}
                      alt={item.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </motion.div>

                {/* Text */}
                <motion.div
                  className={cn(
                    "w-full lg:w-[45%] flex flex-col justify-center",
                    isEven ? "lg:pl-4" : "lg:pr-4"
                  )}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={textVariants}
                  transition={{
                    duration: dur.reveal,
                    delay: 0.15,
                    ease: ease.reveal as [number, number, number, number],
                  }}
                >
                  {/* Small index label */}
                  <span className="text-[13px] font-medium uppercase tracking-[0.25em] text-taupe/60 mb-4 block">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-serif text-[32px] sm:text-[34px] lg:text-4xl text-navy mb-5 leading-tight">
                    {item.name}
                  </h3>

                  <p className="text-warm-brown text-base lg:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ──────────────────────────────────────────────
          END-OF-GALLERY CTA
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.default, "bg-cream-dark")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <SectionHeading
              title="Explore more. Order your favourites."
              align="center"
              ornament={false}
            />
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full sm:w-auto">
              <Button variant="primary" size="lg" href="/menu" className="w-full sm:w-auto">
                Explore the Menu
              </Button>
              <Button variant="whatsapp" size="lg" pill href="https://wa.me/9152245253" className="w-full sm:w-auto">
                Order via WhatsApp
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
