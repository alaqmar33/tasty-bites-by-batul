import React from "react";
import { sectionPadding, container } from "@/lib/design-tokens";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import { cn } from "@/lib/utils";

type MenuItem = {
  name: string;
  price?: string;
  note?: string;
  flavours?: string[];
};

type MenuCategory = {
  id: string;
  title: string;
  items: MenuItem[];
};

const MENU_DATA: MenuCategory[] = [
  {
    id: "gourmet-cookies",
    title: "Gourmet Cookies",
    items: [
      {
        name: "Classic Flavours",
        price: "6 pieces — ₹800",
        flavours: [
          "Marshmallow Cookies",
          "Chocolate Lava Cookies",
          "Double Chocolate Chip Cookies",
          "Berry Cream Cheese Cookies",
          "Chocolate Chip with Brownie",
          "Chocolate Molten Lava Cookies",
          "Snikerdoodle Cookies",
          "Almond Cookies"
        ]
      },
      {
        name: "Premium Flavours",
        price: "6 pieces — ₹600",
        flavours: [
          "Brown Butter Chocolate Chip Cookies"
        ]
      }
    ]
  },
  {
    id: "berliners",
    title: "Berliners",
    items: [
      {
        name: "Flavours",
        flavours: [
          "Chocolate",
          "Tiramisu",
          "Vanilla",
          "Salted Caramel Mousse",
          "Nutella",
          "Cookie and Cream"
        ]
      },
      {
        name: "Nutella",
        price: "₹150 per piece",
        note: "6-piece box — ₹1000"
      },
      {
        name: "Other flavours",
        price: "₹130 per piece"
      }
    ]
  },
  {
    id: "brownies",
    title: "Brownies",
    items: [
      {
        name: "Brownie Box",
        price: "8 pieces — ₹800",
        flavours: [
          "Overload Chocolate",
          "Salted Caramel",
          "Oreo",
          "Biscoff",
          "Nutella"
        ]
      }
    ]
  },
  {
    id: "buns-and-rolls",
    title: "Buns & Rolls",
    items: [
      {
        name: "Korean Cream Cheese Garlic Buns",
        price: "4 pieces — ₹800"
      },
      {
        name: "Cinnamon Rolls",
        price: "6 pieces — ₹500"
      },
      {
        name: "Chocolate Cinnamon Rolls",
        price: "6 pieces — ₹700"
      }
    ]
  },
  {
    id: "tiramisu",
    title: "Tiramisu",
    items: [
      {
        name: "Tiramisu Balls with Mascarpone Dip",
        price: "Price on request"
      },
      {
        name: "Signature Tiramisu",
        price: "Starting at ₹250 · 250g",
        note: "Available in custom sizes & weights. Pricing varies by size.",
        flavours: [
          "Chocolate Tiramisu",
          "Tiramisu",
          "Strawberry Misu"
        ]
      }
    ]
  },
  {
    id: "tea-time-cakes",
    title: "Tea Time Cakes",
    items: [
      {
        name: "Pound Cakes & Loaves",
        price: "Starting at ₹250 · 200g",
        note: "Available in custom sizes & weights. Pricing varies by size.",
        flavours: [
          "Lemon Pound Cake",
          "Strawberry Cream Cheese Pound Cake",
          "Mawa Cake",
          "Orange Cranberry",
          "Lemon Almond"
        ]
      }
    ]
  }
];

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-cream relative">
      {/* 
        HEADER SECTION 
      */}
      <section className={cn(sectionPadding.default, "pt-32 lg:pt-48 pb-12 lg:pb-16")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-xs font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
              The Menu
            </span>
            <SectionHeading 
              title="Something delicious awaits." 
              subtitle="Explore our handcrafted selection of cookies, brownies, Berliners, cakes and more."
              align="center"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 
        CATEGORY NAVIGATION (Sticky)
      */}
      <div className="sticky top-20 z-40 bg-cream/90 backdrop-blur-md border-y border-border py-4 shadow-sm">
        <div className={container.default}>
          <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar snap-x pb-2 -mb-2 text-sm font-medium text-navy">
            {MENU_DATA.map((category) => (
              <a 
                key={category.id} 
                href={`#${category.id}`}
                className="whitespace-nowrap snap-start hover:text-rose transition-colors relative group"
              >
                {category.title}
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-rose scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* 
        MENU SECTIONS (Pure Text Layout - Strict Top to Bottom)
      */}
      <div className={cn(sectionPadding.compact, "space-y-16 lg:space-y-24 pb-16 lg:pb-24")}>
        {MENU_DATA.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-48">
            <div className={cn(container.narrow, "max-w-3xl mx-auto")}>
              <ScrollReveal>
                <div className="flex items-center gap-5 mb-10">
                  <h2 className="font-serif text-[28px] md:text-[32px] lg:text-[36px] text-navy whitespace-nowrap">
                    {category.title}
                  </h2>
                  <div className="h-px w-full flex-grow bg-border" />
                </div>
              </ScrollReveal>

              <StaggerContainer amount={0.1} className="flex flex-col gap-10">
                {category.items.map((item) => (
                  <StaggerItem 
                    key={item.name} 
                    className="flex flex-col"
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b border-border/50 pb-3 mb-4 gap-2 sm:gap-4">
                      <h3 className="font-serif text-xl lg:text-2xl text-navy">{item.name}</h3>
                      {item.price && (
                        <span className="font-medium text-rose sm:whitespace-nowrap sm:text-right text-base lg:text-lg">{item.price}</span>
                      )}
                    </div>
                    
                    {item.note && (
                      <p className="text-sm text-taupe font-normal italic mb-3">
                        {item.note}
                      </p>
                    )}

                    {item.flavours && item.flavours.length > 0 && (
                      <ul className="flex flex-col space-y-2.5 mt-1">
                        {item.flavours.map((flavour) => (
                          <li key={flavour} className="text-warm-brown text-base flex items-start">
                            <span className="mr-3 text-taupe/60">•</span>
                            <span>{flavour}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
