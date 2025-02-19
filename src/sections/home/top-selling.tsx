import ProductCard from "@/components/product-card";
import React from "react";
import ExploreNow from "./components/explore-now-btn";
import { getTopSellingProducts } from "@/lib/db-services/products";
import Link from "next/link";
import { MdOutlineArrowCircleRight } from "react-icons/md";

const TopSelling = async () => {
  const products = await getTopSellingProducts();

  return (
    <div className="grid gap-8 px-5 md:px-10 pt-16 lg:px-10">
      <div className="flex items-center justify-between">
        <div className="w-full lg:w-auto">
          <div className="flex items-center justify-between">
            <p className="font-integral_cf text-2xl tracking-wide">
              Top Selling
            </p>

            <Link href={"/search"}>
              <MdOutlineArrowCircleRight
                size={"24px"}
                className="mt-[2px] cursor-pointer lg:hidden"
              />
            </Link>
          </div>
          <p className="mt-2 text-sm text-black/60">
            Limited Stock Buy Now At Best Price
          </p>
        </div>

        <ExploreNow href={"/search"} />
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 justify-center gap-10">
        {products.map((product, idx) => {
          return (
            <ProductCard
              key={idx}
              name={product.name}
              price={product.price}
              discount={product.discount || 0}
              rating={4.5}
              images={product?.productVariantImages}
              variantId={product?.productVariantId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TopSelling;
