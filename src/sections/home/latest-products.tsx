import ProductCard from "@/components/product-card";
import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const LatestProducts = () => {
  return (
    <div className="grid gap-10 px-10 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-4xl font-bold">New Arrivals</p>
          <p className="mt-2 text-black/60">
            Get your hands on the latest fashion never miss the trend{" "}
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-2xl bg-ceramic px-5 py-3.5">
          <p className="pb-1">Explore now</p>
          <MdOutlineArrowCircleRight size={"24px"} />
        </div>
      </div>

      <div className="grid grid-cols-4 justify-center gap-10">
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default LatestProducts;
