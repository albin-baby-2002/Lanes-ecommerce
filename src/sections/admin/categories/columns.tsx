"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { MdEdit } from "react-icons/md";

export type TColumns = {
  categoryId: number;
  name: string;
  description: string;
  onOffer: boolean;
  offerName: string;
  offerDiscount: number;
};

export const createColumns = (): ColumnDef<TColumns>[] => {
  return [
    {
      accessorKey: "categoryId",
      header: "Id",
      cell: ({ row }) => {
        return "#CAT" + row.getValue("categoryId");
      },
    },
    {
      accessorKey: "name",
      header: "Category Name",
    },
    {
      accessorKey: "description",
      header: "Description",
      minSize: 260,
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
      size: 100,
      maxSize: 120,
      header: () => <div className="text-center">Offer Discount</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center">
            {row.getValue("offerDiscount") + "%"}
          </div>
        );
      },
    },
    {
      header: () => <div className="text-center">Actions</div>,
      accessorKey: "h",
      cell: () => {
        return (
          <div className="flex justify-center">
            <Button
              className="size-[26px] bg-black/10 hover:bg-black/15"
              size={"icon"}
            >
              <MdEdit className="text-black" />
            </Button>
          </div>
        );
      },
    },
  ];
};
