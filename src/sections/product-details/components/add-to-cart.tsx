"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import MinusIcon from "@/assets/icons/minus-icon";
import PlusIcon from "@/assets/icons/plus-icon";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { addToCart, getCartItemsId } from "@/lib/actions/client";
import { useRouter } from "next/navigation";

const AddToCart = ({
  inventoryCount,
  variantId,
}: {
  inventoryCount: number;
  variantId: string;
}) => {
  const { pending } = useFormStatus();

  const router = useRouter();

  // local states
  const [cartItems, setCartItems] = useState<string[] | null>(null);
  const [count, setCount] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // count handlers

  const increment = () => {
    if (count >= inventoryCount) {
      return toast.error("There isn't enough inventory");
    }

    if (count >= 5) {
      return toast.error("You cannot order more than 5 items at a time");
    }

    setCount((count) => count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount((count) => count - 1);
    }
  };

  useEffect(() => {
    const getCartItemData = async () => {
      const resp = await getCartItemsId();

      setCartItems(resp.data);
    };
    getCartItemData();
  }, []);

  const handleAddToCart = async () => {
    try {
      setSubmitting(true);
      // submit logic for adding new category

      if (count > inventoryCount) {
        return toast.error("Item not in stock");
      }

      let resp = await addToCart(variantId, count);

      if (!resp.success) {
        setSubmitting(false);
        return toast.error(resp.message);
      }

      toast.success(resp.message);

      router.refresh();

      setSubmitting(false);
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      setSubmitting(false);
      console.log(error);
    }
  };

  return (
    <div className="flex max-w-full gap-5 pt-6 text-lg text-black/60">
      <div className="flex items-center gap-3 rounded-full bg-ceramic px-3">
        <Button onClick={decrement} size={"icon"} variant={"ghost"}>
          <MinusIcon className=" size-4"   />
        </Button>

        <p className=" text-base">{count}</p>

        <Button size={"icon"} variant={"ghost"} onClick={increment}>
          <PlusIcon className=" size-4" />
        </Button>
      </div>

      <Button
        className="  sm:px-8   rounded-full lg:py-[24px] 2xl:py-[28px]  text-base xl:text-lg lg:max-w-80"
        onClick={handleAddToCart}
      >
        {(submitting || pending) && (
          <Image
            height={24}
            width={24}
            className="mr-2"
            alt="svg"
            unoptimized
            src={"/loaders/circular-loader.svg"}
          />
        )}
        {cartItems && cartItems.includes(variantId)
          ? "Update Cart"
          : "Add To Cart"}
      </Button>
    </div>
  );
};

export default AddToCart;
