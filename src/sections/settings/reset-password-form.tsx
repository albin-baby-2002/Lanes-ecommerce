
"use client";
import CustomInputField, { FormFieldType } from "@/components/custom-input";
import { Form } from "@/components/ui/form";
import { ResetPasswordSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordForm = () => {
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
  });
  return (
    <Form {...form}>
      <form className="grid w-full gap-4">
          <CustomInputField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="current_password"
            placeholder="enter current password"
            label="Current Password"
          />

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
          name="Confirm Password"
          placeholder="confirm new password"
          label="Confirm Password"
        />
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
