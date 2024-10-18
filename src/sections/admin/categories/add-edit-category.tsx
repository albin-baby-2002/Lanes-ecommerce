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
import { CategorySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AddEditCategoryForm from "@/components/forms/add-edit-category";
import { useFormStatus } from "react-dom";
import { createCategory } from "@/lib/actions/admin-actions";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { TCategory } from "./edit-modal";

//-----------------------------------------------------------------------------------

interface TProps {
  type: "add";
  open?: boolean; // need to pass when hidding trigger
  toggleClose?: () => void; // close when trigger is not used
  categoryToEdit?: TCategory;
}

interface TEditProps {
  type: "edit";
  open: boolean; // need to pass when hidding trigger
  toggleClose: () => void; // close when trigger is not used
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
      onOffer: "False",
    },
  });

  //-----------------------------------------------------------------------------------

  useEffect(() => {
    setShow(open);
  }, [open]);

  //-----------------------------------------------------------------------------------

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

      const resp = await createCategory(values);

      if (!resp.success) {
        setSubmitting(false);
        return toast.error(resp.message);
      }

      toast.success("Successfully Created Category");

      toggleShow();

      setSubmitting(false);

      router.refresh();
    } catch (error) {
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
                  width={24}
                  className="mr-2"
                  alt="svg"
                  src={"/loaders/circular-loader.svg"}
                />
              )}
              Add Category
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditCategoryModal;
