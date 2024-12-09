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
import { UserProfileSchema } from "@/lib/zod-schema";
import { TUser } from "./views/users-view";
import { TParsedUser } from "@/lib/helpers/data-validation";

//-----------------------------------------------------------------------------------

interface TProps {
  type: "add" | "edit";
  open: boolean;
  toggleClose: () => void;
  userToEdit?: TUser;
}

//-----------------------------------------------------------------------------------

const LABELS = {
  add: "Add User",
  edit: "Edit User",
};

const H1 = {
  add: "Add A New User",
  edit: "Edit User",
};

//-----------------------------------------------------------------------------------

const AddOrEditUserModal: React.FC<TProps> = ({
  type,
  open = false,
  toggleClose,
  userToEdit,
}) => {
  //-----------------------------------------------------------------------------------

  const router = useRouter();

  //local states

  const [show, setShow] = useState(open);
  const [submitting, setSubmitting] = useState(false);

  const { pending } = useFormStatus();

  // react-hook form

  const form = useForm<TParsedUser>({
    mode: "onChange",
    resolver: zodResolver(UserProfileSchema),
  });

  // useEffect to set the initial state for edit modal

  useEffect(() => {
    if (userToEdit && type === "edit") {
      const {
        kindeId,
        userId,
        userInternalId,
        createdAt,
        updatedAt,
        ...userInfo
      } = userToEdit;

      const userData: TParsedUser = {
        first_name: userInfo.firstName || "",
        last_name: userInfo.lastName || "",
        email: userInfo.email || "",
        phone: userInfo.phone || "",
      };

      form.reset(userData);
    }
  }, [userToEdit, type, form]);

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

  async function onSubmit(values: TParsedUser) {
    try {
      setSubmitting(true);
      switch (type) {
        case "add": {
          // submit logic for adding new category

          let resp = await createUser(values);

          if (!resp.success) {
            setSubmitting(false);
            return toast.error(resp.message);
          }

          toast.success("Successfully Created User");

          break;
        }

        case "edit": {
          // submit logic for editing existing category
          if (!userToEdit) {
            return toast.error("Unexpected error: User data not found");
          }

          let resp = await EditUser(values);

          // if (!resp.success) {
          //   setSubmitting(false);
          //   return toast.error(resp.message);
          // }

          toast.success("Successfully Updated User");
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
      <DialogContent className="max-w-[600px]">
        {/* header */}

        <DialogHeader>
          <DialogTitle className="text-xl">{H1[type]}</DialogTitle>
        </DialogHeader>

        {/* form */}

        <div className="max-h-[600px] overflow-hidden overflow-y-auto px-2 pt-2">
          <AddEditUserForm form={form} type={type} />
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
              {LABELS[type]}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditUserModal;
