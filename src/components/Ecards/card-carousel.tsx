"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const CardCarousel = ({
  images,
}: {
  images: { url: string }[] | undefined;
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.play}
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <Image
              className="max-w-[300px] max-h-[300px]  overflow-hidden object-cover"
              src={`${process.env.NEXT_PUBLIC_STORAGE_BASE_URL}/${image.url}`}
              alt="Ecard"
              width={500}
              height={500}
              quality={75}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CardCarousel;
