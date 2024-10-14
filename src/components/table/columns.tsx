"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TColumns = {
  categoryId: number;
  name: string;
  description: string;
  onOffer: boolean;
  offerName: string;
  offerDiscount: number;
};

export const columns: ColumnDef<TColumns>[] = [
  {
    accessorKey: "categoryId",
    header: "Id",
    cell:({row})=>{

      return "#CAT"+row.getValue("categoryId")
    }
  },
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },

  {
    accessorKey: "onOffer",
    header: "On Offer",
  },
  {
    accessorKey: "offerName",
    header: "Offer Name",
  },
  {
    accessorKey: "offerDiscount",
    header: "Offer Discount",
  },
];
