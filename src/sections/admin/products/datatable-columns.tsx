"use client";

import { Button } from "@/components/ui/button";
import { productsReducers } from "@/store/slices/admin/products";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { ProductVariant, TProductsData } from "./views/products-view";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { TProductsWithVariantsAndImages } from "@/lib/db-services/products";

export const productsColumns: ColumnDef<TProductsWithVariantsAndImages>[] = [
  {
    accessorKey: "productId",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "productVariants",
    header: "productVariants",
    enableHiding: true,
  },
  {
    accessorKey: "productInternalId",
    header: "productInternalId",
    enableHiding: true,
  },
  {
    accessorKey: "none",
    header: "Product ID",
    maxSize: 170,
    cell: ({ row }) => {
      const variants: ProductVariant[] = row.getValue("productVariants");
      const imageUrl = variants[0].productVariantImages[0];
      const productID = "#PRD" + row.getValue("productInternalId");

      return (
        <div className="flex items-center z-0 gap-4">
          <div className="relative h-10 z-0 w-10">
            <Image
              fill
              unoptimized
              className="h-full w-full rounded-lg object-cover"
              src={` https://res.cloudinary.com/dfm8vhuea/image/upload/${imageUrl}`}
              alt=""
            />
          </div>
          <p>{productID}</p>{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Product Name",
    minSize: 200,
    cell: ({ row }) => {
      const val: string = row.getValue("name");
      return (
        <p className="overflow-hidden overflow-ellipsis text-nowrap">{val}</p>
      );
    },
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
    accessorKey: "onDiscount",
    header: ()=><p className=" w-full text-center" >On Discount</p>,
    cell: ({ row }) => {
      return <p className=" text-center w-full">{row.getValue("onDiscount") ? "True" : "False"}</p>;
    },
  },
  {
    accessorKey: "none",
    header: ()=><p className=" w-full text-center" >Base Variant Price</p>,
    cell: ({ row }) => {
      const variants: ProductVariant[] = row.getValue("productVariants");

      return <p className=" text-center w-full">{variants[0].price}</p>;
    },
  },

  {
    accessorKey: "none",
    minSize: 140,
    maxSize: 140,
    header: () => <div className="text-center"> Avg Price</div>,
    cell: ({ row }) => {
      const variants: ProductVariant[] = row.getValue("productVariants");
      const totalPrice = variants.reduce((total, val) => {
        return (total += val.price);
      }, 0);

      const avgPrice = totalPrice / variants.length;

      return (
        <div className="flex items-center justify-center gap-3">
          <p>{avgPrice.toFixed(2)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "discount",
    size: 140,
    maxSize: 140,
    header: () => <div className="text-center">Offer Discount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">{row.getValue("discount") + "%"}</div>
      );
    },
  },
  {
    accessorKey: "none",
    minSize: 140,
    maxSize: 140,
    header: () => <div className="text-center"> Variant Colors</div>,
    cell: ({ row }) => {
      const variants: ProductVariant[] = row.getValue("productVariants");
      const colors = variants?.map((val) => val?.color);

      return (
        <div className="flex items-center justify-center gap-3">
          {colors.map((val, idx) => {
            return (
              <div
                style={{ background: val }}
                key={idx}
                className={cn(
                  "flex size-[18px] items-center justify-center rounded-[50%] border border-gray-300 bg-red-300 p-1",
                  `bg-['${val}']`,
                )}
              ></div>
            );
          })}
        </div>
      );
    },
  },
  {
    header: () => <div className="text-center">Actions</div>,
    accessorKey: "h",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

const ActionsCell = ({ row }: { row: Row<TProductsWithVariantsAndImages> }) => {
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
