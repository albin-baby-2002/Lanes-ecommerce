import ProductCard from "@/components/product-card";
import React from "react";
import ProductGridHeader from "./product-grid-header";
import ProductPagination from "./products-pagination";
import { TProductVariantWithDetails } from "@/lib/db-services/products";

interface TProps {
  totalPageSize: number;
  total: number;
  products: TProductVariantWithDetails[];
}

const ProductsGrid: React.FC<TProps> = async ({
  total,
  totalPageSize,
  products,
}) => {
  return (
    <div className="mt-2">
      <ProductGridHeader
        total={total}
        countOfProducts={products?.length || 0}
      />
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
              variantId={product?.productVariantId}
            />
          );
        })}
      </div>

      <ProductPagination totalPageSize={totalPageSize} />
    </div>
  );
};

export default ProductsGrid;
