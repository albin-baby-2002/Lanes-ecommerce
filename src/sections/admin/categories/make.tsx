"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import { TColumns } from "./columns";
import { ColumnDef } from "@tanstack/react-table";

const Make = () => {
  const [showEditModal, setShowEditModal] = useState(false);

  const toggleEditModal = () => {
    setShowEditModal((prev) => !prev);
  };

  const columns: ColumnDef<TColumns>[] = [
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

export default Make;
