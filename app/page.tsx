import Hero from "./components/Hero";
import MarqueeDivider from "./components/MarqueeDivider";
import BentoEngine from "./components/BentoEngine";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen pb-0 overflow-x-hidden bg-cream-puff">
      
      <Hero />

      <MarqueeDivider />

      <BentoEngine />

      <Footer />

    </div>
  );
}