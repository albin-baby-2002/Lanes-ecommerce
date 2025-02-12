import BreadCrumb from "@/components/breadcrumb";
import React from "react";
import SearchFilter from "../search-filter";
import ProductsGrid from "../products-grid";
import { TProductVariantWithDetails } from "@/lib/db-services/products";

interface TProps {
  products: TProductVariantWithDetails[];
  total: number;
  totalPages: number;
}

const SearchView: React.FC<TProps> = ({ products, total, totalPages }) => {
  return (
    <>
      <BreadCrumb routes={["Home", "Search"]} />

      <div className="grid min-h-[calc(100vh-200px)] grid-cols-[2.5fr_9.5fr] gap-10">
        <SearchFilter />
        <ProductsGrid
          total={total}
          totalPageSize={totalPages || 0}
          products={products}
        />
      </div>
    </>
  );
};

export default SearchView;
