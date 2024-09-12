import React from "react";
import ProductCard from "@/components/product-card";

const SimilarProducts = () => {
  return (
    <>
      <p className="mt-4 py-6 text-center font-integral_cf text-4xl font-bold tracking-wide">
        YOU MIGHT ALSO LIKE
      </p>

      <div className="mb-16 grid grid-cols-4 gap-4">
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
    </>
  );
};

export default SimilarProducts;
