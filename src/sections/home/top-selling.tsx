import ProductCard from "@/components/product-card";
import React from "react";
import ExploreNow from "./components/explore-now-btn";
import { getTopSellingProducts } from "@/lib/db-services/products";

const TopSelling = async () => {
  const products = await getTopSellingProducts();

  return (
    <div className="grid gap-8 px-10 pt-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="font-integral_cf text-2xl tracking-wide">Top Selling</p>
          <p className="mt-2 text-black/60">
            Limited Stock Buy Now At Best Price
          </p>
        </div>

        <ExploreNow href={"/search"} />
      </div>

      <div className="grid grid-cols-5 justify-center gap-10">
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
