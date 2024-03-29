import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

export function PostMediaSlider({ postMedia }) {
  // console.log("postMedia", postMedia);

  // console.log("postMedia", postMedia);
  return (
    <Carousel
      opts={{
        align: "center",
        loop: true,
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {postMedia &&
          postMedia.map((media, index) => (

            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-1 ">
                    {media?.type === "video" && (
                      <video
                        src={media.url}
                        className="h-full w-full object-cover rounded-lg"
                        controls
                      />
                    )}{" "}
                    {media?.type === "gif" && (
                      <img
                        src={media?.url}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    )}{" "}
                    {media?.type === "image" && (
                      <img
                        src={media?.url}
                        className="h-full w-full object-cover rounded-lg"
                      />
                    )}
                    {media?.type === "doc" && (

                      <div
                        className="h-full w-96 aspect-square object-cover rounded-lg flex justify-center items-center flex-col gap-2">
                        {media?.fileName}
                        <Link target="_blank" href={media?.url}>
                          <button className="bg-blue-300 p-2 rounded-lg font-bold">
                            Download
                          </button></Link>

                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
