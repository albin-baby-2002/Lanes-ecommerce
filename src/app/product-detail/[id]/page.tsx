import BreadCrumb from "@/components/breadcrumb";
import { Pricing } from "@/components/product-card";
import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";

const ProductDetails = () => {
  return (
    <div>
      <BreadCrumb routes={["Home", "Search", "T-shirts"]} />

      {/* product details */}

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
        <div className="my-2">
          <p className="mb-3 font-integral_cf text-4xl font-bold tracking-wide">
            ONE LIFE GRAPHIC T SHIRT
          </p>

          <StarRating rating={4.5} />

          <Pricing price={200} discount={10} />

          <p className="mt-3 border-b pb-4 text-sm text-black/60">
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>

          <div className="border-b py-4 text-sm text-black/60">
            <p>Select colors</p>
            <div className="mt-1 flex gap-3">
              <div className="flex size-5 items-center justify-center rounded-[50%] bg-black p-1">
                <IoMdCheckmark
                  className="rounded-full"
                  size={16}
                  color="#FFFF"
                />
              </div>
              <div className="flex size-5 items-center justify-center rounded-[50%] bg-slate-500 p-1">
                <IoMdCheckmark
                  className="rounded-full"
                  size={16}
                  color="#FFFF"
                />
              </div>
              <div className="flex size-5 items-center justify-center rounded-[50%] bg-red-800 p-1">
                <IoMdCheckmark
                  className="rounded-full"
                  size={16}
                  color="#FFFF"
                />
              </div>
            </div>
          </div>

          <div className="py-4 text-sm text-black/60 flex gap-5">
            <div className=" flex  items-center  gap-3 bg-ceramic px-3 rounded-full">
              <Button size={"icon"} variant={"ghost"}>
                <FaMinus size={16} />
              </Button>
              <p>1</p>

              <Button size={"icon"} variant={"ghost"}>
                <FaPlus size={16} />
              </Button>
            </div>
            
            <Button className="grow rounded-full max-w-96">
                Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
