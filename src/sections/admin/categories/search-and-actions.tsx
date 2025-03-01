"use client";

import { Button } from "@/components/ui/button";
import AddOrEditCategoryModal from "./add-edit-category-modal";
import { exportToExcel } from "@/lib/helpers/export-to-excel";
import DashboardSearch from "@/components/admin/search";

const SearchAndActions = ({data}:{data:Record<string,unknown>[]}) => {
  return (
    <>
      <div className="flex justify-between gap-6">
        <DashboardSearch/>
        <AddOrEditCategoryModal type="add" />
        <Button
        onClick={()=>{exportToExcel(data)}}
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
