import { cn } from "@/lib/utils";
import { euphoria } from "@/components/fonts";
import Image from "next/image";

const CardHero = () => {
  return (
    <>
      <section className="relative h-screen max-w-[400px] mx-auto flex justify-center">
        <Image
          src={"/hero.png"}
          alt={"background"}
          layout="fill"
          objectFit="cover"
          className="-z-10"
        />
        <div className="flex flex-col gap-5 items-center justify-center z-10 text-sm">
          <h1 >WALIMATUL URUS</h1>
          <div className={cn("flex flex-col text-center text-5xl font-medium", euphoria.className)}>
            <h1>Ain</h1>
            <span className="text-3xl">&</span>
            <h1>Hidayat</h1>
          </div>
          <h3>SABTU, 12 APRIL 2024</h3>
        </div>
      </section>
     
    </>
  );
};

export default CardHero;
