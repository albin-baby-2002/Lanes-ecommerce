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
import { CategorySchema } from "@/lib/zod-schema";
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
import { TCategory } from "./category-action-modals";

//-----------------------------------------------------------------------------------

// optional types are not needed for "add" and adding it might cause some bug
// those are added to avoid conflict

interface TProps {
  type: "add";
  open?: boolean;
  toggleClose?: () => void;
  categoryToEdit?: TCategory;
}

interface TEditProps {
  type: "edit";
  open: boolean;
  toggleClose: () => void; // to close when trigger is not used
  categoryToEdit: TCategory | undefined;
}

export type TCategoryData = z.infer<typeof CategorySchema>;

//-----------------------------------------------------------------------------------

const LABELS = {
  add: "Add Category",
  edit: "Edit Category",
};

const H1 = {
  add: "Create A New Category",
  edit: "Edit Category",
};

//-----------------------------------------------------------------------------------

const AddOrEditCategoryModal: React.FC<TProps | TEditProps> = ({
  type,
  open = false,
  toggleClose,
  categoryToEdit,
}) => {
  //-----------------------------------------------------------------------------------

  const router = useRouter();

  //local states

  const [show, setShow] = useState(open);
  const [submitting, setSubmitting] = useState(false);
  const { pending } = useFormStatus();

  const form = useForm<TCategoryData>({
    mode: "onChange",
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      onOffer: false,
    },
  });

  //-----------------------------------------------------------------------------------

  // useEffect to set show based on open if modal don't have trigger

  useEffect(() => {
    if (open !== undefined) {
      setShow(open);
    }
  }, [open]);

  // useEffect to set the initial state for edit modal

  useEffect(() => {
    if (categoryToEdit && type === "edit") {
      const existingCategory: TCategoryData = {
        name: categoryToEdit.name,
        description: categoryToEdit.description,
        onOffer: categoryToEdit.onOffer,
        offerName: categoryToEdit.offerName,
        offerDiscount: categoryToEdit.offerDiscount,
      };

      form.reset(existingCategory);
    }
  }, [categoryToEdit, type, form]);

  //-----------------------------------------------------------------------------------

  // fn to toggle based on the modal have trigger or not

  const toggleShow = () => {
    if (type == "edit" && toggleClose) {
      toggleClose();
      return;
    }
    setShow((prev) => !prev);
  };

  // fn to handle submit form edit or add

  async function onSubmit(values: TCategoryData) {
    try {
      setSubmitting(true);

      switch (type) {
        case "add": {
          // submit logic for adding new category
          let resp = await createCategory(values);

          if (!resp.success) {
            setSubmitting(false);
            return toast.error(resp.message);
          }

          form.reset({});
          toast.success("Successfully Created Category");
          break;
        }

        case "edit": {
          // submit logic for editing existing category
          if (!categoryToEdit) {
            return toast.error("Unexpected error: category data not found");
          }

          let resp = await EditCategory(categoryToEdit?.categoryId, values);

          if (!resp.success) {
            setSubmitting(false);
            return toast.error(resp.message);
          }

          toast.success("Successfully Updated Category");
          form.reset();
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
      {type === "add" && (
        <DialogTrigger className="h-auto min-h-full rounded-md bg-black px-5 text-white">
          {LABELS[type]}
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl">{H1[type]}</DialogTitle>
        </DialogHeader>
        <div className="pt-2">
          <AddEditCategoryForm form={form} />
        </div>

        <DialogFooter>
          <div className="mt-2 w-full">
            <Button onClick={form.handleSubmit(onSubmit)} className="">
              {(submitting || pending) && (
                <Image
                  height={24}
                  unoptimized
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

export default AddOrEditCategoryModal;
