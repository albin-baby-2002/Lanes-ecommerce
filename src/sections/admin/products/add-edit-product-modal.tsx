"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  createProductWithVariantsAndCategory,
  EditProduct,
} from "@/lib/actions/admin/product-actions";
import { TProductsData } from "./views/products-view";

//-----------------------------------------------------------------------------------

interface TProps {
  type: "add" | "edit";
  open: boolean;
  toggleClose: () => void;
  productToEdit?: TProductsData;
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
  productToEdit,
}) => {
  //-----------------------------------------------------------------------------------

  const router = useRouter();

  //local states

  const [show, setShow] = useState(open);
  const [submitting, setSubmitting] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const { pending } = useFormStatus();

  // react-hook form

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
          onSale: false,
          productVariantImages: [],
        },
      ],
    },
  });

  // useEffect to set the initial state for edit modal

  useEffect(() => {
    if (productToEdit && type === "edit") {
      const {
        productInternalId,
        productVariants,
        createdAt,
        updatedAt,
        categories,
        ...productInfo
      } = { ...productToEdit };

      const categoriesInfo = categories.map((val) => val.categoryId);

      const existingProduct: TProductData = {
        ...productInfo,
        categories: categoriesInfo,
        productVariants,
      };

      form.reset(existingProduct);
    }
  }, [productToEdit, type, form]);

  // watch value of form

  const values = form.watch();

  // navigation fns

  const goBack = () => {
    if (page <= 0) return;
    setPage((prev) => prev - 1);
  };

  const goNext = async () => {
    if (page >= totalPage) return;

    if (page === 0) {
      const isValid = await form.trigger([
        "name",
        "description",
        "categories",
        "onDiscount",
        "discount",
      ]);

      if (!isValid) return;
    } else {
      const isValid = await form.trigger(`productVariants.${page - 1}`);

      if (!isValid) return;
    }

    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    setTotalPage(values.productVariants.length);
  }, [values]);

  const productVariantFields = useFieldArray({
    control: form.control,
    name: "productVariants",
  });

  useEffect(() => {
    setPage(0);
  }, [productToEdit]);

  //-----------------------------------------------------------------------------------

  // useEffect to set show based on open if modal don't have trigger

  useEffect(() => {
    setShow(open);
  }, [open]);

  //-----------------------------------------------------------------------------------

  // fn to toggle  the modal

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

          let resp = await createProductWithVariantsAndCategory(values);

          if (!resp.success) {
            setSubmitting(false);
            return toast.error(resp.message);
          }

          toast.success("Successfully Created Product");

          break;
        }

        case "edit": {
          // submit logic for editing existing category
          if (!productToEdit) {
            return toast.error("Unexpected error: Product data not found");
          }

          let resp = await EditProduct(values);

          if (!resp.success) {
            setSubmitting(false);
            return toast.error(resp.message);
          }

          toast.success("Successfully Updated Product");
          break;
        }

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
      <DialogContent className="z-10 max-w-[600px]">
        {/* header */}

        <div className=" ">
          <DialogHeader>
            <DialogTitle className="text-xl">{H1[type]}</DialogTitle>
          </DialogHeader>

          {/* form */}

          <div className="max-h-[600px] overflow-hidden overflow-y-auto px-2 pt-2">
            <AddEditProductForm
              type={type}
              productVariantFields={productVariantFields}
              currentPage={page}
              setCurrentPage={setPage}
              form={form}
            />
          </div>

          {/* footer with actions */}

          <DialogFooter>
            <div
              className={cn("mt-2 flex w-full justify-between", {
                "justify-end": page === 0,
              })}
            >
              {/* previous btn */}

              {page > 0 && (
                <Button variant={"outline"} onClick={goBack}>
                  Previous
                </Button>
              )}

              <div className="flex gap-2">
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
                  <Button onClick={goNext}>Continue</Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditProductModal;
