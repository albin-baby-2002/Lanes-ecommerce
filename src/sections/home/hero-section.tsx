import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative flex ps-20  rounded-xl bg-ceramic">
      <div className="basis-1/2 py-28">
        <p className="absolute max-w-[60%] font-integral_cf text-6xl font-bold">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </p>

        <div className="mt-[150px] grid gap-10">
          <p className="text-black/60">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Button className="h-[50px] w-min rounded-full px-16">
            Shop Now
          </Button>

          <div className="flex divide-x">
            <div className="pr-5">
              <p className="font-satoshi text-3xl font-bold">200+</p>
              <p className="text-sm text-black/60">International Brands</p>
            </div>
            <div className="px-5">
              <p className="font-satoshi text-3xl font-bold">200+</p>
              <p className="text-sm text-black/60">International Brands</p>
            </div>
            <div className="ps-5">
              <p className="font-satoshi text-3xl font-bold">200+</p>
              <p className="text-sm text-black/60">International Brands</p>
            </div>
          </div>
        </div>
      </div>

      <div className="basis-1/2  ">
        <Image
          src="/images/hero-img.svg"
          height={760}
          width={1000}
          alt="patient"
          className="  object-cover h-full object-right rounded-tr-xl rounded-br-xl"
        />
      </div>
    </div>
  );
};

export default HeroSection;
