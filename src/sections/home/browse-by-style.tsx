import Image from "next/image";
import React from "react";

const BrowseByStyle = () => {
  return (
    <div className="mx-10 my-16 rounded-2xl bg-ceramic py-16">
      <p className="pb-14 text-center font-integral_cf text-4xl">
        BROWSE BY DRESS STYLE
      </p>

      <div className="grid h-[600px] grid-cols-12 grid-rows-2 gap-6 px-16">
        <div className=" relative  col-span-5 rounded-xl bg-black">
            <p className=" absolute top-[5%] text-2xl font-bold left-[5%]">Casual</p>
          <Image
            src={"/images/dress-styles/casual.svg"}
            width={1000}
            height={1000}
            className="h-full rounded-xl w-full object-cover"
            alt="casual"
          />
        </div>
        <div className=" relative  col-span-7 rounded-xl bg-black">
            <p className=" absolute top-[5%] text-2xl font-bold left-[5%]">Formal</p>
          <Image
            src={"/images/dress-styles/formal.svg"}
            width={1000}
            height={1000}
            className="h-full rounded-xl w-full object-cover"
            alt="casual"
          />
        </div>
        <div className=" relative  col-span-7 rounded-xl bg-black">
            <p className=" absolute top-[5%] text-2xl font-bold left-[5%]">Party</p>
          <Image
            src={"/images/dress-styles/party.svg"}
            width={1000}
            height={1000}
            className="h-full rounded-xl w-full object-cover"
            alt="casual"
          />
        </div>
        <div className=" relative  col-span-5 rounded-xl bg-black">
            <p className=" absolute top-[5%] text-2xl font-bold left-[5%]">Gym</p>
          <Image
            src={"/images/dress-styles/gym.svg"}
            width={1000}
            height={1000}
            className="h-full rounded-xl w-full object-cover"
            alt="casual"
          />
        </div>
      </div>
    </div>
  );
};

export default BrowseByStyle;
