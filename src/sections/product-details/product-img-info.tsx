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
    <div className="grid grid-cols-[150px_450px_1fr] gap-4">
      <div className="flex max-h-min flex-col justify-around gap-3">
        {variantDetails?.productVariantImages?.map((img, idx) => {
          return (
            <div
              key={idx}
              onClick={() => setImgSelected(img)}
              className="relative size-[120px] cursor-pointer overflow-hidden rounded-lg"
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
      <div className="min-h-full">
        <Image
          height={1000}
          width={1000}
          src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${imgSelected}`}
          alt=""
          className="h-full rounded-2xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <p className="mb-3 font-integral_cf text-[40px] font-bold">
          {variantDetails.name}
        </p>

        <StarRating size={"medium"} rating={4.5} />

        <Pricing
          price={variantDetails.price}
          discount={variantDetails.onDiscount ? variantDetails.discount : 0}
          className="mt-4 text-[28px]"
        />

        <p className="mt-3 border-b pb-4 text-lg text-black/60">
          {variantDetails.description}
        </p>

        <p className="text-lg text-black/60"> Colors</p>
        <div className="flex items-center gap-2">
          {variantDetails.variants.map((item, idx) => {
            return (
              <div
                key={idx}
                onClick={() => {
                  router.push("/product-detail/" + item.productVariantId);
                }}
                style={{ background: item.color }}
                className={cn(
                  "flex size-8 cursor-pointer items-center justify-center rounded-[50%] p-1",
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
        <div className="border-b py-4 text-lg text-black/60">
          <p> Size</p>
          <div className="mt-4 flex gap-3">
            <div
              className={
                "rounded-3xl bg-ceramic px-6 py-2 text-lg text-black/70"
              }
            >
              {sizes?.[variantDetails.size as unknown as "M" | "L"]}
            </div>
          </div>
        </div>

        <AddToCart />
      </div>
    </div>
  );
};

export default ProductImgInfo;
