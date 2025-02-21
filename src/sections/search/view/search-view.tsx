"use client"
import BreadCrumb from "@/components/breadcrumb";
import React, { useState } from "react";
import SearchFilter from "../search-filter";
import ProductsGrid from "../products-grid";
import { TProductVariantWithDetails } from "@/lib/db-services/products";

interface TProps {
  products: TProductVariantWithDetails[];
  total: number;
  totalPages: number;
}

const SearchView: React.FC<TProps> = ({ products, total, totalPages }) => {

  const [showFilters, setShowFilters] = useState(false);
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className=" px-5">
      <BreadCrumb routes={["Home", "Search"]} />

      <div className="grid min-h-[calc(100vh-200px)] md:grid-cols-[4fr_8fr] lg:grid-cols-[2.5fr_9.5fr] gap-10">
        <SearchFilter open={showFilters} onClose={toggleFilters} />
        <ProductsGrid
        toggleFilters={toggleFilters}
          total={total}
          totalPageSize={totalPages || 0}
          products={products}
        />
      </div>
    </div>
  );
};

export default SearchView;
