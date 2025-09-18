"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BrowseByStyle = () => {
  const router = useRouter();

  return (
    <div className="mx-5 my-10 rounded-2xl bg-ceramic px-5 py-16 sm:px-10 lg:mx-10 lg:my-16 lg:px-0">
      <p className="pb-14 text-center font-integral_cf text-3xl">
        BROWSE BY DRESS STYLE
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-12 max-w-full overflow-hidden gap-6 lg:h-[600px] lg:grid-rows-2 lg:px-16">
        <div
          onClick={() => {
            router.push("/search/?styles=Casual");
          }}
          className="relative min-w-full  sm:col-span-12 h-[160px] cursor-pointer rounded-xl bg-black sm:h-[200px] md:col-span-5 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Casual
          </p>
          <Image
            src={"/images/dress-styles/casual.avif"}
            width={500}
            height={600}
            unoptimized
            className="h-full w-full rounded-xl object-cover"
            alt="casual"
          />
        </div>
        <div
          onClick={() => {
            router.push("/search/?styles=Formal");
          }}
          className="relative sm:col-span-12 h-[200px] cursor-pointer rounded-xl bg-black md:col-span-7 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Formal
          </p>
          <Image
            unoptimized
            src={"/images/dress-styles/formal.avif"}
            height={1000}
            width={1000}
            className=" w-full h-full rounded-xl object-cover"
            alt="casual"
          />
        </div>
        <div
          onClick={() => {
            router.push("/search/?styles=Party");
          }}
          className="relative sm:col-span-12 h-[200px] cursor-pointer rounded-xl bg-black md:col-span-7 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Party
          </p>
          <Image
            unoptimized
            src={"/images/dress-styles/party.avif"}
            width={1000}
            height={1000}
            className="h-full w-full rounded-xl object-cover"
            alt="casual"
          />
        </div>
        <div
          onClick={() => {
            router.push("/search/?styles=Gym");
          }}
          className="relative sm:col-span-12 h-[200px] cursor-pointer rounded-xl bg-black md:col-span-5 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">Gym</p>
          <Image
            unoptimized
            src={"/images/dress-styles/gym.avif"}
            width={1000}
            height={1000}
            className="h-full w-full rounded-xl object-cover"
            alt="casual"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseByStyle;
