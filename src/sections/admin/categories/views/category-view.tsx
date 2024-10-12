import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import React from "react";
import SearchAndActions from "../search-and-actions";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

const CategoryView = async () => {
  let data = await getData();

  return (
    <div className="h-full bg-slate-50 p-8">
      <div className="mb-8">
        <p className="font-Inter text-2xl font-bold">Categories</p>
      </div>

      <SearchAndActions />

      {/* table */}

      <div className="mt-6">
        <DataTable columns={columns} data={data} />
      </div>

    </div>
  );
};

export default CategoryView;
