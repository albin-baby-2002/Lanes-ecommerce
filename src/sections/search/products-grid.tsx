import ProductCard from "@/components/product-card";
import React from "react";
import ProductGridHeader from "./product-grid-header";
import ProductPagination from "./products-pagination";
import { getAllIndividualVariantsWithDetails } from "@/lib/db-services/products";

const ProductsGrid = async ({ totalPageSize }: { totalPageSize: number }) => {
  const products = await getAllIndividualVariantsWithDetails();

  return (
    <div className="mt-2">
      <ProductGridHeader />
      {/* products  */}

      <div className="my-6 grid grid-cols-4 justify-center gap-10">
        {products.map((product, idx) => {
          return (
            <ProductCard
              key={idx}
              name={product.name}
              price={product.price}
              discount={product.discount || 0}
              rating={4.5}
              images={product.productVariantImages}
            />
          );
        })}
      </div>

      <ProductPagination totalPageSize={totalPageSize} />
    </div>
  );
};

export default ProductsGrid;
