import Hero from "@/components/home/Hero";
import FeaturedFavourites from "@/components/home/FeaturedFavourites";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream-dark">
      <Hero />
      <FeaturedFavourites />
      {/* Future sections will go here. */}
    </main>
  );
}
