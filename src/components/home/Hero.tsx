import Button from "@/components/ui/Button";
import StaggerContainer, { StaggerItem } from "@/components/animation/StaggerContainer";
import ImageReveal from "@/components/animation/ImageReveal";
import ParallaxImage from "@/components/animation/ParallaxImage";
import GinghamPattern from "@/components/decorative/GinghamPattern";
import ScallopedEdge from "@/components/decorative/ScallopedEdge";

export default function Hero() {
  return (
    <>
      <section className="relative bg-cream pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Subtle Gingham background pattern */}
        <GinghamPattern intensity={0.03} className="absolute inset-0 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left: Text Content */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-start lg:pt-8">
              <StaggerContainer delay={0.1} trigger="mount">
                <StaggerItem>
                  <p className="text-[13px] uppercase tracking-[0.2em] text-taupe mb-5 font-medium">
                    Bandra, Mumbai · Pan India
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <h1 className="font-serif text-[42px] sm:text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.1] mb-6">
                    Baked with love.<br />
                    <span className="text-warm-brown italic opacity-90">Made to satisfy.</span>
                  </h1>
                </StaggerItem>
                
                <StaggerItem>
                  <p className="text-lg md:text-xl text-warm-brown leading-relaxed mb-10 max-w-lg">
                    From gooey brownies to dreamy cookies, every bite is made with love.
                  </p>
                </StaggerItem>
                
                <StaggerItem>
                  <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 w-full sm:w-auto">
                    <Button variant="primary" size="lg" pill href="/menu" className="w-full sm:w-auto">
                      Explore the Menu
                    </Button>
                    <Button variant="whatsapp" size="lg" pill href="https://wa.me/9152245253" className="w-full sm:w-auto">
                      Order via WhatsApp
                    </Button>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>

            {/* Right: Editorial Image */}
            <div className="lg:col-span-6 xl:col-span-7 relative mt-10 lg:mt-0">
              {/* Decorative organic background blob */}
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-blush/60 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl -z-10" 
                aria-hidden="true" 
              />
              
              <ImageReveal 
                direction="down" 
                delay={0.3}
                trigger="mount"
                className="relative z-10 aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full max-w-[500px] lg:max-w-none ml-auto rounded-[2.5rem] overflow-hidden shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700 ease-out"
              >
                <ParallaxImage 
                  src="/images/hero/berliners.jpg" 
                  alt="Delicious handmade filled berliners in a box" 
                  fill 
                  speed={0.25}
                  priority
                  containerClassName="absolute inset-0 h-full w-full"
                />
              </ImageReveal>

              {/* Overlapping decorative element */}
              <div className="absolute -bottom-6 -left-6 lg:bottom-12 lg:-left-12 z-20 pointer-events-none hidden sm:block">
                 <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-4 shadow-lg border border-border flex flex-col items-center justify-center transform rotate-3">
                    <span className="font-serif text-2xl text-navy">100%</span>
                    <span className="text-xs uppercase tracking-widest text-taupe font-medium">Handcrafted</span>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Decorative transition to next section */}
      <div className="bg-cream-dark relative z-20">
        <ScallopedEdge color="var(--color-cream)" />
      </div>
    </>
  );
}
