"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const BrowseByStyle = () => {
  const router = useRouter();

  return (
    <div className="mx-10 my-16 rounded-2xl bg-ceramic py-16">
      <p className="pb-14 text-center font-integral_cf text-3xl">
        BROWSE BY DRESS STYLE
      </p>

      <div className="grid h-[600px] grid-cols-12 grid-rows-2 gap-6 px-16">
        <div
          onClick={() => {
            router.push("/search/?styles=Casual");
          }}
          className="relative col-span-5 cursor-pointer rounded-xl bg-black"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Casual
          </p>
          <Image
            src={"/images/dress-styles/casual.svg"}
            width={500}
            height={600}
            className="h-full w-full rounded-xl object-cover"
            alt="casual"
          />
        </div>
        <div
          onClick={() => {
            router.push("/search/?styles=Formal");
          }}
          className="relative col-span-7 cursor-pointer rounded-xl bg-black"
        >
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Formal
          </p>
          <Image
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
        className="relative cursor-pointer col-span-7 rounded-xl bg-black">
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">
            Party
          </p>
          <Image
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
        className="relative col-span-5 cursor-pointer rounded-xl bg-black">
          <p className="absolute left-[5%] top-[5%] text-2xl font-bold">Gym</p>
          <Image
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
