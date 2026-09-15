"use client";

import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import { sectionPadding, container } from "@/lib/design-tokens";
import Button from "@/components/ui/Button";
import Image from "next/image";

import review1 from "../../../public/images/reviews/IMG-20260913-WA0005.jpg";
import review2 from "../../../public/images/reviews/IMG-20260913-WA0006.jpg";
import review3 from "../../../public/images/reviews/IMG-20260913-WA0007.jpg";
import review4 from "../../../public/images/reviews/IMG-20260913-WA0008.jpg";
import review5 from "../../../public/images/reviews/IMG-20260913-WA0009.jpg";
import review6 from "../../../public/images/reviews/IMG-20260913-WA0010.jpg";
import review7 from "../../../public/images/reviews/IMG-20260913-WA0011.jpg";

const REVIEW_IMAGES = [
  review1,
  review2,
  review3,
  review4,
  review5,
  review6,
  review7,
];

export default function ReviewsPage() {
  return (
    <main className="flex min-h-screen flex-col w-full overflow-hidden bg-cream pt-20">
      <section className={cn(sectionPadding.default, "pt-32 lg:pt-48 pb-12 lg:pb-16")}>
        <div className={container.default}>
          <ScrollReveal className="flex flex-col items-center text-center mb-16 md:mb-24">
            <span className="text-[13px] md:text-sm font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
              CUSTOMER REVIEWS
            </span>
            <SectionHeading
              title="Loved by our customers."
              subtitle="A few words from the people who have enjoyed Tasty Bites by Batul."
              align="center"
              ornament={true}
            />
          </ScrollReveal>

          {/* Masonry-style layout for reviews */}
          <StaggerContainer amount={0.05} className="columns-1 md:columns-2 lg:columns-3 gap-6 lg:gap-8 max-w-7xl mx-auto space-y-6 lg:space-y-8">
            {REVIEW_IMAGES.map((imgSrc, index) => (
              <StaggerItem key={index} className="break-inside-avoid">
                <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border/40 bg-white">
                  <Image
                    src={imgSrc}
                    alt={`Customer review ${index + 1}`}
                    placeholder="blur"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-auto"
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Ending CTA Section */}
      <section className={cn(sectionPadding.default, "bg-white border-t border-border/40")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <h2 className="font-serif text-[32px] md:text-4xl lg:text-5xl text-navy mb-8">
              Have a favourite? We&apos;d love to bake it for you.
            </h2>
            <Button 
              variant="primary" 
              size="lg" 
              href="https://wa.me/9152245253" 
              className="w-full sm:w-auto"
            >
              Order via WhatsApp
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
