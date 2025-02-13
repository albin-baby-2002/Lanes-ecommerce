import React from "react";
import SearchAndActions from "../search-and-actions";
import { DataTable } from "@/components/table/data-table";
import { cateogriesColumns } from "../datatable-columns";
import { getAllCategories } from "@/lib/db-services/category";
import CategoryActionModals from "../category-action-modals";

const CategoryView = async ({ search }: { search: string }) => {
  const categoriesData = await getAllCategories(search);
  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Categories</p>
      </div>

      <SearchAndActions data={categoriesData} />

      <div className="mt-8 h-[calc(100vh-200px)]">
        <DataTable
          columns={cateogriesColumns}
          data={categoriesData}
          columnVisibility={{ categoryId: false }}
        />
      </div>

      <CategoryActionModals categoriesData={categoriesData} />
    </div>
  );
};

export default CategoryView;
