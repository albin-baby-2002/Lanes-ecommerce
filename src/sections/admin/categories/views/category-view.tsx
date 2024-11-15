import React from "react";
import SearchAndActions from "../search-and-actions";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { DataTable } from "@/components/table/data-table";
import { cateogriesColumns } from "../columns";
import { getAllCategories } from "@/lib/db-services/category";
import CategoryActionModals from "../category-action-modals";

const CategoryView = async () => {
  const categoriesData = await getAllCategories();

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Categories</p>
      </div>

      <SearchAndActions />

      <div className="mt-8">
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
