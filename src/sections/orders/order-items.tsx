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
      {!items ||
        (items.length === 0 && (
          <div className="mt-8 h-auto min-h-[60vh] w-full rounded-3xl border border-black/10 p-6">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <ShoppingBag size={52} />
              <p className="text-[26px] font-bold">
                You have&apos;t placed any orders yet
              </p>
            </div>
          </div>
        ))}

      {items && items.length > 0 && (
        <div className="grid h-max w-full grid-cols-1 gap-6 rounded-3xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="flex w-full flex-col justify-between rounded-2xl border border-black/10 p-6 sm:flex-row"
            >
              <div className="flex w-full flex-col gap-4">
                <div className="relative h-[200px] w-full">
                  <Image
                    className="h-36 rounded-2xl object-cover"
                    unoptimized
                    fill
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${item.imgUrls[0]}`}
                    alt=" product"
                  />
                </div>

                <div className="flex w-full flex-col justify-between gap-[4px]">
                  <div className="space-y-[6px]">
                    <p className="text-lg font-bold text-black">{item.name}</p>
                    <p className="tracking-wide">
                       Quantity :{" "}
                      <span className="text-black/40">{item.quantity}</span>
                    </p>
                    <p className="tracking-wide">
                      Total :
                      <span className="text-black/40">Rs.{item.total}</span>
                    </p>

                    <p className="tracking-wide">
                      Date : <span className=" text-black/40">{new Date(item.orderDate).toLocaleDateString()}</span>{" "}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 font-bold text-black    sm:pt-0">
                    <div className="flex gap-1 pt-[3.2px] text-sm">
                      <span className="uppercase">
                        {" "}
                        {item.shippingStatus?.toLowerCase()}
                      </span>
                    </div>

                    <Button
                      className="rounded-full bg-ceramic px-8 py-5"
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderItems;
