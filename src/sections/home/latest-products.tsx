import ProductCard from "@/components/product-card";
import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import ExploreNow from "./components/explore-now-btn";

const LatestProducts = () => {
  return (
    <div className="grid gap-8 px-10 pt-14">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-integral_cf text-2xl tracking-wide">
            New Arrivals
          </p>
          <p className="mt-2 text-black/60">
            Get your hands on the latest fashion never miss the trend{" "}
          </p>
        </div>

        <ExploreNow  href={'/search'}/>
      </div>

      <div className="grid grid-cols-5 justify-center gap-10">
        <ProductCard
          name="T-shirt with Tape Details of what we need"
          price={120}
          discount={10}
          rating={4.5}
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
        <ProductCard
          name="T-shirt with Tape Details of what we need"
          price={120}
          discount={10}
          rating={4.5}
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
      </div>
    </div>
  );
};

export default LatestProducts;
