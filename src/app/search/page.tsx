import { getAllIndividualVariantsWithDetails } from "@/lib/db-services/products";
import SearchView from "@/sections/search/view/search-view";
import React from "react";

interface TProps {
  searchParams: Partial<TProductSearchParams>;
}

export type TProductSearchParams = {
  name: string;
  styles: string;
  category: string;
  gender: string;
  "min-price": string;
  "max-price": string;
  sizes: string;
};

const SearchPage = async ({ searchParams }: TProps) => {

  const products = await getAllIndividualVariantsWithDetails(searchParams);

  return <SearchView products={products} />;
};

export default SearchPage;
