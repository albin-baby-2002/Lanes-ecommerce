import ProductCard from "@/components/product-card";
import React from "react";
import ProductGridHeader from "./product-grid-header";
import ProductPagination from "./products-pagination";

const ProductsGrid = ({ totalPageSize }: { totalPageSize: number }) => {
  return (
    <div className="mt-2">
      <ProductGridHeader />
      {/* products  */}

      <div className="my-6 grid grid-cols-4 justify-center gap-10">
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

      <ProductPagination totalPageSize={totalPageSize} />
    </div>
  );
};

export default ProductsGrid;
