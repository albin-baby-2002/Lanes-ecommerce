"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddOrEditCategoryModal from "./add-edit-category-modal";
import { FaSearch } from "react-icons/fa";

const SearchAndActions = () => {
  return (
    <>
      <div className="flex justify-between gap-6">
        <div className="flex grow items-center rounded-md focus-within:bg-ceramic border border-gray-200 bg-white px-4 focus-within:border-black">
          <FaSearch className="text-gray-400" />
          <input
            className="ml-2 w-full border-none py-3 font-Inter text-[15px] outline-none focus:border-none"
            placeholder="Search Categories "
          />
        </div>
        <AddOrEditCategoryModal type="add" />
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
