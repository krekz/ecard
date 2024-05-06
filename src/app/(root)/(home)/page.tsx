import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cardsData, sectionsData } from "@/lib/constant";

const HomePage = () => {
  return (
    <main>
      <section className="container items-center p-5 text-center 2xl:text-left flex flex-wrap flex-col 2xl:flex-row min-h-[85vh] ">
        {/* <div className="hidden xl:block w-64 bg-violet-400 absolute top-[8.5rem] rounded-lg -z-10 lg:left-[19rem] h-32 rotate-12 before:content-none "></div> */}
        <div className="flex flex-col lg:w-1/2 gap-y-5">
          <h1 className="font-extrabold text-gray-900 text-7xl sm:text-8xl ">
            Digital Card Invitation
          </h1>
          <h3 className="font-medium text-xl md:text-3xl ">
            Create your own card and share with others
          </h3>
          <p className="text-md text-gray-500 w-3/4 mx-auto xl:mx-0 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
            accusamus similique iusto temporibus, rem, cupiditate optio
            voluptatibus enim magni non beatae aliquid eligendi incidunt,
            doloremque et nisi error distinctio pariatur.
          </p>
          <div className="mt-2 space-x-3 flex justify-center lg:block ">
            <Link
              href="/"
              className={`${buttonVariants({
                variant: "outline",
                size: "lg",
              })} `}
            >
              Pricing
            </Link>
            <Link
              href="/catalog"
              className={`${buttonVariants({
                variant: "default",
                size: "lg",
              })} `}
            >
              Create card
            </Link>
          </div>
        </div>
        <Image
          className="w-[60rem] 2xl:absolute 2xl:top-14 2xl:-right-32"
          src="/laptophero.png"
          width={1000}
          height={1000}
          alt="hero"
        />
      </section>

      <section>
        <div className=" p-10 flex flex-col items-center justify-center  bg-gradient-to-r from-purple-800 to-purple-400 via-purple-600  text-center min-h-[50vh]">
          <h1 className="text-5xl font-bold text-gray-900">How to create?</h1>
          <div className="flex flex-col lg:flex-row gap-5">
            {cardsData.map(
              ({ title, description, content, hasButton }, index) => (
                <Card key={index} className="mt-5 max-w-96">
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{content}</p>
                  </CardContent>
                  {hasButton && (
                    <CardFooter>
                      <Button className="mx-auto">
                        <Link href="/card">Choose</Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              )
            )}
          </div>
        </div>
      </section>

      <section className="py-14 bg-zinc-50 p-5 flex flex-col gap-2 items-center text-center">
        <h1 className="text-5xl font-bold text-gray-900">Why choose us?</h1>
        {sectionsData.map(
          (
            { imageSource, imageAlt, title, description, imagePosition },
            index
          ) => (
            <div
              key={index}
              className={cn(
                "mt-10 flex flex-col lg:flex-row gap-5 items-center max-w-[65rem]",
                imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              <Image
                src={imageSource}
                alt={imageAlt}
                width={400}
                height={300}
              />
              <div className="flex flex-col">
                <h1 className="text-3xl font-semibold">{title}</h1>
                <p>{description}</p>
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
};

export default HomePage;
