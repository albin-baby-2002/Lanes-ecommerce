"use client";

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductsGrid = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between">
        <p>Showing 1-10 of 100 products</p>
        <div>
          <Combobox
            label="Sort By"
            options={[
              { value: "High to low", label: "high to low" },
              { value: "Low to High", label: "Low to high" },
            ]}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
      </div>

      {/* products  */}

      <div className="my-6 grid grid-cols-3 justify-center gap-10">
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

      {/* pagination */}

      <div className="mb-16 mt-6 flex justify-between border-t pt-6">
        <Button variant={"outline"} className="flex gap-2">
          <FaArrowLeft /> Previous
        </Button>

        <div>
          <Button size={"icon"} className="bg-ceramic text-black">
            1
          </Button>
        </div>

        <Button variant={"outline"} className="flex gap-2">
          Next <FaArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ProductsGrid;
