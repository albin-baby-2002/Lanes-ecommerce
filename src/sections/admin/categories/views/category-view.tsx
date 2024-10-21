import React from "react";
import SearchAndActions from "../search-and-actions";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";
import { DataTable } from "@/components/table/data-table";
import { cateogriesColumns } from "../columns";
import EditModal from "../edit-modal";
import ConfirmationModal from "@/components/ui/confirmation-modal";
import CategoryActionModals from "../edit-modal";

const CategoryView = async () => {
  const categoriesData = await db.select().from(categories);

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
          columnVisibility={{ id: false }}
        />
      </div>

      <CategoryActionModals categoriesData={categoriesData} />

    </div>
  );
};

export default CategoryView;
