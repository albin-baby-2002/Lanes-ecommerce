"use client";

import { Button } from "@/components/ui/button";
import { categoriesReducers } from "@/store/slices/admin/categories";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

export type TColumns = {
  categoryId: number;
  name: string;
  description: string;
  onOffer: boolean;
  offerName: string;
  offerDiscount: number;
};

export const cateogriesColumns: ColumnDef<TColumns>[] = [
  {
    accessorKey: "id",
    header: "ID",
    enableHiding: true,
  },
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
    size: 140,
    maxSize: 140,
    header: () => <div className="text-center">Offer Discount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("offerDiscount") + "%"}</div>
      );
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "h",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: Row<TColumns> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const showEdit = () => {
    dispatch(categoriesReducers.toggleShowEditCategory());
    dispatch(categoriesReducers.setCategoryToEdit(row.getValue("id")));
  };

  return (
    <div className="flex justify-center">
      <Button
        onClick={showEdit} // Call the dispatch function on click
        className="size-[26px] bg-black/10 hover:bg-black/15"
        size={"icon"}
      >
        <MdEdit className="text-black" />
      </Button>
    </div>
  );
};
