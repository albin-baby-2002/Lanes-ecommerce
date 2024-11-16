"use client";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { productsReducers } from "@/store/slices/admin/products";

const SearchAndActions = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex grow items-center rounded-md border border-gray-200 bg-white px-4 focus-within:border-black">
          <FaSearch className="text-gray-400" />
          <input
            className="ml-2 w-full border-none py-3 font-Inter text-[15px] outline-none focus:border-none"
            placeholder="Search Categories "
          />
        </div>

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
