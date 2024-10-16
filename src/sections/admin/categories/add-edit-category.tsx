"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { CategorySchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import AddEditCategoryForm from "@/components/forms/add-edit-category";
import { useFormStatus } from "react-dom";
import { createCategory } from "@/lib/actions/admin-actions";
import Image from "next/image";
import { toast } from "sonner";

//-----------------------------------------------------------------------------------

interface TProps {
  type: "add" | "edit";
  hideTrigger?: boolean;// to hide trigger btn
  open?:boolean; // need to pass when hidding trigger
}

export type TCategoryData = z.infer<typeof CategorySchema>;

const LABELS = {
  add: "Add Category",
  edit: "Edit Category",
};

const H1 = {
  add: "Create A New Category",
  edit: "Create A New Category",
};

//-----------------------------------------------------------------------------------

const AddOrEditCategoryModal: React.FC<TProps> = ({
  type,
  hideTrigger = false,
  open = false
}) => {
  const [show, setShow] = useState(open);

  const [submitting, setSubmitting] = useState(false);
  const { pending } = useFormStatus();

  const toggleShow = () => {
    setShow((prev) => !prev);
  };

  const form = useForm<TCategoryData>({
    mode: "onChange",
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      onOffer: "False",
    },
  });

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
    } catch (error) {
      setSubmitting(false);
      console.log(error);
    }
  }

  return (
    <Dialog open={show} onOpenChange={toggleShow}>
      {!hideTrigger && (
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
