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
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import AddEditUserForm from "@/components/forms/add-edit-users";
import { createUser, EditUser } from "@/lib/actions/admin/users-actions";
import { useForm } from "react-hook-form";
import { BillingAddressSchema, UserProfileSchema } from "@/lib/zod-schema";
import { TParsedUser } from "@/lib/helpers/data-validation";
import { TAddress } from "../checkout/views/checkout-view";
import { TBillingAddressFormData } from "../checkout/add-new-address";
import AddEditAddressForm from "@/components/forms/add-edit-address";
import { editBillingAddress } from "@/lib/actions/client";

//-----------------------------------------------------------------------------------

interface TProps {
  open: boolean;
  toggleClose: () => void;
  addressToEdit?: TAddress;
}

//-----------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------

const UpdateAddressModal: React.FC<TProps> = ({
  open = false,
  toggleClose,
  addressToEdit,
}) => {
  //-----------------------------------------------------------------------------------

  const router = useRouter();

  //local states

  const [show, setShow] = useState(open);
  const [submitting, setSubmitting] = useState(false);

  const { pending } = useFormStatus();

  // react-hook form

  const form = useForm<TBillingAddressFormData>({
    resolver: zodResolver(BillingAddressSchema),
  });

  // useEffect to set the initial state for edit modal

  useEffect(() => {
    form.reset(addressToEdit);
  }, [form, addressToEdit]);

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

  async function onSubmit(values: TBillingAddressFormData) {
    try {
      setSubmitting(true);

      const resp = await editBillingAddress({
        address: values,
        addressId: addressToEdit?.addressId || "",
      });

      if (!resp.success) {
        toast.error("Unexpected error Failed to update address");
      }

      toast.success("Successfully updated address");

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
    <Dialog open={show} onOpenChange={toggleClose}>
      <DialogContent className="max-w-[600px]">
        {/* header */}

        <DialogHeader>
          <DialogTitle className="text-xl">Edit Address</DialogTitle>
        </DialogHeader>

        {/* form */}

        <div className="max-h-[50vh] overflow-hidden overflow-y-auto px-2 pb-3 pt-2">
          <AddEditAddressForm form={form} />
        </div>

        {/* footer with actions */}

        <DialogFooter>
          <div className={cn("mt-2 flex w-full justify-end")}>
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
              Edit Address
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateAddressModal;
