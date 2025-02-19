import ProductCard from "@/components/product-card";
import React from "react";
import ExploreNow from "./components/explore-now-btn";
import { getProductsWithVariants } from "@/lib/db-services/products";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import Link from "next/link";

const LatestProducts = async () => {
  const products = await getProductsWithVariants({ limit: 10 });

  return (
    <div className="grid gap-8 px-5 md:px-10 pt-14 lg:px-10">
      <div className="flex items-center justify-between">
        <div className="w-full lg:w-auto">
          <div className="flex items-center justify-between">
            <p className="font-integral_cf text-2xl tracking-wide">
              New Arrivals
            </p>

            <Link href={"/search"}>
              <MdOutlineArrowCircleRight
                size={"24px"}
                className="mt-[2px] cursor-pointer lg:hidden"
              />
            </Link>
          </div>
          <p className="mt-2 text-sm text-black/60 lg:text-base">
            Get your hands on the latest fashion never miss the trend{" "}
          </p>
        </div>

        <ExploreNow href={"/search"} />
      </div>

      <div className="grid sm:grid-cols-2  md:grid-cols-3 grid-cols-1 justify-center gap-10 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product, idx) => {
          return (
            <ProductCard
              key={idx}
              name={product.name}
              price={product.productVariants[0]?.price}
              discount={product.discount || 0}
              rating={4.5}
              images={product?.productVariants[0]?.productVariantImages || []}
              variantId={product?.productVariants[0]?.productVariantId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default LatestProducts;
