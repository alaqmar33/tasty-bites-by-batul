import Link from "next/link";
import { container } from "@/lib/design-tokens";
import ScrollReveal from "@/components/animation/ScrollReveal";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream-dark border-t border-border/60 py-12 lg:py-16 relative overflow-hidden">
      <div className={cn(container.narrow, "max-w-4xl mx-auto")}>
        {/* Main Footer Content */}
        <ScrollReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 lg:gap-12 items-start">
          
          {/* Brand Column */}
          <div className="flex flex-col">
            <h3 className="font-serif text-xl lg:text-2xl text-navy mb-5">
              Tasty Bites by Batul
            </h3>
            <p className="text-warm-brown font-medium italic mb-5 text-[17px] md:text-base">
              "Baked with love, made to satisfy."
            </p>
            <div className="text-taupe text-[15px] md:text-sm space-y-1.5">
              <p>Bandra, Mumbai</p>
              <p>Delivering Pan India</p>
              <p>Open 9 AM – 9 PM</p>
            </div>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col">
            <h4 className="font-serif text-[16px] md:text-[13px] font-bold tracking-widest uppercase text-navy/70 mb-5 lg:mt-1.5">
              Contact
            </h4>
            <ul className="space-y-3.5 text-warm-brown text-[16px] md:text-sm">
              <li>
                <a href="tel:9162245253" className="hover:text-rose transition-colors">
                  Phone: 9162245253
                </a>
              </li>
              <li>
                <a href="https://wa.me/9152245253" target="_blank" rel="noopener noreferrer" className="hover:text-rose transition-colors">
                  WhatsApp: 9152245253
                </a>
              </li>
              <li>
                <a href="mailto:batulamreliwala12@gmail.com" className="hover:text-rose transition-colors break-words">
                  Email: batulamreliwala12@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Column */}
          <div className="flex flex-col">
            <h4 className="font-serif text-[16px] md:text-[13px] font-bold tracking-widest uppercase text-navy/70 mb-5 lg:mt-1.5">
              Follow
            </h4>
            <ul className="space-y-3.5 text-warm-brown text-[16px] md:text-sm">
              <li>
                <a 
                  href="https://instagram.com/tastybitesbybatul" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-rose transition-colors"
                >
                  Instagram: tastybitesbybatul
                </a>
              </li>
              <li>
                <span className="hover:text-rose transition-colors cursor-default">
                  Facebook: Batul Amreliwala
                </span>
              </li>
            </ul>
          </div>

          {/* Explore Column */}
          <div className="flex flex-col">
            <h4 className="font-serif text-[16px] md:text-[13px] font-bold tracking-widest uppercase text-navy/70 mb-5 lg:mt-1.5">
              Explore
            </h4>
              <ul className="space-y-3.5 text-warm-brown text-[16px] md:text-sm">
                <li>
                  <Link href="/" className="hover:text-rose transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/menu" className="hover:text-rose transition-colors">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-rose transition-colors">
                    My Story
                  </Link>
                </li>
                <li>
                  <Link href="/gallery" className="hover:text-rose transition-colors">
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/reviews" className="hover:text-rose transition-colors">
                    Customer Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-rose transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
          </div>

        </ScrollReveal>

        {/* Bottom Copyright */}
        <ScrollReveal delay={0.1}>
          <div className="mt-12 lg:mt-16 pt-8 border-t border-border/40 flex justify-center text-center">
            <p className="text-[13px] md:text-xs text-taupe font-medium tracking-wide">
              &copy; 2026 Tasty Bites by Batul. All rights reserved.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
