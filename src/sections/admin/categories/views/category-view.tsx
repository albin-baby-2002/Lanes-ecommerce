import React from "react";
import SearchAndActions from "../search-and-actions";
import { columns } from "../columns";
import CategoryTable from "../data-table";
import { db } from "@/drizzle/db";
import { categories } from "@/drizzle/schema";

const CategoryView = async () => {

  const categoriesData = await db.select().from(categories);

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Categories</p>
      </div>

      <SearchAndActions />

      <CategoryTable columns={columns} data={categoriesData} />

    </div>
  );
};

export default CategoryView;
