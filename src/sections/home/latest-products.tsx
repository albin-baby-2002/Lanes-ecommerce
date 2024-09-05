import ProductCarousel from "@/components/product-carousel";
import React from "react";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const LatestProducts = () => {
  return (
    <div className="px-10 py-20 grid gap-10">
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

      <div className="grid grid-cols-4 gap-10   justify-center">
        <ProductCarousel
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
        <ProductCarousel
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
        <ProductCarousel
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
        <ProductCarousel
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
        <ProductCarousel
          images={[
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
            { url: "/images/products/p1.svg", alt: "product" },
          ]}
        />
        <ProductCarousel
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
