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
        <div className="grid h-max w-full grid-cols-2 gap-6 rounded-3xl">
          {items?.map((item, idx) => (
            <div
              key={idx}
              className="flex w-full justify-between rounded-2xl border border-black/10 p-6"
            >
              <div className="flex gap-4">
                <div className="relative size-32">
                  <Image
                    className="h-36 rounded-2xl object-cover"
                    fill
                    src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${item.imgUrls[0]}`}
                    alt=" product"
                  />
                </div>

                <div className="flex flex-col text-black/60">
                  <div className="space-y-[6px]">
                    <p className="text-xl font-bold text-black">{item.name}</p>
                    <p className="text-[17px] font-medium tracking-wide">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-[17px] font-medium tracking-wide">
                      Total: Rs.{item.total}
                    </p>

                    <p className="text-[17px] tracking-wide">
                      Order Date :{" "}
                      {new Date(item.orderDate).toLocaleDateString()}{" "}
                    </p>
                  </div>
                  <div></div>
                </div>
              </div>

              <div className="flex flex-col items-end justify-between font-bold text-black">
                <div className="flex gap-1 pt-[3.2px]">
                  <span className=" uppercase">Shipping : </span>{" "}
                  <span className="pt-px] uppercase">
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
          ))}
        </div>
      )}
    </>
  );
};

export default OrderItems;
