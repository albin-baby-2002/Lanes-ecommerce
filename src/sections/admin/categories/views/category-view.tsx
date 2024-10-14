import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import SearchAndActions from "../search-and-actions";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";

const CategoryView = async () => {
  const categoriesData = await db.select().from(categories);

  console.log(
    `data

    `,
    categoriesData,
  );
  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Categories</p>
      </div>

      <SearchAndActions />

      {/* table */}

      <div className="mt-6">
        <DataTable columns={columns} data={categoriesData} />
      </div>
    </div>
  );
};

export default CategoryView;
