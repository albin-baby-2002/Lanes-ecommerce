"use client";
import { Button } from "@/components/ui/button";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { productsReducers } from "@/store/slices/admin/products";
import DashboardSearch from "@/components/admin/search";

const SearchAndActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="flex justify-between gap-6">
        <DashboardSearch />

        <Button
          onClick={() => {
            dispatch(productsReducers.toggleShowAddProduct());
          }}
          className="h-auto min-h-full rounded-md bg-black px-5 text-white"
        >
          Add Product
        </Button>

        <Button
          variant={"outline"}
          className="h-auto min-h-full border-2 border-black px-5"
        >
          Export Data
        </Button>
      </div>
    </>
  );
};

export default SearchAndActions;
