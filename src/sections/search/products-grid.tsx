import ProductCard from "@/components/product-card";
import React from "react";
import ProductGridHeader from "./product-grid-header";
import ProductPagination from "./products-pagination";
import { TProductVariantWithDetails } from "@/lib/db-services/products";
import { cn } from "@/lib/utils";
import { Search, ShoppingCart } from "lucide-react";

interface TProps {
  totalPageSize: number;
  total: number;
  products: TProductVariantWithDetails[];
  toggleFilters: () => void;
}

const ProductsGrid: React.FC<TProps> = async ({
  total,
  totalPageSize,
  products,
  toggleFilters,
}) => {
  return (
    <div className=" mt-2">
      <ProductGridHeader
        total={total}
        countOfProducts={products?.length || 0}
        toggleFilters={toggleFilters}
      />
      {/* products  */}

      {products.length === 0 && (
        <div
          className={cn(
            "h-auto basis-3/5 rounded-3xl flex flex-col justify-center  border-black/10 p-6",
            {
              "mt-8 min-h-[60vh] w-full basis-full": products.length === 0,
            },
          )}
        >
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <Search size={40} />
            <p className="text-[22px] font-bold">
              No Products Found
            </p>
          </div>
        </div>
      )}

      <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center gap-10">
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

      {/* <ProductPagination totalPageSize={totalPageSize} /> */}
    </div>
  );
};

export default ProductsGrid;
