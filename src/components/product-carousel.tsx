"use client";

import React, { useCallback, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface TProps {
  className?: string;
  images: { url: string; alt: string }[];
}

const ProductCarousel: React.FC<TProps> = ({ className, images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const [scrollTrigger, setScrollTrigger] = useState(false);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
    setScrollTrigger((prev) => !prev);
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
    setScrollTrigger((prev) => !prev);
  }, [emblaApi]);

  const canScrollPrev = useMemo(() => {
    return emblaApi?.canScrollPrev();
  }, [emblaApi, scrollTrigger]);

  const canScrollNext = useMemo(() => {
    return emblaApi?.canScrollNext();
  }, [emblaApi, scrollTrigger]);

  return (
    <div className="group relative">
      <div
        className={cn("overflow-hidden border border-black", className)}
        ref={emblaRef}
      >
        <div className="flex">
          {images.map((image, idx) => {
            return (
              <div
                key={idx}
                className="min-w-0 flex-shrink-0 flex-grow-0 basis-full"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={1000}
                  height={"1000"}
                  className=""
                />
              </div>
            );
          })}
        </div>
      </div>
      {canScrollPrev && (
        <button
          className="embla__next  left-[5%] carousel-btn "
          onClick={scrollPrev}
        >
          <IoIosArrowBack />
        </button>
      )}

      {canScrollNext && (
        <button
          className="embla__next  right-[5%] carousel-btn "
          onClick={scrollNext}
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default ProductCarousel;
