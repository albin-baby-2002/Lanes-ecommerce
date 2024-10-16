import { DataTable } from "@/components/table/data-table";
import React from "react";
import dynamic from "next/dynamic";

interface TcategoriesData {
  id: string;
  name: string;
  categoryId: number;
  description: string;
  onOffer: boolean;
  offerName: string;
  offerDiscount: number;
}


const CategoryTable = async ({ data }: { data: TcategoriesData[] }) => {
  let columns;

  if (typeof window !== undefined) {

    const {createColumns} = await import('./columns')
    columns = createColumns();
  }

  // const categoriesData = await db.select().from(categories);

  return (
    <div className="mt-6">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CategoryTable;
