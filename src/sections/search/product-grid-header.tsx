"use client";
import { Combobox } from "@/components/ui/combobox";
import { Filter, ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SORT_OPTIONS = [
  { value: "high-low", label: "High to Low" },
  { value: "low-high", label: "Low to High" },
];

type TSortValues = (typeof SORT_OPTIONS)[number]["value"];

const ProductGridHeader = ({
  total,
  toggleFilters,
  countOfProducts,
}: {
  total: number;
  countOfProducts: number;
  toggleFilters: () => void;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange = (val: TSortValues) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortby", val);
    router.push("/search?" + params, { scroll: false });
  };

  const page = Number(searchParams.get("page")) || 0;

  const startRange = (page ? page - 1 : 0) * 20;

  return (
    <div className="flex items-center justify-between">
      <p className=" hidden md:block">
        Showing {startRange + 1} - {startRange + countOfProducts} of {total}{" "}
        <span className="hidden lg:inline-block">products</span>
      </p>
      <div>
        <Combobox
          label="Sort By"
          options={SORT_OPTIONS}
          value={searchParams.get("sortby") || ""}
          onChange={handleSortChange}
        />
      </div>

      <div onClick={toggleFilters} className=" cursor-pointer hover:text-black/60 mt-1 mr-1 md:hidden text-black/40 " >
        <ListFilter size={24}/>
      </div>
    </div>
  );
};

export default ProductGridHeader;
