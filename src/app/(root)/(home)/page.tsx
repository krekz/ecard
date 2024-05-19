import Pricing from "@/components/hero/pricing";
import FeaturedDesign from "@/components/hero/featured-design";
import Hero from "@/components/hero/hero";
import Partnership from "@/components/hero/partnership";
import Footer from "@/components/hero/footer";

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

      {/* Footer section */}
      <Footer />
    </main>
  );
};

export default HomePage;
