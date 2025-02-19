import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <div className="relative flex flex-col  lg:flex-row md:rounded-xl bg-ceramic px-3 sm:px-10 lg:ps-20">
      <div className=" basis-full lg:basis-1/2 py-10 sm:py-14 lg:py-28">
        <p className="lg:absolute md:px-10 lg:px-0 text-center lg:text-left lg:max-w-[60%] font-integral_cf text-4xl sm:text-[44px] lg:text-6xl lg:font-bold font-extrabold leading-[140%]">
          FIND CLOTHES THAT MATCHES YOUR STYLE
        </p>

        <div className="lg:mt-[150px] grid gap-10 text-sm text-center mt-6 lg:text-left">
          <p className="text-black/60  px-5 md:px-40 lg:px-0">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>

          <Link href={"/search"}>
            <div className=" mx-auto w-max rounded-full bg-black px-16 py-[14px] text-sm text-white">
              Shop Now
            </div>
          </Link>

          <div className="lg:flex grid grid-cols-2 sm:grid-cols-3 gap-y-4  divide-x">
            <div className="lg:pr-5">
              <p className="font-satoshi text-3xl font-bold">10,000+</p>
              <p className="text-sm text-black/60">Orders Delivered</p>
            </div>
            <div className="lg:px-5">
              <p className="font-satoshi text-3xl font-bold">100+</p>
              <p className="text-sm text-black/60">International Brands</p>
            </div>
            <div className="ps-5 col-span-2 sm:col-span-1">
              <p className="font-satoshi text-3xl font-bold">1500+</p>
              <p className="text-sm text-black/60">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex justify-center lg:block basis-full  lg:basis-1/2">
        <Image
          src="/images/hero-img.svg"
          height={760}
          width={1000}
          alt="patient"
          className="h-full rounded-br-xl rounded-tr-xl object-cover hidden xl:block object-right "
        />

        <Image
          src="/images/hero-mobile.svg"
          height={448}
          width={390}
          alt="patient"
          className="h-full lg:w-full rounded-br-xl rounded-tr-xl object-cover xl:hidden  "
        />
      </div>
    </div>
  );
};

export default HeroSection;
