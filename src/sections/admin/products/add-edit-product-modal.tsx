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
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import AddEditProductForm from "@/components/forms/add-edit-product";
import { ProductSchema } from "@/lib/zod-schema";
import { cn } from "@/lib/utils";

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

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const { pending } = useFormStatus();

  const form = useForm<TProductData>({
    mode: "onChange",
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      categories: [],
      productVariants: [
        {
          color: "",
          size: "",
          inventoryCount: 0,
          price: 0,
          onSale: "False",
          productVariantImages: [],
        },
      ],
    },
  });

  const values = form.watch();

  const goBack = () => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
  };

  const goNext = () => {
    if (page >= totalPage) return;
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    console.log(values);
    setTotalPage(values.productVariants.length);
  }, [values]);

  const {
    fields: productVariantFields,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "productVariants",
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

      <DialogContent className=" max-w-[650px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{H1[type]}</DialogTitle>
        </DialogHeader>
        <div className=" px-2  overflow-hidden overflow-y-auto pt-2">
          <AddEditProductForm
            productVariantFields={productVariantFields}
            currentPage={page}
            form={form}
          />
        </div>

        <DialogFooter>
          <div
            className={cn("mt-2 flex w-full justify-between", {
              "justify-end": page === 0,
            })}
          >
            {page > 0 && (
              <Button variant={"outline"} onClick={goBack}>
                Previous
              </Button>
            )}

            {page === totalPage ? (
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
            ) : (
              <Button onClick={goNext}>Next</Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditProductModal;
