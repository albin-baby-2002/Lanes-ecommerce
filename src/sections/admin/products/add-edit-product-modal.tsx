"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategorySchema, ProductSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import AddEditCategoryForm from "@/components/forms/add-edit-category";
import { useFormStatus } from "react-dom";
import {
  createCategory,
  EditCategory,
} from "@/lib/actions/admin/category-actions";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddEditProductForm from "@/components/forms/add-edit-product";
import { getAllCategories } from "@/lib/db-services/category";
import { categories } from "@/drizzle/schema";

//-----------------------------------------------------------------------------------

interface TProps {
  type: "add" | "edit";
  open: boolean;
  toggleClose: () => void;
}

export type TProductData = z.infer<typeof ProductSchema>;

//-----------------------------------------------------------------------------------

const LABELS = {
  add: "Add Product",
  edit: "Edit Product",
};

const H1 = {
  add: "Add A New Product",
  edit: "Edit Product",
};

//-----------------------------------------------------------------------------------

const AddOrEditProductModal: React.FC<TProps> = ({
  type,
  open = false,
  toggleClose,
}) => {
  //-----------------------------------------------------------------------------------

  const router = useRouter();

  //local states

  const [show, setShow] = useState(open);
  const [submitting, setSubmitting] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm<TProductData>({
    mode: "onChange",
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      categories: [],
    },
  });

  //-----------------------------------------------------------------------------------

  // useEffect to set show based on open if modal don't have trigger

  useEffect(() => {
    setShow(open);
  }, [open]);

  // useEffect to set the initial state for edit modal

  // useEffect(() => {
  //   if (categoryToEdit && type === "edit") {
  //     const existingCategory: TCategoryData = {
  //       name: categoryToEdit.name,
  //       description: categoryToEdit.description,
  //       onOffer: categoryToEdit.onOffer ? "True" : "False",
  //       offerName: categoryToEdit.offerName,
  //       offerDiscount: categoryToEdit.offerDiscount + "",
  //     };
  //     form.reset(existingCategory);
  //   }
  // }, [categoryToEdit, type, form]);

  //-----------------------------------------------------------------------------------

  // fn to toggle based on the modal have trigger or not

  const toggleShow = () => {
    toggleClose();

    setShow((prev) => !prev);
  };

  // fn to handle submit form edit or add

  async function onSubmit(values: TProductData) {
    try {
      setSubmitting(true);
      switch (type) {
        case "add": {
          // submit logic for adding new category
          // let resp = await createCategory(values);

          // if (!resp.success) {
          //   setSubmitting(false);
          //   return toast.error(resp.message);
          // }

          toast.success("Successfully Created Category");
          break;
        }

        // case "edit": {
        //   // submit logic for editing existing category
        //   if (!categoryToEdit) {
        //     return toast.error("Unexpected error: category data not found");
        //   }

        //   let resp = await EditCategory(categoryToEdit?.id, values);

        //   if (!resp.success) {
        //     setSubmitting(false);
        //     return toast.error(resp.message);
        //   }

        //   toast.success("Successfully Updated Category");
        //   break;
        // }

        default: {
          return toast.error("Invalid operation type");
        }
      }

      // Refresh the page and toggle the modal after the operation is successful
      router.refresh();
      toggleShow();

      setSubmitting(false);

      router.refresh();
    } catch (error) {
      toast.error("Unexpected error! Try Again !");
      setSubmitting(false);
      console.log(error);
    }
  }

  //-----------------------------------------------------------------------------------

  return (
    <Dialog
      open={show}
      onOpenChange={type === "edit" ? toggleClose : toggleShow}
    >
      {false && type === "add" && (
        <DialogTrigger className="h-auto min-h-full rounded-md bg-black px-5 text-white">
          {LABELS[type]}
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{H1[type]}</DialogTitle>
        </DialogHeader>
        <div className="pt-2">
          <AddEditProductForm form={form} />
        </div>

        <DialogFooter>
          <div className="mt-2 w-full">
            <Button onClick={form.handleSubmit(onSubmit)} className="">
              {(submitting || pending) && (
                <Image
                  height={24}
                  width={24}
                  className="mr-2"
                  alt="svg"
                  src={"/loaders/circular-loader.svg"}
                />
              )}
              {LABELS[type]}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditProductModal;
