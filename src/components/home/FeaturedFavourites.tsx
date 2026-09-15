"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import { sectionPadding, container } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface Product {
  name: string;
  cardDescription: string;
  modalDescription: string;
  image: string;
  // Future fields placeholders as requested
  ingredients?: string;
  preparationProcess?: string;
  servingSuggestions?: string;
  storageInformation?: string;
  customizationInfo?: string;
  pricing?: string;
  additionalImages?: string[];
}

const FAVOURITES: Product[] = [
  {
    name: "Cinnamon Rolls",
    cardDescription: "Soft, warm and generously topped with creamy frosting.",
    modalDescription: "Soft, pillowy rolls layered with fragrant cinnamon and a rich, buttery sweetness, finished with a generous coating of creamy frosting. Warm, comforting and indulgent in every bite.",
    image: "/images/products/cinnamon-rolls.jpg",
  },
  {
    name: "London Cake",
    cardDescription: "Rich, indulgent chocolate cake made for serious chocolate cravings.",
    modalDescription: "A rich, indulgent chocolate bake with a deep cocoa flavour and a wonderfully moist, dense texture. Finished with a smooth chocolate topping for an extra layer of richness in every slice.",
    image: "/images/products/london-cake.jpg",
  },
  {
    name: "Red Velvet Cookies",
    cardDescription: "Soft, rich red velvet cookies packed with chocolate.",
    modalDescription: "Soft and chewy red velvet cookies with a rich cocoa note, studded generously with chocolate. Slightly crisp at the edges and indulgently soft in the centre.",
    image: "/images/products/red-velvet-cookies.jpg",
  },
];

export default function FeaturedFavourites() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll lock when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  // Keyboard accessibility (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProduct(null);
    };
    if (selectedProduct) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProduct]);

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20, 
      scale: prefersReducedMotion ? 1 : 0.98 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1 
    },
    exit: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 20, 
      scale: prefersReducedMotion ? 1 : 0.98 
    }
  };

  return (
    <section className={cn(sectionPadding.default, "bg-cream-dark relative z-10")}>
      <div className={container.default}>
        
        {/* Section Header */}
        <ScrollReveal className="flex flex-col items-center text-center mb-16 lg:mb-24">
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
            Our Favourites
          </span>
          <SectionHeading 
            title="A little taste of what's loved" 
            subtitle="From indulgent bakes to irresistible cookies, every treat is made with love."
            align="center"
          />
        </ScrollReveal>

        {/* Product Grid */}
        <StaggerContainer 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          amount={0.1}
        >
          {FAVOURITES.map((product) => (
            <StaggerItem key={product.name} className="flex h-full">
              <button
                type="button"
                onClick={() => setSelectedProduct(product)}
                className="flex h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-4 rounded-3xl text-left group"
                aria-haspopup="dialog"
                aria-expanded={selectedProduct?.name === product.name}
              >
                <Card 
                  variant="elevated" 
                  padding="none" 
                  rounded="3xl"
                  className="w-full h-full flex flex-col overflow-hidden bg-cream"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-border/20">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <h3 className="font-serif text-2xl text-navy mb-3">
                      {product.name}
                    </h3>
                    <p className="text-warm-brown text-base leading-relaxed mb-8 flex-grow">
                      {product.cardDescription}
                    </p>
                    
                    {/* Subtle interaction affordance */}
                    <div className="mt-auto flex items-center text-rose font-medium text-sm tracking-wide">
                      <span className="relative">
                        Explore
                        <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-rose scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                      </span>
                      <svg 
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </button>
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-navy/70 backdrop-blur-sm"
              onClick={() => setSelectedProduct(null)}
              aria-hidden="true"
            />

            {/* Modal Dialog */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-cream rounded-2xl md:rounded-3xl shadow-2xl z-10 flex flex-col lg:flex-row overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 lg:top-6 lg:right-6 z-20 p-2.5 rounded-full bg-cream/90 hover:bg-white text-navy transition-colors backdrop-blur-md focus:outline-none focus-visible:ring-2 focus-visible:ring-navy shadow-sm"
                aria-label="Close details"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Image Section */}
              <div className="relative w-full lg:w-1/2 aspect-[4/3] lg:aspect-auto min-h-[300px] lg:min-h-[500px] bg-border/20">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-full lg:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col justify-center bg-cream">
                <h2 id="modal-title" className="font-serif text-3xl lg:text-4xl text-navy mb-6">
                  {selectedProduct.name}
                </h2>
                
                <div className="text-warm-brown space-y-6">
                  <p className="leading-relaxed text-base lg:text-lg">
                    {selectedProduct.modalDescription}
                  </p>
                  
                  {/* Future extensibility stubs */}
                  {selectedProduct.ingredients && (
                    <div>
                      <h4 className="font-medium text-navy text-sm uppercase tracking-wider mb-2">Ingredients</h4>
                      <p className="text-sm">{selectedProduct.ingredients}</p>
                    </div>
                  )}
                  {selectedProduct.pricing && (
                    <div className="pt-4 border-t border-border/60 mt-8">
                      <p className="font-medium text-rose">{selectedProduct.pricing}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
