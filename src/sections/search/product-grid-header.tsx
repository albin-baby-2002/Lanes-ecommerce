"use client";
import { Combobox } from "@/components/ui/combobox";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SORT_OPTIONS = [
  { value: "high-low", label: "High to Low" },
  { value: "low-high", label: "Low to High" },
];

type TSortValues = (typeof SORT_OPTIONS)[number]["value"];

const ProductGridHeader = ({
  total,
  countOfProducts,
}: {
  total: number;
  countOfProducts: number;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (val: TSortValues) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortby", val);
    router.push("/search?" + params, { scroll: false });
  };

  const page = Number(searchParams.get("page")) || 0;

  const startRange = (page ? page - 1 : 0) * 10;

  return (
    <div className="flex items-center justify-between">
      <p>
        Showing {startRange + 1} - {startRange + countOfProducts} of {total}{" "}
        products
      </p>
      <div>
        <Combobox
          label="Sort By"
          options={SORT_OPTIONS}
          value={searchParams.get("sortby") || ""}
          onChange={handleSortChange}
        />
      </div>
    </div>
  );
};

export default ProductGridHeader;
