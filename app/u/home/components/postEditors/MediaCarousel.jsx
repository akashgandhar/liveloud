import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function MediaCarousel({ postMedia }) {
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className=" w-full md:w-[80%]"
    >
      <CarouselContent>
        {postMedia &&
          postMedia.map((media, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-1">
                    <img
                      src={URL.createObjectURL(media.file)}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
