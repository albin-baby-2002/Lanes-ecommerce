import React from "react";
import StarRating from "@/components/star-rating";
import Image from "next/image";
import { Pricing } from "@/components/pricing";
import ColorSelector from "./components/color-selector";
import SizeSelector from "./components/size-selector";
import AddToCart from "./components/add-to-cart";

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
          soft and breathable fabric, it offers superior comfort and style. soft
          and breathable fabric, it offers superior comfort and style. soft and
          breathable fabric, it offers superior comfort and style. soft and
          breathable fabric, it offers superior comfort and style. soft and
          breathable fabric, it offers superior comfort and style.
        </p>

        <ColorSelector colors={[{ label: "Red", color: "red" }]} />

        <SizeSelector sizes={["Small", "Large", "Medium"]} />

        <AddToCart />
      </div>
    </div>
  );
};

export default ProductImgInfo;
