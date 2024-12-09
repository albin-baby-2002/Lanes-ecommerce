"use client";

import { Button } from "@/components/ui/button";
import { productsReducers } from "@/store/slices/admin/products";
import { usersReducers } from "@/store/slices/admin/users";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { format } from "date-fns";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

interface TUserData {
  userId: string;
  userInternalId: number;
  kindeId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const usersColumns: ColumnDef<TUserData>[] = [
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
      const userID = "#USR" + row.getValue("userInternalId");
      return <p>{userID}</p>;
    },
  },

  {
    accessorKey: "firstName",
    header: "User Name",
    minSize: 100,
    enableHiding: true,
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
    minSize: 100,
    enableHiding: true,
  },
  {
    accessorKey: "",
    header: "Username",
    minSize: 60,
    cell: ({ row }) => {
      const firstName: string = row.getValue("firstName");
      const lastName: string = row.getValue("lastName");

      return (
        <p className="overflow-hidden overflow-ellipsis text-nowrap">
          {firstName} {lastName}
        </p>
      );
    },
  },

  {
    accessorKey: "email",
    header: "Email",
    minSize: 200,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    minSize: 200,

    cell: ({ row }) => {
      const phone: string = row.getValue("phone");

      return (
        <p className="overflow-hidden overflow-ellipsis text-nowrap">
          {phone || "-"}
        </p>
      );
    },
  },
  {
    accessorKey: "kindeId",
    header: "KindeId",
    minSize: 300,
  },

  {
    accessorKey: "createdAt",
    header: "CreatedAt",
    minSize: 80,

    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");

      return <p>{format(date, "yyyy-MM-dd")}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "updatedAt",
    minSize: 80,

    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");

      return <p>{format(date, "yyyy-MM-dd")}</p>;
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "h",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: Row<TUserData> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const showEdit = () => {
    dispatch(usersReducers.setUserToEdit(row.getValue("userId")));
    dispatch(usersReducers.toggleShowEditUser());
  };

  const showDeleteUserConfirmation = () => {
    dispatch(usersReducers.setUserToDelete(row.getValue("userId")));
    dispatch(usersReducers.toggleShowDeleteConfirmation());
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
        onClick={showDeleteUserConfirmation}
        className="size-[26px] bg-black/10 text-black hover:bg-black/15 hover:text-red-600"
        size={"icon"}
      >
        <FaTrashAlt />
      </Button>
    </div>
  );
};
