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
import { orderItemSchema } from "@/lib/zod-schema";
import { cn } from "@/lib/utils";
import EditOrderForm from "@/components/forms/edit-order";
//-----------------------------------------------------------------------------------

interface TProps {
  open: boolean;
  toggleClose: () => void;
  orderToEdit?: TOrderItem;
}

export type TOrderItem = z.infer<typeof orderItemSchema>;

//-----------------------------------------------------------------------------------

const EditOrderModal: React.FC<TProps> = ({
  open = false,
  toggleClose,
  orderToEdit,
}) => {
  //-----------------------------------------------------------------------------------

  const router = useRouter();

  //local states

  const [submitting, setSubmitting] = useState(false);
  const { pending } = useFormStatus();

  // react-hook form

  const form = useForm<TOrderItem>({
    mode: "onChange",
    resolver: zodResolver(orderItemSchema),
    defaultValues: {},
  });

  // useEffect to set the initial state for edit modal

  useEffect(() => {
    if (orderToEdit) {
    }
  }, [orderToEdit, form]);

  //-----------------------------------------------------------------------------------

  // fn to handle submit form edit or add

  async function onSubmit(values: TOrderItem) {
    try {
      setSubmitting(true);

      const resp = { success: true };

      if (!resp.success) {
        setSubmitting(false);
        return toast.error(resp.message);
      }

      toast.success("Successfully Updated Order");

      // Refresh the page and toggle the modal after the operation is successful
      router.refresh();
      toggleClose();

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
    <Dialog open={open} onOpenChange={toggleClose}>
      <DialogContent className="z-10 max-w-[600px]">
        {/* header */}

        <div className=" ">
          <DialogHeader>
            <DialogTitle className="text-xl">Update Order</DialogTitle>
          </DialogHeader>

          {/* form */}

          <div className="max-h-[600px] overflow-hidden overflow-y-auto px-2 py-8">
            <EditOrderForm form={form} />
          </div>

          {/* footer with actions */}

          <DialogFooter>
            <div className={cn("mt-2 flex w-full justify-end")}>
              {/* previous btn */}

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
                Update Order
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditOrderModal;
