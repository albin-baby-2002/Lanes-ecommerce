"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface TProps {
  className?: string;
  images: TImg[];
}

export interface TImg {
  url: string;
  alt: string;
}

const ProductCarousel: React.FC<TProps> = ({ className, images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [scrollTrigger, setScrollTrigger] = useState(0);
  const length = images.length;

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
      setScrollTrigger((prev) => prev - 1);
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
      setScrollTrigger((prev) => prev + 1);
    }
  }, [emblaApi]);

  const canScrollPrev = useMemo(() => {
    return scrollTrigger <= length && emblaApi?.canScrollPrev();
  }, [emblaApi, scrollTrigger, length]);

  const canScrollNext = useMemo(() => {
    return scrollTrigger <= length && emblaApi?.canScrollNext();
  }, [emblaApi, scrollTrigger, length]);

  return (
    <div className="group relative">
      <div
        className={cn("overflow-hidden rounded-[20px]", className)}
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
          className="embla__next carousel-btn left-[5%]"
          onClick={scrollPrev}
        >
          <IoIosArrowBack />
        </button>
      )}

      {canScrollNext && (
        <button
          className="embla__next carousel-btn right-[5%]"
          onClick={scrollNext}
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
};

export default ProductCarousel;
