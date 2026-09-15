"use client";

import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animation/ScrollReveal";
import ImageReveal from "@/components/animation/ImageReveal";
import ParallaxImage from "@/components/animation/ParallaxImage";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import Button from "@/components/ui/Button";
import { sectionPadding, container } from "@/lib/design-tokens";

export default function AboutPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-cream pt-20">
      <section className={cn(sectionPadding.default, "pt-32 lg:pt-48 pb-12 lg:pb-16")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="text-[13px] md:text-sm font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
              My Story
            </span>
            <SectionHeading
              title="Our Story 🍪"
              align="center"
              ornament={true}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Decorative Image */}
            <ImageReveal 
              direction="right" 
              delay={0.2}
              trigger="mount"
              className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full max-w-[500px] mx-auto lg:mx-0 lg:-translate-y-16 rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl"
            >
              <ParallaxImage 
                src="/images/about/batul.jpg" 
                alt="Batul Amreliwala" 
                fill={true}
                priority
              />
            </ImageReveal>

            {/* Story Content */}
            <StaggerContainer delay={0.3} amount={0.1} className="flex flex-col space-y-8">
              <StaggerItem>
                <p className="text-warm-brown text-[17px] md:text-lg lg:text-xl leading-relaxed">
                  Tasty Bites by Batul started with a love for baking that began at home. Growing up watching my parents, both chefs, turn simple ingredients into something special, I naturally found my way into the kitchen.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="text-warm-brown text-[17px] md:text-lg lg:text-xl leading-relaxed">
                  At 15, I decided to turn my passion for baking into something of my own. What started as a little idea has now grown into a year of baking, learning, creating, and sharing sweet treats with others.
                </p>
              </StaggerItem>
              <StaggerItem>
                <p className="font-serif text-[22px] md:text-2xl lg:text-3xl text-navy italic leading-relaxed mt-4">
                  And this is just the beginning — I can’t wait to see where Tasty Bites by Batul goes next! 🤍
                </p>
              </StaggerItem>
              <StaggerItem className="pt-8">
                <Button variant="primary" size="lg" href="/menu" className="w-full sm:w-auto text-center justify-center">
                  Explore the Menu
                </Button>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </div>
      </section>
    </main>
  );
}
