"use client";

import { Button } from "@/components/ui/button";
import { categoriesReducers } from "@/store/slices/admin/categories";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { FaTrashAlt } from "react-icons/fa";
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
    cell: ({ row }) => {
      return row.getValue("onOffer") ? "True" : "False";
    },
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
    dispatch(categoriesReducers.setCategoryToEdit(row.getValue("id")));
    dispatch(categoriesReducers.toggleShowEditCategory());
  };

  const showDeleteCategoryConfirmation = () => {
    dispatch(categoriesReducers.setCategoryToDelete(row.getValue("id")));
    dispatch(categoriesReducers.toggleDeleteCategoryConfirmation());
  };

  return (
    <div className="flex justify-center gap-4">
      <Button
        onClick={showEdit}
        className="size-[26px] bg-black/10 text-black hover:bg-black/15 hover:text-green-600"
        size={"icon"}
      >
        <MdEdit />
      </Button>

      <Button
        onClick={showDeleteCategoryConfirmation}
        className="size-[26px] bg-black/10 text-black hover:bg-black/15 hover:text-red-600"
        size={"icon"}
      >
        <FaTrashAlt />
      </Button>
    </div>
  );
};
