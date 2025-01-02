import React from "react";
import ProductCard from "@/components/product-card";
import { getProductsWithVariants } from "@/lib/db-services/products";

const SimilarProducts = async() => {

  const products = await getProductsWithVariants({limit:4});

  return (
    <>
      <p className="mt-4 py-6 text-center font-integral_cf text-4xl font-bold tracking-wide">
        YOU MIGHT ALSO LIKE
      </p>

      <div className="mb-16 grid grid-cols-4 gap-4">
      {products.map((product, idx) => {
          return (
            <ProductCard
              key={idx}
              name={product.name}
              price={product.productVariants[0]?.price}
              discount={product.discount || 0}
              rating={4.5}
              images={product?.productVariants[0]?.productVariantImages}
              variantId={product?.productVariants[0]?.productVariantId}
            />
          );
        })}
      </div>
    </>
  );
};

export default SimilarProducts;
