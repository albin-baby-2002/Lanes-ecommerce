import React from "react";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { Pricing } from "@/components/pricing";
import MinusIcon from "@/assets/icons/minus-icon";
import PlusIcon from "@/assets/icons/plus-icon";

const ProductImgInfo = () => {
  return (
    <div className="grid grid-cols-[150px_450px_1fr] gap-4">
      <div className="grid max-h-min gap-3">
        <Image
          height={400}
          width={400}
          src={"/images/tshirts/image 1.svg"}
          alt=" product"
          className="rounded-2xl"
        />
        <Image
          height={400}
          width={400}
          src={"/images/tshirts/image 1.svg"}
          alt=" product"
          className="rounded-2xl"
        />
        <Image
          height={400}
          width={400}
          src={"/images/tshirts/image 1.svg"}
          alt=" product"
          className="rounded-2xl"
        />
      </div>
      <div className="min-h-full">
        <Image
          height={1000}
          width={1000}
          src={"/images/tshirts/image 1.svg"}
          alt=" product"
          className="h-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <p className="mb-3 font-integral_cf text-[40px] font-bold">
          ONE LIFE GRAPHIC T SHIRT
        </p>

        <StarRating size={"medium"} rating={4.5} />

        <Pricing price={200} discount={10} className="mt-4 text-[28px]" />

        <p className="mt-3 border-b pb-4 text-lg text-black/60">
          This graphic t-shirt which is perfect for any occasion. Crafted from a
          soft and breathable fabric, it offers superior comfort and style.
        </p>

        <div className="border-b py-4 text-lg text-black/60">
          <p>Select colors</p>
          <div className="mt-2 flex gap-3">
            <div className="flex size-8 items-center justify-center rounded-[50%] bg-black p-1">
              <IoMdCheckmark className="rounded-full" size={16} color="#FFFF" />
            </div>
            <div className="flex size-8 items-center justify-center rounded-[50%] bg-slate-500 p-1">
              <IoMdCheckmark className="rounded-full" size={16} color="#FFFF" />
            </div>
            <div className="flex size-8 items-center justify-center rounded-[50%] bg-red-800 p-1">
              <IoMdCheckmark className="rounded-full" size={16} color="#FFFF" />
            </div>
          </div>
        </div>

        <div className="border-b py-4 text-lg text-black/60">
          <p>Choose Size</p>

          <div className="mt-4 flex gap-3">
            <div className="rounded-3xl bg-ceramic px-6 py-2 text-lg text-black/70">
              Small
            </div>
          </div>
        </div>

        <div className="flex gap-5 pt-6  text-lg text-black/60">
          <div className="flex items-center gap-3 rounded-full bg-ceramic px-3">
            <Button size={"icon"} variant={"ghost"}>
              <MinusIcon />
            </Button>

            <p>1</p>

            <Button size={"icon"} variant={"ghost"}>
              <PlusIcon />
            </Button>
          </div>

          <Button className="max-w-96 grow rounded-full py-[28px] text-lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductImgInfo;
