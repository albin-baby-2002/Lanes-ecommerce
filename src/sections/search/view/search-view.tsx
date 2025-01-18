import BreadCrumb from "@/components/breadcrumb";
import React from "react";
import SearchFilter from "../search-filter";
import ProductsGrid from "../products-grid";

interface TProps {
  products: TProductVariantWithDetails[];
}

const SearchView: React.FC<TProps> = ({ products }) => {

  console.log(products,' \n \n search product \n \n')
  return (
    <>
      <BreadCrumb routes={["Home", "Search"]} />

      <div className="grid min-h-[calc(100vh-200px)] grid-cols-[2.5fr_9.5fr] gap-10">
        <SearchFilter />
        <ProductsGrid totalPageSize={20} products={products} />
      </div>
    </>
  );
};

export default SearchView;
