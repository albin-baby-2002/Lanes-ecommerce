"use client";

import { Button } from "@/components/ui/button";
import { productsReducers } from "@/store/slices/admin/products";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface userData {
  userId: string;
  userInternalId: number;
  kindeId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const usersColumns: ColumnDef<userData>[] = [
  {
    accessorKey: "userId",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "userInternalId",
    header: "User ID",
    enableHiding: true,
    cell: ({ row }) => {
      const userID = "#PRD" + row.getValue("userInternalId");

      return <p>{userID}</p>;
    },
  },

  {
    accessorKey: "firstName",
    header: "User Name",
    minSize: 200,
    enableHiding: true,
  },
  {
    accessorKey: "firstName",
    header: "User Name",
    minSize: 200,
    enableHiding: true,
  },
  {
    accessorKey: "description",
    header: "Description",
    minSize: 250,
    cell: ({ row }) => {
      const val: string = row.getValue("description");
      return (
        <p className="overflow-hidden overflow-ellipsis text-nowrap">{val}</p>
      );
    },
  },

  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "h",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: Row<TProductsData> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const showEdit = () => {
    dispatch(productsReducers.setProductToEdit(row.getValue("productId")));
    dispatch(productsReducers.toggleShowEditProduct());
  };

  const showDeleteproductConfirmation = () => {
    dispatch(productsReducers.setProductToDelete(row.getValue("productId")));
    dispatch(productsReducers.toggleDeleteProductConfirmation());
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
        onClick={showDeleteproductConfirmation}
        className="size-[26px] bg-black/10 text-black hover:bg-black/15 hover:text-red-600"
        size={"icon"}
      >
        <FaTrashAlt />
      </Button>
    </div>
  );
};
