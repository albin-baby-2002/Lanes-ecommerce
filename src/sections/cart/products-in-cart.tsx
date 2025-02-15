"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import { TcartItems } from "./views/cart-view";
import { Pricing } from "@/components/pricing";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { addToCart, deleteFromCart } from "@/lib/actions/client";
import { hammingDistance } from "drizzle-orm";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

//-------------------------------------------------------------------------

const ProductsInCart = ({ items }: { items: TcartItems[] }) => {
  const router = useRouter();

  const handleAddToCart = async (
    count: number,
    inventoryCount: number,
    variantId: string,
  ) => {
    try {
      // submit logic for adding new category

      if (count > inventoryCount) {
        return toast.error("Item not in stock");
      }

      let resp = await addToCart(variantId, count);

      if (!resp.success) {
        return toast.error(resp.message);
      }

      toast.success(resp.message);

      router.refresh();
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      console.log(error);
    }
  };

  const handleRemoveFromCart = async (variantId: string) => {
    try {
      let resp = await deleteFromCart(variantId);

      if (!resp.success) {
        return toast.error(resp.message);
      }

      toast.success(resp.message);

      router.refresh();
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      console.log(error);
    }
  };

  return (
    <>
      {items.length === 0 && (
        <div
          className={cn(
            "h-auto basis-3/5 rounded-3xl border border-black/10 p-6",
            {
              "mt-8 min-h-[60vh] w-full basis-full": items.length === 0,
            },
          )}
        >
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <ShoppingCart size={52} />
            <p className="text-[26px] font-bold">
              Your haven&apos;t added products to cart
            </p>
          </div>
        </div>
      )}

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
                  onClick={() => {
                    handleRemoveFromCart(item.productVariantId);
                  }}
                  size={20}
                  className="mt-2 cursor-pointer text-red-500"
                />

                <div className="flex items-center gap-3 rounded-full bg-ceramic px-3">
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => {
                      if (item.quantity <= 1) return;

                      handleAddToCart(
                        item.quantity - 1,
                        item.inventoryCount,
                        item.productVariantId,
                      );
                    }}
                  >
                    <FaMinus size={12} />
                  </Button>
                  <p>{item.quantity}</p>

                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => {
                      if (item.quantity >= 5) return;

                      handleAddToCart(
                        item.quantity + 1,
                        item.inventoryCount,
                        item.productVariantId,
                      );
                    }}
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

export default ProductsInCart;
