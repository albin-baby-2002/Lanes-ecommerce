"use client";

import { Button } from "@/components/ui/button";
import { productsReducers } from "@/store/slices/admin/products";
import { AppDispatch } from "@/store/store";
import { ColumnDef, Row } from "@tanstack/react-table";
import { FaTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";


export interface TData {
  products: Products;
  productVariants: ProductVariants;
  productVariantImages: ProductVariantImages;
  productCategories: ProductCategories;
  categories: Categories;
}

export interface Products {
  productId: string;
  productInternalId: number;
  name: string;
  description: string;
  discount: number | null;
  onDiscount: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariants {
  productVariantId: string;
  productVariantInternalId: number;
  productId: string;
  color: string;
  size: string;
  inventoryCount: number | null;
  price: number;
  onSale: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariantImages {
  productVariantImageId: string;
  imgUrl: string;
  productVariantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductCategories {
  productId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Categories {
  categoryId: string;
  categoryInternalId: number;
  name: string;
  description: string;
  onOffer: boolean;
  offerName: string;
  offerDiscount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const productsColumns: ColumnDef<TData>[] = [
  {
    accessorKey: "productId",
    header: "ID",
    enableHiding: true,
  },
  {
    accessorKey: "products.productInternalId",
    header: "Id",
    cell: ({ row }) => {
      return "#CAT" + row.getValue("productInternalId");
    },
  },
  {
    accessorKey: "name",
    header: "product Name",
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
    dispatch(productsReducers.setproductToEdit(row.getValue("productId")));
    dispatch(productsReducers.toggleShowEditproduct());
  };

  const showDeleteproductConfirmation = () => {
    console.log(row.getValue("productId"));
    dispatch(
      productsReducers.setproductToDelete(row.getValue("productId")),
    );
    dispatch(productsReducers.toggleDeleteproductConfirmation());
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
