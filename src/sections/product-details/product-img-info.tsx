"use client";
import React, { useState } from "react";
import StarRating from "@/components/star-rating";
import Image from "next/image";
import { Pricing } from "@/components/pricing";
import AddToCart from "./components/add-to-cart";
import { TProductVariantDetails } from "@/lib/db-services/products";
import { cn } from "@/lib/utils";
import { IoMdCheckmark } from "react-icons/io";
import { useRouter } from "next/navigation";

const sizes = {
  M: "Medium",
  L: "Large",
  S: "Small",
  XL:'Extra Large'
};

const ProductImgInfo = ({
  variantDetails,
}: {
  variantDetails: TProductVariantDetails;
}) => {
  const [imgSelected, setImgSelected] = useState(
    variantDetails.productVariantImages[0] || "",
  );

  const router = useRouter();

  return (
    <div className="grid w-full max-w-full gap-4 overflow-hidden lg:grid-cols-[500px_1fr]  2xl:grid-cols-[600px_1fr]">
      <div className="flex max-w-full flex-col-reverse gap-4 overflow-hidden sm:grid sm:grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] 2xl:grid-cols-[150px_1fr]">
        <div className="flex max-h-min max-w-full justify-between gap-2 overflow-x-scroll sm:flex-col lg:justify-around sm:py-[2px] md:py-1 lg:py-0 lg:gap-3">
          {variantDetails?.productVariantImages?.map((img, idx) => {
            return (
              <div
                key={idx}
                onClick={() => setImgSelected(img)}
                className="relative size-[70px] sm:size-[80px] cursor-pointer overflow-hidden rounded-lg md:size-[90px] 2xl:size-[120px]  "
              >
                <Image
                  fill
                  className="object-cover"
                  src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${img}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
        <div className="w-full max-w-full sm:min-h-full ">
          <Image
            height={1000}
            width={1000}
            src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${imgSelected}`}
            alt=""
            className="max-h-[300px] sm:max-h-[380px] md:max-h-[420px] w-[100%] rounded-xl object-cover  object-top lg:max-h-full sm:h-full"
          />
        </div>
      </div>
      <div className="flex max-w-full flex-col justify-between overflow-hidden">
        <p className="mb-3 mt-2 text-wrap font-integral_cf text-3xl xl:text-[35px] font-bold lg:mt-0  2xl:text-[40px]">
          {variantDetails.name}
        </p>

        <StarRating size={"medium"} rating={variantDetails.avgRating} />

        <Pricing
          price={variantDetails.price}
          discount={variantDetails.onDiscount ? variantDetails.discount : 0}
          className="mt-4 text-[24px] 2xl:text-[28px]"
        />

        <p className="mt-3 border-b pb-4 text-black/60 2xl:text-lg">
          {variantDetails.description}
        </p>

        <p className="pt-2 text-black/60 2xl:text-lg"> Colors</p>
        <div className="flex items-center gap-2 border-b py-2">
          {variantDetails.variants.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  router.push("/product-detail/" + item.productVariantId);
                }}
                style={{ background: item.color }}
                className={cn(
                  "flex size-6 cursor-pointer items-center justify-center rounded-[50%] p-1 lg:size-8",
                )}
              >
                {variantDetails.productVariantId === item.productVariantId && (
                  <IoMdCheckmark
                    className="rounded-full"
                    size={16}
                    color="#FFFF"
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="border-b py-4 xl:text-lg text-black/60">
          <p> Size</p>
          <div className="mt-4 flex gap-3">
            <div
              className={
                "rounded-3xl bg-ceramic px-6 py-2 text-base 2xl:text-lg text-black/70"
              }
            >
              {sizes?.[variantDetails.size as unknown as "M" | "L"]}
            </div>
          </div>
        </div>

        <AddToCart
          inventoryCount={variantDetails.inventoryCount}
          variantId={variantDetails.productVariantId}
        />
      </div>
    </div>
  );
};

export default ProductImgInfo;
