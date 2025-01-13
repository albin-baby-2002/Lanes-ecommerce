"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Pricing } from "@/components/pricing";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { TOrderItem } from "@/lib/db-services/products";

//-------------------------------------------------------------------------

const OrderItems = ({ items }: { items: TOrderItem[] }) => {



  return (
    <>
      <div className="h-auto  w-full mt-8 min-h-[60vh] rounded-3xl border border-black/10 p-6">
        {items.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingBag size={50} />
            <p className="text-2xl font-bold">
              You have not placed any orders yet
            </p>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="h-max basis-3/5 rounded-3xl border border-black/10 p-6">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between border-black/10 [&:not(:first-of-type)]:pt-8 [&:not(:last-of-type)]:border-b [&:not(:last-of-type)]:pb-8"
            >
              <div className="flex gap-4">
                <div className="relative size-32 rounded-2xl">
                  <Image
                    className="h-32 rounded-2xl object-cover"
                    fill
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${item.imgUrls[0]}`}
                    alt=" product"
                  />
                </div>
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="pt-1 text-black/90">
                    Size: <span className="text-black/30"> {item.size}</span>
                  </p>
                  <p className="pt-1 text-black/90">
                    Color: <span className="text-black/40">{item.color}</span>
                  </p>

                  <Pricing
                    price={item.price}
                    discount={(item.onDiscount !== null && item.discount) || 0}
                    className="mt-4 text-[16px]"
                  />
                </div>
              </div>

              <div className="flex flex-col items-end justify-between">
                <FaTrashAlt
                  size={20}
                  className="mt-2 cursor-pointer text-red-500"
                />

                <div className="flex items-center gap-3 rounded-full bg-ceramic px-3">
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                  >
                    <FaMinus size={12} />
                  </Button>
                  <p>{item.quantity}</p>

                  <Button
                    size={"icon"}
                    variant={"ghost"}
                  >
                    <FaPlus size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default  OrderItems;
