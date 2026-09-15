"use client";

import { useState, type FormEvent } from "react";

import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animation/ScrollReveal";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import { sectionPadding, container } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface ContactItem {
  label: string;
  value: string;
  href?: string;
}

interface ContactSection {
  heading: string;
  items: ContactItem[];
}

const CONTACT_INFO: ContactSection[] = [
  {
    heading: "Contact",
    items: [
      { label: "Phone", value: "9162245253", href: "tel:9162245253" },
      { label: "WhatsApp", value: "9152245253", href: "https://wa.me/9152245253" },
      { label: "Email", value: "batulamreliwala12@gmail.com", href: "mailto:batulamreliwala12@gmail.com" },
    ],
  },
  {
    heading: "Find Us",
    items: [
      { label: "Location", value: "Bandra, Mumbai" },
    ],
  },
  {
    heading: "Delivery",
    items: [
      { label: "Coverage", value: "Pan India" },
    ],
  },
  {
    heading: "Hours",
    items: [
      { label: "Open", value: "9 AM – 9 PM" },
    ],
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-cream relative">
      {/* ──────────────────────────────────────────────
          CONTACT HERO
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.default, "pt-32 lg:pt-48 pb-12 lg:pb-16")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <span className="text-[13px] md:text-sm font-medium uppercase tracking-[0.25em] text-taupe mb-4 block">
              Get in Touch
            </span>
            <SectionHeading
              title="Let's make something delicious."
              subtitle="Have a question, want to place an order, or simply craving something sweet? We'd love to hear from you."
              align="center"
              ornament={false}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          TWO-COLUMN CONTACT SECTION
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.compact)}>
        <div className={cn(container.narrow, "max-w-5xl mx-auto")}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* LEFT — Order Introduction */}
            <ScrollReveal delay={0.1}>
              <div className="flex flex-col">
                <h3 className="font-serif text-[32px] md:text-4xl text-navy mb-6 leading-tight">
                  Come say hello.
                </h3>
                <p className="text-warm-brown text-base lg:text-lg leading-relaxed mb-10">
                  Whether you&apos;re looking to place an order, enquire about a custom bake, or simply want to say hello — reach out directly through WhatsApp or Instagram. We&apos;d love to hear from you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <Button variant="whatsapp" size="lg" pill href="https://wa.me/9152245253" className="w-full sm:w-auto text-center justify-center">
                    Order via WhatsApp
                  </Button>
                  <Button variant="outline" size="lg" href="https://instagram.com/tastybitesbybatul" className="w-full sm:w-auto text-center justify-center">
                    Message on Instagram
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT — Info Panel */}
            <ScrollReveal delay={0.2} className="w-full">
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border/40">
                <StaggerContainer amount={0.1} className="divide-y divide-border/50">
                  {CONTACT_INFO.map((section) => (
                    <StaggerItem key={section.heading} className="py-6 first:pt-0 last:pb-0">
                      <h4 className="text-[13px] md:text-sm font-bold uppercase tracking-[0.2em] text-taupe mb-4">
                        {section.heading}
                      </h4>
                      <div className="space-y-4">
                        {section.items.map((item) => (
                          <div key={item.label} className="flex flex-col">
                            <span className="text-[15px] md:text-base text-taupe/80 mb-0.5">{item.label}</span>
                            {item.href ? (
                              <a
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="text-navy font-medium text-[17px] md:text-lg hover:text-rose transition-colors break-words"
                              >
                                {item.value}
                              </a>
                            ) : (
                              <span className="text-navy font-medium text-[17px] md:text-lg">
                                {item.value}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────
          DECORATIVE DIVIDER
          ────────────────────────────────────────────── */}
      <div className={cn(sectionPadding.compact, "flex justify-center")}>
        <div className="flex items-center gap-3">
          <span className="h-px w-16 bg-rose/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
          <span className="h-px w-16 bg-rose/40" />
        </div>
      </div>

      {/* ──────────────────────────────────────────────
          "ANY QUESTIONS?" ENQUIRY SECTION
          ────────────────────────────────────────────── */}
      <EnquirySection />

      {/* ──────────────────────────────────────────────
          FINAL CTA SECTION
          ────────────────────────────────────────────── */}
      <section className={cn(sectionPadding.default, "bg-cream-dark")}>
        <div className={container.narrow}>
          <ScrollReveal className="flex flex-col items-center text-center">
            <SectionHeading
              title="Your next favourite bake is just a message away."
              subtitle="Browse the menu, choose your favourites, and get in touch."
              align="center"
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

/* ──────────────────────────────────────────────
   ENQUIRY FORM — Opens WhatsApp with pre-filled message
   ────────────────────────────────────────────── */

function EnquirySection() {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState<{ name?: string; question?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: { name?: string; question?: string } = {};
    if (!name.trim()) newErrors.name = "Please enter your name.";
    if (!question.trim()) newErrors.question = "Please enter your question.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const message = `Hi Batul! My name is ${name.trim()}. I have a question: ${question.trim()}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/9152245253?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const inputBase =
    "w-full rounded-xl border border-border bg-white px-5 py-3.5 text-navy text-base placeholder:text-taupe/50 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy/40 transition-all duration-200";

  return (
    <section className={cn(sectionPadding.compact)}>
      <div className={cn(container.narrow, "max-w-2xl mx-auto")}>
        <ScrollReveal>
          <div className="flex flex-col items-center text-center mb-10">
            <h3 className="font-serif text-[32px] md:text-4xl text-navy mb-4">
              Any questions?
            </h3>
            <p className="text-warm-brown text-[17px] md:text-lg leading-relaxed max-w-lg">
              Not sure what to order or have something you&apos;d like to ask? Send us a message and we&apos;ll be happy to help.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Your name"
                className={cn(inputBase, errors.name && "border-rose ring-1 ring-rose/30")}
              />
              {errors.name && (
                <p className="text-rose text-sm mt-2 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Question */}
            <div>
              <textarea
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                  if (errors.question) setErrors((prev) => ({ ...prev, question: undefined }));
                }}
                placeholder="What would you like to ask?"
                rows={4}
                className={cn(inputBase, "resize-none", errors.question && "border-rose ring-1 ring-rose/30")}
              />
              {errors.question && (
                <p className="text-rose text-sm mt-2 ml-1">{errors.question}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button type="submit" variant="whatsapp" size="lg" pill className="w-full sm:w-auto">
                Send via WhatsApp
              </Button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
