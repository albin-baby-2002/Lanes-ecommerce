"use client";
import { Button } from "@/components/ui/button";
import { TOrderItemsSelect } from "@/lib/db-services/orders";
import { categoriesReducers } from "@/store/slices/admin/categories";
import { ordersReducers } from "@/store/slices/admin/orders";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";

export const ordersColumns: ColumnDef<TOrderItemsSelect>[] = [
  {
    accessorKey: "orderItemId",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: "price",
    enableHiding: true,
  },
  {
    accessorKey: "quantity",
    header: "quantity",
    enableHiding: true,
  },
  {
    accessorKey: "orderItemInternalId",
    header: "Id",
    cell: ({ row }) => {
      return "#ORD" + row.getValue("orderItemInternalId");
    },
  },
  {
    accessorKey: "productVariantInternalId",
    header: "Product VariantId",
    cell: ({ row }) => {
      return "#PRDVAR" + row.getValue("productVariantInternalId");
    },
  },
  {
    accessorKey: "Total",
    header: "Total Order Value",
    cell: ({ row }) => {
      console.log(row, "row");
      const quantity = row.getValue("quantity") as number;
      const price = row.getValue("price") as number;

      return "$ " + quantity * price;
    },
  },
  {
    accessorKey: "totalDiscount",
    header: "Total Discount",
    cell: ({ row }) => {
      const discount = row.getValue("totalDiscount") as number;
      return "$ " + discount;
    },
  },
  {
    accessorKey: "total",
    header: "Grand Total ",
    cell: ({ row }) => {
      const total = row.getValue("total") as number;
      return "$ " + total;
    },
  },
  {
    accessorKey: "shippingStatus",
    header: "Shipping Status ",
    cell: ({ row }) => {
      const shippingStatus = row.getValue("shippingStatus") as string;
      return <p>{shippingStatus.toLowerCase()}</p>;
    },
  },

  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
      return status.toLowerCase();
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "h",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: Row<TOrderItemsSelect> }) => {
  const dispatch = useDispatch<AppDispatch>();

  const showEdit = () => {
    dispatch(ordersReducers.toggleShowEditOrder());
    dispatch(ordersReducers.setOrderToEdit(row.getValue("orderItemId")));
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
    </div>
  );
};
