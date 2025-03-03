"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BrowseByStyle = () => {
  const router = useRouter();

  return (
    <div className="mx-5 my-10 rounded-2xl bg-ceramic py-16 px-5 sm:px-10 lg:px-0 lg:mx-10 lg:my-16">
      <p className="pb-14 text-center font-integral_cf text-3xl">
        BROWSE BY DRESS STYLE
      </p>

      <div className="grid grid-cols-12 gap-6 lg:h-[600px] lg:grid-rows-2 lg:px-16">
        <div
          onClick={() => {
            router.push("/search/?styles=Casual");
          }}
          className="relative col-span-12  h-[200px] cursor-pointer rounded-xl bg-black md:col-span-5 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Casual
          </p>
          <Image
            src={"/images/dress-styles/casual.svg"}
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
          className="relative col-span-12 h-[200px] cursor-pointer rounded-xl bg-black md:col-span-7 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Formal
          </p>
          <Image
          unoptimized
            src={"/images/dress-styles/formal.svg"}
            height={1000}
            width={1000}
            className="object- h-full rounded-xl object-cover"
            alt="casual"
          />
        </div>
        <div
          onClick={() => {
            router.push("/search/?styles=Party");
          }}
          className="relative col-span-12 h-[200px] cursor-pointer rounded-xl bg-black md:col-span-7 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Party
          </p>
          <Image
          unoptimized
            src={"/images/dress-styles/party.svg"}
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
          className="relative col-span-12 h-[200px] cursor-pointer rounded-xl bg-black md:col-span-5 md:h-auto"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">Gym</p>
          <Image
          unoptimized
            src={"/images/dress-styles/gym.svg"}
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
