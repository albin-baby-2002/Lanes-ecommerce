import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

const ProductsInCart = () => {
  return (
    <div className=" h-max basis-3/5 rounded-3xl border border-black/10 p-6">
      <div className="flex justify-between  pb-8 border-b border-black/10">
        <div className="flex gap-4">
          <div className="relative size-32 rounded-2xl">
            <Image
              className="h-32 rounded-2xl"
              fill
              src={"/images/products/p1.svg"}
              alt=" product"
            />
          </div>
          <div>
            <p className="text-lg font-bold">Gradient Graphic T-shirt</p>
            <p className="pt-1 text-black/90">
              Size: <span className="text-black/30"> Large</span>
            </p>
            <p className="pt-1 text-black/90">
              Color: <span className="text-black/40">White</span>
            </p>
            <p className="mt-3 text-lg font-bold">$180</p>
          </div>
        </div>

        <div className="flex flex-col justify-between  items-end">
          <FaTrashAlt size={20} className="mt-2 text-red-500" />

          <div className="flex items-center gap-3 rounded-full bg-ceramic px-3">
            <Button size={"icon"} variant={"ghost"}>
              <FaMinus size={12} />
            </Button>
            <p>1</p>

            <Button size={"icon"} variant={"ghost"}>
              <FaPlus size={12} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsInCart;
