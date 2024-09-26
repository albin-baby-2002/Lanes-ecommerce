import ProductCard from "@/components/product-card";
import React from "react";
import ExploreNow from "./components/explore-now-btn";

const TopSelling = () => {
  return (
    <div className="grid gap-8 px-10 pt-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-integral_cf text-2xl tracking-wide">Top Selling</p>
          <p className="mt-2 text-black/60">
            Limited Stock Buy Now At Best Price
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

export default TopSelling;
