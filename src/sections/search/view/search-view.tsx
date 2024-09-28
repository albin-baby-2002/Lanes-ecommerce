import BreadCrumb from "@/components/breadcrumb";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import SearchFilter from "../search-filter";
import ProductsGrid from "../products-grid";

const SearchView = () => {
  return (
    <>
      <BreadCrumb routes={["Home", "Search"]} />

      <div className="min-h-[calc(100vh-200px)] grid grid-cols-[2.5fr_9.5fr] gap-10">
        <SearchFilter />
        <ProductsGrid  totalPageSize={10}/>
      </div>
    </>
  );
};

export default SearchView;
