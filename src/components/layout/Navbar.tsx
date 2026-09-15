"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "My Story", href: "/about" },
  { name: "Gallery", href: "/gallery" },
  { name: "Customer Reviews", href: "/reviews" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Prevent hydration mismatch on scroll state
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Animation variants
  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariants: Variants = {
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    open: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    closed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <>
      {/* Navbar Header */}
      <motion.nav
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out",
          mounted && (isScrolled || isOpen)
            ? "bg-cream/95 backdrop-blur-md shadow-sm border-b border-border-light py-3"
            : "bg-transparent py-5 lg:py-6"
        )}
        initial={false}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo Area */}
            <Link 
              href="/" 
              onClick={closeMenu}
              className="relative z-50 flex items-center group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy rounded-sm"
              aria-label="Tasty Bites by Batul Home"
            >
              <Image
                src="/images/logo.jpg"
                alt="Tasty Bites by Batul"
                width={128}
                height={128}
                quality={95}
                className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 rounded-full object-cover group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-warm-brown hover:text-navy transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy rounded-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center">
              <Button variant="whatsapp" size="sm" pill href="https://wa.me/9152245253">
                Order via WhatsApp
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              className="md:hidden relative z-50 p-2 -mr-2 text-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy rounded-full"
              onClick={toggleMenu}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <div className="w-6 h-5 flex flex-col justify-between items-end">
                <motion.span
                  className="block h-0.5 bg-current rounded-full"
                  animate={{ 
                    width: isOpen ? "1.5rem" : "1.5rem",
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 9 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-0.5 bg-current rounded-full"
                  animate={{ 
                    width: isOpen ? "0rem" : "1rem",
                    opacity: isOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block h-0.5 bg-current rounded-full"
                  animate={{ 
                    width: isOpen ? "1.5rem" : "1.25rem",
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? -9 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream flex flex-col md:hidden pt-24 pb-8 px-6"
            variants={shouldReduceMotion ? {} : menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div 
              className="flex-1 flex flex-col justify-center gap-6"
              variants={shouldReduceMotion ? {} : containerVariants}
            >
              {NAV_LINKS.map((link) => (
                <motion.div key={link.name} variants={shouldReduceMotion ? {} : itemVariants}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block font-serif text-3xl text-navy hover:text-navy-light transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="mt-auto pt-8 border-t border-border-light"
              variants={shouldReduceMotion ? {} : itemVariants}
            >
              <p className="text-sm uppercase tracking-widest text-taupe mb-4 font-medium">
                Say Hello
              </p>
              <Button variant="whatsapp" fullWidth pill href="https://wa.me/9152245253">
                Order via WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
