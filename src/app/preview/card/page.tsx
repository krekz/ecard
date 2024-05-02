import ECardContent from "@/components/card-content";
import Bar from "@/components/card-navbar";
import CardHero from "@/components/card-hero";


const CardPage = () => {
  return (
    <main className="relative">
       <CardHero />
       <ECardContent />
       <Bar />
    </main>
  );
};

export default CardPage;
