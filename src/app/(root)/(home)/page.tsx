import Pricing from "@/components/hero/pricing";
import FeaturedDesign from "@/components/hero/featured-design";
import Hero from "@/components/hero/hero";
import Partnership from "@/components/hero/partnership";
import Footer from "@/components/hero/footer";
import { Faq } from "@/components/hero/faq";

const HomePage = () => {
  return (
    <main>
      {/* Hero section*/}
      <Hero />

      {/* PartnerShip section*/}
      <Partnership />

      {/* Featured Design section */}
      <FeaturedDesign />

      {/* Pricing section */}
      <Pricing />

      {/* FAQ section */}
      <Faq />
      {/* Footer section */}
      <Footer />
    </main>
  );
};

export default HomePage;
