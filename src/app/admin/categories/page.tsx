import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaSearch } from "react-icons/fa";

const CategoriesPage = () => {
  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Categories</p>
      </div>

      <div className="flex justify-between gap-6">
        <div className=" focus-within:border-black flex grow items-center bg-white px-4 border border-gray-200 rounded-md">
          <FaSearch className=" text-gray-400"/>
          <input className="w-full border-none text-[15px] ml-2 py-3 outline-none focus:border-none  font-Inter" placeholder="Search Categories "  />
        </div>
        <Button className="min-h-full h-auto px-5 ">Add Category</Button>
        <Button variant={"outline"} className="min-h-full h-auto px-5 border-2 border-black ">
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default CategoriesPage;
