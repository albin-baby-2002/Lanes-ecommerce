"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { resetPassword } from "@/lib/actions/client";
import { ResetPasswordSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type TResetFormData = z.infer<typeof ResetPasswordSchema>;

const ResetPasswordForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<TResetFormData>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit = async (values: TResetFormData) => {
    try {
      setSubmitting(true);

      const resp = await resetPassword(values.new_password);

      if (!resp.success) {
        toast.error("Failed to update password. Try Again");
      }

      toast.success("Successfully updated  password");

      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error("Failed to update profile Try Again ");
    }
  };

  const onError = () => {
    toast.error("Enter all requied fields");
  };

  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="new_password"
          placeholder="enter new password"
          label="New Password"
        />
        <CustomInputField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name="confirm_new_password"
          placeholder="confirm new password"
          label="Confirm Password"
        />
      </form>

      <Button className=" mt-6" onClick={form.handleSubmit(onSubmit, onError)}>
        {submitting && (
          <Image
            height={24}
            width={24}
            className="mr-2"
            alt="svg"
            src={"/loaders/circular-loader.svg"}
          />
        )}
        Reset Password
      </Button>
    </Form>
  );
};

export default ResetPasswordForm;
